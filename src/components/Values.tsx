import { motion } from 'framer-motion'

const values = [
  { keyword: 'SCALABLE',    description: 'Systems that grow with you — architected for the long run, not just the demo.' },
  { keyword: 'INTELLIGENT', description: 'AI-driven solutions that think, adapt, and solve real problems at scale.' },
  { keyword: 'PERFORMANT',  description: 'Fast by design. Every millisecond is a UX decision.' },
  { keyword: 'PURPOSEFUL',  description: 'Built with intention. No bloat, no noise — only what matters.' },
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
    <section aria-label="Engineering values" className="bg-ink px-6 py-20 border-t border-white/5">
      <div className="max-w-[1280px] mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-dm text-[10px] text-white/20 tracking-[0.4em] uppercase mb-12"
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
              className={`py-8 pr-8 ${i < values.length - 1 ? 'lg:border-r border-white/6' : ''} ${i > 0 ? 'lg:pl-8 lg:pr-0' : ''}`}
            >
              <h3
                className="font-hero font-black text-2xl text-white uppercase mb-3"
                style={{ letterSpacing: '0.04em' }}
              >
                {v.keyword}
              </h3>
              <div className="w-6 h-0.5 bg-blue mb-4" style={{ boxShadow: '0 0 8px rgba(26,107,255,0.6)' }} />
              <p className="font-dm text-sm text-white/30 leading-relaxed">{v.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
