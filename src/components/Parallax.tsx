'use client'

import { useEffect, useRef } from 'react'

interface Props {
  children: React.ReactNode
  offset?: number
}

export default function Parallax({ children, offset = 0.15 }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    let rafId: number
    let scrollY = window.scrollY

    const onScroll = () => {
      scrollY = window.scrollY
    }

    const update = () => {
      const rect = el.getBoundingClientRect()
      const elementTop = rect.top + scrollY
      const viewportMid = scrollY + window.innerHeight / 2
      const distance = viewportMid - elementTop
      const translateY = distance * offset

      el.style.transform = `translateY(${translateY}px)`
      rafId = requestAnimationFrame(update)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    rafId = requestAnimationFrame(update)

    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(rafId)
    }
  }, [offset])

  return <div ref={ref}>{children}</div>
}
