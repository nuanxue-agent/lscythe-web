'use client'

import Link from 'next/link'
import type { Post } from '@/lib/content'

interface Props { posts: Post[] }

export default function BlogCyber({ posts }: Props) {
  return (
    <div style={{ background: '#0a0a0f', minHeight: '100vh', fontFamily: '"Inter", sans-serif', position: 'relative' }}>
      <div className="cyber-scanlines" />

      {/* Header */}
      <section style={{ padding: '8rem 2rem 4rem', position: 'relative' }}>
        <div className="cyber-rain" />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '800px', margin: '0 auto' }}>
          <p style={{
            fontFamily: '"Inter", sans-serif',
            fontSize: '0.6rem', letterSpacing: '0.35em',
            color: '#ff003c', textTransform: 'uppercase',
            textShadow: '0 0 10px rgba(255,0,60,0.5)',
            marginBottom: '0.75rem',
          }}>
            &gt;&gt; transmissions_log
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
            fontSize: '0.82rem',
            color: 'rgba(224,224,229,0.5)',
            letterSpacing: '0.05em',
          }}>
            {posts.length} transmissions archived
          </p>
        </div>
      </section>

      {/* Posts */}
      <section style={{ padding: '2rem 2rem 6rem' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '0' }}>
          {posts.map((post, i) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              style={{
                display: 'block',
                padding: '2rem 2rem 2rem 0',
                borderBottom: '1px solid rgba(255,0,60,0.15)',
                textDecoration: 'none',
                position: 'relative',
                transition: 'background 0.2s',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget
                el.style.background = 'rgba(255,0,60,0.04)'
                el.style.paddingLeft = '1rem'
                el.style.borderLeft = '3px solid #ff003c'
                el.style.boxShadow = '0 0 40px rgba(255,0,60,0.08)'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget
                el.style.background = 'transparent'
                el.style.paddingLeft = '0'
                el.style.borderLeft = 'none'
                el.style.boxShadow = 'none'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '1.5rem', marginBottom: '0.75rem' }}>
                {/* Index */}
                <span style={{
                  fontFamily: '"Inter", sans-serif',
                  fontSize: '0.55rem', letterSpacing: '0.2em',
                  color: 'rgba(255,0,60,0.5)', textTransform: 'uppercase',
                  flexShrink: 0,
                }}>
                  {String(i + 1).padStart(2, '0')}
                </span>

                {/* Date */}
                <span
                  className="cyber-glow-yellow"
                  style={{
                    fontFamily: '"Inter", sans-serif',
                    fontSize: '0.6rem', letterSpacing: '0.2em',
                    color: '#f7e500', textTransform: 'uppercase',
                  }}
                >
                  {post.date
                    ? new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).toUpperCase()
                    : 'UNDATED'}
                </span>
              </div>

              <h2
                className="cyber-glow-red"
                style={{
                  fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.02em',
                  color: '#ff003c',
                  marginBottom: '0.75rem',
                  lineHeight: 1.3,
                }}
              >
                {post.title}
              </h2>

              {post.description && (
                <p style={{
                  fontSize: '0.82rem',
                  color: 'rgba(224,224,229,0.55)',
                  lineHeight: 1.6,
                  marginBottom: '1rem',
                }}>
                  {post.description}
                </p>
              )}

              {post.tags && post.tags.length > 0 && (
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                  {post.tags.slice(0, 4).map(t => (
                    <span key={t} style={{
                      fontFamily: '"Inter", sans-serif',
                      fontSize: '0.52rem', letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      padding: '0.18rem 0.45rem',
                      border: '1px solid rgba(0,217,255,0.3)',
                      color: 'rgba(0,217,255,0.7)',
                    }}>{t}</span>
                  ))}
                </div>
              )}
            </Link>
          ))}

          {posts.length === 0 && (
            <div style={{
              padding: '4rem 0', textAlign: 'center',
              color: 'rgba(255,0,60,0.4)',
              fontFamily: '"Inter", sans-serif',
              fontSize: '0.75rem', letterSpacing: '0.2em',
              textTransform: 'uppercase',
            }}>
              NO TRANSMISSIONS FOUND
            </div>
          )}
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
