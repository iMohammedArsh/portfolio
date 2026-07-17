import { motion } from 'framer-motion'

const projects = [
  {
    tag: 'Full Stack',
    tagColor: 'bg-blue/10 text-blue border-blue/20',
    name: 'Dev Education Platform',
    desc: 'A structured learning platform for developers — covering React, APIs, and AI-powered tooling from the ground up.',
    tech: ['React', 'Next.js', 'FastAPI', 'PostgreSQL'],
    status: 'In development',
    statusDot: 'bg-blue',
    accent: 'from-blue/30 to-violet/20',
    github: 'https://github.com/iMohammedArsh',
  },
  {
    tag: 'AI / ML',
    tagColor: 'bg-violet/10 text-violet border-violet/20',
    name: 'AI Writing Assistant',
    desc: 'LangChain-powered tool that helps developers write docs, READMEs, and commit messages — fast.',
    tech: ['Python', 'LangChain', 'OpenAI API', 'FastAPI'],
    status: 'Prototyping',
    statusDot: 'bg-violet',
    accent: 'from-violet/30 to-blue/20',
    github: 'https://github.com/iMohammedArsh',
  },
  {
    tag: 'Open Source',
    tagColor: 'bg-white/6 text-white/50 border-white/10',
    name: 'UI Component Library',
    desc: 'Accessible, zero-dependency React components built for speed, flexibility, and dark-mode-first design.',
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'Storybook'],
    status: 'Planning',
    statusDot: 'bg-white/30',
    accent: 'from-white/10 to-blue/10',
    github: 'https://github.com/iMohammedArsh',
  },
]

export default function Projects() {
  return (
    <section id="projects" aria-label="Projects" className="bg-ink py-24 px-6">
      <div className="max-w-[1280px] mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-16"
        >
          <div>
            <p className="font-dm text-[10px] text-white/25 tracking-[0.4em] uppercase mb-4">/ Selected Work</p>
            <h2 className="font-hero font-black text-5xl md:text-7xl text-white tracking-[-0.03em]">
              Projects<span className="text-blue">.</span>
            </h2>
          </div>
          <a
            href="https://github.com/iMohammedArsh"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor-hover
            className="inline-flex items-center gap-2 px-5 py-2.5 border border-white/10 rounded-badge font-dm text-sm text-white/40 hover:border-white/25 hover:text-white/70 transition-all duration-200 shrink-0"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
            </svg>
            View GitHub
          </a>
        </motion.div>

        {/* Project rows — editorial horizontal cards */}
        <div className="flex flex-col gap-0">
          {projects.map((project, i) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              data-cursor-hover
              className="group relative grid grid-cols-1 md:grid-cols-[280px_1fr] gap-0 border-t border-white/6 py-8 hover:border-blue/30 transition-colors duration-300"
            >
              {/* Left: gradient panel */}
              <div className={`relative h-40 md:h-full md:min-h-[140px] rounded-card overflow-hidden bg-gradient-to-br ${project.accent} mr-0 md:mr-8`}>
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)',
                    backgroundSize: '20px 20px',
                  }}
                />
                {/* Tag */}
                <div className="absolute top-4 left-4">
                  <span className={`px-2.5 py-1 text-[10px] font-dm font-semibold border rounded-badge ${project.tagColor}`}>
                    {project.tag}
                  </span>
                </div>
                {/* Status dot */}
                <div className="absolute bottom-4 right-4 flex items-center gap-1.5">
                  <span className={`w-1.5 h-1.5 rounded-full ${project.statusDot} animate-pulse`} />
                  <span className="font-dm text-[10px] text-white/40">{project.status}</span>
                </div>
              </div>

              {/* Right: text content */}
              <div className="flex flex-col justify-center pt-4 md:pt-0">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-dm text-[10px] text-white/20 tracking-[0.3em] uppercase">0{i + 1}</span>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/20 hover:text-blue transition-colors"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>
                </div>

                <h3 className="font-hero font-black text-2xl md:text-3xl text-white tracking-[-0.02em] mb-3 group-hover:text-blue transition-colors duration-300">
                  {project.name}
                </h3>
                <p className="font-dm text-white/40 text-sm leading-relaxed mb-5 max-w-lg">
                  {project.desc}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span key={t} className="px-2.5 py-1 text-[11px] font-dm border border-white/8 rounded-badge text-white/30">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Blue left bar on hover */}
              <div className="absolute left-0 top-8 bottom-8 w-px bg-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}

          <div className="border-t border-white/6 pt-8">
            <p className="text-sm font-dm text-white/20">
              More coming — follow on{' '}
              <a
                href="https://github.com/iMohammedArsh"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue hover:underline underline-offset-4"
              >
                GitHub
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
