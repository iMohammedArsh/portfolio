import { motion, useAnimationFrame, useMotionValue } from 'framer-motion'
import { useRef } from 'react'

const skills = [
  { label: 'React',       category: 'Frontend' },
  { label: 'Next.js',     category: 'Frontend' },
  { label: 'TypeScript',  category: 'Language' },
  { label: 'Python',      category: 'Language' },
  { label: 'FastAPI',     category: 'Backend'  },
  { label: 'LangChain',   category: 'AI/ML'    },
  { label: 'Node.js',     category: 'Backend'  },
  { label: 'PostgreSQL',  category: 'Database' },
  { label: 'MongoDB',     category: 'Database' },
  { label: 'Docker',      category: 'DevOps'   },
  { label: 'Vercel',      category: 'DevOps'   },
  { label: 'Git',         category: 'Tooling'  },
]

const marqueeItems = [
  'React', 'Next.js', 'TypeScript', 'Python', 'FastAPI',
  'LangChain', 'MongoDB', 'PostgreSQL', 'Docker', 'Git', 'Vercel', 'Node.js',
]

function Marquee() {
  const x = useMotionValue(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const itemWidth = useRef(0)

  useAnimationFrame((_, delta) => {
    if (!containerRef.current) return
    itemWidth.current = containerRef.current.scrollWidth / 2
    let current = x.get() - delta * 0.045
    if (Math.abs(current) >= itemWidth.current) current = 0
    x.set(current)
  })

  const items = [...marqueeItems, ...marqueeItems]

  return (
    <div
      className="overflow-hidden mt-16 border-t border-white/6 pt-6"
      aria-hidden="true"
    >
      <motion.div ref={containerRef} style={{ x }} className="flex whitespace-nowrap">
        {items.map((item, i) => (
          <span key={i} className="font-dm text-xs text-white/20 uppercase tracking-[0.3em] px-6">
            {item} <span className="text-white/10 mx-2">·</span>
          </span>
        ))}
      </motion.div>
    </div>
  )
}

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04 } },
}
const item = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.23, 1, 0.32, 1] } },
}

export default function Skills() {
  return (
    <section id="skills" aria-label="Technical Skills" className="bg-ink py-24 px-6 grid-bg-dark">
      <div className="max-w-[1280px] mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-4"
        >
          <p className="font-dm text-[10px] text-white/40 tracking-[0.4em] uppercase mb-4">What I build with</p>
          <h2
            className="font-hero font-black text-5xl md:text-7xl text-white"
            style={{ letterSpacing: '-0.02em' }}
          >
            Skills<span className="text-blue">.</span>
          </h2>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 mt-14"
        >
          {skills.map((skill) => (
            <motion.div
              key={skill.label}
              variants={item}
              data-cursor-hover
              className="group flex flex-col items-center gap-2.5 p-4 rounded-card border border-white/6 bg-white/[0.02] hover:border-blue/30 hover:bg-blue/5 transition-all duration-200 cursor-default"
            >
              <span className="font-dm text-xs font-medium text-white/50 group-hover:text-white/90 transition-colors duration-200 text-center leading-tight">
                {skill.label}
              </span>
              <span className="font-dm text-[9px] text-white/20 uppercase tracking-[0.2em]">
                {skill.category}
              </span>
            </motion.div>
          ))}
        </motion.div>

        <Marquee />
      </div>
    </section>
  )
}
