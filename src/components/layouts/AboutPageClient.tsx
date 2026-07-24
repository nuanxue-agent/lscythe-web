'use client'

import { useTheme } from '@/components/ThemeProvider'
import ArticleSceneWrapper from '@/components/ArticleSceneWrapper'
import Reveal from '@/components/Reveal'
import Link from 'next/link'

function AboutTerminal({ html }: { html: string }) {
  return (
    <>
      <div className="deco-bar"><span /><span /><span /><span /><span /></div>
      <div className="about-page">
        <div className="about-page__identity" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ position: 'relative', height: '60%', minHeight: '280px', background: 'var(--black)' }}>
            <ArticleSceneWrapper slug="about-sphere" sceneOverride="sphere-cloud" />
            <div style={{ position: 'absolute', inset: 0, zIndex: 2, background: 'linear-gradient(to bottom, transparent 50%, var(--surface) 100%)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', top: '1.25rem', left: '1.5rem', zIndex: 3, fontFamily: 'var(--mono)', fontSize: '0.6rem', color: 'var(--accent)', letterSpacing: '0.12em' }}>
              &gt; lscythe.3d
            </div>
          </div>
          <div style={{ padding: '2rem 2rem 3rem', background: 'var(--surface)' }}>
            <h1 className="about-page__name">lscythe<span>_</span></h1>
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
        <div className="about-page__content">
          <div style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: 'var(--accent)', letterSpacing: '0.15em', marginBottom: '2.5rem' }}>
            &gt; about / lscythe
          </div>
          <div className="article-content" dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      </div>
    </>
  )
}

function AboutVaporwave({ html }: { html: string }) {
  return (
    <div style={{ background: '#0d0015', minHeight: '100vh', paddingTop: '5rem' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '3rem 2rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
        <div>
          <p style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '0.6rem', letterSpacing: '0.25em', color: '#b967ff', textTransform: 'uppercase', marginBottom: '1rem' }}>
            &gt;&gt; about
          </p>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 900, lineHeight: 0.9,
            letterSpacing: '-0.03em', textTransform: 'uppercase',
            background: 'linear-gradient(180deg, #ffffff 0%, #ff71ce 50%, #b967ff 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            filter: 'drop-shadow(0 0 20px rgba(255,113,206,0.5))',
            marginBottom: '2rem',
          }}>
            LSCYTHE
          </h1>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
            {[
              { label: 'role', value: 'android engineer' },
              { label: 'location', value: 'jakarta, id' },
              { label: 'stack', value: 'kotlin / compose / kmp' },
              { label: 'employer', value: 'nocturn' },
              { label: 'status', value: 'available' },
            ].map(({ label, value }) => (
              <div key={label} style={{ display: 'flex', gap: '1rem', fontFamily: '"JetBrains Mono", monospace', fontSize: '0.7rem' }}>
                <span style={{ color: '#b967ff', width: '5rem', flexShrink: 0 }}>{label}</span>
                <span style={{ color: label === 'status' ? '#ff71ce' : '#f0e6ff' }}>{value}</span>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            {[
              { href: 'https://github.com/lscythe', label: 'github' },
              { href: 'https://linkedin.com/in/lscythe', label: 'linkedin' },
              { href: 'mailto:rendrati15c@gmail.com', label: 'email' },
            ].map(({ href, label }) => (
              <a key={label} href={href} style={{
                fontFamily: '"JetBrains Mono", monospace', fontSize: '0.65rem',
                letterSpacing: '0.12em', textTransform: 'uppercase', padding: '0.4rem 1rem',
                border: '1px solid rgba(255,113,206,0.4)', color: '#ff71ce',
                boxShadow: '0 0 8px rgba(255,113,206,0.15)', textDecoration: 'none',
              }}>
                {label} →
              </a>
            ))}
          </div>
        </div>
        <div style={{ color: '#c8b8e8', fontFamily: '"Inter", sans-serif', fontSize: '0.9rem', lineHeight: 1.8 }}
          dangerouslySetInnerHTML={{ __html: html || '<p>Android engineer from Jakarta. Building mobile systems, KMP libraries, and developer tooling at Nocturn since 2022.</p>' }}
        />
      </div>
    </div>
  )
}

function AboutRetro({ html }: { html: string }) {
  return (
    <div style={{ background: '#ffffff', minHeight: '100vh', color: '#000000' }}>
      <div style={{ background: '#e8e8e8', borderBottom: '1px solid #999', padding: '0.3rem 1rem', fontSize: '11px', fontFamily: '"Courier New", monospace', color: '#444', display: 'flex', justifyContent: 'space-between' }}>
        <span>lscythe.dev -- about me</span>
        <span>{new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</span>
      </div>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '1.5rem 1rem', display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
        <main style={{ flex: 1 }}>
          <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '1.8rem', fontWeight: 'bold', borderBottom: '2px solid #cccccc', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>
            About Me
          </h1>
          <div style={{ fontFamily: 'Georgia, serif', fontSize: '0.9rem', lineHeight: 1.75, color: '#222' }}
            dangerouslySetInnerHTML={{ __html: html || `<p>Hi. I&apos;m an Android engineer based in Jakarta, Indonesia. I build Android applications, KMP libraries, and developer tooling at Nocturn. I care about build performance, clean architecture, and software that does exactly what it says.</p>` }}
          />
          <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '1.2rem', fontWeight: 'bold', borderBottom: '1px solid #ccc', paddingBottom: '0.4rem', margin: '2rem 0 1rem' }}>
            Skills
          </h2>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'Georgia, serif', fontSize: '0.85rem' }}>
            {[
              ['Kotlin', 'Expert'],
              ['Jetpack Compose', 'Expert'],
              ['Kotlin Multiplatform', 'Advanced'],
              ['Gradle / Build Systems', 'Advanced'],
              ['Android Architecture', 'Expert'],
            ].map(([skill, level], i) => (
              <tr key={skill} style={{ background: i % 2 === 0 ? '#ffffff' : '#f9f9f9', borderBottom: '1px solid #e0e0e0' }}>
                <td style={{ padding: '0.4rem 0.6rem', color: '#222' }}>{skill}</td>
                <td style={{ padding: '0.4rem 0.6rem', color: '#006600', fontFamily: '"Courier New", monospace', fontSize: '0.8rem' }}>{level}</td>
              </tr>
            ))}
          </table>
        </main>

        <aside style={{ width: '180px', flexShrink: 0, fontSize: '0.82rem', fontFamily: 'Georgia, serif' }}>
          {[
            { title: 'Navigation', content: (
              <ul style={{ listStyle: 'none', margin: 0, padding: '0.5rem 0.75rem', lineHeight: 2 }}>
                {[['/', 'Home'], ['/projects', 'Projects'], ['/blog', 'Blog'], ['/experience', 'Experience'], ['/contact', 'Contact']].map(([href, label]) => (
                  <li key={href}><Link href={href} style={{ color: '#0000ee', textDecoration: 'underline' }}>{label}</Link></li>
                ))}
              </ul>
            )},
            { title: 'Contact', content: (
              <ul style={{ listStyle: 'none', margin: 0, padding: '0.5rem 0.75rem', lineHeight: 2 }}>
                <li><a href="mailto:rendrati15c@gmail.com" style={{ color: '#0000ee', textDecoration: 'underline' }}>Email</a></li>
                <li><a href="https://github.com/lscythe" style={{ color: '#0000ee', textDecoration: 'underline' }}>GitHub</a></li>
                <li><a href="https://linkedin.com/in/lscythe" style={{ color: '#0000ee', textDecoration: 'underline' }}>LinkedIn</a></li>
              </ul>
            )},
          ].map(({ title, content }) => (
            <div key={title} style={{ border: '1px solid #cccccc', marginBottom: '1rem', background: '#f9f9f9' }}>
              <div style={{ background: '#dddddd', borderBottom: '1px solid #ccc', padding: '0.3rem 0.6rem', fontWeight: 'bold', fontSize: '0.8rem', fontFamily: '"Trebuchet MS", sans-serif', color: '#333' }}>
                {title}
              </div>
              {content}
            </div>
          ))}
        </aside>
      </div>

      <div style={{ borderTop: '1px solid #ccc', background: '#f0f0f0', padding: '0.75rem 1rem', textAlign: 'center', fontSize: '0.75rem', fontFamily: '"Courier New", monospace', color: '#666', marginTop: '2rem' }}>
        lscythe.dev &copy; {new Date().getFullYear()} &nbsp;|&nbsp; best viewed in 1024x768
      </div>
    </div>
  )
}

export default function AboutPageClient({ html }: { html: string }) {
  const { theme } = useTheme()
  if (theme === 'vaporwave') return <AboutVaporwave html={html} />
  if (theme === 'retro') return <AboutRetro html={html} />
  return <AboutTerminal html={html} />
}
