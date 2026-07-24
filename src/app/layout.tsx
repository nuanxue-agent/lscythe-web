import type { Metadata, Viewport } from 'next'
import './globals.css'
import MouseSpotlight from '@/components/MouseSpotlight'
import NoiseOverlay from '@/components/NoiseOverlay'
import Terminal from '@/components/Terminal'
import PageTransition from '@/components/PageTransition'
import { ThemeProvider } from '@/components/ThemeProvider'
import ThemeToggle from '@/components/ThemeToggle'
import ThemeAwareNav from '@/components/ThemeAwareNav'
import SiteWrapper from '@/components/SiteWrapper'

export const metadata: Metadata = {
  title: { default: 'lscythe', template: '%s -- lscythe' },
  description: 'Android engineer from Jakarta. Building mobile systems, KMP libraries, and developer tooling.',
}

export const viewport: Viewport = {
  themeColor: '#080808',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <NoiseOverlay />
          <MouseSpotlight />
          <SiteWrapper>
            <ThemeAwareNav />
            <main>
              <PageTransition>{children}</PageTransition>
            </main>
          </SiteWrapper>
          <Terminal />
          <ThemeToggle />
        </ThemeProvider>
      </body>
    </html>
  )
}
