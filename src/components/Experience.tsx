import { motion } from 'framer-motion'

const experiences = [
  {
    role: 'Independent Developer',
    type: 'Freelance',
    period: '2024 — Present',
    description: 'Building client projects, personal tools, and open-source contributions. Turning ideas into production-ready web applications and AI-powered systems.',
    tags: ['React', 'Next.js', 'Python', 'AI/ML'],
    isActive: true,
  },
  {
    role: 'Self-taught Engineer',
    type: 'Personal Growth',
    period: '2021 — 2024',
    description: 'Learning foundations through projects: web development, backend systems, AI/ML integration. Built a comprehensive skill set from the ground up.',
    tags: ['HTML/CSS', 'JavaScript', 'Python', 'System Design'],
    isActive: false,
  },
]

export default function Experience() {
  return (
    <section id="experience" aria-label="Work Experience" className="bg-ink py-24 px-6 grid-bg-dark">
      <div className="max-w-[1280px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="font-dm text-[10px] text-white/25 tracking-[0.4em] uppercase mb-4">/ Experience</p>
          <h2 className="font-hero font-black text-5xl md:text-7xl text-white tracking-[-0.03em]">
            Journey<span className="text-blue">.</span>
          </h2>
        </motion.div>

        <div className="relative max-w-2xl">
          {/* Timeline line — glowing blue */}
          <motion.div
            className="absolute left-0 top-2 bottom-0 w-px origin-top"
            style={{
              background: 'linear-gradient(to bottom, #1A6BFF, rgba(26,107,255,0.1))',
              boxShadow: '0 0 12px rgba(26,107,255,0.5)',
            }}
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
          />

          <div className="space-y-14">
            {experiences.map((exp, i) => (
              <motion.article
                key={exp.role}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.15 }}
                className="relative pl-8"
              >
                {/* Glowing circle on timeline */}
                <div
                  className="absolute left-[-6px] top-2 w-3 h-3 rounded-full bg-blue"
                  style={{ boxShadow: '0 0 10px rgba(26,107,255,0.8), 0 0 20px rgba(26,107,255,0.4)' }}
                />

                {/* Period */}
                <p className="font-dm text-[10px] text-white/25 uppercase tracking-[0.3em] mb-2">{exp.period}</p>

                {/* Header */}
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <h3 className="font-hero font-black text-2xl md:text-3xl text-white tracking-[-0.02em]">{exp.role}</h3>
                  <span className="font-dm text-white/20 text-sm">·</span>
                  <span className="font-dm text-white/30 text-sm">{exp.type}</span>
                  {exp.isActive && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-blue/10 border border-blue/20 rounded-badge text-[10px] font-dm font-semibold text-blue">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue animate-pulse" />
                      LIVE
                    </span>
                  )}
                </div>

                <p className="font-dm text-white/55 leading-relaxed mb-5 max-w-lg">{exp.description}</p>

                <div className="flex flex-wrap gap-2">
                  {exp.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 text-[11px] font-dm border border-white/8 rounded-badge text-white/45">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
