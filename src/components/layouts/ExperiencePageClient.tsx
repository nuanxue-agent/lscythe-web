'use client'

import { useTheme } from '@/components/ThemeProvider'
import Reveal from '@/components/Reveal'
import GlitchText from '@/components/GlitchText'
import Link from 'next/link'

const experiences = [
  {
    company: 'NOCTURN',
    role: 'Senior Android Engineer',
    period: '2022 – present',
    tags: ['kotlin', 'kmp', 'compose', 'gradle'],
    bullets: [
      'Built core payment SDK used by 500K+ monthly active users, handling sensitive financial transactions',
      'Led Kotlin Multiplatform migration — shared business logic across Android, iOS, and web, reducing code duplication by 40%',
      'Architected convention-plugin based build-logic system with composite builds, cutting average build time from 4min to 90sec',
      'Mentored 3 junior engineers on KMP patterns, Compose best practices, and Gradle plugin authoring',
    ],
  },
  {
    company: 'VORTEX LABS',
    role: 'Android Developer',
    period: '2020 – 2022',
    tags: ['kotlin', 'jetpack', 'websocket', 'compose'],
    bullets: [
      'Built real-time multiplayer features with WebSocket infrastructure — synchronized game state across 10K+ concurrent users',
      'Migrated 60% of legacy View-based UI to Jetpack Compose, improving frame render time by 25%',
      'Integrated Firebase analytics and crash reporting, reducing production crash rate from 2.3% to 0.4%',
      'Worked closely with backend team to optimize API response times and reduce payload sizes',
    ],
  },
  {
    company: 'AXIOM DIGITAL',
    role: 'Junior Android Developer',
    period: '2019 – 2020',
    tags: ['kotlin', 'java', 'retrofit', 'mvvm'],
    bullets: [
      'First professional Android role — built e-commerce product catalog and checkout flows using MVVM + LiveData',
      'Migrated 30+ Java Activity classes to Kotlin, modernizing codebase and reducing boilerplate by ~35%',
      'Set up CI/CD pipeline with GitHub Actions — automated lint checks, unit tests, and release builds',
    ],
  },
]

/* ── Terminal ── */
function ExperienceTerminal() {
  return (
    <div className="list-page">
      <Reveal className="list-page__sidebar">
        <p className="section-heading__num prompt">experience</p>
        <h1>timeline</h1>
        <p>6 years building android apps, kmp libraries, and mobile infrastructure.</p>
      </Reveal>

      <div className="list-page__content" style={{ padding: '3rem 0' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 2rem' }}>
          {experiences.map((exp, i) => (
            <Reveal key={exp.company} delay={i * 100}>
              <div style={{ position: 'relative', paddingLeft: '3rem', paddingBottom: '3rem', borderLeft: '1px solid var(--border)' }}>
                <div style={{ position: 'absolute', left: '-5px', top: '0.5rem', width: '9px', height: '9px', borderRadius: '50%', background: 'var(--accent)', boxShadow: '0 0 12px var(--accent)' }} />
                <div style={{ position: 'absolute', left: '-5.5rem', top: '0.3rem', fontFamily: 'var(--mono)', fontSize: '0.68rem', color: 'var(--accent)', letterSpacing: '0.1em', textAlign: 'right', width: '4.5rem' }}>
                  {exp.period.split('–')[0].trim()}
                </div>
                <div>
                  <h2 style={{ fontSize: '1.8rem', fontWeight: 900, letterSpacing: '-0.02em', marginBottom: '0.5rem', cursor: 'default' }}>
                    <GlitchText text={exp.company} />
                  </h2>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: '0.75rem', color: 'var(--dim)', letterSpacing: '0.08em', marginBottom: '0.25rem' }}>
                    {exp.role} · {exp.period}
                  </div>
                  <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                    {exp.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
                  </div>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {exp.bullets.map((bullet, idx) => (
                      <li key={idx} style={{ fontSize: '0.88rem', lineHeight: 1.7, color: '#c8c4be', paddingLeft: '1.25rem', position: 'relative' }}>
                        <span style={{ position: 'absolute', left: 0, color: 'var(--accent)', fontFamily: 'var(--mono)', fontSize: '0.7rem' }}>→</span>
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ── Vaporwave ── */
function ExperienceVaporwave() {
  return (
    <div style={{ background: '#0d0015', minHeight: '100vh', paddingTop: '5rem' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto', padding: '4rem 2rem' }}>
        {/* Header */}
        <div style={{ marginBottom: '4rem' }}>
          <p style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '0.6rem', letterSpacing: '0.3em', color: '#b967ff', textTransform: 'uppercase', marginBottom: '1rem' }}>
            &gt;&gt; career_timeline
          </p>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 7vw, 5rem)', fontWeight: 900,
            lineHeight: 0.9, letterSpacing: '-0.03em', textTransform: 'uppercase',
            background: 'linear-gradient(180deg, #ffffff 0%, #ff71ce 50%, #b967ff 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            filter: 'drop-shadow(0 0 30px rgba(255,113,206,0.5))',
            marginBottom: '1rem',
          }}>
            EXPERIENCE
          </h1>
          <p style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '0.72rem', color: '#9b89b8', letterSpacing: '0.1em' }}>
            6 years / android / kmp / jakarta
          </p>
        </div>

        {/* Timeline */}
        <div style={{ position: 'relative' }}>
          {/* Vertical line */}
          <div style={{
            position: 'absolute', left: '0', top: 0, bottom: 0, width: '1px',
            background: 'linear-gradient(180deg, #ff71ce, #b967ff, #01cdfe)',
            opacity: 0.4,
          }} />

          {experiences.map((exp, i) => (
            <div key={exp.company} style={{ position: 'relative', paddingLeft: '3rem', paddingBottom: '4rem' }}>
              {/* Dot */}
              <div style={{
                position: 'absolute', left: '-6px', top: '0.5rem',
                width: '13px', height: '13px', borderRadius: '50%',
                background: i === 0 ? '#ff71ce' : i === 1 ? '#b967ff' : '#01cdfe',
                boxShadow: `0 0 16px ${i === 0 ? '#ff71ce' : i === 1 ? '#b967ff' : '#01cdfe'}`,
                border: '2px solid #0d0015',
              }} />

              {/* Period badge */}
              <div style={{
                display: 'inline-block',
                fontFamily: '"JetBrains Mono", monospace', fontSize: '0.58rem',
                letterSpacing: '0.15em', textTransform: 'uppercase',
                padding: '0.2rem 0.6rem',
                border: `1px solid ${i === 0 ? 'rgba(255,113,206,0.4)' : i === 1 ? 'rgba(185,103,255,0.4)' : 'rgba(1,205,254,0.4)'}`,
                color: i === 0 ? '#ff71ce' : i === 1 ? '#b967ff' : '#01cdfe',
                marginBottom: '0.75rem',
              }}>
                {exp.period}
              </div>

              {/* Company */}
              <h2 style={{
                fontSize: 'clamp(1.5rem, 4vw, 2.2rem)', fontWeight: 900,
                letterSpacing: '-0.02em', textTransform: 'uppercase',
                color: i === 0 ? '#ff71ce' : i === 1 ? '#b967ff' : '#01cdfe',
                textShadow: `0 0 20px ${i === 0 ? 'rgba(255,113,206,0.4)' : i === 1 ? 'rgba(185,103,255,0.4)' : 'rgba(1,205,254,0.4)'}`,
                marginBottom: '0.4rem',
              }}>
                {exp.company}
              </h2>

              {/* Role */}
              <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '0.72rem', color: '#9b89b8', marginBottom: '1rem' }}>
                {exp.role}
              </div>

              {/* Tags */}
              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
                {exp.tags.map(tag => (
                  <span key={tag} style={{
                    fontFamily: '"JetBrains Mono", monospace', fontSize: '0.6rem',
                    letterSpacing: '0.1em', padding: '0.2rem 0.5rem',
                    border: '1px solid rgba(185,103,255,0.35)', color: '#b967ff',
                  }}>{tag}</span>
                ))}
              </div>

              {/* Bullets */}
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {exp.bullets.map((bullet, idx) => (
                  <li key={idx} style={{ display: 'flex', gap: '0.75rem', fontSize: '0.85rem', lineHeight: 1.7, color: '#c8b8e8' }}>
                    <span style={{ color: i === 0 ? '#ff71ce' : i === 1 ? '#b967ff' : '#01cdfe', flexShrink: 0, fontFamily: '"JetBrains Mono", monospace', fontSize: '0.7rem', marginTop: '0.25rem' }}>▸</span>
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ── Retro ── */
function ExperienceRetro() {
  return (
    <div style={{ background: '#ffffff', minHeight: '100vh', color: '#000000' }}>
      {/* Top bar */}
      <div style={{ background: '#e8e8e8', borderBottom: '1px solid #999', padding: '0.3rem 1rem', fontSize: '11px', fontFamily: '"Courier New", monospace', color: '#444', display: 'flex', justifyContent: 'space-between' }}>
        <span>lscythe.dev -- work experience</span>
        <span>est. 2019</span>
      </div>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '1.5rem 1rem', display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
        {/* Main */}
        <main style={{ flex: 1 }}>
          <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '1.8rem', fontWeight: 'bold', borderBottom: '2px solid #cccccc', paddingBottom: '0.5rem', marginBottom: '0.5rem' }}>
            Work Experience
          </h1>
          <p style={{ fontFamily: 'Georgia, serif', fontSize: '0.85rem', color: '#555', fontStyle: 'italic', marginBottom: '2rem' }}>
            6 years of professional Android development
          </p>

          {experiences.map((exp, i) => (
            <div key={exp.company} style={{ marginBottom: '2.5rem', paddingBottom: '2.5rem', borderBottom: i < experiences.length - 1 ? '1px dotted #cccccc' : 'none' }}>
              {/* Company header */}
              <table style={{ width: '100%', marginBottom: '0.5rem', borderCollapse: 'collapse' }}>
                <tbody>
                  <tr>
                    <td style={{ fontFamily: 'Georgia, serif', fontSize: '1.2rem', fontWeight: 'bold', color: '#000' }}>
                      {exp.company.charAt(0) + exp.company.slice(1).toLowerCase()}
                    </td>
                    <td style={{ textAlign: 'right', fontFamily: '"Courier New", monospace', fontSize: '0.78rem', color: '#555', whiteSpace: 'nowrap' }}>
                      {exp.period}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ fontFamily: 'Georgia, serif', fontSize: '0.88rem', color: '#444', fontStyle: 'italic' }}>
                      {exp.role}
                    </td>
                    <td />
                  </tr>
                </tbody>
              </table>

              {/* Tags */}
              <div style={{ marginBottom: '0.75rem', fontSize: '0.78rem', fontFamily: '"Courier New", monospace', color: '#555' }}>
                Keywords: {exp.tags.join(', ')}
              </div>

              {/* Bullets */}
              <ul style={{ margin: 0, paddingLeft: '1.5rem', fontFamily: 'Georgia, serif', fontSize: '0.88rem', lineHeight: 1.75, color: '#222' }}>
                {exp.bullets.map((bullet, idx) => (
                  <li key={idx} style={{ marginBottom: '0.4rem' }}>{bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </main>

        {/* Sidebar */}
        <aside style={{ width: '180px', flexShrink: 0, fontSize: '0.82rem', fontFamily: 'Georgia, serif' }}>
          {[
            { title: 'Navigation', content: (
              <ul style={{ listStyle: 'none', margin: 0, padding: '0.5rem 0.75rem', lineHeight: 2 }}>
                {[['/', 'Home'], ['/projects', 'Projects'], ['/blog', 'Blog'], ['/contact', 'Contact'], ['/about', 'About']].map(([href, label]) => (
                  <li key={href}><Link href={href} style={{ color: '#0000ee', textDecoration: 'underline' }}>{label}</Link></li>
                ))}
              </ul>
            )},
            { title: 'Summary', content: (
              <div style={{ padding: '0.75rem' }}>
                <p style={{ margin: 0, fontSize: '0.78rem', lineHeight: 1.6, color: '#333' }}>
                  6 yrs exp.<br />
                  Senior Android<br />
                  KMP specialist<br />
                  Jakarta, ID
                </p>
                <p style={{ margin: '0.5rem 0 0', color: '#006600', fontWeight: 'bold', fontSize: '0.78rem' }}>&#9679; Available</p>
              </div>
            )},
            { title: 'Stack', content: (
              <ul style={{ listStyle: 'disc', margin: 0, padding: '0.5rem 0.75rem 0.5rem 1.5rem', lineHeight: 1.9, color: '#333' }}>
                {['Kotlin', 'Compose', 'KMP', 'Gradle', 'Coroutines'].map(s => (
                  <li key={s} style={{ fontSize: '0.78rem' }}>{s}</li>
                ))}
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

export default function ExperiencePageClient() {
  const { theme } = useTheme()
  if (theme === 'vaporwave') return <ExperienceVaporwave />
  if (theme === 'retro') return <ExperienceRetro />
  return <ExperienceTerminal />
}
