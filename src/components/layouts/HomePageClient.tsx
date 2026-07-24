'use client'

import { useTheme } from '@/components/ThemeProvider'
import HomeTerminal from '@/components/layouts/HomeTerminal'
import HomeVaporwave from '@/components/layouts/HomeVaporwave'
import HomeRetro from '@/components/layouts/HomeRetro'
import type { Project } from '@/lib/content'

interface HomePageClientProps {
  featured: Project[]
}

export default function HomePageClient({ featured }: HomePageClientProps) {
  const { theme, mounted } = useTheme()
  if (!mounted) return null

  if (theme === 'vaporwave') return <HomeVaporwave featured={featured} />
  if (theme === 'retro') return <HomeRetro featured={featured} />
  return <HomeTerminal featured={featured} />
}
