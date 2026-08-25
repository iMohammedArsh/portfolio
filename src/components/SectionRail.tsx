import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const sections = [
  { id: 'hero', label: 'Intro' },
  { id: 'story', label: 'Approach' },
  { id: 'values', label: 'Principles' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Work' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
]

export default function SectionRail() {
  const [activeId, setActiveId] = useState(sections[0].id)

  useEffect(() => {
    const targets = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null)

    if (targets.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]) setActiveId(visible[0].target.id)
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
    )

    targets.forEach((t) => observer.observe(t))
    return () => observer.disconnect()
  }, [])

  return (
    <div
      className="hidden lg:flex fixed left-6 top-1/2 -translate-y-1/2 z-40 flex-col items-center gap-1 rounded-badge border border-white/10 bg-ink/75 backdrop-blur-xl py-4 px-2.5 shadow-lift-dark"
      aria-hidden="true"
    >
      {sections.map((s) => {
        const active = s.id === activeId
        return (
          <a
            key={s.id}
            href={`#${s.id}`}
            data-cursor-hover
            className="group relative flex items-center justify-center py-1.5"
          >
            <span
              className={`block rounded-full transition-all duration-300 ${
                active ? 'w-1.5 h-1.5 bg-white' : 'w-1 h-1 bg-white/30 group-hover:bg-white/60'
              }`}
            />
            <motion.span
              initial={false}
              animate={{ opacity: active ? 1 : 0, x: active ? 0 : -6 }}
              transition={{ duration: 0.25 }}
              className="pointer-events-none absolute left-5 whitespace-nowrap font-sans text-[11px] text-white/80"
            >
              {s.label}
            </motion.span>
          </a>
        )
      })}
    </div>
  )
}
