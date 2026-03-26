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
    <section id="experience" aria-label="Work Experience" className="py-16 px-6 bg-white/20">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <p className="text-xs font-dm text-[#6B7280] tracking-[0.2em] uppercase mb-4">/ Experience</p>
          <h2 className="font-hero font-black text-4xl md:text-5xl text-[#0D0D0D]" style={{ letterSpacing: '-0.02em' }}>
            My journey
          </h2>
        </motion.div>

        <div className="relative max-w-2xl">
          {/* Animated timeline line */}
          <motion.div
            className="absolute left-0 top-2 bottom-0 w-px bg-[#E5E3DD] origin-top"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: 'easeInOut' }}
          />

          {/* Entries */}
          <div className="space-y-12">
            {experiences.map((exp, i) => (
              <motion.article
                key={exp.role}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="relative pl-8"
              >
                {/* Circle on line */}
                <div className="absolute left-[-4px] top-1.5 w-2 h-2 rounded-full bg-[#1A6BFF] border-2 border-[#F5F4F0]" />

                {/* Header */}
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <h3 className="font-syne font-extrabold text-xl text-[#0D0D0D]">{exp.role}</h3>
                  <span className="text-[#6B7280] font-dm text-sm">·</span>
                  <span className="text-[#6B7280] font-dm text-sm">{exp.type}</span>
                  {exp.isActive && (
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-green-50 border border-green-200 rounded-[999px] text-xs font-dm text-green-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                      LIVE
                    </span>
                  )}
                </div>

                <p className="text-sm font-dm text-[#6B7280] mb-3">{exp.period}</p>
                <p className="font-dm text-[#6B7280] leading-relaxed mb-4">{exp.description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {exp.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs font-dm border border-[#E5E3DD] rounded-[999px] text-[#6B7280]"
                    >
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
