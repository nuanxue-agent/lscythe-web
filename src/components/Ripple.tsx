'use client'

import { useRef, ReactNode, MouseEvent } from 'react'

interface Props {
  children: ReactNode
  className?: string
}

export default function Ripple({ children, className = '' }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    const container = containerRef.current
    if (!container) return

    const rect = container.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Size the ripple so it can cover the whole element
    const size = Math.max(rect.width, rect.height) * 2

    const circle = document.createElement('span')
    circle.className = 'ripple-circle'
    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.left = `${x - size / 2}px`
    circle.style.top = `${y - size / 2}px`

    container.appendChild(circle)

    circle.addEventListener('animationend', () => {
      circle.remove()
    })
  }

  return (
    <div
      ref={containerRef}
      className={`ripple-container ${className}`}
      onClick={handleClick}
    >
      {children}
    </div>
  )
}
