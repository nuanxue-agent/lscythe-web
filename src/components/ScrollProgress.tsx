'use client'

import { useEffect, useRef } from 'react'
import { useTheme } from './ThemeProvider'

export default function ScrollProgress() {
  const { theme } = useTheme()
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // No fancy progress bars in 2004
    if (theme === 'retro') return

    const bar = barRef.current
    if (!bar) return

    let rafId: number
    const update = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = docHeight > 0 ? scrollTop / docHeight : 0
      bar.style.transform = `scaleX(${progress})`
      rafId = requestAnimationFrame(update)
    }
    rafId = requestAnimationFrame(update)
    return () => cancelAnimationFrame(rafId)
  }, [theme])

  if (theme === 'retro') return null

  return (
    <div
      ref={barRef}
      className="scroll-progress"
      style={{ width: '100%' }}
      aria-hidden="true"
    />
  )
}
