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
      background: '#0d0905',
      minHeight: '100vh',
      color: '#e8e0d0',
      fontFamily: 'Georgia, "Times New Roman", serif',
      overflowX: 'hidden',
    }}>

      {/* ── Hero ── */}
      <section style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        overflow: 'hidden',
      }}>

        {/* Left: deep red panel */}
        <div style={{
          width: '42%',
          background: '#8b0000',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '4rem 3rem',
          flexShrink: 0,
        }}>
          {/* Giant ghost 龍 in the panel */}
          <div style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 'clamp(12rem, 22vw, 18rem)',
            fontWeight: 900,
            color: 'rgba(0,0,0,0.25)',
            userSelect: 'none',
            pointerEvents: 'none',
            lineHeight: 1,
          }}>龍</div>

          {/* Red noise texture */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(0,0,0,0.05) 2px, rgba(0,0,0,0.05) 4px)',
            pointerEvents: 'none',
          }} />

          {/* Seal stamp */}
          <div style={{
            position: 'relative', zIndex: 2,
            width: '90px', height: '90px',
            border: '4px solid #f0c060',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: '2rem',
            background: 'rgba(0,0,0,0.2)',
          }}>
            <span style={{
              fontFamily: '"Noto Serif SC", "Source Han Serif", Georgia, serif',
              fontSize: '2rem',
              color: '#f0c060',
              fontWeight: 900,
              textShadow: '0 0 8px rgba(240,192,96,0.4)',
            }}>刃</span>
          </div>

          <h1 style={{
            position: 'relative', zIndex: 2,
            fontFamily: 'Georgia, "Times New Roman", serif',
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: 700,
            letterSpacing: '0.15em',
            color: '#f0e8d8',
            lineHeight: 1.1,
            marginBottom: '0.75rem',
            textShadow: '2px 2px 0 rgba(0,0,0,0.4)',
          }}>
            LSCYTHE
          </h1>

          <div style={{
            position: 'relative', zIndex: 2,
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: '0.68rem',
            letterSpacing: '0.2em',
            color: 'rgba(240,232,216,0.6)',
            textTransform: 'uppercase',
            marginBottom: '2rem',
          }}>
            android engineer · jakarta
          </div>

          {/* Stats */}
          <div style={{
            position: 'relative', zIndex: 2,
            display: 'flex', gap: '1.5rem',
          }}>
            {[
              { num: '6', hz: '年', label: 'yrs' },
              { num: '10+', hz: '项', label: 'proj' },
              { num: '10+', hz: '篇', label: 'posts' },
            ].map(({ num, hz, label }) => (
              <div key={label} style={{
                borderLeft: '2px solid rgba(240,192,96,0.5)',
                paddingLeft: '0.75rem',
              }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.15rem' }}>
                  <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '1.4rem', fontWeight: 700, color: '#f0c060' }}>{num}</span>
                  <span style={{ fontFamily: '"Noto Serif SC", "Source Han Serif", Georgia, serif', fontSize: '0.9rem', color: 'rgba(240,192,96,0.6)' }}>{hz}</span>
                </div>
                <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '0.52rem', letterSpacing: '0.1em', color: 'rgba(240,232,216,0.4)', textTransform: 'uppercase' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: dark ink panel */}
        <div style={{
          flex: 1,
          background: '#0d0905',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '4rem 3.5rem',
          overflow: 'hidden',
        }}>
          {/* Layered ghost hanzi -- Chinese art fills space */}
          <div style={{
            position: 'absolute', right: '-3rem', top: '-2rem',
            fontFamily: '"Noto Serif SC", "Source Han Serif", Georgia, serif',
            fontSize: 'clamp(16rem, 32vw, 26rem)',
            fontWeight: 900,
            color: 'rgba(139,0,0,0.18)',
            lineHeight: 1,
            userSelect: 'none', pointerEvents: 'none',
          }}>道</div>

          <div style={{
            position: 'absolute', left: '1rem', bottom: '-1rem',
            fontFamily: '"Noto Serif SC", "Source Han Serif", Georgia, serif',
            fontSize: 'clamp(8rem, 15vw, 12rem)',
            fontWeight: 900,
            color: 'rgba(200,168,75,0.08)',
            lineHeight: 1,
            userSelect: 'none', pointerEvents: 'none',
          }}>德</div>

          {/* Content */}
          <div style={{ position: 'relative', zIndex: 2 }}>
            {/* Red horizontal rule */}
            <div style={{ width: '4rem', height: '3px', background: '#c41e3a', marginBottom: '2rem' }} />

            <p style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: '0.72rem',
              color: 'rgba(232,224,208,0.55)',
              letterSpacing: '0.06em',
              lineHeight: 2,
              marginBottom: '2.5rem',
              maxWidth: '400px',
            }}>
              building Android systems, KMP libraries,<br />
              and developer tooling at Nocturn.<br />
              obsessed with architecture that scales.
            </p>

            {/* Seal-style quote */}
            <div style={{
              borderLeft: '4px solid #c41e3a',
              paddingLeft: '1.25rem',
              marginBottom: '3rem',
              maxWidth: '380px',
            }}>
              <p style={{
                fontFamily: 'Georgia, "Times New Roman", serif',
                fontSize: '1.05rem',
                fontStyle: 'italic',
                color: 'rgba(232,224,208,0.75)',
                lineHeight: 1.65,
              }}>
                &ldquo;complexity is not a feature.<br />it&apos;s a failure of design.&rdquo;
              </p>
              <div style={{
                fontFamily: '"Noto Serif SC", "Source Han Serif", Georgia, serif',
                fontSize: '0.75rem',
                color: 'rgba(196,30,58,0.5)',
                marginTop: '0.5rem',
                letterSpacing: '0.15em',
              }}>— 复杂非功能，乃设计之败</div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link href="/projects" style={{
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: '0.68rem', letterSpacing: '0.15em',
                textTransform: 'uppercase',
                padding: '0.65rem 1.5rem',
                background: '#c41e3a',
                color: '#f0e8d8',
                textDecoration: 'none',
                boxShadow: '2px 2px 0 rgba(0,0,0,0.4)',
              }}>
                作品集 / Projects →
              </Link>
              <Link href="/about" style={{
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: '0.68rem', letterSpacing: '0.15em',
                textTransform: 'uppercase',
                padding: '0.65rem 1.5rem',
                border: '1px solid rgba(196,30,58,0.5)',
                color: 'rgba(196,30,58,0.8)',
                textDecoration: 'none',
              }}>
                关于 / About
              </Link>
            </div>
          </div>

          {/* Vertical hanzi column right edge */}
          <div style={{
            position: 'absolute', right: '1.5rem', top: '50%',
            transform: 'translateY(-50%)',
            fontFamily: '"Noto Serif SC", "Source Han Serif", Georgia, serif',
            fontSize: '1.1rem',
            fontWeight: 700,
            color: 'rgba(196,30,58,0.35)',
            writingMode: 'vertical-rl',
            letterSpacing: '1rem',
            lineHeight: 1,
            userSelect: 'none', pointerEvents: 'none',
          }}>工匠精神</div>
        </div>
      </section>

      {/* ── Red divider ── */}
      <div style={{ height: '4px', background: 'linear-gradient(90deg, #8b0000, #c41e3a, #8b0000)' }} />

      {/* ── Selected work ── */}
      <section style={{ padding: '5rem 0' }}>
        {/* Section header with red band */}
        <div style={{
          display: 'flex', alignItems: 'stretch',
          marginBottom: '3rem',
        }}>
          <div style={{ width: '42%', background: '#8b0000', padding: '1.25rem 3rem', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <span style={{
              fontFamily: '"Noto Serif SC", "Source Han Serif", Georgia, serif',
              fontSize: '1.5rem', color: '#f0c060', fontWeight: 900,
            }}>作品</span>
            <span style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: '0.6rem', letterSpacing: '0.2em',
              color: 'rgba(240,232,216,0.6)', textTransform: 'uppercase',
            }}>selected work</span>
          </div>
          <div style={{ flex: 1, background: '#1a0f0a', padding: '1.25rem 3.5rem', display: 'flex', alignItems: 'center' }}>
            <div style={{ height: '1px', flex: 1, background: 'rgba(196,30,58,0.3)' }} />
          </div>
        </div>

        <div style={{ padding: '0 3.5rem 0 3rem' }}>
          {featured.map((project, i) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              style={{
                display: 'grid',
                gridTemplateColumns: '3rem 3rem 1fr auto',
                alignItems: 'start',
                gap: '1.5rem',
                padding: '1.75rem 0',
                borderBottom: '1px solid rgba(196,30,58,0.15)',
                textDecoration: 'none',
                transition: 'background 0.2s',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(139,0,0,0.12)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'transparent' }}
            >
              {/* Index */}
              <span style={{
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: '0.6rem', color: 'rgba(196,30,58,0.4)',
                letterSpacing: '0.1em', marginTop: '0.2rem',
              }}>0{i + 1}</span>

              {/* Hanzi category */}
              <span style={{
                fontFamily: '"Noto Serif SC", "Source Han Serif", Georgia, serif',
                fontSize: '1.4rem', color: '#c41e3a',
                lineHeight: 1, marginTop: '-0.1rem',
                textShadow: '1px 1px 0 rgba(0,0,0,0.3)',
              }}>
                {categoryHanzi(project.tags)}
              </span>

              <div>
                <div style={{
                  fontFamily: 'Georgia, "Times New Roman", serif',
                  fontSize: '1.05rem', fontWeight: 600,
                  color: '#e8e0d0', letterSpacing: '0.05em',
                  marginBottom: '0.4rem',
                }}>{project.title}</div>
                <div style={{
                  fontFamily: '"JetBrains Mono", monospace',
                  fontSize: '0.65rem', color: 'rgba(232,224,208,0.4)',
                  lineHeight: 1.6,
                }}>{project.description}</div>
                <div style={{ display: 'flex', gap: '0.4rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
                  {project.tags.slice(0, 3).map(t => (
                    <span key={t} style={{
                      fontFamily: '"JetBrains Mono", monospace',
                      fontSize: '0.55rem', letterSpacing: '0.08em',
                      padding: '0.15rem 0.4rem',
                      border: '1px solid rgba(196,30,58,0.25)',
                      color: 'rgba(196,30,58,0.55)',
                    }}>{t}</span>
                  ))}
                </div>
              </div>

              <div style={{
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: '0.58rem', color: 'rgba(196,30,58,0.35)',
                letterSpacing: '0.08em', marginTop: '0.2rem',
                whiteSpace: 'nowrap',
              }}>{project.year}</div>
            </Link>
          ))}

          <div style={{ marginTop: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Link href="/projects" style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: '0.65rem', letterSpacing: '0.15em',
              color: 'rgba(196,30,58,0.7)',
              textDecoration: 'none', textTransform: 'uppercase',
              borderBottom: '1px solid rgba(196,30,58,0.3)',
              paddingBottom: '0.1rem',
              transition: 'color 0.2s',
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#c41e3a' }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(196,30,58,0.7)' }}
            >
              全部作品 / All Projects →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Gold divider ── */}
      <div style={{ height: '2px', background: 'linear-gradient(90deg, transparent, rgba(200,168,75,0.4), transparent)' }} />

      {/* ── Footer ── */}
      <footer style={{
        padding: '2.5rem 3rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: '#0a0704',
      }}>
        <div style={{
          fontFamily: '"Noto Serif SC", "Source Han Serif", Georgia, serif',
          fontSize: '1.1rem',
          color: 'rgba(196,30,58,0.3)',
          letterSpacing: '1.2rem',
          paddingLeft: '1.2rem',
        }}>道 德 力 武 技 工</div>
        <div style={{
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: '0.58rem', letterSpacing: '0.12em',
          color: 'rgba(232,224,208,0.2)',
        }}>lscythe.dev · {new Date().getFullYear()}</div>
      </footer>

      <style>{`
        @keyframes hanzi-breathe {
          0%, 100% { opacity: 0.18; }
          50% { opacity: 0.28; }
        }
      `}</style>
    </div>
  )
}
