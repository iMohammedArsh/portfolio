import { useRef } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'

const MOMENTS = [
  {
    num: '01',
    headline: 'Systems first.\nFeatures second.',
    sub: "I'd rather spend a week on the architecture than a year fixing what breaks in production.",
  },
  {
    num: '02',
    headline: 'React on top.\nPython underneath.',
    sub: 'FastAPI and LangChain doing the real work — not bolted on, wired in from the start.',
  },
  {
    num: '03',
    headline: 'Always shipping,\nrarely finished.',
    sub: "What's live is on GitHub, pulled in automatically — the list below updates itself.",
  },
]

function Panel({ progress, index, num, headline, sub }: {
  progress: MotionValue<number>
  index: number
  num: string
  headline: string
  sub: string
}) {
  const center = index * 0.5
  const blurAmt = useTransform(progress, [center - 0.25, center, center + 0.25], [10, 0, 10])
  const filter = useTransform(blurAmt, (v) => `blur(${v}px)`)
  const scale = useTransform(progress, [center - 0.25, center, center + 0.25], [0.92, 1, 0.92])
  const lineScale = useTransform(progress, [center - 0.25, center], [0, 1])

  const lines = headline.split('\n')

  return (
    <div className="w-1/3 h-full shrink-0 flex flex-col justify-center px-6 md:px-16 lg:px-32 relative overflow-hidden">
      <span
        className="pointer-events-none select-none absolute top-1/2 -translate-y-1/2 right-[4%] font-sans font-black leading-none text-transparent"
        style={{ fontSize: 'clamp(14rem, 32vw, 28rem)', WebkitTextStroke: '1px rgba(255,255,255,0.05)' }}
        aria-hidden="true"
      >
        {num}
      </span>

      <motion.div style={{ filter, scale }} className="relative max-w-3xl">
        <p className="font-sans text-white/30 text-[12px] tracking-wide mb-6">
          {num} / 03
        </p>

        <motion.div
          className="h-px bg-white/40 mb-8 origin-left"
          style={{ scaleX: lineScale, width: 56 }}
        />

        <h2 className="font-sans font-semibold text-white leading-[1.04] tracking-[-0.02em] text-[clamp(2.3rem,5.5vw,4.6rem)]">
          {lines.map((line, i) => (
            <span key={i} className="block">{line}</span>
          ))}
        </h2>

        <p className="font-sans text-white/50 text-lg mt-7 max-w-[440px] leading-relaxed">
          {sub}
        </p>
      </motion.div>
    </div>
  )
}

function SceneTab({ progress, index, onClick }: { progress: MotionValue<number>; index: number; onClick: () => void }) {
  const center = index * 0.5
  const color = useTransform(
    progress,
    [center - 0.2, center, center + 0.2],
    ['rgba(255,255,255,0.3)', 'rgba(255,255,255,1)', 'rgba(255,255,255,0.3)']
  )
  return (
    <motion.button
      onClick={onClick}
      data-cursor-hover
      style={{ color }}
      className="font-sans text-[12px]"
    >
      0{index + 1}
    </motion.button>
  )
}

export default function Story() {
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-66.6667%'])

  const jumpTo = (i: number) => {
    const el = sectionRef.current
    if (!el) return
    const scrollable = el.offsetHeight - window.innerHeight
    window.scrollTo({ top: el.offsetTop + scrollable * (i / (MOMENTS.length - 1)), behavior: 'smooth' })
  }

  return (
    <section
      ref={sectionRef}
      id="story"
      className="relative bg-ink"
      style={{ height: '220vh' }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div className="absolute inset-0 flex h-full" style={{ width: '300%', x }}>
          {MOMENTS.map((m, i) => (
            <Panel key={m.num} progress={scrollYProgress} index={i} {...m} />
          ))}
        </motion.div>

        {/* Bottom — scene tabs + progress */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-4">
          <div className="flex items-center gap-6">
            {MOMENTS.map((m, i) => (
              <SceneTab key={m.num} progress={scrollYProgress} index={i} onClick={() => jumpTo(i)} />
            ))}
          </div>
          <div className="relative w-40 h-px bg-white/10 overflow-hidden">
            <motion.div className="absolute inset-y-0 left-0 bg-white" style={{ width: useTransform(scrollYProgress, [0, 1], ['0%', '100%']) }} />
          </div>
        </div>
      </div>
    </section>
  )
}
