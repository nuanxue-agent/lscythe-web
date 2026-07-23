'use client'

import { useEffect, useRef } from 'react'

export default function MouseSpotlight() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    let rafId: number
    const mouse = { x: 0, y: 0 }
    const current = { x: 0, y: 0 }

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }

    const update = () => {
      current.x += (mouse.x - current.x) * 0.08
      current.y += (mouse.y - current.y) * 0.08

      el.style.background = `radial-gradient(600px circle at ${current.x}px ${current.y}px, rgba(0,255,136,0.08), transparent 40%)`

      rafId = requestAnimationFrame(update)
    }

    window.addEventListener('mousemove', onMove)
    rafId = requestAnimationFrame(update)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div
      ref={ref}
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 1,
        transition: 'opacity 0.3s',
      }}
    />
  )
}
