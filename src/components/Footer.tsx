import { SOCIALS } from './ui/SocialLinks'

export default function Footer() {
  return (
    <footer className="bg-ink border-t border-white/10 py-8 px-6 md:px-10 lg:pl-36">
      <div className="max-w-[1320px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-sans text-[13px] text-white/40">
          Mohammed Arsh © 2026 · Kerala, India
        </p>
        <div className="flex items-center gap-6">
          {SOCIALS.map((s) => (
            <a
              key={s.name}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-hover
              className="flex items-center gap-2 font-sans text-[13px] text-white/40 hover:text-white transition-colors duration-200"
            >
              <span className="text-white/30">{s.icon}</span>
              {s.name}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
