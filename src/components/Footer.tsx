const socials = [
  { name: 'GitHub', url: 'https://github.com/iMohammedArsh' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/arshwusla' },
  { name: 'Instagram', url: 'https://www.instagram.com/mohammedarsh.codewith/' },
]

export default function Footer() {
  return (
    <footer className="bg-[#0D0D0D] border-t border-[#1a1a1a] py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-dm text-sm text-[#444]">
          Mohammed Arsh © 2026 · Kerala, India · Crafted with React + passion
        </p>
        <div className="flex items-center gap-6">
          {socials.map((s) => (
            <a
              key={s.name}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-hover
              className="font-dm text-sm text-[#444] hover:text-[#F5F4F0] transition-colors duration-200"
            >
              {s.name}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
