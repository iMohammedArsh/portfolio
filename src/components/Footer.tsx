const socials = [
  { name: 'GitHub',    url: 'https://github.com/iMohammedArsh' },
  { name: 'LinkedIn',  url: 'https://www.linkedin.com/in/arshwusla' },
  { name: 'Instagram', url: 'https://www.instagram.com/mohammedarsh.codewith/' },
]

export default function Footer() {
  return (
    <footer className="bg-ink border-t border-white/5 py-8 px-6">
      <div className="max-w-[1280px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-dm text-sm text-white/35">
          Mohammed Arsh © 2026 · Kerala, India
        </p>
        <div className="flex items-center gap-6">
          {socials.map((s) => (
            <a
              key={s.name}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-hover
              className="font-dm text-sm text-white/35 hover:text-white/80 transition-colors duration-200"
            >
              {s.name}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
