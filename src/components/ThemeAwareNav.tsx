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

function HanziNav() {
  const pathname = usePathname()
  return (
    <nav style={{
      display: 'flex',
      alignItems: 'stretch',
      background: '#0a0704',
      borderBottom: '3px solid #8b0000',
    }}>
      {/* Red left panel with logo */}
      <Link href="/" style={{
        textDecoration: 'none',
        display: 'flex', alignItems: 'center', gap: '0.75rem',
        padding: '1rem 2rem',
        background: '#8b0000',
        borderRight: '2px solid rgba(240,192,96,0.3)',
        flexShrink: 0,
      }}>
        {/* Gold seal box */}
        <div style={{
          width: '32px', height: '32px',
          border: '2px solid #f0c060',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'rgba(0,0,0,0.2)',
        }}>
          <span style={{
            fontFamily: '"Noto Serif SC", "Source Han Serif", Georgia, serif',
            fontSize: '1.1rem', color: '#f0c060', fontWeight: 900, lineHeight: 1,
          }}>刃</span>
        </div>
        <span style={{
          fontFamily: 'Georgia, "Times New Roman", serif',
          fontSize: '1rem', fontWeight: 700,
          letterSpacing: '0.2em', textTransform: 'uppercase',
          color: '#f0e8d8',
          textShadow: '1px 1px 0 rgba(0,0,0,0.4)',
        }}>LSCYTHE</span>
      </Link>

      {/* Dark panel with links */}
      <div style={{
        flex: 1, display: 'flex', alignItems: 'center',
        padding: '0 2rem',
        gap: '0',
        background: '#0d0905',
      }}>
        <ul style={{ display: 'flex', gap: '0', listStyle: 'none', margin: 0, padding: 0 }}>
          {NAV_LINKS.filter(l => l.href !== '/').map(({ href, label }) => {
            const active = pathname === href
            return (
              <li key={href}>
                <Link href={href} style={{
                  display: 'block',
                  fontFamily: '"JetBrains Mono", monospace',
                  fontSize: '0.62rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  padding: '0.5rem 1rem',
                  color: active ? '#f0e8d8' : 'rgba(232,224,208,0.45)',
                  background: active ? '#c41e3a' : 'transparent',
                  textDecoration: 'none',
                  transition: 'background 0.15s, color 0.15s',
                  borderRight: '1px solid rgba(196,30,58,0.15)',
                }}
                onMouseEnter={e => { if (!active) { (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(139,0,0,0.3)'; (e.currentTarget as HTMLAnchorElement).style.color = '#e8e0d0' } }}
                onMouseLeave={e => { if (!active) { (e.currentTarget as HTMLAnchorElement).style.background = 'transparent'; (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(232,224,208,0.45)' } }}
                >
                  {label}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>

      {/* Right: decorative hanzi */}
      <div style={{
        padding: '0 1.5rem',
        display: 'flex', alignItems: 'center',
        background: '#0d0905',
        borderLeft: '1px solid rgba(196,30,58,0.2)',
      }}>
        <span style={{
          fontFamily: '"Noto Serif SC", "Source Han Serif", Georgia, serif',
          fontSize: '1rem', color: 'rgba(196,30,58,0.3)',
          letterSpacing: '0.5rem',
        }}>道德力</span>
      </div>
    </nav>
  )
}

function CyberNav() {
  const pathname = usePathname()
  return (
    <>
      {/* Top neon border */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 101,
        height: '2px',
        background: '#ff003c',
        boxShadow: '0 0 8px #ff003c, 0 0 20px rgba(255,0,60,0.6)',
      }} />

      <nav style={{
        position: 'fixed',
        top: '2px', left: 0, right: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0.75rem 2.5rem',
        background: 'rgba(10,10,15,0.9)',
        backdropFilter: 'blur(8px)',
        borderBottom: '1px solid rgba(255,0,60,0.2)',
        overflow: 'hidden',
      }}>
        {/* Scanline shimmer overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,0,60,0.02) 3px, rgba(255,0,60,0.02) 4px)',
          pointerEvents: 'none',
        }} />

        {/* Logo */}
        <Link href="/" style={{ textDecoration: 'none', position: 'relative', zIndex: 1 }}>
          <span style={{
            fontFamily: '"Inter", sans-serif',
            fontSize: '1.1rem',
            fontWeight: 900,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#ff003c',
            textShadow: '0 0 10px #ff003c, 0 0 20px rgba(255,0,60,0.5), 0 0 40px rgba(255,0,60,0.2)',
          }}>LSCYTHE</span>
        </Link>

        {/* Links */}
        <ul style={{ display: 'flex', gap: '0', listStyle: 'none', margin: 0, padding: 0, position: 'relative', zIndex: 1 }}>
          {NAV_LINKS.filter(l => l.href !== '/').map(({ href, label }, i, arr) => {
            const active = pathname === href
            return (
              <li key={href} style={{ borderRight: i < arr.length - 1 ? '1px solid rgba(255,0,60,0.2)' : 'none' }}>
                <Link href={href} style={{
                  display: 'block',
                  fontFamily: '"Inter", sans-serif',
                  fontSize: '0.6rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  padding: '0.45rem 0.9rem',
                  color: active ? '#ff003c' : 'rgba(224,224,229,0.6)',
                  textShadow: active ? '0 0 10px #ff003c, 0 0 20px rgba(255,0,60,0.5)' : 'none',
                  textDecoration: 'none',
                  transition: 'color 0.15s, text-shadow 0.15s',
                }}
                onMouseEnter={e => {
                  if (!active) {
                    const el = e.currentTarget
                    el.style.color = '#f7e500'
                    el.style.textShadow = '0 0 10px #f7e500, 0 0 20px rgba(247,229,0,0.5)'
                  }
                }}
                onMouseLeave={e => {
                  if (!active) {
                    const el = e.currentTarget
                    el.style.color = 'rgba(224,224,229,0.6)'
                    el.style.textShadow = 'none'
                  }
                }}
                >
                  {label.toUpperCase()}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      <style>{`
        @keyframes cyber-nav-scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
      `}</style>
    </>
  )
}

export default function ThemeAwareNav() {
  const { theme } = useTheme()
  if (theme === 'retro') return <RetroNav />
  if (theme === 'vaporwave') return <VaporwaveNav />
  if (theme === 'cyber') return <CyberNav />
  if (theme === 'hanzi') return <HanziNav />
  return <TerminalNav />
}
