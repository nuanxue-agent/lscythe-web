import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: { default: 'lscythe — rendra prasetia', template: '%s — lscythe' },
  description: 'Android engineer from Jakarta. Building mobile systems, KMP libraries, and developer tooling.',
  themeColor: '#080808',
}

export const viewport: Viewport = {
  themeColor: '#080808',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="site-wrapper">
          <div className="system-bar">
            <span>&gt;</span> system online &mdash; rendra prasetia &mdash; android engineer &mdash; jakarta, id &mdash; <span>available for work</span>
          </div>
          <nav className="nav">
            <a href="/" className="nav__logo cursor">~/lscythe</a>
            <ul className="nav__links">
              <li><a href="/projects">projects</a></li>
              <li><a href="/blog">writing</a></li>
              <li><a href="/about">about</a></li>
            </ul>
          </nav>
          <main>{children}</main>
        </div>
      </body>
    </html>
  )
}
