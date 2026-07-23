'use client'

import { useEffect, useRef } from 'react'

interface Props {
  value: number
  duration?: number
  suffix?: string
}

export default function Counter({ value, duration = 1800, suffix = '' }: Props) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    let start: number | null = null
    let animId: number

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      observer.disconnect()

      const step = (ts: number) => {
        if (!start) start = ts
        const progress = Math.min((ts - start) / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        el.textContent = Math.floor(eased * value) + suffix
        if (progress < 1) animId = requestAnimationFrame(step)
      }
      animId = requestAnimationFrame(step)
    }, { threshold: 0.5 })

    observer.observe(el)
    return () => { observer.disconnect(); cancelAnimationFrame(animId) }
  }, [value, duration, suffix])

  return <span ref={ref}>0{suffix}</span>
}
