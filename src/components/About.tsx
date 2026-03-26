import { useRef } from 'react'
import { motion } from 'framer-motion'

const infoCards = [
  { icon: '📍', label: 'Location', value: 'Kerala, India' },
  { icon: '⚡', label: 'Specialization', value: 'Full Stack + AI/ML' },
  { icon: '🏗️', label: 'Currently building', value: 'Personal brand + dev education platform' },
  { icon: '🤝', label: 'Open to', value: 'Freelance · Startup collabs · Open source' },
  { icon: '🗣️', label: 'Languages', value: 'English · Malayalam · Hindi' },
]

function TiltCard({ icon, label, value }: { icon: string; label: string; value: string }) {
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = ((y - centerY) / centerY) * -8
    const rotateY = ((x - centerX) / centerX) * 8
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`
  }

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)'
    }
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-cursor-hover
      className="bg-white/60 border border-[#E5E3DD] rounded-[12px] p-4 transition-transform duration-200 ease-out"
      style={{ willChange: 'transform' }}
    >
      <div className="flex items-start gap-3">
        <span className="text-xl">{icon}</span>
        <div>
          <p className="text-xs font-dm text-[#6B7280] uppercase tracking-wider mb-0.5">{label}</p>
          <p className="text-sm font-dm text-[#0D0D0D] font-medium">{value}</p>
        </div>
      </div>
    </div>
  )
}

export default function About() {
  return (
    <section id="about" aria-label="About Mohammed Arsh" className="py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-start">
          {/* Left — 3 cols */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs font-dm text-[#6B7280] tracking-[0.2em] uppercase mb-4">/ About</p>
            <h2 className="font-hero font-black text-4xl md:text-5xl text-[#0D0D0D] leading-tight mb-8" style={{ letterSpacing: '-0.02em' }}>
              Building tech that feels simple.
            </h2>
            <div className="space-y-4 text-[#6B7280] font-dm text-lg leading-relaxed">
              <p>I'm a self-taught Full Stack and AI/ML Engineer from Kerala, India. What started as curiosity about how websites work turned into a full-on obsession with building things that matter.</p>
              <p>I specialize in making complex systems feel intuitive — whether that's a React frontend, a FastAPI backend, or an AI pipeline powered by LangChain. I believe great engineering is invisible.</p>
              <p>Currently building my personal brand and working on an education platform for developers. Always open to interesting problems and great people.</p>
            </div>
            <a
              href="#projects"
              className="inline-flex items-center gap-1 mt-8 text-[#1A6BFF] font-dm font-medium hover:underline underline-offset-4 transition-all"
              data-cursor-hover
            >
              View my work →
            </a>
          </motion.div>

          {/* Right — 2 cols */}
          <motion.div
            className="lg:col-span-2 flex flex-col gap-3"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {infoCards.map((card) => (
              <TiltCard key={card.label} {...card} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
