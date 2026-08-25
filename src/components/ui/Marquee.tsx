import { motion, useAnimationFrame, useMotionValue } from 'framer-motion'
import { useRef, type ReactNode } from 'react'

export default function Marquee({
  items,
  speed = 0.045,
  className = '',
  itemClassName = '',
}: {
  items: ReactNode[]
  /** px moved per ms */
  speed?: number
  className?: string
  itemClassName?: string
}) {
  const x = useMotionValue(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const halfWidth = useRef(0)

  useAnimationFrame((_, delta) => {
    if (!containerRef.current) return
    halfWidth.current = containerRef.current.scrollWidth / 2
    let current = x.get() - delta * speed
    if (Math.abs(current) >= halfWidth.current) current = 0
    x.set(current)
  })

  const looped = [...items, ...items]

  return (
    <div className={`overflow-hidden ${className}`} aria-hidden="true">
      <motion.div ref={containerRef} style={{ x }} className="flex whitespace-nowrap">
        {looped.map((item, i) => (
          <span key={i} className={itemClassName}>
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  )
}
