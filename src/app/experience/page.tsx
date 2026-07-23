import Reveal from '@/components/Reveal'
import GlitchText from '@/components/GlitchText'

export const metadata = {
  title: 'experience',
  description: 'work history and professional experience',
}

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

export default function ExperiencePage() {
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
              <div
                style={{
                  position: 'relative',
                  paddingLeft: '3rem',
                  paddingBottom: '3rem',
                  borderLeft: '1px solid var(--border)',
                }}
              >
                {/* timeline dot */}
                <div
                  style={{
                    position: 'absolute',
                    left: '-5px',
                    top: '0.5rem',
                    width: '9px',
                    height: '9px',
                    borderRadius: '50%',
                    background: 'var(--accent)',
                    boxShadow: '0 0 12px var(--accent)',
                  }}
                />

                {/* year badge */}
                <div
                  style={{
                    position: 'absolute',
                    left: '-5.5rem',
                    top: '0.3rem',
                    fontFamily: 'var(--mono)',
                    fontSize: '0.68rem',
                    color: 'var(--accent)',
                    letterSpacing: '0.1em',
                    textAlign: 'right',
                    width: '4.5rem',
                  }}
                >
                  {exp.period.split('–')[0].trim()}
                </div>

                {/* content */}
                <div>
                  <h2
                    style={{
                      fontSize: '1.8rem',
                      fontWeight: 900,
                      letterSpacing: '-0.02em',
                      marginBottom: '0.5rem',
                      cursor: 'default',
                    }}
                  >
                    <GlitchText text={exp.company} />
                  </h2>

                  <div
                    style={{
                      fontFamily: 'var(--mono)',
                      fontSize: '0.75rem',
                      color: 'var(--dim)',
                      letterSpacing: '0.08em',
                      marginBottom: '0.25rem',
                    }}
                  >
                    {exp.role} · {exp.period}
                  </div>

                  <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                    {exp.tags.map(tag => (
                      <span key={tag} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <ul
                    style={{
                      listStyle: 'none',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.75rem',
                    }}
                  >
                    {exp.bullets.map((bullet, idx) => (
                      <li
                        key={idx}
                        style={{
                          fontSize: '0.88rem',
                          lineHeight: 1.7,
                          color: '#c8c4be',
                          paddingLeft: '1.25rem',
                          position: 'relative',
                        }}
                      >
                        <span
                          style={{
                            position: 'absolute',
                            left: 0,
                            color: 'var(--accent)',
                            fontFamily: 'var(--mono)',
                            fontSize: '0.7rem',
                          }}
                        >
                          →
                        </span>
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
