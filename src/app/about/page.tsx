import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { markdownToHtml } from '@/lib/markdown'
import AboutPageClient from '@/components/layouts/AboutPageClient'

export const metadata = {
  title: 'about',
  description: 'android engineer from jakarta. building mobile systems, kmp libraries, and developer tooling.',
}

export default function AboutPage() {
  const aboutPath = path.join(process.cwd(), 'content', 'about.md')
  let html = ''

  if (fs.existsSync(aboutPath)) {
    const raw = fs.readFileSync(aboutPath, 'utf8')
    const { content } = matter(raw)
    html = markdownToHtml(content)
  }

  return <AboutPageClient html={html} />
}
