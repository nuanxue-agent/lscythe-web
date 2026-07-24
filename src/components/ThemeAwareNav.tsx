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
    <>
      {/* Scanline top bar */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 101,
        height: '2px',
        background: 'linear-gradient(90deg, #ff71ce, #b967ff, #01cdfe, #b967ff, #ff71ce)',
        backgroundSize: '200% 100%',
        animation: 'vw-nav-shimmer 3s linear infinite',
      }} />

      <nav style={{
        position: 'fixed',
        top: '2px', left: 0, right: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0.75rem 2.5rem',
        background: 'rgba(13,0,21,0.92)',
        borderBottom: '1px solid rgba(185,103,255,0.25)',
      }}>
        {/* Logo -- retro neon sign style */}
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: '0.6rem',
            letterSpacing: '0.2em',
            color: '#b967ff',
            opacity: 0.7,
          }}>✦</span>
          <span style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: '1.1rem',
            fontWeight: 900,
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: '#ff71ce',
            textShadow: '0 0 10px #ff71ce, 0 0 20px rgba(255,113,206,0.5), 0 0 40px rgba(255,113,206,0.2)',
          }}>lscythe</span>
          <span style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: '0.6rem',
            letterSpacing: '0.2em',
            color: '#b967ff',
            opacity: 0.7,
          }}>✦</span>
        </Link>

        {/* Links -- pixel/retro button style */}
        <ul style={{ display: 'flex', gap: '0', listStyle: 'none', margin: 0, padding: 0, border: '1px solid rgba(185,103,255,0.3)' }}>
          {NAV_LINKS.filter(l => l.href !== '/').map(({ href, label }, i, arr) => {
            const active = pathname === href
            return (
              <li key={href} style={{ borderRight: i < arr.length - 1 ? '1px solid rgba(185,103,255,0.3)' : 'none' }}>
                <Link href={href} style={{
                  display: 'block',
                  fontFamily: '"JetBrains Mono", monospace',
                  fontSize: '0.6rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  padding: '0.45rem 0.9rem',
                  color: active ? '#0d0015' : '#c8b8e8',
                  background: active
                    ? 'linear-gradient(135deg, #ff71ce, #b967ff)'
                    : 'transparent',
                  textShadow: active ? 'none' : undefined,
                  textDecoration: 'none',
                  transition: 'background 0.15s, color 0.15s',
                }}>
                  {label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      <style>{`
        @keyframes vw-nav-shimmer {
          0% { background-position: 0% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </>
  )
}

function RetroNav() {
  const pathname = usePathname()
  return (
    <>
      {/* Classic browser-style title bar */}
      <div style={{
        background: '#c0c0c0',
        borderBottom: '2px solid #808080',
        borderTop: '2px solid #ffffff',
        padding: '0.2rem 0.75rem',
        fontSize: '11px',
        fontFamily: '"Trebuchet MS", Arial, sans-serif',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        color: '#000',
      }}>
        <span style={{ fontWeight: 'bold' }}>lscythe.dev</span>
        <span style={{ color: '#444' }}>-- personal homepage of l. scythe, android engineer</span>
      </div>

      {/* Tab-style navigation */}
      <div style={{
        background: '#e8e8e8',
        borderBottom: '2px solid #999999',
        padding: '0 0.75rem',
        display: 'flex',
        alignItems: 'flex-end',
        gap: '0',
        fontFamily: '"Trebuchet MS", Arial, sans-serif',
        fontSize: '12px',
      }}>
        {NAV_LINKS.map(({ href, label }) => {
          const active = pathname === href
          return (
            <Link key={href} href={href} style={{
              display: 'inline-block',
              padding: '0.3rem 0.9rem',
              background: active ? '#ffffff' : '#d0d0d0',
              border: '1px solid #999',
              borderBottom: active ? '1px solid #ffffff' : '1px solid #999',
              marginBottom: active ? '-2px' : '0',
              marginRight: '2px',
              color: active ? '#000000' : '#333333',
              fontWeight: active ? 'bold' : 'normal',
              textDecoration: 'none',
              position: 'relative',
              zIndex: active ? 1 : 0,
            }}>
              {label.charAt(0).toUpperCase() + label.slice(1)}
            </Link>
          )
        })}
      </div>
    </>
  )
}

export default function ThemeAwareNav() {
  const { theme } = useTheme()
  if (theme === 'retro') return <RetroNav />
  if (theme === 'vaporwave') return <VaporwaveNav />
  return <TerminalNav />
}
