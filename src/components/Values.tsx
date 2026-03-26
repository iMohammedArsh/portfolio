import { motion } from 'framer-motion'

const values = [
  {
    keyword: 'SCALABLE',
    description: 'Systems that grow with you — architected for the long run, not just the demo.',
  },
  {
    keyword: 'INTELLIGENT',
    description: 'AI-driven solutions that think, adapt, and solve real problems at scale.',
  },
  {
    keyword: 'PERFORMANT',
    description: 'Fast by design. Every millisecond is a UX decision.',
  },
  {
    keyword: 'PURPOSEFUL',
    description: 'Built with intention. No bloat, no noise — only what matters.',
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] } },
}

export default function Values() {
  return (
    <section
      aria-label="Engineering values"
      className="bg-[#0D0D0D] px-6 py-20"
    >
      <div className="max-w-6xl mx-auto">
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-xs font-dm text-[#6B7280] tracking-[0.2em] uppercase mb-12"
        >
          / What I stand for
        </motion.p>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0"
        >
          {values.map((v, i) => (
            <motion.div
              key={v.keyword}
              variants={itemVariants}
              className={`py-8 pr-8 ${i < values.length - 1 ? 'lg:border-r border-[#1A1A1A]' : ''} ${i > 0 ? 'lg:pl-8 lg:pr-0' : ''}`}
            >
              {/* Keyword */}
              <h3
                className="font-hero font-black text-2xl md:text-3xl text-[#F5F4F0] uppercase mb-3"
                style={{ letterSpacing: '0.04em' }}
              >
                {v.keyword}
              </h3>

              {/* Accent line */}
              <div className="w-8 h-0.5 bg-[#1A6BFF] mb-4" />

              {/* Description */}
              <p className="font-dm text-sm text-[#6B7280] leading-relaxed">
                {v.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
