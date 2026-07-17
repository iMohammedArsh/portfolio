import { useEffect, useRef, useState, type ReactNode } from 'react'
import { motion, useMotionValue, useSpring, useMotionTemplate, useScroll, useTransform } from 'framer-motion'

const VIDEO_SRC =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4'

const lines = ['Where Logic', 'Meets', 'Intelligence.']
const techStack = ['React', 'Next.js', 'Python', 'FastAPI', 'LangChain', 'TypeScript']
const navLinks = [
  { label: 'About',      href: '#about' },
  { label: 'Skills',     href: '#skills' },
  { label: 'Projects',   href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact',    href: '#contact' },
]

// Types progressively — returns the partial string up to current character
function useTyping(text: string, startDelay = 1100, charDelay = 42) {
  const [displayed, setDisplayed] = useState('')
  useEffect(() => {
    const tid = setTimeout(() => {
      let i = 0
      const iv = setInterval(() => {
        i++
        setDisplayed(text.slice(0, i))
        if (i >= text.length) clearInterval(iv)
      }, charDelay)
      return () => clearInterval(iv)
    }, startDelay)
    return () => clearTimeout(tid)
  }, [text, startDelay, charDelay])
  return displayed
}

// Cubic ease-out count from 0 to target
function useCountUp(target: number, startDelay = 800, duration = 900) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    let raf: number
    const origin = performance.now() + startDelay
    const tick = (now: number) => {
      if (now < origin) { raf = requestAnimationFrame(tick); return }
      const t = Math.min((now - origin) / duration, 1)
      setCount(Math.round((1 - Math.pow(1 - t, 3)) * target))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, startDelay, duration])
  return count
}

// Button that drifts toward the cursor — spring physics on x/y
function MagneticButton({
  href,
  children,
  className,
}: {
  href: string
  children: ReactNode
  className: string
}) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 200, damping: 14 })
  const sy = useSpring(y, { stiffness: 200, damping: 14 })

  const onMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * 0.28)
    y.set((e.clientY - (r.top + r.height / 2)) * 0.28)
  }

  return (
    <motion.a
      href={href}
      data-cursor-hover
      style={{ x: sx, y: sy }}
      onMouseMove={onMove}
      onMouseLeave={() => { x.set(0); y.set(0) }}
      whileTap={{ scale: 0.96 }}
      className={className}
    >
      {children}
    </motion.a>
  )
}

export default function Hero() {
  const [ready, setReady] = useState(false)
  const heroRef = useRef<HTMLElement>(null)

  // Scroll out — video zooms in, content fades as user leaves hero
  const { scrollYProgress: scrollOut } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const videoScrollScale   = useTransform(scrollOut, [0, 1], [1, 1.1])
  const overlayScrollOpacity = useTransform(scrollOut, [0, 0.8], [0.55, 0.78])
  const contentScrollOpacity = useTransform(scrollOut, [0, 0.55], [1, 0])
  const contentScrollY       = useTransform(scrollOut, [0, 0.55], [0, -28])

  // Mouse spotlight — spring-smoothed radial gradient over the video
  const mx = useMotionValue(-9999)
  const my = useMotionValue(-9999)
  const sx = useSpring(mx, { stiffness: 55, damping: 20 })
  const sy = useSpring(my, { stiffness: 55, damping: 20 })
  const spotlight = useMotionTemplate`radial-gradient(520px circle at ${sx}px ${sy}px, rgba(26,107,255,0.11), transparent 45%)`

  const years    = useCountUp(4,  700)
  const projects = useCountUp(12, 950)
  const role     = useTyping('Full Stack + AI/ML Engineer', 1200)

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 80)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const onMove = (e: MouseEvent) => { mx.set(e.clientX); my.set(e.clientY) }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [mx, my])

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-[100dvh] overflow-hidden bg-ink flex flex-col"
      aria-label="Mohammed Arsh — Full Stack and AI/ML Engineer"
    >
      {/* Fullscreen video — zooms in as user scrolls out */}
      <motion.video
        className="absolute inset-0 w-full h-full object-cover z-0"
        style={{ scale: videoScrollScale }}
        autoPlay loop muted playsInline
        onCanPlay={() => setReady(true)}
        src={VIDEO_SRC}
        aria-hidden="true"
      />

      {/* Base overlay — darkens slightly as user scrolls */}
      <motion.div
        className="absolute inset-0 z-[1] bg-ink"
        style={{ opacity: overlayScrollOpacity }}
      />

      {/* Ambient orbs — give depth above the dimmed video */}
      <div
        className="absolute top-[12%] right-[18%] w-[520px] h-[520px] rounded-full bg-blue/10 blur-[130px] z-[2] pointer-events-none"
        style={{ animation: 'orbDrift1 20s ease-in-out infinite' }}
      />
      <div
        className="absolute bottom-[18%] left-[8%] w-[380px] h-[380px] rounded-full bg-blue/[0.06] blur-[110px] z-[2] pointer-events-none"
        style={{ animation: 'orbDrift2 26s ease-in-out infinite' }}
      />

      {/* Interactive spotlight that follows the mouse */}
      <motion.div
        className="absolute inset-0 z-[3] pointer-events-none"
        style={{ background: spotlight }}
      />

      {/* Bottom gradient bleed */}
      <div className="absolute bottom-0 inset-x-0 h-44 bg-gradient-to-t from-ink to-transparent z-[4] pointer-events-none" />

      {/* ── Content ── */}
      <div className="relative z-10 flex flex-col min-h-[100dvh]">

        {/* Inline nav */}
        <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto w-full">
          <a
            href="#"
            className="font-syne font-extrabold text-xl text-white"
            style={{ letterSpacing: '-0.03em' }}
          >
            MA
          </a>
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="text-sm font-dm text-white/50 hover:text-white transition-colors duration-200"
              >
                {label}
              </a>
            ))}
          </div>
          <a
            href="#contact"
            data-cursor-hover
            className="liquid-glass rounded-full px-5 py-2 text-sm font-dm text-white hover:scale-[1.03] active:scale-[0.97] transition-transform duration-150"
          >
            Say Hello →
          </a>
        </nav>

        {/* Hero copy — left-aligned; fades out as user scrolls into VideoStory */}
        <motion.div
          className="flex-1 flex flex-col justify-center px-8 md:px-16 max-w-[660px] py-12"
          style={{ opacity: contentScrollOpacity, y: contentScrollY }}
        >

          {/* Available badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : 12 }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            className="mb-8"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-badge border border-white/15 text-[10px] font-dm font-semibold text-white/50 tracking-[0.35em] uppercase">
              <span
                className="w-1.5 h-1.5 rounded-full bg-green-400 shrink-0"
                style={{ animation: 'glowpulse 2s ease-in-out infinite' }}
              />
              Available · Kerala, India
            </span>
          </motion.div>

          {/* Headline — each line clips out from below */}
          <div className="mb-6">
            {lines.map((line, i) => (
              <div key={line} className="overflow-hidden">
                <motion.h1
                  className="font-hero font-black text-white leading-[0.88] tracking-[-0.04em] text-[clamp(2.8rem,6.5vw,5.5rem)]"
                  initial={{ y: '110%', opacity: 0 }}
                  animate={{ y: ready ? 0 : '110%', opacity: ready ? 1 : 0 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.1 + i * 0.11,
                    ease: [0.23, 1, 0.32, 1],
                  }}
                >
                  {line === 'Intelligence.' ? (
                    <>Intelligence<span className="text-blue">.</span></>
                  ) : line}
                </motion.h1>
              </div>
            ))}
          </div>

          {/* Typing role — types in after headline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.75 }}
            className="font-dm text-white/45 text-base md:text-[17px] mb-9 h-7 flex items-center gap-1"
            aria-label="Full Stack + AI/ML Engineer"
          >
            <span>{role}</span>
            <span className="inline-block w-[2px] h-[17px] bg-blue rounded-full animate-pulse" />
          </motion.p>

          {/* Stats — numbers count up on load */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5, ease: [0.23, 1, 0.32, 1] }}
            className="flex items-center gap-8 mb-9"
          >
            <div>
              <div className="font-hero font-black text-[2.7rem] text-white tracking-[-0.04em] leading-none tabular-nums">
                {years}+
              </div>
              <div className="font-dm text-[10px] text-white/30 uppercase tracking-[0.3em] mt-1.5">Years Building</div>
            </div>
            <div className="w-px h-10 bg-white/10 shrink-0" />
            <div>
              <div className="font-hero font-black text-[2.7rem] text-white tracking-[-0.04em] leading-none tabular-nums">
                {projects}+
              </div>
              <div className="font-dm text-[10px] text-white/30 uppercase tracking-[0.3em] mt-1.5">Projects Shipped</div>
            </div>
          </motion.div>

          {/* CTAs — magnetic pull on hover */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.62, ease: [0.23, 1, 0.32, 1] }}
            className="flex flex-wrap items-center gap-3 mb-10"
          >
            <MagneticButton
              href="#projects"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue text-white font-dm font-semibold text-sm rounded-badge hover:bg-blue/85 transition-colors duration-150"
            >
              View Work →
            </MagneticButton>
            <MagneticButton
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 border border-white/15 text-white/65 font-dm font-semibold text-sm rounded-badge hover:border-white/30 hover:text-white transition-all duration-150"
            >
              Say Hello
            </MagneticButton>
          </motion.div>

          {/* Tech stack badges — staggered scale-in */}
          <div className="flex flex-wrap gap-1.5">
            {techStack.map((tech, i) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.82 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.88 + i * 0.05, ease: [0.23, 1, 0.32, 1], duration: 0.4 }}
                className="px-2.5 py-1 text-[11px] font-dm border border-white/10 rounded-badge text-white/30 hover:border-white/20 hover:text-white/55 transition-all duration-200"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-8 left-8 z-[5] flex items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.9, duration: 0.9 }}
        aria-hidden="true"
      >
        <div className="w-px h-7 bg-gradient-to-b from-white/22 to-transparent" />
        <span className="font-dm text-[9px] text-white/22 uppercase tracking-[0.28em]">Scroll</span>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-white/5 z-[5]" />
    </section>
  )
}
