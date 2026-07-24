'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { useTheme } from './ThemeProvider'

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const { theme } = useTheme()

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (theme === 'vaporwave') {
      // slide from right + neon flash
      el.style.transition = 'none'
      el.style.opacity = '0'
      el.style.transform = 'translateX(32px)'
      el.style.filter = 'brightness(1.8) saturate(2)'
      const raf = requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          el.style.transition = 'opacity 0.45s ease, transform 0.45s cubic-bezier(0.16,1,0.3,1), filter 0.5s ease'
          el.style.opacity = '1'
          el.style.transform = 'translateX(0)'
          el.style.filter = 'brightness(1) saturate(1)'
        })
      })
      return () => cancelAnimationFrame(raf)

    } else if (theme === 'retro') {
      // retro: no animation, instant render
      el.style.transition = 'none'
      el.style.opacity = '1'
      el.style.transform = 'none'
      el.style.filter = 'none'
      el.style.clipPath = 'none'

    } else {
      // terminal: scan-line wipe down
      el.style.transition = 'none'
      el.style.opacity = '0'
      el.style.transform = 'translateY(0)'
      el.style.clipPath = 'inset(0 0 100% 0)'
      el.style.filter = 'none'
      const raf = requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          el.style.transition = 'opacity 0.3s ease, clip-path 0.4s cubic-bezier(0.16,1,0.3,1)'
          el.style.opacity = '1'
          el.style.clipPath = 'inset(0 0 0% 0)'
        })
      })
      return () => cancelAnimationFrame(raf)
    }
  }, [pathname, theme])

  return (
    <div ref={ref} style={{ willChange: 'opacity, transform, clip-path, filter' }}>
      {children}
    </div>
  )
}
