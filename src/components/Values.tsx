import { motion } from 'framer-motion'
import { revealBlur, staggerContainer, viewportOnce } from '../lib/motion'

const principles = [
  {
    num: '01',
    title: 'Architecture first',
    description: "I'd rather over-plan a system than patch it forever. Most of my slow weeks are the reason later weeks are fast.",
  },
  {
    num: '02',
    title: 'AI where it earns its place',
    description: 'Language models go in when they solve something real — not as a checkbox on a feature list.',
  },
  {
    num: '03',
    title: 'Fast, on purpose',
    description: 'Every extra millisecond is a decision I made, usually by accident. I try not to make it twice.',
  },
  {
    num: '04',
    title: 'Finished, not just functional',
    description: 'Clean APIs, considered edge cases, no loose ends left for future-me to deal with.',
  },
]

export default function Values() {
  return (
    <section id="values" aria-label="How I work" className="bg-paper px-6 md:px-10 lg:pl-36 py-28 md:py-36">
      <div className="max-w-[1320px] mx-auto">
        <motion.h2
          variants={revealBlur}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="font-sans font-semibold text-4xl md:text-6xl text-ink tracking-[-0.02em] mb-16 md:mb-20 max-w-2xl"
        >
          Principles, not vibes.
        </motion.h2>

        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="border-t border-ink/10"
        >
          {principles.map((p) => (
            <motion.div
              key={p.num}
              variants={revealBlur}
              className="group grid grid-cols-1 md:grid-cols-[100px_1fr_1.3fr] gap-x-8 gap-y-3 py-9 md:py-11 border-b border-ink/10 items-baseline"
            >
              <span className="font-sans font-semibold text-lg text-ink/25 group-hover:text-ink transition-colors duration-300">
                {p.num}
              </span>
              <h3 className="font-sans font-semibold text-2xl md:text-3xl text-ink tracking-[-0.01em]">
                {p.title}
              </h3>
              <p className="font-sans text-ink/55 text-[17px] leading-relaxed max-w-lg">
                {p.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
