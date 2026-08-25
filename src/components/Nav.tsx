import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { EASE, useMagnetic } from '../lib/motion'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Work', href: '#projects' },
  { label: 'Experience', href: '#experience' },
]

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const ctaMag = useMagnetic(0.25)

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      <header className="fixed top-5 inset-x-0 z-50 flex justify-center px-6">
        <nav className="flex items-center gap-1 rounded-badge border border-white/10 bg-ink/75 backdrop-blur-xl pl-5 pr-1.5 py-1.5 shadow-lift-dark">
          <a href="#hero" data-cursor-hover className="font-sans font-semibold text-[15px] text-white tracking-tight mr-5">
            Mohammed Arsh
          </a>

          <div className="hidden md:flex items-center gap-6 mr-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                data-cursor-hover
                className="font-sans text-[13px] text-white/55 hover:text-white transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>

          <motion.a
            href="#contact"
            data-cursor-hover
            style={{ x: ctaMag.x, y: ctaMag.y }}
            onMouseMove={ctaMag.onMouseMove}
            onMouseLeave={ctaMag.onMouseLeave}
            className="hidden md:inline-flex items-center px-4 py-2 rounded-badge bg-white text-ink font-sans text-[13px] font-medium hover:bg-white/90 transition-colors duration-200"
          >
            Contact
          </motion.a>

          <button
            className="md:hidden flex flex-col gap-1.5 p-2.5"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            data-cursor-hover
          >
            <span className="block w-4 h-px bg-white" />
            <span className="block w-4 h-px bg-white" />
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="fixed inset-0 z-[60] bg-ink flex flex-col"
          >
            <div className="flex items-center justify-between px-6 py-6">
              <span className="font-sans font-semibold text-[15px] text-white">Mohammed Arsh</span>
              <button
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                data-cursor-hover
                className="p-2 text-white"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <div className="flex-1 flex flex-col justify-center px-8 gap-2">
              {[...navLinks, { label: 'Contact', href: '#contact' }].map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.08 + i * 0.05, ease: EASE }}
                  className="font-sans font-semibold text-4xl text-white tracking-tight py-2"
                >
                  {link.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
