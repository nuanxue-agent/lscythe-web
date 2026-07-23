'use client'

import { useEffect, useRef } from 'react'

// Draws a animated noise/static canvas overlay
export default function NoiseOverlay() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const draw = () => {
      const w = canvas.width
      const h = canvas.height
      const imageData = ctx.createImageData(w, h)
      const buf = imageData.data

      for (let i = 0; i < buf.length; i += 4) {
        const val = Math.random() < 0.015 ? Math.floor(Math.random() * 255) : 0
        buf[i]     = val
        buf[i + 1] = val
        buf[i + 2] = val
        buf[i + 3] = val > 0 ? 18 : 0
      }

      ctx.putImageData(imageData, 0, 0)
      animId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={ref}
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.4,
        mixBlendMode: 'screen',
      }}
    />
  )
}
