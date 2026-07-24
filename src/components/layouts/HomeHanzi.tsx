'use client'

import Link from 'next/link'
import type { Project } from '@/lib/content'

interface HomeHanziProps {
  featured: Project[]
}

const HANZI_CATEGORY: Record<string, string> = {
  android: '技',
  kmp: '工',
  library: '道',
  tool: '力',
  web: '文',
  default: '武',
}

function categoryHanzi(tags: string[]): string {
  const lower = tags.map(t => t.toLowerCase())
  if (lower.some(t => t.includes('android'))) return HANZI_CATEGORY.android
  if (lower.some(t => t.includes('kmp') || t.includes('kotlin'))) return HANZI_CATEGORY.kmp
  if (lower.some(t => t.includes('lib'))) return HANZI_CATEGORY.library
  if (lower.some(t => t.includes('tool') || t.includes('cli'))) return HANZI_CATEGORY.tool
  if (lower.some(t => t.includes('web') || t.includes('next') || t.includes('react'))) return HANZI_CATEGORY.web
  return HANZI_CATEGORY.default
}

export default function HomeHanzi({ featured }: HomeHanziProps) {
  return (
    <div style={{
      background: '#0f0c08',
      minHeight: '100vh',
      color: '#e8e0d0',
      fontFamily: 'Georgia, "Times New Roman", serif',
    }}>
      {/* Hero - Chinese scroll aesthetic */}
      <section style={{
        position: 'relative',
        padding: '8rem 4rem 10rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        minHeight: '90vh',
      }}>
        {/* Center: narrow content block like a scroll */}
        <div style={{ maxWidth: '420px', zIndex: 2, position: 'relative', textAlign: 'center' }}>
          {/* Decorative top rule */}
          <div style={{
            width: '3rem',
            height: '2px',
            background: '#c41e3a',
            margin: '0 auto 3rem',
          }} />

          <div style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: '0.65rem',
            letterSpacing: '0.3em',
            color: 'rgba(232,224,208,0.35)',
            textTransform: 'uppercase',
            marginBottom: '2rem',
          }}>
            android engineer · jakarta · est. 2019
          </div>

          <h1 style={{
            fontFamily: 'Georgia, "Times New Roman", serif',
            fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
            fontWeight: 400,
            letterSpacing: '0.25em',
            color: '#e8e0d0',
            lineHeight: 1.1,
            marginBottom: '1rem',
          }}>
            lscythe
          </h1>

          {/* Vermillion seal */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '3rem',
          }}>
            <span style={{
              fontFamily: '"Noto Serif SC", "Source Han Serif", Georgia, serif',
              fontSize: '0.85rem',
              color: '#c41e3a',
              letterSpacing: '0.15em',
              border: '2px solid rgba(196,30,58,0.6)',
              padding: '0.25rem 0.75rem',
              lineHeight: 1.6,
            }}>刃 · 工匠</span>
          </div>

          <p style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: '0.75rem',
            color: 'rgba(232,224,208,0.5)',
            letterSpacing: '0.08em',
            lineHeight: 2,
            marginBottom: '4rem',
          }}>
            building Android systems, KMP libraries,<br />
            and developer tooling at Nocturn.<br />
            obsessed with architecture that scales.
          </p>

          {/* Stats row - mixed numerals + hanzi */}
          <div style={{ display: 'flex', gap: '3.5rem', justifyContent: 'center', marginBottom: '3rem' }}>
            {[
              { val: '6', suffix: '年', label: 'experience' },
              { val: '10+', suffix: '项', label: 'projects' },
              { val: '10+', suffix: '篇', label: 'posts' },
            ].map(({ val, suffix, label }) => (
              <div key={label} style={{ textAlign: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: '0.2rem' }}>
                  <span style={{
                    fontFamily: '"JetBrains Mono", monospace',
                    fontSize: '1.8rem',
                    fontWeight: 700,
                    color: '#c41e3a',
                    lineHeight: 1,
                  }}>{val}</span>
                  <span style={{
                    fontFamily: '"Noto Serif SC", "Source Han Serif", Georgia, serif',
                    fontSize: '1rem',
                    color: 'rgba(196,30,58,0.5)',
                  }}>{suffix}</span>
                </div>
                <div style={{
                  fontFamily: '"JetBrains Mono", monospace',
                  fontSize: '0.55rem',
                  color: 'rgba(232,224,208,0.35)',
                  letterSpacing: '0.1em',
                  marginTop: '0.4rem',
                }}>{label}</div>
              </div>
            ))}
          </div>

          {/* Decorative bottom rule */}
          <div style={{
            width: '3rem',
            height: '2px',
            background: '#c41e3a',
            margin: '0 auto',
          }} />
        </div>

        {/* Right side: vertical text */}
        <div style={{
          position: 'absolute',
          right: '3rem',
          top: '50%',
          transform: 'translateY(-50%)',
          fontFamily: '"Noto Serif SC", "Source Han Serif", Georgia, serif',
          fontSize: 'clamp(3rem, 8vw, 5rem)',
          fontWeight: 700,
          color: 'rgba(196,30,58,0.25)',
          writingMode: 'vertical-rl',
          letterSpacing: '0.8em',
          lineHeight: 1,
          userSelect: 'none',
          pointerEvents: 'none',
          zIndex: 1,
        }}>
          刃 · 工 · 道
        </div>

        {/* Left side: ghost 道 character - more prominent */}
        <div style={{
          position: 'absolute',
          left: '-2rem',
          top: '50%',
          transform: 'translateY(-50%)',
          fontFamily: '"Noto Serif SC", "Source Han Serif", Georgia, serif',
          fontSize: 'clamp(14rem, 28vw, 22rem)',
          fontWeight: 900,
          color: 'rgba(196,30,58,0.12)',
          lineHeight: 1,
          userSelect: 'none',
          pointerEvents: 'none',
          zIndex: 0,
        }}>
          道
        </div>
      </section>

      {/* Full-width horizontal red rule */}
      <div style={{
        width: '100%',
        height: '2px',
        background: 'rgba(196,30,58,0.3)',
      }} />

      {/* Selected work */}
      <section style={{ padding: '5rem 4rem 6rem' }}>
        <div style={{ marginBottom: '3rem', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: '0.62rem',
            color: 'rgba(232,224,208,0.35)',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
          }}>selected work</div>
          <div style={{ flex: 1, height: '1px', background: 'rgba(196,30,58,0.12)' }} />
          <div style={{
            fontFamily: '"Noto Serif SC", "Source Han Serif", Georgia, serif',
            fontSize: '0.95rem',
            color: 'rgba(196,30,58,0.35)',
          }}>作品</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {featured.map((project, i) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              style={{
                display: 'grid',
                gridTemplateColumns: '2rem 1fr auto',
                alignItems: 'start',
                gap: '1.5rem',
                padding: '1.5rem 0',
                borderBottom: '1px solid rgba(196,30,58,0.1)',
                borderLeft: '2px solid rgba(196,30,58,0.3)',
                paddingLeft: '1.25rem',
                textDecoration: 'none',
                transition: 'border-left-color 0.2s',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderLeftColor = '#c41e3a' }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderLeftColor = 'rgba(196,30,58,0.3)' }}
            >
              {/* Hanzi category marker */}
              <span style={{
                fontFamily: '"Noto Serif SC", "Source Han Serif", Georgia, serif',
                fontSize: '1rem',
                color: 'rgba(196,30,58,0.5)',
                lineHeight: 1,
                marginTop: '0.1rem',
              }}>
                {categoryHanzi(project.tags)}
              </span>

              <div>
                <div style={{
                  fontFamily: 'Georgia, "Times New Roman", serif',
                  fontSize: '1rem',
                  fontWeight: 400,
                  color: '#e8e0d0',
                  letterSpacing: '0.05em',
                  marginBottom: '0.4rem',
                }}>{project.title}</div>
                <div style={{
                  fontFamily: '"JetBrains Mono", monospace',
                  fontSize: '0.65rem',
                  color: 'rgba(232,224,208,0.4)',
                  letterSpacing: '0.05em',
                  lineHeight: 1.6,
                }}>{project.description}</div>
              </div>

              <div style={{
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: '0.58rem',
                color: 'rgba(196,30,58,0.4)',
                letterSpacing: '0.1em',
                marginTop: '0.15rem',
              }}>{project.year}</div>
            </Link>
          ))}

          <Link
            href="/projects"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              marginTop: '1.75rem',
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: '0.65rem',
              color: 'rgba(196,30,58,0.6)',
              letterSpacing: '0.15em',
              textDecoration: 'none',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#c41e3a' }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(196,30,58,0.6)' }}
          >
            <span>all projects</span>
            <span style={{ fontSize: '0.8rem' }}>→</span>
          </Link>
        </div>
      </section>

      {/* Full-width horizontal red rule */}
      <div style={{
        width: '100%',
        height: '2px',
        background: 'rgba(196,30,58,0.3)',
      }} />

      {/* Principle quote */}
      <section style={{
        padding: '5rem 4rem',
        display: 'flex',
        alignItems: 'center',
        gap: '4rem',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute',
          left: '-1rem',
          fontFamily: '"Noto Serif SC", "Source Han Serif", Georgia, serif',
          fontSize: '12rem',
          fontWeight: 900,
          color: 'rgba(200,168,75,0.04)',
          lineHeight: 1,
          userSelect: 'none',
          pointerEvents: 'none',
        }}>德</div>

        <blockquote style={{
          fontFamily: 'Georgia, "Times New Roman", serif',
          fontSize: 'clamp(1rem, 2vw, 1.35rem)',
          fontWeight: 400,
          fontStyle: 'italic',
          color: 'rgba(232,224,208,0.7)',
          lineHeight: 1.7,
          maxWidth: '520px',
          zIndex: 1,
          borderLeft: '2px solid rgba(196,30,58,0.4)',
          paddingLeft: '1.5rem',
        }}>
          "complexity is not a feature.<br />
          it's a failure of design."
          <footer style={{
            marginTop: '0.75rem',
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: '0.6rem',
            letterSpacing: '0.15em',
            color: 'rgba(232,224,208,0.3)',
            fontStyle: 'normal',
          }}>— lscythe / 2026</footer>
        </blockquote>
      </section>

      {/* Footer with decorative hanzi row */}
      <footer style={{
        padding: '2rem 4rem',
        borderTop: '1px solid rgba(196,30,58,0.15)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1.5rem',
      }}>
        <div style={{
          fontFamily: '"Noto Serif SC", "Source Han Serif", Georgia, serif',
          fontSize: '1.2rem',
          color: 'rgba(196,30,58,0.25)',
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
          color: 'rgba(232,224,208,0.25)',
        }}>
          <span>lscythe.dev</span>
          <span>{new Date().getFullYear()}</span>
        </div>
      </footer>
    </div>
  )
}
