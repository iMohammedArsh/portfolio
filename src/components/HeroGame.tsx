import { useEffect, useRef, useState, useCallback } from 'react'

// ─── Constants ───────────────────────────────────────────────────────────────
const COLS = 20
const ROWS = 20
const CELL = 20
const W = COLS * CELL   // 400
const H = ROWS * CELL   // 400
const FOODS = ['</>', '{}', '()', '[]', 'AI', 'ML', 'tsx', 'py']
const BLUE = '#1A6BFF'
const SPEED_INIT = 150   // ms per step
const SPEED_MIN  = 70
const SPEED_STEP = 10    // faster every 5 foods

// ─── Types ───────────────────────────────────────────────────────────────────
type Dir = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT'
type GS  = 'idle' | 'playing' | 'gameover'
interface Pt { x: number; y: number }

const OPP: Record<Dir, Dir> = { UP: 'DOWN', DOWN: 'UP', LEFT: 'RIGHT', RIGHT: 'LEFT' }
const DELTA: Record<Dir, Pt> = {
  UP:    { x: 0,  y: -1 },
  DOWN:  { x: 0,  y:  1 },
  LEFT:  { x: -1, y:  0 },
  RIGHT: { x: 1,  y:  0 },
}

// ─── Helper: draw rounded rect ───────────────────────────────────────────────
function rr(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.arcTo(x + w, y, x + w, y + h, r)
  ctx.arcTo(x + w, y + h, x, y + h, r)
  ctx.arcTo(x, y + h, x, y, r)
  ctx.arcTo(x, y, x + w, y, r)
  ctx.closePath()
}

// ─── Helper: random food position not on snake ───────────────────────────────
function pickFood(snake: Pt[]): Pt {
  let pt: Pt
  do {
    pt = { x: Math.floor(Math.random() * COLS), y: Math.floor(Math.random() * ROWS) }
  } while (snake.some(s => s.x === pt.x && s.y === pt.y))
  return pt
}

// ─── Component ───────────────────────────────────────────────────────────────
export default function HeroGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // React state — only what drives UI re-renders (glow color, mobile controls)
  const [gameState, setGameState] = useState<GS>('idle')

  // All mutable game state lives in refs so the rAF loop reads them without stale closures
  const gsRef      = useRef<GS>('idle')
  const snake      = useRef<Pt[]>([])
  const dir        = useRef<Dir>('RIGHT')
  const nextDir    = useRef<Dir>('RIGHT')
  const food       = useRef<Pt>({ x: 5, y: 5 })
  const foodIdx    = useRef(0)
  const score      = useRef(0)
  const speed      = useRef(SPEED_INIT)
  const lastStep   = useRef(0)
  const raf        = useRef<number>(0)
  const flash      = useRef<{ x: number; y: number; t: number } | null>(null)

  // ── Reset & start ──────────────────────────────────────────────────────────
  const startGame = useCallback(() => {
    snake.current   = [{ x: 10, y: 10 }, { x: 9, y: 10 }, { x: 8, y: 10 }]
    dir.current     = 'RIGHT'
    nextDir.current = 'RIGHT'
    food.current    = pickFood(snake.current)
    foodIdx.current = 0
    score.current   = 0
    speed.current   = SPEED_INIT
    lastStep.current = 0
    flash.current   = null
    gsRef.current   = 'playing'
    setGameState('playing')
  }, [])

  // ── Main game loop + keyboard setup ───────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const loop = (ts: number) => {
      // ── Step logic ──
      if (gsRef.current === 'playing' && ts - lastStep.current >= speed.current) {
        lastStep.current = ts
        const d = nextDir.current
        dir.current = d
        const head = snake.current[0]
        const nh: Pt = {
          x: (head.x + DELTA[d].x + COLS) % COLS,
          y: (head.y + DELTA[d].y + ROWS) % ROWS,
        }

        if (snake.current.some(s => s.x === nh.x && s.y === nh.y)) {
          gsRef.current = 'gameover'
          setGameState('gameover')
        } else {
          snake.current = [nh, ...snake.current]
          if (nh.x === food.current.x && nh.y === food.current.y) {
            score.current++
            flash.current = { x: nh.x, y: nh.y, t: ts }
            foodIdx.current = (foodIdx.current + 1) % FOODS.length
            food.current = pickFood(snake.current)
            if (score.current % 5 === 0) {
              speed.current = Math.max(SPEED_MIN, speed.current - SPEED_STEP)
            }
          } else {
            snake.current.pop()
          }
        }
      }

      // ── Draw ──
      ctx.clearRect(0, 0, W, H)

      // Background
      ctx.fillStyle = '#0D0F16'
      ctx.fillRect(0, 0, W, H)

      // Grid lines
      ctx.strokeStyle = 'rgba(255,255,255,0.035)'
      ctx.lineWidth = 0.5
      for (let i = 0; i <= COLS; i++) {
        ctx.beginPath(); ctx.moveTo(i * CELL, 0); ctx.lineTo(i * CELL, H); ctx.stroke()
      }
      for (let j = 0; j <= ROWS; j++) {
        ctx.beginPath(); ctx.moveTo(0, j * CELL); ctx.lineTo(W, j * CELL); ctx.stroke()
      }

      // Eat flash
      if (flash.current) {
        const age = ts - flash.current.t
        if (age < 320) {
          const a = (1 - age / 320) * 0.55
          const r = CELL * (0.5 + (age / 320) * 0.8)
          ctx.beginPath()
          ctx.arc(flash.current.x * CELL + CELL / 2, flash.current.y * CELL + CELL / 2, r, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(26,107,255,${a})`
          ctx.fill()
        } else {
          flash.current = null
        }
      }

      // Snake
      const segs = snake.current
      segs.forEach((seg, i) => {
        const p = 2
        const x = seg.x * CELL + p
        const y = seg.y * CELL + p
        const sz = CELL - p * 2
        const isHead = i === 0
        const fade = 1 - (i / segs.length) * 0.55

        ctx.shadowBlur = isHead ? 18 : 10
        ctx.shadowColor = `rgba(26,107,255,${fade * 0.9})`
        ctx.fillStyle = isHead
          ? '#6AABFF'
          : `rgba(26,107,255,${0.45 + fade * 0.55})`

        rr(ctx, x, y, sz, sz, 3)
        ctx.fill()
      })
      ctx.shadowBlur = 0

      // Food
      if (gsRef.current !== 'idle') {
        const f = food.current
        const fx = f.x * CELL + CELL / 2
        const fy = f.y * CELL + CELL / 2
        const txt = FOODS[foodIdx.current]

        // Soft glow behind food
        ctx.beginPath()
        ctx.arc(fx, fy, CELL * 0.48, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(107,33,232,0.22)'
        ctx.fill()

        // Food text
        ctx.font = `bold ${txt.length > 2 ? 7 : 10}px monospace`
        ctx.fillStyle = '#B79FFF'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(txt, fx, fy)
      }

      // Score (top right)
      if (gsRef.current !== 'idle') {
        ctx.font = '11px monospace'
        ctx.fillStyle = 'rgba(245,244,240,0.38)'
        ctx.textAlign = 'right'
        ctx.textBaseline = 'top'
        ctx.fillText(`${score.current}`, W - 10, 10)
      }

      // ── Overlay: idle ──
      if (gsRef.current === 'idle') {
        ctx.fillStyle = 'rgba(13,15,22,0.86)'
        ctx.fillRect(0, 0, W, H)

        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'

        ctx.font = 'bold 22px Syne, sans-serif'
        ctx.fillStyle = '#F5F4F0'
        ctx.fillText('snake.play()', W / 2, H / 2 - 20)

        ctx.font = '11px monospace'
        ctx.fillStyle = 'rgba(245,244,240,0.35)'
        ctx.fillText('Press Space to start', W / 2, H / 2 + 14)
      }

      // ── Overlay: game over ──
      if (gsRef.current === 'gameover') {
        ctx.fillStyle = 'rgba(13,15,22,0.9)'
        ctx.fillRect(0, 0, W, H)

        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'

        ctx.font = 'bold 18px Syne, sans-serif'
        ctx.fillStyle = 'rgba(245,244,240,0.7)'
        ctx.fillText('GAME OVER', W / 2, H / 2 - 38)

        ctx.font = `bold 48px monospace`
        ctx.fillStyle = BLUE
        ctx.fillText(`${score.current}`, W / 2, H / 2 + 8)

        ctx.font = '10px monospace'
        ctx.fillStyle = 'rgba(245,244,240,0.3)'
        ctx.fillText('Press Space to restart', W / 2, H / 2 + 52)
      }

      raf.current = requestAnimationFrame(loop)
    }

    raf.current = requestAnimationFrame(loop)

    // ── Keyboard handler ──
    const onKey = (e: KeyboardEvent) => {
      const dirMap: Record<string, Dir> = {
        ArrowUp: 'UP', ArrowDown: 'DOWN', ArrowLeft: 'LEFT', ArrowRight: 'RIGHT',
        w: 'UP', s: 'DOWN', a: 'LEFT', d: 'RIGHT',
        W: 'UP', S: 'DOWN', A: 'LEFT', D: 'RIGHT',
      }

      // Prevent page scroll only when playing
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key) && gsRef.current === 'playing') {
        e.preventDefault()
      }

      if (e.key === ' ' || e.code === 'Space') {
        e.preventDefault()
        if (gsRef.current !== 'playing') startGame()
        return
      }

      if (gsRef.current === 'playing' && dirMap[e.key]) {
        const nd = dirMap[e.key]
        // Compare against buffered nextDir to prevent rapid reversal
        if (nd !== OPP[nextDir.current]) nextDir.current = nd
      }
    }

    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      cancelAnimationFrame(raf.current)
    }
  }, [startGame])

  // ── Mobile D-pad handler ──────────────────────────────────────────────────
  const mobileMove = (d: Dir) => {
    if (gsRef.current !== 'playing') {
      startGame()
      return
    }
    if (d !== OPP[nextDir.current]) nextDir.current = d
  }

  // ── Render ────────────────────────────────────────────────────────────────
  const glowStyle = (): React.CSSProperties => {
    if (gameState === 'playing')
      return { boxShadow: '0 0 0 1px rgba(26,107,255,0.35), 0 0 36px rgba(26,107,255,0.14)' }
    if (gameState === 'gameover')
      return { boxShadow: '0 0 0 1px rgba(107,33,232,0.35), 0 0 36px rgba(107,33,232,0.12)' }
    return { boxShadow: '0 0 0 1px rgba(229,227,221,0.12)' }
  }

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      {/* Eyebrow label */}
      <p className="text-xs font-dm text-[#6B7280] tracking-[0.2em] uppercase self-start">
        // play while you're here
      </p>

      {/* Canvas */}
      <div
        className="rounded-[12px] overflow-hidden transition-shadow duration-500"
        style={glowStyle()}
      >
        <canvas
          ref={canvasRef}
          width={W}
          height={H}
          style={{ display: 'block', maxWidth: '100%', height: 'auto' }}
        />
      </div>

      {/* Mobile D-pad — hidden on md+ */}
      <div className="flex flex-col items-center gap-1.5 md:hidden mt-1">
        <button
          onPointerDown={() => mobileMove('UP')}
          className="w-12 h-12 rounded-[8px] bg-[#0D0F16] border border-white/10 text-[#F5F4F0] text-lg flex items-center justify-center active:bg-[#1A6BFF]/20 transition-colors select-none"
        >↑</button>
        <div className="flex gap-1.5">
          {(['LEFT', 'DOWN', 'RIGHT'] as Dir[]).map((d, i) => (
            <button
              key={d}
              onPointerDown={() => mobileMove(d)}
              className="w-12 h-12 rounded-[8px] bg-[#0D0F16] border border-white/10 text-[#F5F4F0] text-lg flex items-center justify-center active:bg-[#1A6BFF]/20 transition-colors select-none"
            >
              {(['←', '↓', '→'] as const)[i]}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
