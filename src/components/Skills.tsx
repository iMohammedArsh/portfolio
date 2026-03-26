import { motion, useAnimationFrame, useMotionValue } from 'framer-motion'
import { useRef } from 'react'

const fields = ['FULL STACK', 'AI & ML', 'BACKEND', 'FRONTEND', 'OPEN SOURCE']

const pills = [
  {
    label: 'REACT',
    className: 'bg-gradient-to-br from-[#1A6BFF] to-[#0a2060]',
    textClass: 'text-white',
    rotate: -6,
    z: 10,
    width: 'w-52 md:w-56',
    height: 'h-20 md:h-24',
  },
  {
    label: 'PYTHON',
    className: 'bg-[#1a1a1a] border border-[#2a2a2a]',
    textClass: 'text-[#888]',
    rotate: -3,
    z: 20,
    width: 'w-48 md:w-52',
    height: 'h-18 md:h-20',
  },
  {
    label: 'TYPESCRIPT',
    className: 'bg-[#F5F4F0]',
    textClass: 'text-[#0D0D0D]',
    rotate: 0,
    z: 30,
    width: 'w-60 md:w-64',
    height: 'h-24 md:h-28',
  },
  {
    label: 'FASTAPI',
    className: 'bg-[#1a1a1a] border border-[#2a2a2a]',
    textClass: 'text-[#888]',
    rotate: 3,
    z: 20,
    width: 'w-48 md:w-52',
    height: 'h-18 md:h-20',
  },
  {
    label: 'LANGCHAIN',
    className: 'bg-gradient-to-br from-[#6B21E8] to-[#1A6BFF]',
    textClass: 'text-white',
    rotate: 6,
    z: 10,
    width: 'w-52 md:w-56',
    height: 'h-20 md:h-24',
  },
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
    let current = x.get() - delta * 0.04
    if (Math.abs(current) >= itemWidth.current) current = 0
    x.set(current)
  })

  const items = [...marqueeItems, ...marqueeItems]

  return (
    <div className="overflow-hidden mt-20 border-t border-[#1a1a1a] pt-6">
      <motion.div
        ref={containerRef}
        style={{ x }}
        className="flex gap-0 whitespace-nowrap"
      >
        {items.map((item, i) => (
          <span key={i} className="font-dm text-xs text-[#333] uppercase tracking-[0.25em] px-6">
            {item} <span className="text-[#222] mx-2">·</span>
          </span>
        ))}
      </motion.div>
    </div>
  )
}

export default function Skills() {
  return (
    <section id="skills" aria-label="Technical Skills" className="bg-[#0D0D0D] py-24 px-6 overflow-hidden">

      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-6"
      >
        <h2
          className="font-hero font-black text-4xl md:text-6xl text-[#F5F4F0] uppercase"
          style={{ letterSpacing: '0.1em' }}
        >
          TECH STACK
        </h2>
      </motion.div>

      {/* Slash-separated fields */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="text-center font-dm text-xs text-[#6B7280] uppercase tracking-[0.2em] mb-20"
      >
        {fields.join('  /  ')}
      </motion.p>

      {/* Pills row */}
      <div className="flex items-center justify-center">
        {/* Desktop: overlapping row */}
        <div className="hidden md:flex items-center justify-center">
          {pills.map((pill, i) => (
            <motion.div
              key={pill.label}
              initial={{ opacity: 0, scale: 0.8, rotate: pill.rotate }}
              whileInView={{ opacity: 1, scale: 1, rotate: pill.rotate }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              whileHover={{ scale: 1.08, rotate: 0, zIndex: 50 }}
              data-cursor-hover
              className={`
                relative flex items-center justify-center
                ${pill.width} ${pill.height}
                ${pill.className}
                rounded-[60px] cursor-pointer select-none
                -mx-3
              `}
              style={{ zIndex: pill.z, rotate: pill.rotate }}
            >
              <span className={`font-hero font-black text-lg tracking-[0.06em] ${pill.textClass}`}>
                {pill.label}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Mobile: vertical stack */}
        <div className="flex md:hidden flex-col items-center gap-4">
          {pills.map((pill, i) => (
            <motion.div
              key={pill.label}
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={`
                flex items-center justify-center
                w-56 h-16
                ${pill.className}
                rounded-[60px]
              `}
            >
              <span className={`font-hero font-black text-base tracking-[0.06em] ${pill.textClass}`}>
                {pill.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Scrolling ticker */}
      <Marquee />
    </section>
  )
}
