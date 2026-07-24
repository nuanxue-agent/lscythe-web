'use client'

import { useTheme } from './ThemeProvider'

// Fake hit counter for retro theme — purely aesthetic, static number for the vibe
export default function RetroHitCounter() {
  const { theme } = useTheme()

  if (theme !== 'retro') return null

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        fontFamily: '"Courier New", monospace',
        fontSize: '0.75rem',
        color: 'var(--dim)',
        margin: '0.5rem 0',
      }}
    >
      {/* Classic animated GIF-style counter box */}
      <span
        style={{
          display: 'inline-flex',
          border: '2px inset #999',
          background: '#000080',
          color: '#ffff00',
          fontFamily: '"Courier New", monospace',
          fontSize: '0.85rem',
          fontWeight: 'bold',
          letterSpacing: '0.15em',
          padding: '0.15rem 0.5rem',
        }}
        aria-label="Visitor counter"
      >
        000142
      </span>
      <span>visitors since 2019</span>
    </div>
  )
}
