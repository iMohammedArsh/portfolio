import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { EASE, kineticWord, staggerContainer, useMagnetic } from '../lib/motion'

function useCountUp(target: number, startDelay = 500, duration = 900) {
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

const NAME_WORDS = ['Mohammed', 'Arsh']

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const years = useCountUp(4)
  const primaryMag = useMagnetic(0.2)
  const secondaryMag = useMagnetic(0.2)

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const contentScale = useTransform(scrollYProgress, [0, 1], [1, 0.9])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0])
  const contentBlur = useTransform(scrollYProgress, [0, 0.65], [0, 8])
  const contentFilter = useTransform(contentBlur, (v) => `blur(${v}px)`)
  const numeralY = useTransform(scrollYProgress, [0, 1], [0, 120])

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-[100dvh] overflow-hidden bg-ink flex flex-col"
      aria-label="Mohammed Arsh — Full Stack and AI/ML Engineer"
    >
      <motion.span
        className="pointer-events-none select-none absolute -bottom-[6%] right-[-3%] font-sans font-black leading-none text-transparent"
        style={{
          fontSize: 'clamp(18rem, 40vw, 36rem)',
          y: numeralY,
          WebkitTextStroke: '1px rgba(255,255,255,0.06)',
        }}
        aria-hidden="true"
      >
        01
      </motion.span>

      <motion.div
        style={{ scale: contentScale, opacity: contentOpacity, filter: contentFilter }}
        className="relative z-10 flex-1 flex flex-col justify-center px-6 md:px-12 lg:pl-32 pt-32 pb-16 max-w-[1400px] mx-auto w-full"
      >
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="font-sans text-[13px] text-white/45 mb-7 tracking-wide"
        >
          Full-stack &amp; AI/ML Engineer — Kerala, India
        </motion.p>

        <motion.h1
          variants={staggerContainer(0.12, 0.1)}
          initial="hidden"
          animate="visible"
          className="font-sans font-semibold text-white leading-[0.94] tracking-[-0.03em] text-[clamp(3.4rem,9.5vw,8.4rem)] flex flex-wrap gap-x-6"
        >
          {NAME_WORDS.map((word) => (
            <span key={word} className="overflow-hidden pb-2">
              <motion.span variants={kineticWord} className="inline-block">
                {word}
              </motion.span>
            </span>
          ))}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: EASE }}
          className="font-sans text-white/55 text-lg md:text-xl leading-relaxed max-w-[560px] mt-8 mb-10"
        >
          I build web products end to end — React on the surface, Python and the
          occasional language model underneath. Working with people wherever they are.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6, ease: EASE }}
          className="flex flex-wrap items-center gap-4 mb-14"
        >
          <motion.a
            href="#projects"
            data-cursor-hover
            style={{ x: primaryMag.x, y: primaryMag.y }}
            onMouseMove={primaryMag.onMouseMove}
            onMouseLeave={primaryMag.onMouseLeave}
            className="px-7 py-3.5 rounded-badge bg-white text-ink font-sans text-[14px] font-medium hover:bg-white/90 transition-colors duration-200"
          >
            View the work
          </motion.a>
          <motion.a
            href="#contact"
            data-cursor-hover
            style={{ x: secondaryMag.x, y: secondaryMag.y }}
            onMouseMove={secondaryMag.onMouseMove}
            onMouseLeave={secondaryMag.onMouseLeave}
            className="px-7 py-3.5 rounded-badge border border-white/20 text-white/80 font-sans text-[14px] hover:border-white/45 hover:text-white transition-colors duration-200"
          >
            Get in touch
          </motion.a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-wrap items-center gap-x-8 gap-y-3 font-sans text-[13px] text-white/40"
        >
          <span className="inline-flex items-center gap-2">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-white" style={{ animation: 'glowpulse-inverse 2s ease-in-out infinite' }} />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
            </span>
            Available for work
          </span>
          <span>{years}+ years building</span>
          <span>React · Python · LangChain</span>
        </motion.div>
      </motion.div>

      <motion.div
        className="relative z-10 flex items-center gap-3 px-6 md:px-12 lg:pl-32 pb-8 max-w-[1400px] mx-auto w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.7 }}
        aria-hidden="true"
      >
        <div className="w-6 h-px bg-white/25" />
        <span className="font-sans text-[11px] text-white/35 tracking-wide">Scroll to continue</span>
      </motion.div>
    </section>
  )
}
