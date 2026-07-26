'use client'

import { useTheme } from './ThemeProvider'

export default function SiteWrapper({ children }: { children: React.ReactNode }) {
  const { theme, mounted } = useTheme()

  if (!mounted) return <div className="site-wrapper">{children}</div>

  if (theme === 'hanzi') {
    // Hanzi: full width, no constraints, HanziNav is static so no spacer needed
    return <div style={{ width: '100%', minHeight: '100vh', background: '#0f0c08' }}>{children}</div>
  }

  if (theme === 'cyber') {
    // Cyber: full width, fixed nav = 2px border + ~46px nav = ~48px total
    return (
      <div style={{ width: '100%', minHeight: '100vh', background: '#0a0a0f' }}>
        <div style={{ height: '48px' }} /> {/* spacer for fixed nav */}
        {children}
      </div>
    )
  }

  if (theme === 'vaporwave') {
    // Vaporwave: site-wrapper but with spacer for fixed nav (~48px)
    return (
      <div className="site-wrapper">
        <div style={{ height: '48px' }} />
        {children}
      </div>
    )
  }

  return <div className="site-wrapper">{children}</div>
}
