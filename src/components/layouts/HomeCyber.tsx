'use client'

import Link from 'next/link'
import type { Project } from '@/lib/content'

const NEON_COLORS = ['#ff003c', '#f7e500', '#00d9ff']

interface Props { featured: Project[] }

export default function HomeCyber({ featured }: Props) {
  return (
    <div style={{ background: '#0a0a0f', minHeight: '100vh', fontFamily: '"Inter", sans-serif', position: 'relative' }}>

      {/* Global scanlines overlay */}
      <div className="cyber-scanlines" />

      {/* Hero */}
      <section style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        padding: '2rem',
      }}>
        {/* Rain */}
        <div className="cyber-rain" />

        {/* Background city glow */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 80% 50% at 50% 60%, rgba(255,0,60,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          {/* Eyebrow */}
          <p style={{
            fontFamily: '"Inter", sans-serif',
            fontSize: '0.65rem',
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            color: '#00d9ff',
            textShadow: '0 0 10px #00d9ff',
            marginBottom: '1.5rem',
          }}>
            &gt;&gt; system online // android engineer // jakarta, id
          </p>

          {/* Glitch title */}
          <h1
            className="cyber-glitch cyber-glow-red"
            data-text="LSCYTHE"
            style={{
              fontSize: 'clamp(5rem, 18vw, 13rem)',
              fontWeight: 900,
              lineHeight: 0.85,
              letterSpacing: '-0.02em',
              textTransform: 'uppercase',
              color: '#ff003c',
              marginBottom: '1.5rem',
            }}
          >
            LSCYTHE
          </h1>

          {/* Subtitle */}
          <p
            className="cyber-glow-yellow"
            style={{
              fontFamily: '"Inter", sans-serif',
              fontSize: 'clamp(0.75rem, 1.8vw, 1.1rem)',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: '#f7e500',
              marginBottom: '3rem',
            }}
          >
            android // kotlin multiplatform // available for work
          </p>

          {/* Chips */}
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '3rem' }}>
            {[
              { label: 'android', color: '#ff003c' },
              { label: 'kmp', color: '#f7e500' },
              { label: 'open to work', color: '#00d9ff' },
            ].map(({ label, color }) => (
              <span key={label} style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: '0.65rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                padding: '0.45rem 1rem',
                border: `2px solid ${color}`,
                color,
                boxShadow: `0 0 12px ${color}88, inset 0 0 12px ${color}11`,
                background: `${color}0d`,
              }}>
                {label}
              </span>
            ))}
          </div>

          <Link href="/projects" style={{
            fontFamily: '"Inter", sans-serif',
            fontSize: '0.75rem',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            padding: '0.9rem 2.5rem',
            background: 'transparent',
            color: '#ff003c',
            border: '2px solid #ff003c',
            boxShadow: '0 0 20px rgba(255,0,60,0.4), inset 0 0 20px rgba(255,0,60,0.05)',
            display: 'inline-block',
            transition: 'box-shadow 0.2s',
          }}>
            VIEW WORK →
          </Link>
        </div>

        {/* Scroll hint */}
        <div style={{
          position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)',
          fontFamily: '"Inter", sans-serif', fontSize: '0.55rem', letterSpacing: '0.25em',
          color: 'rgba(255,0,60,0.5)', textTransform: 'uppercase', zIndex: 2,
        }}>
          scroll ↓
        </div>
      </section>

      {/* Featured Projects */}
      <section style={{ padding: '6rem 2rem', position: 'relative' }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg, #0a0a0f 0%, #12121a 50%, #0a0a0f 100%)',
        }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: '1100px', margin: '0 auto' }}>
          {/* Section header */}
          <div style={{ marginBottom: '4rem' }}>
            <p style={{
              fontFamily: '"Inter", sans-serif',
              fontSize: '0.6rem', letterSpacing: '0.35em',
              color: '#ff003c', textTransform: 'uppercase',
              textShadow: '0 0 10px rgba(255,0,60,0.5)',
              marginBottom: '0.75rem',
            }}>
              &gt;&gt; selected_work
            </p>
            <h2 style={{
              fontSize: 'clamp(2rem, 5vw, 4rem)',
              fontWeight: 900, textTransform: 'uppercase',
              letterSpacing: '-0.02em',
              color: '#e0e0e5',
              textShadow: '0 0 40px rgba(255,0,60,0.2)',
            }}>
              FEATURED WORK
            </h2>
          </div>

          {/* Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '1.5rem',
          }}>
            {featured.map((project, i) => {
              const color = NEON_COLORS[i % 3]
              return (
                <Link key={project.slug} href={`/projects/${project.slug}`} style={{
                  display: 'block',
                  padding: '2rem',
                  background: '#0f0f17',
                  border: `2px solid ${color}`,
                  boxShadow: `0 0 20px ${color}33`,
                  position: 'relative',
                  overflow: 'hidden',
                  textDecoration: 'none',
                  transition: 'box-shadow 0.2s',
                }}>
                  {/* Rain overlay on card */}
                  <div className="cyber-rain" style={{ opacity: 0.5 }} />

                  {/* Big number */}
                  <div style={{
                    position: 'absolute', top: '-0.5rem', right: '1rem',
                    fontSize: '6rem', fontWeight: 900, lineHeight: 1,
                    color,
                    opacity: 0.12,
                    userSelect: 'none',
                    fontFamily: '"Inter", sans-serif',
                  }}>
                    {String(i + 1).padStart(2, '0')}
                  </div>

                  <div style={{ position: 'relative', zIndex: 1 }}>
                    {/* Number label */}
                    <div style={{
                      fontFamily: '"Inter", sans-serif',
                      fontSize: '0.58rem', letterSpacing: '0.25em',
                      color, textTransform: 'uppercase',
                      textShadow: `0 0 8px ${color}`,
                      marginBottom: '1rem',
                    }}>
                      {String(i + 1).padStart(2, '0')} // project
                    </div>

                    <h3 style={{
                      fontSize: '1.2rem', fontWeight: 700,
                      textTransform: 'uppercase', letterSpacing: '0.02em',
                      marginBottom: '0.75rem',
                      color,
                      textShadow: `0 0 15px ${color}88`,
                    }}>
                      {project.title}
                    </h3>

                    <p style={{
                      fontSize: '0.82rem', color: 'rgba(224,224,229,0.6)',
                      lineHeight: 1.6, marginBottom: '1.25rem',
                    }}>
                      {project.description}
                    </p>

                    <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                      {project.tags.slice(0, 3).map(t => (
                        <span key={t} style={{
                          fontFamily: '"Inter", sans-serif',
                          fontSize: '0.55rem', letterSpacing: '0.12em',
                          textTransform: 'uppercase',
                          padding: '0.2rem 0.5rem',
                          border: `1px solid ${color}66`,
                          color: `${color}cc`,
                        }}>{t}</span>
                      ))}
                    </div>
                  </div>
                </Link>
              )
            })}

            {/* All projects link */}
            <Link href="/projects" style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: '2rem', minHeight: '180px',
              border: '2px dashed rgba(255,0,60,0.3)',
              background: 'rgba(255,0,60,0.03)',
              fontFamily: '"Inter", sans-serif',
              fontSize: '0.7rem', letterSpacing: '0.2em',
              color: 'rgba(255,0,60,0.6)', textTransform: 'uppercase',
              textDecoration: 'none',
            }}>
              ALL PROJECTS →
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid rgba(255,0,60,0.2)',
        padding: '2rem', textAlign: 'center',
        background: '#0a0a0f',
        fontFamily: '"Inter", sans-serif',
        fontSize: '0.6rem', letterSpacing: '0.15em',
        color: 'rgba(255,0,60,0.4)',
      }}>
        <span style={{ color: '#ff003c', textShadow: '0 0 8px rgba(255,0,60,0.5)' }}>LSCYTHE.DEV</span>
        {' '}// {new Date().getFullYear()} // ALL SYSTEMS OPERATIONAL
      </footer>
    </div>
  )
}
