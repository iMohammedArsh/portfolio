import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { DURATION, EASE, revealBlur, viewportOnce } from '../lib/motion'

const experiences = [
  {
    role: 'Independent Developer',
    type: 'Freelance',
    period: '2024 — Present',
    description: 'Freelance client work alongside personal tools and open source — shipping React frontends, FastAPI backends, and the occasional AI pipeline that has to work in production, not just in a demo.',
    tags: ['React', 'Next.js', 'Python', 'AI/ML'],
    isActive: true,
  },
  {
    role: 'Self-taught Engineer',
    type: 'Personal Growth',
    period: '2021 — 2024',
    description: 'No bootcamp, no shortcuts — HTML and CSS first, then JavaScript, then backend systems and AI/ML, one project at a time until it stuck.',
    tags: ['HTML/CSS', 'JavaScript', 'Python', 'System Design'],
    isActive: false,
  },
]

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 0.7', 'end 0.4'],
  })
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section ref={sectionRef} id="experience" aria-label="Work Experience" className="bg-paper py-28 md:py-36 px-6 md:px-10 lg:pl-36">
      <div className="max-w-[1320px] mx-auto">
        <motion.h2
          variants={revealBlur}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="font-sans font-semibold text-4xl md:text-6xl text-ink tracking-[-0.02em] mb-16 md:mb-20"
        >
          The record so far.
        </motion.h2>

        <div className="relative max-w-2xl pl-10">
          <div className="absolute left-0 top-2 bottom-2 w-px bg-ink/10" />
          <motion.div
            className="absolute left-0 top-2 w-px bg-ink origin-top"
            style={{ height: lineHeight }}
          />

          {experiences.map((exp, i) => (
            <motion.article
              key={exp.role}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: DURATION.base, delay: i * 0.1, ease: EASE }}
              className="relative pb-14 last:pb-0"
            >
              <span className="absolute -left-10 top-1 w-[9px] h-[9px] rounded-full bg-ink" />

              <p className="font-sans text-[12px] text-ink/40 mb-3">{exp.period}</p>

              <div className="flex flex-wrap items-baseline gap-2 mb-3">
                <h3 className="font-sans font-semibold text-2xl md:text-3xl text-ink tracking-[-0.01em]">{exp.role}</h3>
                <span className="font-sans text-ink/25 text-sm">·</span>
                <span className="font-sans text-ink/45 text-sm">{exp.type}</span>
                {exp.isActive && (
                  <span className="inline-flex items-center gap-1.5 ml-1 font-sans text-[11px] text-ink/60">
                    <span className="w-1.5 h-1.5 rounded-full bg-ink" style={{ animation: 'glowpulse 2s ease-in-out infinite' }} />
                    Live
                  </span>
                )}
              </div>

              <p className="font-sans text-ink/60 leading-relaxed mb-5 max-w-lg text-[16px]">{exp.description}</p>

              <div className="flex flex-wrap gap-2">
                {exp.tags.map((tag) => (
                  <span key={tag} className="px-2.5 py-1 text-[12px] font-sans rounded-badge border border-ink/15 text-ink/50">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
