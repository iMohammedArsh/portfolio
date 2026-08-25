import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import projectsData from '../data/projects.generated.json'
import type { ProjectData } from '../types/project'
import GitHubIcon from './ui/GitHubIcon'
import { DURATION, EASE, revealBlur, useTilt, viewportOnce } from '../lib/motion'

const projects = projectsData as ProjectData[]

const GITHUB_PROFILE_URL = 'https://github.com/iMohammedArsh'

function timeAgo(iso: string) {
  const days = Math.floor((Date.now() - new Date(iso).getTime()) / 86_400_000)
  if (days < 1) return 'today'
  if (days === 1) return '1 day ago'
  if (days < 30) return `${days} days ago`
  const months = Math.floor(days / 30)
  if (months < 12) return months === 1 ? '1 month ago' : `${months} months ago`
  const years = Math.floor(months / 12)
  return years === 1 ? '1 year ago' : `${years} years ago`
}

function ProjectCard({ project, index }: { project: ProjectData; index: number }) {
  const tilt = useTilt(5)
  return (
    <div
      data-cursor-hover
      data-cursor-label={project.homepage ? 'View live' : 'View code'}
      onMouseMove={tilt.onMouseMove}
      onMouseLeave={tilt.onMouseLeave}
      style={{ perspective: 1000 }}
      className="shrink-0 w-[82vw] sm:w-[420px]"
    >
      <motion.div
        style={{ rotateX: tilt.rotateX, rotateY: tilt.rotateY, transformStyle: 'preserve-3d' }}
        className="group relative flex flex-col h-full rounded-card border border-white/12 bg-white/[0.02] p-8 hover:border-white/30 hover:bg-white/[0.04] transition-colors duration-300"
      >
        <div className="flex items-center justify-between mb-6">
          <span className="font-sans text-[12px] text-white/30">0{index + 1}</span>
          <div className="flex items-center gap-3 text-white/35 font-sans text-[12px]">
            {project.language && <span>{project.language}</span>}
            {project.stars > 0 && <span>★ {project.stars}</span>}
          </div>
        </div>

        <h3 className="font-sans font-semibold text-2xl text-white mb-3 tracking-[-0.01em]">
          {project.name}
        </h3>
        <p className="font-sans text-white/50 text-[15px] leading-relaxed mb-6 flex-1">
          {project.description}
        </p>

        {project.topics.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {project.topics.map((t) => (
              <span key={t} className="px-2.5 py-1 text-[11px] font-sans rounded-badge border border-white/12 text-white/45">
                {t}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between pt-4 border-t border-white/10 mt-auto">
          <span className="font-sans text-[11px] text-white/35">
            Updated {timeAgo(project.updatedAt)}
          </span>
          <div className="flex items-center gap-4">
            {project.homepage && (
              <a
                href={project.homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-[11px] text-white/50 hover:text-white transition-colors"
              >
                Live ↗
              </a>
            )}
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/40 hover:text-white transition-colors"
            >
              <GitHubIcon size={14} />
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [trackWidth, setTrackWidth] = useState(0)
  const [viewportH, setViewportH] = useState(0)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const measure = () => {
      if (trackRef.current) {
        setTrackWidth(Math.max(trackRef.current.scrollWidth - window.innerWidth, 0))
      }
      setViewportH(window.innerHeight)
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })
  const x = useTransform(scrollYProgress, [0, 1], [0, -trackWidth])

  useEffect(() => {
    return x.on('change', () => {
      if (trackWidth === 0 || projects.length === 0) return
      const progress = Math.min(Math.max(-x.get() / trackWidth, 0), 1)
      setActiveIndex(Math.round(progress * (projects.length - 1)))
    })
  }, [x, trackWidth])

  const canScroll = trackWidth > 0
  const sectionHeight = canScroll ? viewportH + trackWidth : undefined

  return (
    <section
      ref={sectionRef}
      id="projects"
      aria-label="Projects"
      className="relative bg-ink"
      style={sectionHeight ? { height: sectionHeight } : undefined}
    >
      <div className={canScroll ? 'sticky top-0 h-screen overflow-hidden flex flex-col justify-center' : ''}>
        <div className="px-6 md:px-10 lg:pl-36 max-w-[1400px] mx-auto w-full">
          <motion.div
            variants={revealBlur}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12"
          >
            <div>
              <h2 className="font-sans font-semibold text-4xl md:text-6xl text-white tracking-[-0.02em]">
                What I've shipped.
              </h2>
              <p className="font-sans text-white/40 text-[15px] mt-4 max-w-md">
                Pulled straight from GitHub at build time — this list updates itself, no manual edits.
              </p>
            </div>
            <div className="flex items-center gap-6 shrink-0">
              {projects.length > 0 && (
                <span className="font-sans text-[13px] text-white/30">
                  {String(activeIndex + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
                </span>
              )}
              <a
                href={GITHUB_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-hover
                className="inline-flex items-center gap-2 font-sans text-[13px] text-white border-b border-white/30 pb-1 hover:border-white transition-colors duration-200"
              >
                <GitHubIcon size={13} />
                GitHub
              </a>
            </div>
          </motion.div>
        </div>

        {projects.length === 0 ? (
          <div className="mx-6 md:mx-10 lg:ml-36 text-center py-16 rounded-card border border-white/12">
            <p className="font-sans text-white/50 text-sm mb-4">Projects are being set up — check GitHub directly.</p>
            <a
              href={GITHUB_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-hover
              className="font-sans text-[13px] text-white underline underline-offset-4"
            >
              View profile →
            </a>
          </div>
        ) : (
          <motion.div
            ref={trackRef}
            style={{ x }}
            className="flex gap-6 px-6 md:px-10 lg:pl-36 pr-10"
          >
            {projects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </motion.div>
        )}

        {canScroll && (
          <div className="px-6 md:px-10 lg:pl-36 max-w-[1400px] mx-auto w-full mt-8">
            <div className="relative h-px w-full max-w-xs bg-white/10 overflow-hidden">
              <motion.div className="absolute inset-y-0 left-0 bg-white" style={{ width: `${((activeIndex + 1) / projects.length) * 100}%` }} transition={{ duration: DURATION.fast, ease: EASE }} />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
