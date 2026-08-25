import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Marquee from './ui/Marquee'
import { SOCIALS } from './ui/SocialLinks'
import { revealBlur, viewportOnce } from '../lib/motion'

const FORMSPREE_ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT as string | undefined

const inquiryTypes = ['Freelance', 'Collaboration', 'Open Source', 'Just saying hi']

type Status = 'idle' | 'submitting' | 'sent' | 'error'

export default function Contact() {
  const [name, setName]         = useState('')
  const [email, setEmail]       = useState('')
  const [message, setMessage]   = useState('')
  const [selected, setSelected] = useState<string[]>([])
  const [status, setStatus]     = useState<Status>('idle')
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setErrors({})

    if (!FORMSPREE_ENDPOINT) {
      setStatus('error')
      return
    }

    setStatus('submitting')
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message, inquiryTypes: selected }),
      })
      if (!res.ok) throw new Error('Formspree request failed')
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  const inputClass =
    'w-full px-0 py-3 bg-transparent border-b font-sans text-[15px] text-white placeholder:text-white/30 focus:outline-none focus:border-white transition-colors duration-200'

  return (
    <section id="contact" aria-label="Contact Mohammed Arsh" className="bg-ink pb-0">
      <div className="max-w-6xl mx-auto px-6 md:px-10 lg:pl-36 pt-28 md:pt-36">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          <motion.div
            variants={revealBlur}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <h2 className="font-sans font-semibold text-4xl md:text-6xl text-white leading-tight tracking-[-0.02em] mb-6">
              Let's build something.
            </h2>
            <p className="font-sans text-white/50 text-lg mb-10 leading-relaxed">
              Have a project in mind? Want to collaborate? Or just want to say hi?
            </p>

            <AnimatePresence mode="wait">
              {status === 'sent' ? (
                <motion.div
                  key="thanks"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="py-8"
                >
                  <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center mb-4">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M4 10l4.5 4.5L16 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <p className="font-sans font-semibold text-xl text-white mb-1">Message sent</p>
                  <p className="font-sans text-sm text-white/50">I'll get back to you soon.</p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  noValidate
                  className="space-y-7"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-7">
                    <div>
                      <input
                        type="text"
                        placeholder="Your name"
                        value={name}
                        onChange={(e) => { setName(e.target.value); setErrors((p) => ({ ...p, name: undefined })) }}
                        className={`${inputClass} ${errors.name ? 'border-red-400/60' : 'border-white/15'}`}
                        aria-invalid={!!errors.name}
                      />
                      {errors.name && <p className="mt-1.5 text-xs text-red-400 font-sans">{errors.name}</p>}
                    </div>
                    <div>
                      <input
                        type="email"
                        placeholder="Your email"
                        value={email}
                        onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: undefined })) }}
                        className={`${inputClass} ${errors.email ? 'border-red-400/60' : 'border-white/15'}`}
                        aria-invalid={!!errors.email}
                      />
                      {errors.email && <p className="mt-1.5 text-xs text-red-400 font-sans">{errors.email}</p>}
                    </div>
                  </div>

                  <div>
                    <p className="font-sans text-[13px] text-white/40 mb-3">Inquiry type</p>
                    <div className="flex flex-wrap gap-2">
                      {inquiryTypes.map((type) => {
                        const active = selected.includes(type)
                        return (
                          <button
                            key={type}
                            type="button"
                            onClick={() => toggleInquiry(type)}
                            data-cursor-hover
                            className={`relative px-3.5 py-1.5 rounded-badge border text-[13px] font-sans transition-colors duration-150 active:scale-[0.97] ${
                              active
                                ? 'bg-white text-ink border-white'
                                : 'bg-transparent text-white/55 border-white/15 hover:border-white/40 hover:text-white'
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
                      rows={3}
                      className={`${inputClass} resize-none ${errors.message ? 'border-red-400/60' : 'border-white/15'}`}
                      aria-invalid={!!errors.message}
                    />
                    {errors.message && <p className="mt-1.5 text-xs text-red-400 font-sans">{errors.message}</p>}
                  </div>

                  {status === 'error' && (
                    <p className="text-xs text-red-400 font-sans">
                      Something went wrong sending that — email me directly at{' '}
                      <a href="mailto:wuslateam@gmail.com" className="underline underline-offset-2">wuslateam@gmail.com</a> instead.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    data-cursor-hover
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-badge bg-white text-ink font-sans text-[14px] font-medium hover:bg-white/90 transition-colors duration-200 disabled:opacity-60 disabled:pointer-events-none"
                  >
                    {status === 'submitting' ? 'Sending…' : 'Send message →'}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="divide-y divide-white/10 border-y border-white/10 lg:mt-3"
          >
            {SOCIALS.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-hover
                className="flex items-center justify-between py-5 group"
              >
                <div className="flex items-center gap-3">
                  <span className="text-white/40 group-hover:text-white transition-colors">{social.icon}</span>
                  <div>
                    <p className="font-sans font-medium text-white text-[15px]">{social.name}</p>
                    <p className="font-sans text-white/35 text-[13px]">{social.handle}</p>
                  </div>
                </div>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-white/25 group-hover:text-white group-hover:translate-x-1 transition-all duration-200">
                  <path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            ))}

            <div className="py-5">
              <p className="font-sans text-[12px] text-white/40 mb-1">Email directly</p>
              <a
                href="mailto:wuslateam@gmail.com"
                data-cursor-hover
                className="font-sans font-medium text-white text-[15px] hover:text-white/70 transition-colors duration-200"
              >
                wuslateam@gmail.com →
              </a>
            </div>
          </motion.div>

        </div>
      </div>

      <Marquee
        items={Array.from({ length: 8 }, () => "Let's talk")}
        className="border-t border-white/10 py-7 mt-24"
        itemClassName="font-sans font-semibold text-3xl md:text-4xl text-white/60 whitespace-nowrap px-10 shrink-0"
        speed={0.03}
      />
    </section>
  )
}
