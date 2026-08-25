import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { DURATION, EASE, revealBlur, viewportOnce } from '../lib/motion'

const facts = [
  { key: 'Location',      value: 'Kerala, India' },
  { key: 'Focus',         value: 'Full Stack + AI/ML' },
  { key: 'Now building',  value: 'Personal brand + dev education platform' },
  { key: 'Open to',       value: 'Freelance · Startups · Open source' },
  { key: 'Languages',     value: 'English · Malayalam · Hindi' },
]

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const parallaxY = useTransform(scrollYProgress, [0, 1], [-50, 50])

  return (
    <section
      ref={sectionRef}
      id="about"
      aria-label="About Mohammed Arsh"
      className="relative bg-ink py-28 md:py-36 px-6 md:px-10 lg:pl-36 overflow-hidden"
    >
      <motion.span
        style={{ y: parallaxY, WebkitTextStroke: '1px rgba(255,255,255,0.04)' }}
        className="pointer-events-none select-none absolute right-[2%] top-4 font-sans font-black text-[18rem] leading-none text-transparent"
        aria-hidden="true"
      >
        02
      </motion.span>

      <div className="relative max-w-[1320px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-16 lg:gap-24 items-start">

          <motion.div
            variants={revealBlur}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <p className="font-sans text-[13px] text-white/40 mb-7 tracking-wide">About</p>

            <h2 className="font-sans font-semibold text-3xl md:text-4xl text-white leading-[1.3] tracking-[-0.01em] max-w-2xl">
              I'm a self-taught Full Stack and AI/ML Engineer from Kerala, India.
              It started with wanting to know how a webpage actually worked —
              inspect element, then a tutorial, then a late night that turned
              into three. That's still roughly how I learn.
            </h2>

            <div className="space-y-5 font-sans text-white/50 text-lg leading-relaxed max-w-[560px] mt-9">
              <p>I care about the seam where a clean React frontend meets a solid FastAPI backend — and where an AI pipeline in LangChain actually holds up outside a demo.</p>
              <p>Right now I'm building my own brand and a platform to teach other developers what I wish someone had handed me earlier. Always open to interesting problems and good people to build with.</p>
            </div>

            <a
              href="#projects"
              data-cursor-hover
              className="group relative inline-flex items-center gap-2 mt-10 font-sans text-[14px] text-white"
            >
              View my work
              <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
              <span className="absolute left-0 -bottom-1 h-px w-full bg-white/30 scale-x-100" />
            </a>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: DURATION.slow, delay: 0.15, ease: EASE }}
            className="divide-y divide-white/10 border-t border-white/10 lg:pt-1"
          >
            {facts.map((f) => (
              <div key={f.key} className="py-4">
                <dt className="font-sans text-[12px] text-white/35 mb-1.5">{f.key}</dt>
                <dd className="font-sans text-[15px] text-white/85">{f.value}</dd>
              </div>
            ))}
          </motion.dl>
        </div>
      </div>
    </section>
  )
}
