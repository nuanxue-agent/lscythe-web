'use client'

import Link from 'next/link'
import type { Project } from '@/lib/content'

const NEON_COLORS = ['#ff003c', '#f7e500', '#00d9ff']

const FILE_PERMS = ['-rwxr-xr-x', '-rw-r--r--', '-rwxrwxr-x', 'drwxr-xr-x', '-rw-rw-r--']
const FILE_OWNERS = ['lscythe', 'root', 'nocturn', 'lscythe', 'root']

interface Props { projects: Project[] }

function fakeSize(i: number): string {
  const sizes = ['4.2K', '12K', '8.7K', '32K', '1.1M', '256K', '64K', '512K']
  return sizes[i % sizes.length]
}

export default function ProjectsCyber({ projects }: Props) {
  const now = new Date()
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

  return (
    <div style={{ background: '#0a0a0f', minHeight: '100vh', fontFamily: '"JetBrains Mono", monospace', position: 'relative' }}>
      <div className="cyber-scanlines" />
      <div className="cyber-rain" style={{ opacity: 0.3 }} />

      {/* Header terminal prompt */}
      <section style={{ padding: '8rem 2rem 3rem', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <p style={{
            fontSize: '0.6rem', letterSpacing: '0.3em',
            color: '#ff003c', textTransform: 'uppercase',
            textShadow: '0 0 10px rgba(255,0,60,0.5)',
            marginBottom: '0.5rem',
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
              marginBottom: '2rem',
            }}
          >
            PROJECTS
          </h1>

          {/* ls -la style header */}
          <div style={{
            borderTop: '1px solid rgba(255,0,60,0.3)',
            borderBottom: '1px solid rgba(255,0,60,0.15)',
            padding: '0.5rem 0',
            marginBottom: '0',
            display: 'grid',
            gridTemplateColumns: '10rem 6rem 7rem 5rem 4rem 1fr',
            gap: '1rem',
            fontSize: '0.58rem',
            letterSpacing: '0.1em',
            color: 'rgba(0,217,255,0.5)',
            textTransform: 'uppercase',
          }}>
            <span>permissions</span>
            <span>owner</span>
            <span>group</span>
            <span>size</span>
            <span>date</span>
            <span>name</span>
          </div>

          {/* Total line */}
          <div style={{
            padding: '0.35rem 0',
            fontSize: '0.58rem',
            color: 'rgba(224,224,229,0.25)',
            borderBottom: '1px solid rgba(255,0,60,0.08)',
            marginBottom: '0',
          }}>
            total {projects.length * 8}
          </div>
        </div>
      </section>

      {/* File listing */}
      <section style={{ padding: '0 2rem 6rem', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          {projects.map((project, i) => {
            const color = NEON_COLORS[i % 3]
            const perm = FILE_PERMS[i % FILE_PERMS.length]
            const owner = FILE_OWNERS[i % FILE_OWNERS.length]
            const size = fakeSize(i)
            const month = months[i % 12]
            const day = String((i * 3 + 7) % 28 + 1).padStart(2, ' ')

            return (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '10rem 6rem 7rem 5rem 4rem 1fr',
                  gap: '1rem',
                  alignItems: 'start',
                  padding: '0.75rem 0',
                  borderBottom: '1px solid rgba(255,0,60,0.06)',
                  textDecoration: 'none',
                  transition: 'background 0.15s',
                  position: 'relative',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.background = 'rgba(255,0,60,0.04)'
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.background = 'transparent'
                }}
              >
                {/* Permissions */}
                <span style={{
                  fontSize: '0.6rem',
                  color: 'rgba(224,224,229,0.35)',
                  letterSpacing: '0.05em',
                  fontVariantNumeric: 'tabular-nums',
                }}>{perm}</span>

                {/* Owner */}
                <span style={{
                  fontSize: '0.6rem',
                  color: 'rgba(247,229,0,0.5)',
                  letterSpacing: '0.05em',
                }}>{owner}</span>

                {/* Group */}
                <span style={{
                  fontSize: '0.6rem',
                  color: 'rgba(247,229,0,0.35)',
                  letterSpacing: '0.05em',
                }}>nocturn</span>

                {/* Size */}
                <span style={{
                  fontSize: '0.6rem',
                  color: 'rgba(0,217,255,0.6)',
                  letterSpacing: '0.05em',
                  textAlign: 'right',
                }}>{size}</span>

                {/* Date */}
                <span style={{
                  fontSize: '0.6rem',
                  color: 'rgba(224,224,229,0.3)',
                  letterSpacing: '0.05em',
                  whiteSpace: 'nowrap',
                }}>{month} {day}</span>

                {/* Name + description */}
                <div>
                  <div style={{
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    color,
                    textShadow: `0 0 10px ${color}88`,
                    letterSpacing: '0.05em',
                    marginBottom: '0.3rem',
                  }}>
                    {project.slug}/
                  </div>
                  <div style={{
                    fontSize: '0.62rem',
                    color: 'rgba(224,224,229,0.4)',
                    lineHeight: 1.5,
                    marginBottom: '0.4rem',
                  }}>
                    # {project.description}
                  </div>
                  <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                    {project.tags.map(t => (
                      <span key={t} style={{
                        fontSize: '0.5rem', letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        padding: '0.15rem 0.4rem',
                        border: `1px solid ${color}44`,
                        color: `${color}88`,
                      }}>{t}</span>
                    ))}
                  </div>
                </div>
              </Link>
            )
          })}

          {/* Prompt at the end */}
          <div style={{
            padding: '2rem 0',
            fontSize: '0.62rem',
            color: 'rgba(0,255,80,0.5)',
            letterSpacing: '0.1em',
          }}>
            <span style={{ color: 'rgba(255,0,60,0.5)' }}>lscythe@nocturn</span>
            <span style={{ color: 'rgba(224,224,229,0.3)' }}>:</span>
            <span style={{ color: 'rgba(0,217,255,0.5)' }}>~/projects</span>
            <span style={{ color: 'rgba(224,224,229,0.3)' }}>$ </span>
            <span style={{ animation: 'cyber-blink 1s step-end infinite' }}>█</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid rgba(255,0,60,0.2)',
        padding: '2rem', textAlign: 'center',
        background: '#0a0a0f',
        fontFamily: '"JetBrains Mono", monospace',
        fontSize: '0.6rem', letterSpacing: '0.15em',
        color: 'rgba(255,0,60,0.4)',
        paddingBottom: '4rem',
      }}>
        <span style={{ color: '#ff003c', textShadow: '0 0 8px rgba(255,0,60,0.5)' }}>LSCYTHE.DEV</span>
        {' '}// {now.getFullYear()}
      </footer>

      <style>{`
        @keyframes cyber-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  )
}
