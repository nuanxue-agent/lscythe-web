'use client'

import { useState } from 'react'

interface Props {
  prefix: string
  label: string
  value: string
  href: string
}

export default function ContactRow({ prefix, label, value, href }: Props) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      style={{
        display: 'grid',
        gridTemplateColumns: '2rem 5rem 1fr 2rem',
        gap: '1rem',
        alignItems: 'center',
        padding: '1.25rem 1.5rem',
        border: '1px solid',
        borderColor: isHovered ? 'var(--accent)' : 'var(--border)',
        background: isHovered ? 'rgba(0,255,136,0.03)' : 'var(--surface)',
        transition: 'border-color 0.2s, background 0.2s',
        textDecoration: 'none',
        color: 'inherit',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span
        style={{
          fontFamily: 'var(--mono)',
          fontSize: '0.9rem',
          color: 'var(--accent)',
          fontWeight: 700,
        }}
      >
        {prefix}
      </span>
      <span
        style={{
          fontFamily: 'var(--mono)',
          fontSize: '0.7rem',
          color: 'var(--dim)',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontFamily: 'var(--mono)',
          fontSize: '0.78rem',
          color: 'var(--white)',
          letterSpacing: '0.02em',
        }}
      >
        {value}
      </span>
      <span
        style={{
          fontFamily: 'var(--mono)',
          fontSize: '0.85rem',
          color: 'var(--accent)',
          textAlign: 'right',
        }}
      >
        →
      </span>
    </a>
  )
}
