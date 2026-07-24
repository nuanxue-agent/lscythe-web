'use client'

import Link from 'next/link'
import type { Post } from '@/lib/content'

interface Props { posts: Post[] }

const CLASSIFICATION_LEVELS = ['TOP SECRET', 'CONFIDENTIAL', 'SECRET', 'RESTRICTED', 'CLASSIFIED']
const ORIGIN_NODES = ['NODE-JAKARTA-7', 'NODE-NOCTURN-1', 'RELAY-ALPHA-3', 'NODE-SHADOW-9', 'UPLINK-OMNI-2']
const FREQUENCIES = ['443.7MHz', '118.5MHz', '2.4GHz', '5.8GHz', '920MHz']

export default function BlogCyber({ posts }: Props) {
  const now = new Date()

  return (
    <div style={{ background: '#0a0a0f', minHeight: '100vh', fontFamily: '"JetBrains Mono", monospace', position: 'relative' }}>
      <div className="cyber-scanlines" />
      <div className="cyber-rain" style={{ opacity: 0.35 }} />

      {/* Header */}
      <section style={{ padding: '8rem 2rem 3rem', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>
          <p style={{
            fontSize: '0.6rem', letterSpacing: '0.35em',
            color: '#ff003c', textTransform: 'uppercase',
            textShadow: '0 0 10px rgba(255,0,60,0.5)',
            marginBottom: '0.75rem',
          }}>
            &gt;&gt; transmissions_log // intercepted
          </p>
          <h1
            className="cyber-glitch cyber-glow-red"
            data-text="WRITING"
            style={{
              fontSize: 'clamp(3rem, 10vw, 7rem)',
              fontWeight: 900, textTransform: 'uppercase',
              letterSpacing: '-0.02em',
              color: '#ff003c',
              marginBottom: '1rem',
            }}
          >
            WRITING
          </h1>
          <p style={{
            fontSize: '0.72rem',
            color: 'rgba(224,224,229,0.4)',
            letterSpacing: '0.08em',
          }}>
            {posts.length} transmissions archived // decryption key: public
          </p>
        </div>
      </section>

      {/* Posts as intercepted transmissions */}
      <section style={{ padding: '2rem 2rem 6rem', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '860px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {posts.map((post, i) => {
            const classLevel = CLASSIFICATION_LEVELS[i % CLASSIFICATION_LEVELS.length]
            const originNode = ORIGIN_NODES[i % ORIGIN_NODES.length]
            const freq = FREQUENCIES[i % FREQUENCIES.length]
            const classColor = i % 5 === 0 ? '#ff003c'
              : i % 5 === 1 ? '#f7e500'
              : i % 5 === 2 ? '#ff003c'
              : i % 5 === 3 ? '#f7e500'
              : '#00d9ff'

            const dateStr = post.date
              ? new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric', month: 'short', day: '2-digit', timeZone: 'UTC',
                }).toUpperCase()
              : 'UNDATED'

            return (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                style={{
                  display: 'block',
                  border: `1px solid ${classColor}33`,
                  background: 'rgba(15,15,23,0.8)',
                  textDecoration: 'none',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'border-color 0.2s, box-shadow 0.2s',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.borderColor = `${classColor}88`
                  el.style.boxShadow = `0 0 30px ${classColor}22`
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.borderColor = `${classColor}33`
                  el.style.boxShadow = 'none'
                }}
              >
                {/* Classification header bar */}
                <div style={{
                  background: `${classColor}15`,
                  borderBottom: `1px solid ${classColor}33`,
                  padding: '0.5rem 1.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '0.75rem',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    {/* Classification badge */}
                    <span style={{
                      fontSize: '0.52rem',
                      letterSpacing: '0.18em',
                      textTransform: 'uppercase',
                      color: classColor,
                      textShadow: `0 0 6px ${classColor}`,
                      border: `1px solid ${classColor}66`,
                      padding: '0.1rem 0.5rem',
                      background: `${classColor}0d`,
                    }}>{classLevel}</span>

                    <span style={{
                      fontSize: '0.52rem',
                      letterSpacing: '0.12em',
                      color: 'rgba(224,224,229,0.3)',
                    }}>FILE-{String(i + 1).padStart(4, '0')}</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                    <span style={{
                      fontSize: '0.5rem',
                      color: 'rgba(0,217,255,0.5)',
                      letterSpacing: '0.1em',
                    }}>ORIGIN: {originNode}</span>
                    <span style={{
                      fontSize: '0.5rem',
                      color: 'rgba(247,229,0,0.4)',
                      letterSpacing: '0.1em',
                    }}>FREQ: {freq}</span>
                  </div>
                </div>

                {/* Transmission body */}
                <div style={{ padding: '1.25rem 1.25rem 1.5rem' }}>
                  {/* Metadata line */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1.5rem',
                    marginBottom: '0.85rem',
                    flexWrap: 'wrap',
                  }}>
                    <span style={{
                      fontSize: '0.58rem',
                      letterSpacing: '0.18em',
                      color: '#f7e500',
                      textShadow: '0 0 6px rgba(247,229,0,0.5)',
                    }}>{dateStr}</span>

                    {post.readingTime && (
                      <span style={{
                        fontSize: '0.52rem',
                        color: 'rgba(224,224,229,0.3)',
                        letterSpacing: '0.1em',
                      }}>// {post.readingTime}</span>
                    )}
                  </div>

                  {/* Title */}
                  <h2 style={{
                    fontSize: 'clamp(1rem, 2.5vw, 1.35rem)',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                    color: '#e0e0e5',
                    marginBottom: '0.75rem',
                    lineHeight: 1.3,
                  }}>
                    {post.title}
                  </h2>

                  {/* Description as intercepted body text */}
                  {post.description && (
                    <div style={{ marginBottom: '1rem' }}>
                      <span style={{
                        fontSize: '0.55rem',
                        color: classColor,
                        opacity: 0.6,
                        marginRight: '0.5rem',
                        letterSpacing: '0.1em',
                      }}>&gt;</span>
                      <span style={{
                        fontSize: '0.78rem',
                        color: 'rgba(224,224,229,0.5)',
                        lineHeight: 1.7,
                        letterSpacing: '0.02em',
                      }}>
                        {post.description}
                      </span>
                    </div>
                  )}

                  {/* Tags */}
                  {post.tags && post.tags.length > 0 && (
                    <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginTop: '0.75rem' }}>
                      {post.tags.slice(0, 4).map(t => (
                        <span key={t} style={{
                          fontSize: '0.5rem', letterSpacing: '0.12em',
                          textTransform: 'uppercase',
                          padding: '0.18rem 0.45rem',
                          border: '1px solid rgba(0,217,255,0.25)',
                          color: 'rgba(0,217,255,0.6)',
                        }}>{t}</span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Bottom classification footer */}
                <div style={{
                  borderTop: `1px solid ${classColor}22`,
                  padding: '0.4rem 1.25rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                  <span style={{
                    fontSize: '0.48rem',
                    color: 'rgba(224,224,229,0.2)',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                  }}>
                    {classLevel} // handle with care // lscythe.dev
                  </span>
                  <span style={{
                    fontSize: '0.48rem',
                    color: classColor,
                    opacity: 0.4,
                    letterSpacing: '0.1em',
                  }}>
                    READ →
                  </span>
                </div>
              </Link>
            )
          })}

          {posts.length === 0 && (
            <div style={{
              padding: '4rem 0', textAlign: 'center',
              color: 'rgba(255,0,60,0.4)',
              fontSize: '0.75rem', letterSpacing: '0.2em',
              textTransform: 'uppercase',
            }}>
              NO TRANSMISSIONS FOUND // SIGNAL LOST
            </div>
          )}

          {/* Terminal prompt at end */}
          <div style={{
            padding: '1rem 0',
            fontSize: '0.62rem',
            color: 'rgba(0,255,80,0.5)',
            letterSpacing: '0.1em',
          }}>
            <span style={{ color: 'rgba(255,0,60,0.5)' }}>lscythe@nocturn</span>
            <span style={{ color: 'rgba(224,224,229,0.3)' }}>:</span>
            <span style={{ color: 'rgba(0,217,255,0.5)' }}>~/transmissions</span>
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
        fontSize: '0.6rem', letterSpacing: '0.15em',
        color: 'rgba(255,0,60,0.4)',
      }}>
        <span style={{ color: '#ff003c', textShadow: '0 0 8px rgba(255,0,60,0.5)' }}>LSCYTHE.DEV</span>
        {' '}// {now.getFullYear()} // TRANSMISSIONS ARCHIVE
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
