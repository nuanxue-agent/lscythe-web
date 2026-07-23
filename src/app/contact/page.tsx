import Reveal from '@/components/Reveal'
import ArticleSceneWrapper from '@/components/ArticleSceneWrapper'
import ContactRow from '@/components/ContactRow'

export const metadata = {
  title: 'contact',
  description: 'get in touch — email, github, linkedin',
}

const contacts = [
  { prefix: '@', label: 'email', value: 'rendrati15c@gmail.com', href: 'mailto:rendrati15c@gmail.com' },
  { prefix: '$', label: 'github', value: 'github.com/lscythe', href: 'https://github.com/lscythe' },
  { prefix: '$', label: 'linkedin', value: 'linkedin.com/in/lscythe', href: 'https://linkedin.com/in/lscythe' },
  { prefix: '$', label: 'git', value: 'git.lscythe.dev/lscythe', href: 'https://git.lscythe.dev/lscythe' },
]

export default function ContactPage() {
  return (
    <>
      <div className="deco-bar">
        <span /><span /><span /><span /><span />
      </div>

      <div className="about-page">
        {/* left: 3D scene + heading */}
        <div className="about-page__identity" style={{ padding: 0, overflow: 'hidden', minHeight: '100%' }}>
          <div style={{ position: 'relative', height: '60%', minHeight: '320px', background: 'var(--black)' }}>
            <ArticleSceneWrapper slug="contact-rings" sceneOverride="rings" />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                zIndex: 2,
                background: 'linear-gradient(to bottom, transparent 50%, var(--surface) 100%)',
                pointerEvents: 'none',
              }}
            />
          </div>

          <div style={{ padding: '2.5rem 2rem 3rem', background: 'var(--surface)' }}>
            <h1
              style={{
                fontSize: 'clamp(2rem, 4.5vw, 3rem)',
                fontWeight: 900,
                lineHeight: 1.1,
                letterSpacing: '-0.03em',
                textTransform: 'uppercase',
                marginBottom: '1rem',
              }}
            >
              GET IN
              <br />
              TOUCH
            </h1>
            <p
              style={{
                fontFamily: 'var(--mono)',
                fontSize: '0.7rem',
                color: 'var(--dim)',
                letterSpacing: '0.08em',
                lineHeight: 1.6,
              }}
            >
              currently open to senior android / kmp roles and interesting side projects.
            </p>
          </div>
        </div>

        {/* right: contact list */}
        <div className="about-page__content">
          <Reveal>
            <div
              style={{
                fontFamily: 'var(--mono)',
                fontSize: '0.65rem',
                color: 'var(--accent)',
                letterSpacing: '0.15em',
                marginBottom: '2.5rem',
              }}
            >
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
            <div
              style={{
                marginTop: '3rem',
                padding: '1.5rem',
                border: '1px solid var(--border)',
                background: 'rgba(0,255,136,0.02)',
                fontFamily: 'var(--mono)',
                fontSize: '0.72rem',
                lineHeight: 1.7,
                color: 'var(--dim)',
                letterSpacing: '0.03em',
              }}
            >
              <span style={{ color: 'var(--accent)' }}>&gt;</span> response time: usually within 24 hours. if you&apos;re
              reaching out about a role, please include tech stack and team size.
            </div>
          </Reveal>
        </div>
      </div>
    </>
  )
}
