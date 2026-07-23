import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { markdownToHtml } from '@/lib/markdown'

export const metadata = {
  title: 'about - lscythe',
  description: 'designer & developer. form, type, function.',
}

export default function AboutPage() {
  // Read content/about.md - fall back to default copy if missing
  const aboutPath = path.join(process.cwd(), 'content', 'about.md')
  let name = 'l. scythe'
  let role = 'designer & developer'
  let html = ''

  if (fs.existsSync(aboutPath)) {
    const raw = fs.readFileSync(aboutPath, 'utf8')
    const { data, content } = matter(raw)
    name = data.name ?? name
    role = data.role ?? role
    html = markdownToHtml(content)
  } else {
    html = markdownToHtml(
      `i work at the intersection of structured systems and expressive form.\n\n` +
      `trained in graphic design and self-taught in software, i believe the best interfaces ` +
      `are built from the same principles as the best posters: **clarity**, **hierarchy**, and **intention**.\n\n` +
      `currently available for select projects.`
    )
  }

  return (
    <>
      <div className="deco-bar">
        <span /><span /><span /><span /><span />
      </div>

      <div className="about-page">
        {/* left: identity panel */}
        <div className="about-page__identity">
          {/* decorative geometry */}
          <div style={{ marginBottom: 'auto', paddingTop: '2rem' }}>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              border: '2px solid var(--ochre)',
              marginBottom: '1rem',
            }} />
            <div style={{
              width: '60px',
              height: '60px',
              background: 'var(--red)',
            }} />
          </div>

          <div>
            <h1 className="about-page__name">{name}</h1>
            <p className="about-page__role">{role}</p>
          </div>
        </div>

        {/* right: prose */}
        <div className="about-page__content">
          <div style={{
            fontSize: '0.65rem',
            letterSpacing: '0.2em',
            opacity: 0.4,
            marginBottom: '2rem',
          }}>
            01 / about
          </div>

          <div
            className="article-content"
            dangerouslySetInnerHTML={{ __html: html }}
          />

          {/* contact strip */}
          <div style={{
            marginTop: '4rem',
            paddingTop: '2rem',
            borderTop: '2px solid var(--ink)',
            display: 'flex',
            gap: '1rem',
            flexWrap: 'wrap',
          }}>
            <a href="mailto:hello@lscythe.com" className="article-link">
              email →
            </a>
            <a
              href="https://github.com/lscythe"
              className="article-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              github →
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
