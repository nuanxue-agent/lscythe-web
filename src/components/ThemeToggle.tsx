'use client'

import { useTheme } from './ThemeProvider'

const THEMES = [
  { id: 'terminal', label: 'TERM' },
  { id: 'vaporwave', label: 'WAVE' },
  { id: 'retro', label: 'RETRO' },
] as const

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <div
      className="theme-toggle-container"
      style={{
        position: 'fixed',
        bottom: '1.5rem',
        left: '1.5rem',
        display: 'flex',
        gap: '0.25rem',
        zIndex: 1000,
      }}
    >
      {THEMES.map(({ id, label }) => (
        <button
          key={id}
          onClick={() => setTheme(id)}
          aria-label={`Switch to ${id} theme`}
          aria-pressed={theme === id}
          style={{
            fontFamily: 'var(--mono)',
            fontSize: '0.62rem',
            letterSpacing: '0.04em',
            padding: '0.3rem 0.45rem',
            background: theme === id ? 'var(--accent)' : 'transparent',
            color: theme === id ? 'var(--black)' : 'var(--dim)',
            border: `1px solid ${theme === id ? 'var(--accent)' : 'var(--border)'}`,
            borderRadius: '2px',
            cursor: 'pointer',
            transition: 'background 0.15s, color 0.15s, border-color 0.15s',
            lineHeight: 1,
          }}
          onMouseEnter={e => {
            if (theme !== id) {
              const el = e.currentTarget
              el.style.color = 'var(--white)'
              el.style.borderColor = 'var(--accent)'
            }
          }}
          onMouseLeave={e => {
            if (theme !== id) {
              const el = e.currentTarget
              el.style.color = 'var(--dim)'
              el.style.borderColor = 'var(--border)'
            }
          }}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
