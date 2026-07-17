import { motion } from 'framer-motion'

const infoCards = [
  { label: 'Location',           value: 'Kerala, India' },
  { label: 'Specialization',     value: 'Full Stack + AI/ML' },
  { label: 'Currently building', value: 'Personal brand + dev education platform' },
  { label: 'Open to',            value: 'Freelance · Startup collabs · Open source' },
  { label: 'Languages',          value: 'English · Malayalam · Hindi' },
]

export default function About() {
  return (
    <section id="about" aria-label="About Mohammed Arsh" className="bg-ink py-24 px-6 grid-bg-dark">
      <div className="max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-20 items-start">

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          >
            <p className="font-dm text-[10px] text-white/40 tracking-[0.4em] uppercase mb-6">/ About</p>

            <div className="flex items-end gap-4 mb-8">
              <span className="font-hero font-black text-[5rem] md:text-[7rem] text-white leading-none tracking-[-0.05em] opacity-10 select-none">
                04
              </span>
              <div className="mb-2">
                <span className="font-hero font-black text-[5rem] md:text-[7rem] text-blue leading-none tracking-[-0.05em]">+</span>
              </div>
              <div className="mb-4">
                <p className="font-dm text-[10px] text-white/30 uppercase tracking-[0.3em]">Years of</p>
                <p className="font-hero font-black text-2xl text-white tracking-[-0.02em]">Building</p>
              </div>
            </div>

            <h2 className="font-hero font-black text-4xl md:text-5xl lg:text-6xl text-white leading-[1.05] tracking-[-0.03em] mb-8" style={{ textWrap: 'balance' } as React.CSSProperties}>
              Building tech that<br />
              <span className="text-blue">feels simple.</span>
            </h2>

            <div className="space-y-4 text-white/60 font-dm text-lg leading-relaxed max-w-lg">
              <p>I'm a self-taught Full Stack and AI/ML Engineer from Kerala, India. What started as curiosity about how websites work turned into a full-on obsession with building things that matter.</p>
              <p>I specialize in making complex systems feel intuitive — whether that's a React frontend, a FastAPI backend, or an AI pipeline powered by LangChain.</p>
              <p>Currently building my personal brand and an education platform for developers. Always open to interesting problems and great people.</p>
            </div>

            <a
              href="#projects"
              data-cursor-hover
              className="inline-flex items-center gap-2 mt-8 px-6 py-3 bg-blue text-white font-dm font-semibold text-sm rounded-badge hover:bg-blue/80 active:scale-[0.97] transition-all duration-150"
            >
              View my work →
            </a>
          </motion.div>

          {/* Right: Info cards — clean, no tilt */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}
            className="flex flex-col gap-5 lg:pt-8"
          >
            <p className="font-dm text-[10px] text-white/40 uppercase tracking-[0.4em] mb-2">Quick facts</p>
            {infoCards.map((card) => (
              <div
                key={card.label}
                className="border-l-2 border-blue/30 pl-4 py-2 hover:border-blue transition-colors duration-200"
              >
                <p className="text-[10px] font-dm text-white/35 uppercase tracking-[0.3em] mb-1">{card.label}</p>
                <p className="text-sm font-dm text-white/70 font-medium">{card.value}</p>
              </div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  )
}
