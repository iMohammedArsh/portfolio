import { motion } from 'framer-motion'

const projects = [
  {
    tag: 'Full Stack',
    name: 'Dev Education Platform',
    desc: 'A structured learning platform for developers — covering React, APIs, and AI-powered tooling from the ground up.',
    tech: ['React', 'Next.js', 'FastAPI', 'PostgreSQL'],
    gradient: 'from-[#1A6BFF] via-[#6B21E8] to-[#0D0D0D]',
    status: 'In development',
    statusColor: 'text-blue-600 bg-blue-50 border-blue-200',
    github: 'https://github.com/iMohammedArsh',
    live: null,
  },
  {
    tag: 'AI / ML',
    name: 'AI Writing Assistant',
    desc: 'LangChain-powered tool that helps developers write docs, READMEs, and commit messages — fast.',
    tech: ['Python', 'LangChain', 'OpenAI API', 'FastAPI'],
    gradient: 'from-[#6B21E8] via-[#1A6BFF] to-[#0a0a2e]',
    status: 'Prototyping',
    statusColor: 'text-violet-600 bg-violet-50 border-violet-200',
    github: 'https://github.com/iMohammedArsh',
    live: null,
  },
  {
    tag: 'Open Source',
    name: 'UI Component Library',
    desc: 'Accessible, zero-dependency React components built for speed, flexibility, and dark-mode-first design.',
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'Storybook'],
    gradient: 'from-[#0D0D0D] via-[#1A6BFF] to-[#6B21E8]',
    status: 'Planning',
    statusColor: 'text-amber-600 bg-amber-50 border-amber-200',
    github: 'https://github.com/iMohammedArsh',
    live: null,
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] } },
}

export default function Projects() {
  return (
    <section id="projects" aria-label="Projects" className="py-16 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12"
        >
          <div>
            <p className="text-xs font-dm text-muted tracking-[0.2em] uppercase mb-4">/ Projects</p>
            <h2 className="font-hero font-black text-4xl md:text-5xl text-ink" style={{ letterSpacing: '-0.02em' }}>
              What's being built
            </h2>
          </div>
          <a
            href="https://github.com/iMohammedArsh"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor-hover
            className="inline-flex items-center gap-2 px-5 py-2.5 border border-[#E5E3DD] rounded-badge font-dm text-sm text-muted hover:border-ink hover:text-ink transition-all duration-200 shrink-0"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
            </svg>
            View GitHub
          </a>
        </motion.div>

        {/* Project cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {projects.map((project) => (
            <motion.div
              key={project.name}
              variants={itemVariants}
              data-cursor-hover
              className="group relative bg-white/60 border border-[#E5E3DD] rounded-card overflow-hidden hover:-translate-y-1 transition-all duration-300 hover:shadow-card-hover"
            >
              {/* Gradient thumbnail */}
              <div className={`h-44 bg-gradient-to-br ${project.gradient} relative overflow-hidden`}>
                {/* Subtle grid overlay */}
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                    backgroundSize: '24px 24px',
                  }}
                />
                {/* Tag badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-2.5 py-1 text-xs font-dm text-white/90 bg-white/10 backdrop-blur-sm border border-white/20 rounded-badge">
                    {project.tag}
                  </span>
                </div>
                {/* Status badge */}
                <div className="absolute top-4 right-4">
                  <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-badge border text-xs font-dm ${project.statusColor}`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                    {project.status}
                  </span>
                </div>
              </div>

              {/* Card body */}
              <div className="p-5">
                <h3 className="font-hero font-black text-xl text-ink mb-2" style={{ letterSpacing: '-0.01em' }}>
                  {project.name}
                </h3>
                <p className="font-dm text-sm text-muted leading-relaxed mb-4">
                  {project.desc}
                </p>

                {/* Tech pills */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.tech.map((t) => (
                    <span key={t} className="px-2.5 py-0.5 text-xs font-dm border border-[#E5E3DD] rounded-badge text-muted">
                      {t}
                    </span>
                  ))}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-[#E5E3DD]">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-dm text-muted hover:text-ink transition-colors"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                    </svg>
                    Source
                  </a>

                  {project.live ? (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-dm text-[#1A6BFF] hover:underline underline-offset-4 transition-all"
                    >
                      Live →
                    </a>
                  ) : (
                    <span className="text-xs font-dm text-muted">Coming soon</span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center text-sm font-dm text-muted mt-10"
        >
          More coming — follow along on{' '}
          <a
            href="https://github.com/iMohammedArsh"
            target="_blank"
            rel="noopener noreferrer"
            className="text-ink hover:text-[#1A6BFF] underline underline-offset-4 transition-colors"
          >
            GitHub
          </a>
        </motion.p>

      </div>
    </section>
  )
}
