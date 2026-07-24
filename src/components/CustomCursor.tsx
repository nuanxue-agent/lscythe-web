'use client'

import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [supported, setSupported] = useState(false)

  useEffect(() => {
    // Only activate on pointer devices that support hover
    if (!window.matchMedia('(hover: hover)').matches) return
    setSupported(true)
  }, [])

  useEffect(() => {
    if (!supported) return

    document.body.classList.add('has-custom-cursor')

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    // Current mouse position (snap target for dot, lerp target for ring)
    let mx = -100, my = -100
    // Ring's current interpolated position
    let rx = -100, ry = -100

    let rafId: number

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t

    const tick = () => {
      rx = lerp(rx, mx, 0.12)
      ry = lerp(ry, my, 0.12)

      dot.style.left = `${mx}px`
      dot.style.top = `${my}px`
      ring.style.left = `${rx}px`
      ring.style.top = `${ry}px`

      rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)

    const onMove = (e: MouseEvent) => {
      mx = e.clientX
      my = e.clientY
    }

    const onMouseDown = () => {
      ring.classList.add('is-clicking')
    }
    const onMouseUp = () => {
      ring.classList.remove('is-clicking')
    }

    // Hover state for interactive elements
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as Element
      if (target.closest('a, button, [role="button"]')) {
        ring.classList.add('is-hovering')
      }
    }
    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as Element
      if (target.closest('a, button, [role="button"]')) {
        ring.classList.remove('is-hovering')
      }
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mouseup', onMouseUp)
    document.addEventListener('mouseover', onMouseOver)
    document.addEventListener('mouseout', onMouseOut)

    return () => {
      cancelAnimationFrame(rafId)
      document.body.classList.remove('has-custom-cursor')
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mouseup', onMouseUp)
      document.removeEventListener('mouseover', onMouseOver)
      document.removeEventListener('mouseout', onMouseOut)
    }
  }, [supported])

  if (!supported) return null

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  )
}
