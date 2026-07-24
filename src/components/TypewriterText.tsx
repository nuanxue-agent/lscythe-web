'use client'

import { useEffect, useRef, useState, CSSProperties } from 'react'

interface Props {
  text: string
  speed?: number
  delay?: number
  className?: string
  style?: CSSProperties
}

export default function TypewriterText({
  text,
  speed = 60,
  delay = 0,
  className = '',
  style,
}: Props) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)
  const containerRef = useRef<HTMLSpanElement>(null)
  const startedRef = useRef(false)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !startedRef.current) {
          startedRef.current = true
          observer.disconnect()

          let idx = 0
          const run = () => {
            setDisplayed(text.slice(0, idx + 1))
            idx++
            if (idx < text.length) {
              setTimeout(run, speed)
            } else {
              setDone(true)
            }
          }

          const timer = setTimeout(run, delay)
          return () => clearTimeout(timer)
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [text, speed, delay])

  return (
    <span ref={containerRef} className={className} style={style}>
      {displayed}
      {!done && <span className="typewriter-cursor" aria-hidden="true" />}
      {done && <span className="typewriter-cursor" aria-hidden="true" />}
    </span>
  )
}
