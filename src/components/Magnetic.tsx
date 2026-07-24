'use client'

import { useRef, ReactNode, MouseEvent } from 'react'

interface Props {
  children: ReactNode
  strength?: number
}

export default function Magnetic({ children, strength = 0.35 }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null)

  const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = wrapRef.current
    if (!el) return

    const rect = el.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = e.clientX - cx
    const dy = e.clientY - cy
    const dist = Math.hypot(dx, dy)

    if (dist < 80) {
      const tx = dx * strength
      const ty = dy * strength
      el.style.transform = `translate(${tx}px, ${ty}px)`
    }
  }

  const onMouseLeave = () => {
    const el = wrapRef.current
    if (!el) return
    el.style.transform = 'translate(0px, 0px)'
  }

  return (
    <div
      ref={wrapRef}
      className="magnetic-wrap"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </div>
  )
}
