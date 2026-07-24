'use client'

import { useEffect, useRef, ReactNode, Children } from 'react'

interface Props {
  children: ReactNode
  delay?: number
  className?: string
  direction?: 'up' | 'left' | 'none'
  stagger?: boolean
  staggerChildren?: number
}

export default function Reveal({
  children,
  delay = 0,
  className = '',
  direction = 'up',
  stagger = false,
  staggerChildren = 80,
}: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const translateMap = { up: 'translateY(28px)', left: 'translateX(-20px)', none: 'none' }

    if (stagger) {
      // Apply staggered reveal to direct children
      const kids = Array.from(el.children) as HTMLElement[]
      kids.forEach((child, i) => {
        const childDelay = delay + i * staggerChildren
        child.style.opacity = '0'
        child.style.transform = translateMap[direction]
        child.style.transition = `opacity 0.7s ease ${childDelay}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${childDelay}ms`
      })

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            kids.forEach((child) => {
              child.style.opacity = '1'
              child.style.transform = 'none'
            })
            observer.disconnect()
          }
        },
        { threshold: 0.1 }
      )
      observer.observe(el)
      return () => observer.disconnect()
    } else {
      // Original single-element reveal
      el.style.opacity = '0'
      el.style.transform = translateMap[direction]
      el.style.transition = `opacity 0.7s ease ${delay}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms`

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            el.style.opacity = '1'
            el.style.transform = 'none'
            observer.disconnect()
          }
        },
        { threshold: 0.1 }
      )
      observer.observe(el)
      return () => observer.disconnect()
    }
  }, [delay, direction, stagger, staggerChildren])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
