'use client'

import { useTheme } from './ThemeProvider'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV_LINKS = [
  { href: '/', label: 'home' },
  { href: '/projects', label: 'projects' },
  { href: '/blog', label: 'writing' },
  { href: '/experience', label: 'experience' },
  { href: '/contact', label: 'contact' },
  { href: '/about', label: 'about' },
]

function TerminalNav() {
  return (
    <>
      <div className="system-bar">
        <span>&gt;</span> system online - lscythe - android engineer - jakarta, id - <span>available for work</span>
      </div>
      <nav className="nav">
        <a href="/" className="nav__logo cursor">~/lscythe</a>
        <ul className="nav__links">
          <li><a href="/projects">projects</a></li>
          <li><a href="/blog">writing</a></li>
          <li><a href="/experience">experience</a></li>
          <li><a href="/contact">contact</a></li>
          <li><a href="/about">about</a></li>
        </ul>
      </nav>
    </>
  )
}

function VaporwaveNav() {
  const pathname = usePathname()
  return (
    <nav style={{
      position: 'fixed',
      top: 0, left: 0, right: 0,
      zIndex: 100,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0.9rem 2rem',
      background: 'rgba(13,0,21,0.85)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid rgba(185,103,255,0.3)',
      boxShadow: '0 4px 24px rgba(185,103,255,0.15)',
    }}>
      {/* Logo */}
      <Link href="/" style={{
        fontFamily: '"JetBrains Mono", monospace',
        fontSize: '1rem',
        fontWeight: 900,
        letterSpacing: '0.1em',
        background: 'linear-gradient(90deg, #ff71ce, #b967ff)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        filter: 'drop-shadow(0 0 8px rgba(255,113,206,0.6))',
        textDecoration: 'none',
      }}>
        LSCYTHE
      </Link>

      {/* Links */}
      <ul style={{ display: 'flex', gap: '0.25rem', listStyle: 'none', margin: 0, padding: 0 }}>
        {NAV_LINKS.filter(l => l.href !== '/').map(({ href, label }) => {
          const active = pathname === href
          return (
            <li key={href}>
              <Link href={href} style={{
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: '0.65rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                padding: '0.4rem 0.8rem',
                color: active ? '#ff71ce' : '#9b89b8',
                border: active ? '1px solid rgba(255,113,206,0.5)' : '1px solid transparent',
                background: active ? 'rgba(255,113,206,0.08)' : 'transparent',
                boxShadow: active ? '0 0 12px rgba(255,113,206,0.2)' : 'none',
                textDecoration: 'none',
                transition: 'all 0.15s',
              }}>
                {label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default function ThemeAwareNav() {
  const { theme } = useTheme()
  if (theme === 'retro') return null
  if (theme === 'vaporwave') return <VaporwaveNav />
  return <TerminalNav />
}
