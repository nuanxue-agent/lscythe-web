'use client'

import Link from 'next/link'
import type { Project } from '@/lib/content'

const NEON_COLORS = ['#ff003c', '#f7e500', '#00d9ff']

interface Props { projects: Project[] }

export default function ProjectsCyber({ projects }: Props) {
  return (
    <div style={{ background: '#0a0a0f', minHeight: '100vh', fontFamily: '"Inter", sans-serif', position: 'relative' }}>
      <div className="cyber-scanlines" />

      {/* Header */}
      <section style={{ padding: '8rem 2rem 4rem', position: 'relative' }}>
        <div className="cyber-rain" />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '1100px', margin: '0 auto' }}>
          <p style={{
            fontFamily: '"Inter", sans-serif',
            fontSize: '0.6rem', letterSpacing: '0.35em',
            color: '#ff003c', textTransform: 'uppercase',
            textShadow: '0 0 10px rgba(255,0,60,0.5)',
            marginBottom: '0.75rem',
          }}>
            &gt;&gt; projects_index
          </p>
          <h1
            className="cyber-glitch cyber-glow-red"
            data-text="PROJECTS"
            style={{
              fontSize: 'clamp(3rem, 10vw, 7rem)',
              fontWeight: 900, textTransform: 'uppercase',
              letterSpacing: '-0.02em',
              color: '#ff003c',
              marginBottom: '1rem',
            }}
          >
            PROJECTS
          </h1>
          <p style={{
            fontSize: '0.82rem',
            color: 'rgba(224,224,229,0.5)',
            letterSpacing: '0.05em',
          }}>
            {projects.length} systems deployed
          </p>
        </div>
      </section>

      {/* Grid */}
      <section style={{ padding: '2rem 2rem 6rem' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '1.5rem',
          }}>
            {projects.map((project, i) => {
              const color = NEON_COLORS[i % 3]
              return (
                <Link
                  key={project.slug}
                  href={`/projects/${project.slug}`}
                  style={{
                    display: 'block',
                    padding: '2rem',
                    background: '#0f0f17',
                    border: `2px solid ${color}`,
                    boxShadow: `0 0 16px ${color}22`,
                    position: 'relative',
                    overflow: 'hidden',
                    textDecoration: 'none',
                    transition: 'box-shadow 0.2s, border-color 0.2s',
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget
                    el.style.boxShadow = `0 0 40px ${color}66, 0 0 80px ${color}22`
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget
                    el.style.boxShadow = `0 0 16px ${color}22`
                  }}
                >
                  {/* Big bg number */}
                  <div style={{
                    position: 'absolute', top: '-0.5rem', right: '0.75rem',
                    fontSize: '7rem', fontWeight: 900, lineHeight: 1,
                    color,
                    opacity: 0.1,
                    userSelect: 'none',
                    fontFamily: '"Inter", sans-serif',
                    pointerEvents: 'none',
                  }}>
                    {String(i + 1).padStart(2, '0')}
                  </div>

                  <div style={{ position: 'relative', zIndex: 1 }}>
                    {/* Index */}
                    <div style={{
                      fontFamily: '"Inter", sans-serif',
                      fontSize: '0.55rem', letterSpacing: '0.25em',
                      color, textTransform: 'uppercase',
                      textShadow: `0 0 8px ${color}`,
                      marginBottom: '1rem',
                    }}>
                      {String(i + 1).padStart(2, '0')} // system
                    </div>

                    <h2 style={{
                      fontSize: '1.1rem', fontWeight: 700,
                      textTransform: 'uppercase', letterSpacing: '0.02em',
                      marginBottom: '0.75rem',
                      color,
                      textShadow: `0 0 12px ${color}66`,
                    }}>
                      {project.title}
                    </h2>

                    <p style={{
                      fontSize: '0.8rem',
                      color: 'rgba(224,224,229,0.55)',
                      lineHeight: 1.6,
                      marginBottom: '1.25rem',
                    }}>
                      {project.description}
                    </p>

                    <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                      {project.tags.map(t => (
                        <span key={t} style={{
                          fontFamily: '"Inter", sans-serif',
                          fontSize: '0.52rem', letterSpacing: '0.12em',
                          textTransform: 'uppercase',
                          padding: '0.18rem 0.45rem',
                          border: `1px solid ${color}55`,
                          color: `${color}aa`,
                        }}>{t}</span>
                      ))}
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid rgba(255,0,60,0.2)',
        padding: '2rem', textAlign: 'center',
        fontFamily: '"Inter", sans-serif',
        fontSize: '0.6rem', letterSpacing: '0.15em',
        color: 'rgba(255,0,60,0.4)',
      }}>
        <span style={{ color: '#ff003c', textShadow: '0 0 8px rgba(255,0,60,0.5)' }}>LSCYTHE.DEV</span>
        {' '}// {new Date().getFullYear()}
      </footer>
    </div>
  )
}
