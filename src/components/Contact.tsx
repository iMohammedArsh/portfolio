import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function LetsTalkBanner() {
  const items = Array.from({ length: 8 }, (_, i) => i)
  return (
    <div
      className="overflow-hidden border-t border-white/6 py-6 mt-20"
      aria-hidden="true"
    >
      <div className="flex" style={{ animation: 'marquee 18s linear infinite' }}>
        {items.map((i) => (
          <span
            key={i}
            className="font-hero font-black italic text-3xl md:text-4xl text-white/80 whitespace-nowrap px-10 shrink-0"
            style={{ letterSpacing: '-0.01em' }}
          >
            Let's Talk
          </span>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-inner { animation: none !important; }
        }
      `}</style>
    </div>
  )
}

const inquiryTypes = ['Freelance', 'Collaboration', 'Open Source', 'Just saying hi']

const socials = [
  {
    name: 'GitHub',
    handle: 'iMohammedArsh',
    url: 'https://github.com/iMohammedArsh',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    handle: 'arshwusla',
    url: 'https://www.linkedin.com/in/arshwusla',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    name: 'Instagram',
    handle: 'mohammedarsh.codewith',
    url: 'https://www.instagram.com/mohammedarsh.codewith/',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
      </svg>
    ),
  },
]

export default function Contact() {
  const [name, setName]         = useState('')
  const [email, setEmail]       = useState('')
  const [message, setMessage]   = useState('')
  const [selected, setSelected] = useState<string[]>([])
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors]     = useState<{ name?: string; email?: string; message?: string }>({})

  const toggleInquiry = (type: string) => {
    setSelected((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    )
  }

  const validate = () => {
    const e: typeof errors = {}
    if (!name.trim())    e.name    = 'Name is required'
    if (!email.trim())   e.email   = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(email)) e.email = 'Enter a valid email'
    if (!message.trim()) e.message = 'Message is required'
    return e
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setErrors({})
    setSubmitted(true)
  }

  const inputClass =
    'w-full px-4 py-3 rounded-card border bg-white/[0.04] font-dm text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-blue/60 focus:ring-1 focus:ring-blue/20 transition-colors duration-200'

  return (
    <section id="contact" aria-label="Contact Mohammed Arsh" className="bg-ink pb-0">
      <div className="max-w-6xl mx-auto px-6 pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left — form */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs font-dm text-white/40 tracking-[0.2em] uppercase mb-4">/ Contact</p>
            <h2 className="font-hero font-black text-4xl md:text-5xl text-white leading-tight mb-6" style={{ letterSpacing: '-0.02em' }}>
              Let's build something.
            </h2>
            <p className="font-dm text-white/50 text-lg mb-8 leading-relaxed">
              Have a project in mind? Want to collaborate? Or just want to say hi?
            </p>

            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="thanks"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="p-8 bg-white/[0.04] border border-white/8 rounded-card text-center"
                >
                  <div className="w-12 h-12 rounded-full bg-blue/10 border border-blue/20 flex items-center justify-center mx-auto mb-4">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M4 10l4.5 4.5L16 6" stroke="#1A6BFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <p className="font-hero font-black text-xl text-white mb-1">Message sent</p>
                  <p className="font-dm text-sm text-white/50">I'll get back to you soon.</p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  noValidate
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <input
                        type="text"
                        placeholder="Your name"
                        value={name}
                        onChange={(e) => { setName(e.target.value); setErrors((p) => ({ ...p, name: undefined })) }}
                        className={`${inputClass} ${errors.name ? 'border-red-500/50' : 'border-white/8'}`}
                        aria-invalid={!!errors.name}
                      />
                      {errors.name && <p className="mt-1 text-xs text-red-400 font-dm">{errors.name}</p>}
                    </div>
                    <div>
                      <input
                        type="email"
                        placeholder="Your email"
                        value={email}
                        onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: undefined })) }}
                        className={`${inputClass} ${errors.email ? 'border-red-500/50' : 'border-white/8'}`}
                        aria-invalid={!!errors.email}
                      />
                      {errors.email && <p className="mt-1 text-xs text-red-400 font-dm">{errors.email}</p>}
                    </div>
                  </div>

                  <div>
                    <p className="font-dm text-xs text-white/40 uppercase tracking-[0.15em] mb-2">Inquiry type</p>
                    <div className="flex flex-wrap gap-2">
                      {inquiryTypes.map((type) => {
                        const active = selected.includes(type)
                        return (
                          <button
                            key={type}
                            type="button"
                            onClick={() => toggleInquiry(type)}
                            className={`px-3 py-1.5 rounded-badge border text-xs font-dm transition-all duration-150 active:scale-[0.97] ${
                              active
                                ? 'bg-blue text-white border-blue'
                                : 'bg-transparent text-white/50 border-white/10 hover:border-white/30 hover:text-white'
                            }`}
                          >
                            {type}
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  <div>
                    <textarea
                      placeholder="What's on your mind?"
                      value={message}
                      onChange={(e) => { setMessage(e.target.value); setErrors((p) => ({ ...p, message: undefined })) }}
                      rows={4}
                      className={`${inputClass} resize-none ${errors.message ? 'border-red-500/50' : 'border-white/8'}`}
                      aria-invalid={!!errors.message}
                    />
                    {errors.message && <p className="mt-1 text-xs text-red-400 font-dm">{errors.message}</p>}
                  </div>

                  <button
                    type="submit"
                    data-cursor-hover
                    className="inline-flex items-center gap-2 px-6 py-3 bg-blue text-white rounded-badge font-dm font-medium text-sm hover:bg-blue/80 active:scale-[0.97] transition-all duration-150"
                  >
                    Send message →
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Right — social cards (no tilt) */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col gap-3 lg:pt-28"
          >
            <p className="font-dm text-xs text-white/40 uppercase tracking-[0.15em] mb-2">Or find me at</p>
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-hover
                className="flex items-center justify-between p-4 bg-white/[0.03] border border-white/8 rounded-card hover:border-blue/30 hover:-translate-y-0.5 transition-all duration-200 group"
              >
                <div className="flex items-center gap-3">
                  <span className="text-white/30 group-hover:text-blue transition-colors">{social.icon}</span>
                  <div>
                    <p className="font-dm font-medium text-white text-sm">{social.name}</p>
                    <p className="font-dm text-white/30 text-xs">{social.handle}</p>
                  </div>
                </div>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-white/20 group-hover:text-blue group-hover:translate-x-1 transition-all duration-200">
                  <path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            ))}

            <div className="mt-4 p-4 bg-white/[0.03] border border-white/8 rounded-card">
              <p className="font-dm text-xs text-white/40 mb-1">Email directly</p>
              <a
                href="mailto:wuslateam@gmail.com"
                data-cursor-hover
                className="font-dm font-medium text-white text-sm hover:text-blue transition-colors duration-200"
              >
                wuslateam@gmail.com →
              </a>
            </div>
          </motion.div>

        </div>
      </div>

      <LetsTalkBanner />
    </section>
  )
}
