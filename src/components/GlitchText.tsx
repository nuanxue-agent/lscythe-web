'use client'

import { useEffect, useRef } from 'react'

const CHARS = '!<>-_\\/[]{}—=+*^?#@$%'

export default function GlitchText({ text, className = '', style = {} }: { text: string; className?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    let animId: number
    let iteration = 0
    let running = false

    const scramble = () => {
      if (!running) return
      el.textContent = text
        .split('')
        .map((char, i) => {
          if (i < iteration) return text[i]
          if (char === ' ') return ' '
          return CHARS[Math.floor(Math.random() * CHARS.length)]
        })
        .join('')

      if (iteration < text.length) {
        iteration += 0.35
        animId = requestAnimationFrame(scramble)
      } else {
        el.textContent = text
        running = false
      }
    }

    const onEnter = () => {
      iteration = 0
      running = true
      cancelAnimationFrame(animId)
      scramble()
    }

    const onLeave = () => {
      running = false
      cancelAnimationFrame(animId)
      el.textContent = text
    }

    const parent = el.parentElement
    parent?.addEventListener('mouseenter', onEnter)
    parent?.addEventListener('mouseleave', onLeave)

    return () => {
      parent?.removeEventListener('mouseenter', onEnter)
      parent?.removeEventListener('mouseleave', onLeave)
      cancelAnimationFrame(animId)
    }
  }, [text])

  return <span ref={ref} className={className} style={style}>{text}</span>
}
