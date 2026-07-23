import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { markdownToHtml } from '@/lib/markdown'
import ArticleSceneWrapper from '@/components/ArticleSceneWrapper'

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

  return (
    <>
      <div className="deco-bar">
        <span /><span /><span /><span /><span />
      </div>

      <div className="about-page">
        {/* left: identity panel with 3D scene */}
        <div className="about-page__identity" style={{ padding: 0, overflow: 'hidden', minHeight: '100%' }}>
          {/* 3D scene fills the top portion */}
          <div style={{ position: 'relative', height: '60%', minHeight: '280px', background: 'var(--black)' }}>
            <ArticleSceneWrapper slug="about-sphere" sceneOverride="sphere-cloud" />
            <div style={{
              position: 'absolute', inset: 0, zIndex: 2,
              background: 'linear-gradient(to bottom, transparent 50%, var(--surface) 100%)',
              pointerEvents: 'none',
            }} />
            <div style={{
              position: 'absolute', top: '1.25rem', left: '1.5rem', zIndex: 3,
              fontFamily: 'var(--mono)', fontSize: '0.6rem', color: 'var(--accent)', letterSpacing: '0.12em',
            }}>
              &gt; lscythe.3d
            </div>
          </div>

          {/* identity text below scene */}
          <div style={{ padding: '2rem 2rem 3rem', background: 'var(--surface)' }}>
            <h1 className="about-page__name">
              lscythe<span>_</span>
            </h1>
            <p className="about-page__role">android engineer / jakarta, id</p>

            <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {[
                { label: 'stack', value: 'kotlin / compose / kmp' },
                { label: 'employer', value: 'nocturn (fintech)' },
                { label: 'exp', value: '6 years' },
                { label: 'status', value: 'available' },
              ].map(({ label, value }) => (
                <div key={label} style={{ display: 'flex', gap: '1rem', fontFamily: 'var(--mono)', fontSize: '0.68rem' }}>
                  <span style={{ color: 'var(--dim)', width: '4.5rem', flexShrink: 0 }}>{label}</span>
                  <span style={{ color: label === 'status' ? 'var(--accent)' : 'var(--white)' }}>{value}</span>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '2rem', display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
              <a href="https://github.com/lscythe" className="article-link" target="_blank" rel="noopener noreferrer">github →</a>
              <a href="https://linkedin.com/in/lscythe" className="article-link" target="_blank" rel="noopener noreferrer">linkedin →</a>
              <a href="mailto:rendrati15c@gmail.com" className="article-link">email →</a>
            </div>
          </div>
        </div>

        {/* right: prose content */}
        <div className="about-page__content">
          <div style={{
            fontFamily: 'var(--mono)',
            fontSize: '0.65rem',
            color: 'var(--accent)',
            letterSpacing: '0.15em',
            marginBottom: '2.5rem',
          }}>
            &gt; about / lscythe
          </div>

          <div
            className="article-content"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </div>
    </>
  )
}
