'use client'

import Link from 'next/link'
import type { Project } from '@/lib/content'

interface ProjectsHanziProps {
  projects: Project[]
}

const CHINESE_NUMERALS = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十']

const MARGIN_HANZI = ['道', '德', '力', '武', '技', '工', '文', '心', '志', '气']

export default function ProjectsHanzi({ projects }: ProjectsHanziProps) {
  return (
    <div style={{
      background: '#0f0c08',
      minHeight: '100vh',
      color: '#e8e0d0',
      fontFamily: 'Georgia, "Times New Roman", serif',
    }}>
      {/* Header */}
      <div style={{ padding: '4rem 4rem 2rem' }}>
        <div style={{
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: '0.62rem',
          color: 'rgba(232,224,208,0.3)',
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          marginBottom: '1rem',
        }}>catalogue</div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem' }}>
          <h1 style={{
            fontFamily: 'Georgia, "Times New Roman", serif',
            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
            fontWeight: 400,
            letterSpacing: '0.15em',
            color: '#e8e0d0',
          }}>projects</h1>
          <span style={{
            fontFamily: '"Noto Serif SC", "Source Han Serif", Georgia, serif',
            fontSize: '1.4rem',
            color: 'rgba(196,30,58,0.5)',
          }}>作品集</span>
        </div>
        <div style={{
          marginTop: '1rem',
          width: '3rem',
          height: '1px',
          background: '#c41e3a',
        }} />
      </div>

      {/* Project list */}
      <div style={{ padding: '0 4rem 6rem' }}>
        {projects.map((project, i) => (
          <div key={project.slug} style={{ position: 'relative' }}>
            {/* Decorative hanzi in margin */}
            <span style={{
              position: 'absolute',
              left: '-2.5rem',
              top: '1.5rem',
              fontFamily: '"Noto Serif SC", "Source Han Serif", Georgia, serif',
              fontSize: '1.1rem',
              color: 'rgba(196,30,58,0.12)',
              userSelect: 'none',
              pointerEvents: 'none',
            }}>
              {MARGIN_HANZI[i % MARGIN_HANZI.length]}
            </span>

            <Link
              href={`/projects/${project.slug}`}
              style={{
                display: 'grid',
                gridTemplateColumns: '3rem 1fr auto',
                alignItems: 'start',
                gap: '2rem',
                padding: '2rem 0',
                textDecoration: 'none',
                transition: 'background 0.15s',
              }}
            >
              {/* Chinese numeral */}
              <div style={{
                fontFamily: '"Noto Serif SC", "Source Han Serif", Georgia, serif',
                fontSize: '1.5rem',
                color: 'rgba(196,30,58,0.35)',
                lineHeight: 1,
                paddingTop: '0.1rem',
              }}>
                {i < CHINESE_NUMERALS.length ? CHINESE_NUMERALS[i] : String(i + 1)}
              </div>

              {/* Content */}
              <div>
                <div style={{
                  fontFamily: 'Georgia, "Times New Roman", serif',
                  fontSize: '1.05rem',
                  fontWeight: 400,
                  color: '#e8e0d0',
                  letterSpacing: '0.06em',
                  marginBottom: '0.5rem',
                }}>{project.title}</div>

                <div style={{
                  fontFamily: '"JetBrains Mono", monospace',
                  fontSize: '0.65rem',
                  color: 'rgba(232,224,208,0.45)',
                  lineHeight: 1.7,
                  marginBottom: '0.75rem',
                  maxWidth: '520px',
                }}>{project.description}</div>

                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {project.tags.slice(0, 4).map(tag => (
                    <span key={tag} style={{
                      fontFamily: '"JetBrains Mono", monospace',
                      fontSize: '0.55rem',
                      color: 'rgba(196,30,58,0.5)',
                      border: '1px solid rgba(196,30,58,0.2)',
                      padding: '0.15rem 0.4rem',
                      letterSpacing: '0.08em',
                    }}>{tag}</span>
                  ))}
                </div>
              </div>

              {/* Year + status */}
              <div style={{
                textAlign: 'right',
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: '0.6rem',
                color: 'rgba(232,224,208,0.25)',
                letterSpacing: '0.1em',
              }}>
                <div>{project.year}</div>
                <div style={{
                  marginTop: '0.3rem',
                  color: project.status === 'active' ? 'rgba(196,30,58,0.5)' : 'rgba(232,224,208,0.2)',
                }}>{project.status}</div>
              </div>
            </Link>

            {/* Thin red divider */}
            <div style={{
              height: '1px',
              background: 'rgba(196,30,58,0.12)',
            }} />
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer style={{
        padding: '1.5rem 4rem',
        borderTop: '1px solid rgba(196,30,58,0.15)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontFamily: '"JetBrains Mono", monospace',
        fontSize: '0.6rem',
        letterSpacing: '0.12em',
        color: 'rgba(232,224,208,0.2)',
      }}>
        <span>lscythe.dev / projects</span>
        <span style={{
          fontFamily: '"Noto Serif SC", "Source Han Serif", Georgia, serif',
          color: 'rgba(196,30,58,0.15)',
        }}>技</span>
        <span>{new Date().getFullYear()}</span>
      </footer>
    </div>
  )
}
