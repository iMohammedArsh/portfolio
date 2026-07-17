import { useRef } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'

const VIDEO_SRC =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4'

const MOMENTS = [
  {
    num: '01',
    headline: 'I Build Systems\nThat Think.',
    sub: 'Full-stack engineering with intelligence wired in from day one.',
  },
  {
    num: '02',
    headline: 'React to Python —\nEnd-to-End.',
    sub: 'From pixel-perfect UI to LLM-powered backends — one engineer.',
  },
  {
    num: '03',
    headline: 'Turning Ideas\nInto Products.',
    sub: '12+ shipped across web, mobile, and AI. Kerala to the world.',
  },
]

function Moment({
  progress,
  inAt,
  outAt,
  num,
  headline,
  sub,
}: {
  progress: MotionValue<number>
  inAt: [number, number]
  outAt: [number, number]
  num: string
  headline: string
  sub: string
}) {
  const opacity   = useTransform(progress, [inAt[0], inAt[1], outAt[0], outAt[1]], [0, 1, 1, 0])
  const y         = useTransform(progress, [inAt[0], inAt[1]], [56, 0])
  const lineScale = useTransform(progress, [inAt[0], inAt[1]], [0, 1])
  const subOpacity= useTransform(progress, [inAt[0] + 0.04, inAt[1] + 0.04], [0, 1])

  const lines = headline.split('\n')

  return (
    <motion.div
      className="absolute inset-0 flex flex-col justify-center px-8 md:px-20 lg:px-28 pointer-events-none"
      style={{ opacity, y }}
      aria-hidden="true"
    >
      <div className="max-w-5xl">
        {/* Moment counter */}
        <p className="font-syne text-white/22 text-[11px] tracking-[0.35em] uppercase mb-6">
          {num} / 03
        </p>

        {/* Accent line — draws in from left */}
        <motion.div
          className="h-px bg-blue mb-10 origin-left"
          style={{ scaleX: lineScale, width: 64 }}
        />

        {/* Display headline */}
        <h2 className="font-hero font-black text-white leading-[0.88] tracking-[-0.04em] text-[clamp(3rem,7.5vw,7rem)] mb-0">
          {lines.map((line, i) => {
            const isLast = i === lines.length - 1
            const hasDot = isLast && line.endsWith('.')
            return (
              <span key={i} className="block">
                {hasDot
                  ? <>{line.slice(0, -1)}<span className="text-blue">.</span></>
                  : line}
              </span>
            )
          })}
        </h2>

        {/* Sub-caption */}
        <motion.p
          className="font-dm text-white/45 text-[17px] mt-7 max-w-[460px] leading-relaxed"
          style={{ opacity: subOpacity }}
        >
          {sub}
        </motion.p>
      </div>
    </motion.div>
  )
}

export default function VideoStory() {
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  // Video slowly zooms in across the full section
  const videoScale = useTransform(scrollYProgress, [0, 1], [1.0, 1.12])

  // Side progress bar fill height
  const barHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  // Dot opacities — active dot brightens, inactive dims
  const dot0 = useTransform(scrollYProgress, [0, 0.08, 0.28, 0.36], [0.8, 1, 1, 0.2])
  const dot1 = useTransform(scrollYProgress, [0.30, 0.40, 0.60, 0.68], [0.2, 1, 1, 0.2])
  const dot2 = useTransform(scrollYProgress, [0.64, 0.74, 1.0, 1.0],   [0.2, 1, 1, 1.0])

  // "Scroll" hint only visible on first moment
  const scrollHintOpacity = useTransform(scrollYProgress, [0, 0.12, 0.22], [1, 1, 0])

  return (
    <section
      ref={sectionRef}
      id="story"
      className="relative"
      style={{ height: '280vh' }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* Video — zooms in on scroll */}
        <motion.video
          className="absolute inset-0 w-full h-full object-cover"
          style={{ scale: videoScale }}
          autoPlay loop muted playsInline
          src={VIDEO_SRC}
          aria-hidden="true"
        />

        {/* Darker overlay for text legibility */}
        <div className="absolute inset-0 bg-ink/68" />

        {/* Bottom edge bleed to next section */}
        <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-ink to-transparent pointer-events-none z-[1]" />

        {/* ── Three scroll moments ── */}
        <Moment
          progress={scrollYProgress}
          inAt={[0.00, 0.08]} outAt={[0.28, 0.36]}
          {...MOMENTS[0]}
        />
        <Moment
          progress={scrollYProgress}
          inAt={[0.30, 0.40]} outAt={[0.60, 0.68]}
          {...MOMENTS[1]}
        />
        <Moment
          progress={scrollYProgress}
          inAt={[0.64, 0.74]} outAt={[0.90, 1.00]}
          {...MOMENTS[2]}
        />

        {/* Right side — vertical scroll progress bar */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 z-10 flex flex-col items-center gap-3">
          <span
            className="font-dm text-[9px] text-white/20 uppercase tracking-[0.3em]"
            style={{ writingMode: 'vertical-rl' }}
          >
            Story
          </span>
          <div className="relative w-px h-28 bg-white/[0.08] overflow-hidden">
            <motion.div
              className="absolute inset-x-0 top-0 bg-blue/60"
              style={{ height: barHeight }}
            />
          </div>
        </div>

        {/* Bottom — moment dots */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-3 z-10">
          {([dot0, dot1, dot2] as MotionValue<number>[]).map((o, i) => (
            <motion.div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-white"
              style={{ opacity: o }}
            />
          ))}
        </div>

        {/* Scroll hint — fades out as you start scrolling */}
        <motion.div
          className="absolute bottom-10 left-8 flex items-center gap-3 z-10"
          style={{ opacity: scrollHintOpacity }}
        >
          <div className="w-px h-7 bg-gradient-to-b from-white/22 to-transparent" />
          <span className="font-dm text-[9px] text-white/22 uppercase tracking-[0.28em]">
            Scroll
          </span>
        </motion.div>

      </div>
    </section>
  )
}
