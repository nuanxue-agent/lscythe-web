import type { Metadata, Viewport } from 'next'
import './globals.css'
import MouseSpotlight from '@/components/MouseSpotlight'
import NoiseOverlay from '@/components/NoiseOverlay'
import Terminal from '@/components/Terminal'

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
        <NoiseOverlay />
        <MouseSpotlight />
        <div className="site-wrapper">
          <div className="system-bar">
            <span>&gt;</span> system online - lscythe - android engineer - jakarta, id - <span>available for work</span>
          </div>
          <nav className="nav">
            <a href="/" className="nav__logo cursor">~/lscythe</a>
            <ul className="nav__links">
              <li><a href="/projects">projects</a></li>
              <li><a href="/blog">writing</a></li>
              <li><a href="/experience">experience</a></li>
              <li><a href="/about">about</a></li>
              <li><a href="/contact">contact</a></li>
            </ul>
          </nav>
          <main>{children}</main>
        </div>
        <Terminal />
      </body>
    </html>
  )
}
