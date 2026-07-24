'use client'

import { useEffect, useRef } from 'react'
import { useTheme } from './ThemeProvider'

export default function CustomCursor() {
  const { theme } = useTheme()
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Custom cursor doesn't fit the retro old-school vibe
    if (theme === 'retro') {
      document.body.classList.remove('has-custom-cursor')
      return
    }

    // Only activate on pointer devices that support hover
    if (!window.matchMedia('(hover: hover)').matches) return

    document.body.classList.add('has-custom-cursor')

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let mx = -100, my = -100
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

    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY }
    const onMouseDown = () => ring.classList.add('is-clicking')
    const onMouseUp = () => ring.classList.remove('is-clicking')
    const onMouseOver = (e: MouseEvent) => {
      if ((e.target as Element).closest('a, button, [role="button"]'))
        ring.classList.add('is-hovering')
    }
    const onMouseOut = (e: MouseEvent) => {
      if ((e.target as Element).closest('a, button, [role="button"]'))
        ring.classList.remove('is-hovering')
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
  }, [theme])

  // On retro don't mount the DOM nodes at all
  if (theme === 'retro') return null

  // Always render the nodes — they start at (-100, -100) and are invisible
  // until the effect above activates them on hover-capable devices
  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  )
}
