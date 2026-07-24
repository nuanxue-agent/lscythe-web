'use client'

import { useTheme } from './ThemeProvider'
import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const { theme } = useTheme()

  useEffect(() => {
    const el = ref.current
    if (!el) return

    el.style.opacity = '0'

    if (theme === 'vaporwave') {
      // vaporwave: slide in from right with neon flash
      el.style.transform = 'translateX(24px)'
      el.style.filter = 'brightness(2)'
      const raf = requestAnimationFrame(() => {
        el.style.transition = 'opacity 0.4s ease, transform 0.4s cubic-bezier(0.16,1,0.3,1), filter 0.4s ease'
        el.style.opacity = '1'
        el.style.transform = 'translateX(0)'
        el.style.filter = 'brightness(1)'
      })
      return () => cancelAnimationFrame(raf)
    } else if (theme === 'retro') {
      // retro: simple fade, no slide (old browsers didn't do smooth transitions)
      el.style.transform = 'none'
      const raf = requestAnimationFrame(() => {
        el.style.transition = 'opacity 0.2s linear'
        el.style.opacity = '1'
      })
      return () => cancelAnimationFrame(raf)
    } else {
      // terminal: slide up
      el.style.transform = 'translateY(12px)'
      const raf = requestAnimationFrame(() => {
        el.style.transition = 'opacity 0.35s ease, transform 0.35s cubic-bezier(0.16,1,0.3,1)'
        el.style.opacity = '1'
        el.style.transform = 'translateY(0)'
      })
      return () => cancelAnimationFrame(raf)
    }
  }, [pathname, theme])

  return <div ref={ref}>{children}</div>
}
