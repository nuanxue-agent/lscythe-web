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
      <div style={{ padding: '6rem 6rem 3rem', position: 'relative', overflow: 'hidden' }}>
        {/* Ghost hanzi behind header */}
        <div style={{
          position: 'absolute',
          right: '-1rem',
          top: '50%',
          transform: 'translateY(-50%)',
          fontFamily: '"Noto Serif SC", "Source Han Serif", Georgia, serif',
          fontSize: 'clamp(8rem, 16vw, 14rem)',
          fontWeight: 900,
          color: 'rgba(196,30,58,0.07)',
          lineHeight: 1,
          userSelect: 'none',
          pointerEvents: 'none',
        }}>集</div>

        <div style={{
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: '0.62rem',
          color: 'rgba(232,224,208,0.3)',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          marginBottom: '1.25rem',
        }}>作品目錄 · catalogue</div>

        <div style={{ display: 'flex', alignItems: 'baseline', gap: '1.25rem' }}>
          <h1 style={{
            fontFamily: 'Georgia, "Times New Roman", serif',
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 400,
            letterSpacing: '0.2em',
            color: '#e8e0d0',
          }}>projects</h1>
          <span style={{
            fontFamily: '"Noto Serif SC", "Source Han Serif", Georgia, serif',
            fontSize: '1.6rem',
            color: 'rgba(196,30,58,0.5)',
          }}>作品集</span>
        </div>

        {/* Red rule */}
        <div style={{
          marginTop: '1.5rem',
          width: '100%',
          height: '2px',
          background: 'rgba(196,30,58,0.25)',
        }} />
      </div>

      {/* Project list — museum catalog, full width, no grid */}
      <div style={{ padding: '0 6rem 8rem' }}>
        {projects.map((project, i) => (
          <div key={project.slug} style={{ position: 'relative' }}>
            {/* Large sequential Chinese numeral as section marker */}
            <div style={{
              position: 'absolute',
              left: '-4rem',
              top: '1rem',
              fontFamily: '"Noto Serif SC", "Source Han Serif", Georgia, serif',
              fontSize: 'clamp(5rem, 10vw, 8rem)',
              fontWeight: 900,
              color: 'rgba(196,30,58,0.08)',
              lineHeight: 1,
              userSelect: 'none',
              pointerEvents: 'none',
            }}>
              {i < CHINESE_NUMERALS.length ? CHINESE_NUMERALS[i] : String(i + 1)}
            </div>

            {/* Margin hanzi on far right */}
            <div style={{
              position: 'absolute',
              right: '-2rem',
              top: '50%',
              transform: 'translateY(-50%)',
              fontFamily: '"Noto Serif SC", "Source Han Serif", Georgia, serif',
              fontSize: '1.1rem',
              color: 'rgba(196,30,58,0.12)',
              userSelect: 'none',
              pointerEvents: 'none',
              writingMode: 'vertical-rl',
              letterSpacing: '0.4em',
            }}>
              {MARGIN_HANZI[i % MARGIN_HANZI.length]}
            </div>

            <Link
              href={`/projects/${project.slug}`}
              style={{
                display: 'flex',
                flexDirection: 'column',
                padding: '3rem 0 3rem 3rem',
                textDecoration: 'none',
                borderLeft: '2px solid rgba(196,30,58,0.15)',
                transition: 'border-left-color 0.2s',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderLeftColor = '#c41e3a' }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderLeftColor = 'rgba(196,30,58,0.15)' }}
            >
              {/* Catalog number */}
              <div style={{
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: '0.6rem',
                color: 'rgba(196,30,58,0.4)',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                marginBottom: '0.75rem',
              }}>
                {i < CHINESE_NUMERALS.length ? CHINESE_NUMERALS[i] : String(i + 1)} · cat.no.{String(i + 1).padStart(3, '0')}
              </div>

              {/* Title */}
              <div style={{
                fontFamily: 'Georgia, "Times New Roman", serif',
                fontSize: 'clamp(1.25rem, 3vw, 1.75rem)',
                fontWeight: 400,
                color: '#e8e0d0',
                letterSpacing: '0.08em',
                marginBottom: '0.75rem',
                lineHeight: 1.2,
              }}>{project.title}</div>

              {/* Description */}
              <div style={{
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: '0.72rem',
                color: 'rgba(232,224,208,0.45)',
                lineHeight: 1.8,
                marginBottom: '1.25rem',
                maxWidth: '640px',
              }}>{project.description}</div>

              {/* Meta row */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
                <span style={{
                  fontFamily: '"JetBrains Mono", monospace',
                  fontSize: '0.58rem',
                  color: 'rgba(196,30,58,0.45)',
                  letterSpacing: '0.12em',
                }}>{project.year}</span>

                <span style={{
                  fontFamily: '"JetBrains Mono", monospace',
                  fontSize: '0.58rem',
                  color: project.status === 'active' ? 'rgba(196,30,58,0.55)' : 'rgba(232,224,208,0.2)',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}>{project.status}</span>

                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {project.tags.slice(0, 4).map(tag => (
                    <span key={tag} style={{
                      fontFamily: '"JetBrains Mono", monospace',
                      fontSize: '0.55rem',
                      color: 'rgba(196,30,58,0.5)',
                      border: '1px solid rgba(196,30,58,0.2)',
                      padding: '0.15rem 0.45rem',
                      letterSpacing: '0.08em',
                    }}>{tag}</span>
                  ))}
                </div>
              </div>
            </Link>

            {/* Full-width divider */}
            <div style={{
              width: '100%',
              height: '1px',
              background: 'rgba(196,30,58,0.12)',
            }} />
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer style={{
        padding: '2rem 6rem',
        borderTop: '1px solid rgba(196,30,58,0.15)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1.5rem',
      }}>
        <div style={{
          fontFamily: '"Noto Serif SC", "Source Han Serif", Georgia, serif',
          fontSize: '1.1rem',
          color: 'rgba(196,30,58,0.2)',
          letterSpacing: '1.5rem',
          paddingLeft: '1.5rem',
        }}>
          道 德 力 武 技 工
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: '0.6rem',
          letterSpacing: '0.12em',
          color: 'rgba(232,224,208,0.2)',
        }}>
          <span>lscythe.dev / projects</span>
          <span>{new Date().getFullYear()}</span>
        </div>
      </footer>
    </div>
  )
}
