import { motion } from 'framer-motion'
import Marquee from './ui/Marquee'
import { fadeUp, revealBlur, staggerContainer, viewportOnce } from '../lib/motion'

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

const categories = Array.from(new Set(skills.map((s) => s.category)))

const marqueeItems = [
  'React', 'Next.js', 'TypeScript', 'Python', 'FastAPI',
  'LangChain', 'MongoDB', 'PostgreSQL', 'Docker', 'Git', 'Vercel', 'Node.js',
]

export default function Skills() {
  return (
    <section id="skills" aria-label="Technical Skills" className="bg-paper py-28 md:py-36 px-6 md:px-10 lg:pl-36">
      <div className="max-w-[1320px] mx-auto">

        <motion.h2
          variants={revealBlur}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="font-sans font-semibold text-4xl md:text-6xl text-ink tracking-[-0.02em] mb-16 md:mb-20 max-w-2xl"
        >
          What I use.
        </motion.h2>

        <motion.div
          variants={staggerContainer(0.06)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-2 md:grid-cols-6 gap-x-6 gap-y-12"
        >
          {categories.map((category) => (
            <motion.div key={category} variants={fadeUp}>
              <p className="font-sans text-[12px] text-ink/35 mb-4 pb-3 border-b border-ink/10">
                {category}
              </p>
              <ul className="space-y-3">
                {skills.filter((s) => s.category === category).map((s) => (
                  <li key={s.label} className="group relative block w-fit font-sans font-medium text-ink text-[16px] cursor-default">
                    {s.label}
                    <span className="absolute left-0 -bottom-0.5 h-px w-0 bg-ink transition-all duration-300 group-hover:w-full" />
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        <Marquee
          items={marqueeItems.map((item) => (
            <>
              {item} <span className="text-ink/20 mx-3">·</span>
            </>
          ))}
          className="mt-24 border-t border-ink/10 pt-7"
          itemClassName="font-sans font-medium text-ink/30 text-sm tracking-wide px-4"
        />
      </div>
    </section>
  )
}
