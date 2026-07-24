'use client'

import { useTheme } from '@/components/ThemeProvider'
import ArticleSceneWrapper from '@/components/ArticleSceneWrapper'
import Reveal from '@/components/Reveal'
import ContactRow from '@/components/ContactRow'
import Link from 'next/link'

const contacts = [
  { prefix: '@', label: 'email', value: 'rendrati15c@gmail.com', href: 'mailto:rendrati15c@gmail.com' },
  { prefix: '$', label: 'github', value: 'github.com/lscythe', href: 'https://github.com/lscythe' },
  { prefix: '$', label: 'linkedin', value: 'linkedin.com/in/lscythe', href: 'https://linkedin.com/in/lscythe' },
  { prefix: '$', label: 'git', value: 'git.lscythe.dev/lscythe', href: 'https://git.lscythe.dev/lscythe' },
]

function ContactTerminal() {
  return (
    <>
      <div className="deco-bar"><span /><span /><span /><span /><span /></div>
      <div className="about-page">
        <div className="about-page__identity" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ position: 'relative', height: '60%', minHeight: '320px', background: 'var(--black)' }}>
            <ArticleSceneWrapper slug="contact-rings" sceneOverride="rings" />
            <div style={{ position: 'absolute', inset: 0, zIndex: 2, background: 'linear-gradient(to bottom, transparent 50%, var(--surface) 100%)', pointerEvents: 'none' }} />
          </div>
          <div style={{ padding: '2.5rem 2rem 3rem', background: 'var(--surface)' }}>
            <h1 style={{ fontSize: 'clamp(2rem, 4.5vw, 3rem)', fontWeight: 900, lineHeight: 1.1, letterSpacing: '-0.03em', textTransform: 'uppercase', marginBottom: '1rem' }}>
              GET IN<br />TOUCH
            </h1>
            <p style={{ fontFamily: 'var(--mono)', fontSize: '0.7rem', color: 'var(--dim)', letterSpacing: '0.08em', lineHeight: 1.6 }}>
              currently open to senior android / kmp roles and interesting side projects.
            </p>
          </div>
        </div>
        <div className="about-page__content">
          <Reveal>
            <div style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: 'var(--accent)', letterSpacing: '0.15em', marginBottom: '2.5rem' }}>
              &gt; contact / lscythe
            </div>
          </Reveal>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {contacts.map((contact, i) => (
              <Reveal key={contact.label} delay={i * 80}>
                <ContactRow {...contact} />
              </Reveal>
            ))}
          </div>
          <Reveal delay={400}>
            <div style={{ marginTop: '3rem', padding: '1.5rem', border: '1px solid var(--border)', background: 'rgba(0,255,136,0.02)', fontFamily: 'var(--mono)', fontSize: '0.72rem', lineHeight: 1.7, color: 'var(--dim)', letterSpacing: '0.03em' }}>
              <span style={{ color: 'var(--accent)' }}>&gt;</span> response time: usually within 24 hours.
            </div>
          </Reveal>
        </div>
      </div>
    </>
  )
}

function ContactVaporwave() {
  return (
    <div style={{ background: '#0d0015', minHeight: '100vh', paddingTop: '5rem' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto', padding: '3rem 2rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
        {/* Left */}
        <div>
          <p style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '0.6rem', letterSpacing: '0.25em', color: '#b967ff', textTransform: 'uppercase', marginBottom: '1rem' }}>
            &gt;&gt; contact
          </p>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 900, lineHeight: 0.9,
            letterSpacing: '-0.03em', textTransform: 'uppercase',
            background: 'linear-gradient(180deg, #ffffff 0%, #ff71ce 50%, #b967ff 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            filter: 'drop-shadow(0 0 20px rgba(255,113,206,0.5))',
            marginBottom: '2rem',
          }}>
            GET IN<br />TOUCH
          </h1>
          <p style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '0.72rem', color: '#9b89b8', lineHeight: 1.7, marginBottom: '2rem' }}>
            open to senior android / kmp roles and interesting side projects.
          </p>
          <div style={{ position: 'relative', height: '200px', border: '1px solid rgba(185,103,255,0.3)', overflow: 'hidden' }}>
            <ArticleSceneWrapper slug="contact-rings" sceneOverride="rings" />
          </div>
        </div>

        {/* Right */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', justifyContent: 'center' }}>
          {contacts.map(({ prefix, label, value, href }) => (
            <a key={label} href={href} style={{ textDecoration: 'none', display: 'block' }}>
              <div style={{
                padding: '1.25rem 1.5rem',
                border: '1px solid rgba(185,103,255,0.2)',
                background: 'rgba(185,103,255,0.04)',
                display: 'flex', alignItems: 'center', gap: '1rem',
                transition: 'all 0.15s',
              }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLDivElement
                  el.style.borderColor = 'rgba(255,113,206,0.5)'
                  el.style.background = 'rgba(255,113,206,0.06)'
                  el.style.boxShadow = '0 0 20px rgba(255,113,206,0.1)'
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLDivElement
                  el.style.borderColor = 'rgba(185,103,255,0.2)'
                  el.style.background = 'rgba(185,103,255,0.04)'
                  el.style.boxShadow = 'none'
                }}
              >
                <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '0.9rem', color: '#ff71ce', width: '1.2rem' }}>{prefix}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '0.6rem', letterSpacing: '0.15em', color: '#b967ff', textTransform: 'uppercase', marginBottom: '0.2rem' }}>{label}</div>
                  <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '0.75rem', color: '#f0e6ff' }}>{value}</div>
                </div>
                <span style={{ color: '#ff71ce', fontSize: '0.8rem' }}>→</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

function ContactRetro() {
  return (
    <div style={{ background: '#ffffff', minHeight: '100vh', color: '#000000' }}>
      <div style={{ background: '#e8e8e8', borderBottom: '1px solid #999', padding: '0.3rem 1rem', fontSize: '11px', fontFamily: '"Courier New", monospace', color: '#444', display: 'flex', justifyContent: 'space-between' }}>
        <span>lscythe.dev -- contact</span>
        <span>{new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</span>
      </div>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '1.5rem 1rem', display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
        <main style={{ flex: 1 }}>
          <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '1.8rem', fontWeight: 'bold', borderBottom: '2px solid #cccccc', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>
            Contact
          </h1>
          <p style={{ fontFamily: 'Georgia, serif', fontSize: '0.9rem', lineHeight: 1.75, color: '#222', marginBottom: '1.5rem' }}>
            I'm currently open to senior Android / KMP engineering roles and interesting side projects.
            Response time is usually within 24 hours.
          </p>

          <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'Georgia, serif', fontSize: '0.88rem', marginBottom: '1.5rem' }}>
            <tbody>
              {contacts.map(({ label, value, href }, i) => (
                <tr key={label} style={{ background: i % 2 === 0 ? '#ffffff' : '#f9f9f9', borderBottom: '1px solid #e0e0e0' }}>
                  <td style={{ padding: '0.6rem 0.75rem', fontWeight: 'bold', color: '#333', width: '100px', fontFamily: '"Trebuchet MS", sans-serif', fontSize: '0.82rem' }}>
                    {label.charAt(0).toUpperCase() + label.slice(1)}
                  </td>
                  <td style={{ padding: '0.6rem 0.75rem' }}>
                    <a href={href} style={{ color: '#0000ee', textDecoration: 'underline' }}>{value}</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <blockquote style={{ borderLeft: '3px solid #999', paddingLeft: '1rem', fontFamily: 'Georgia, serif', fontStyle: 'italic', color: '#555', fontSize: '0.88rem', margin: '1.5rem 0' }}>
            Please include tech stack and team size if reaching out about a role.
          </blockquote>
        </main>

        {/* Sidebar */}
        <aside style={{ width: '180px', flexShrink: 0, fontSize: '0.82rem', fontFamily: 'Georgia, serif' }}>
          {[
            { title: 'Navigation', content: (
              <ul style={{ listStyle: 'none', margin: 0, padding: '0.5rem 0.75rem', lineHeight: 2 }}>
                {[['/', 'Home'], ['/projects', 'Projects'], ['/blog', 'Blog'], ['/experience', 'Experience'], ['/about', 'About']].map(([href, label]) => (
                  <li key={href}><Link href={href} style={{ color: '#0000ee', textDecoration: 'underline' }}>{label}</Link></li>
                ))}
              </ul>
            )},
            { title: 'Status', content: (
              <div style={{ padding: '0.75rem' }}>
                <p style={{ margin: 0, color: '#006600', fontWeight: 'bold', fontSize: '0.8rem' }}>&#9679; Available for work</p>
                <p style={{ margin: '0.5rem 0 0', fontSize: '0.78rem', color: '#444' }}>Jakarta, Indonesia</p>
              </div>
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

export default function ContactPageClient() {
  const { theme, mounted } = useTheme()
  if (!mounted) return null
  if (theme === 'vaporwave') return <ContactVaporwave />
  if (theme === 'retro') return <ContactRetro />
  return <ContactTerminal />
}
