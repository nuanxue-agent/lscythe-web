'use client'

import { useTheme } from '@/components/ThemeProvider'

export default function SiteWrapper({ children }: { children: React.ReactNode }) {
  const { theme, mounted } = useTheme()

  // Before mount, render with site-wrapper to avoid layout shift for default themes
  if (!mounted) {
    return <div className="site-wrapper">{children}</div>
  }

  if (theme === 'hanzi' || theme === 'cyber') {
    return <div style={{ width: '100%' }}>{children}</div>
  }

  return <div className="site-wrapper">{children}</div>
}
