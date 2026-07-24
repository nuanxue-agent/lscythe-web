'use client'

import { useTheme } from './ThemeProvider'

export default function ThemeAwareNav() {
  const { theme } = useTheme()

  // Vaporwave and retro have their own nav/layout, no shared nav
  if (theme === 'vaporwave' || theme === 'retro') return null

  // Terminal theme: show the standard nav + system bar
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
