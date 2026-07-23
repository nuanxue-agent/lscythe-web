import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'lscythe — form, type, function',
  description: 'designer & developer working at the intersection of form, type, and function.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <nav className="nav">
          <a href="/" className="nav__logo">lscythe</a>
          <ul className="nav__links">
            <li><a href="/projects">objects</a></li>
            <li><a href="/blog">writing</a></li>
            <li><a href="/about">about</a></li>
          </ul>
        </nav>
        {children}
      </body>
    </html>
  )
}
