import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { SPRING } from '../lib/motion'

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false)
  const [label, setLabel] = useState<string | null>(null)
  const [isTouch, setIsTouch] = useState(false)

  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const ringX = useSpring(cursorX, SPRING.gentle)
  const ringY = useSpring(cursorY, SPRING.gentle)

  useEffect(() => {
    if (navigator.maxTouchPoints > 0) {
      setIsTouch(true)
      return
    }

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as Element
      const hoverable = target.closest('a, button, [data-cursor-hover]')
      setIsHovering(!!hoverable)
      const labelled = target.closest('[data-cursor-label]')
      setLabel(labelled ? labelled.getAttribute('data-cursor-label') : null)
    }

    window.addEventListener('mousemove', moveCursor)
    window.addEventListener('mouseover', handleMouseOver)

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      window.removeEventListener('mouseover', handleMouseOver)
    }
  }, [cursorX, cursorY])

  if (isTouch) return null

  return (
    <>
      <motion.div
        style={{
          position: 'fixed',
          left: cursorX,
          top: cursorY,
          width: 6,
          height: 6,
          borderRadius: '50%',
          backgroundColor: '#FFFFFF',
          mixBlendMode: 'difference',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 9999,
        }}
        animate={{ scale: isHovering ? 0 : 1 }}
        transition={{ duration: 0.15 }}
      />
      <motion.div
        style={{
          position: 'fixed',
          left: ringX,
          top: ringY,
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 9998,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mixBlendMode: 'difference',
          border: '1.5px solid #FFFFFF',
        }}
        animate={{
          width: label ? 'auto' : isHovering ? 48 : 26,
          height: label ? 32 : isHovering ? 48 : 26,
          borderRadius: label ? 999 : '50%',
          paddingLeft: label ? 13 : 0,
          paddingRight: label ? 13 : 0,
          opacity: isHovering ? 1 : 0.6,
        }}
        transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
      >
        {label && (
          <span className="font-sans text-[11px] text-white whitespace-nowrap">
            {label}
          </span>
        )}
      </motion.div>
    </>
  )
}
