'use client'

import Link from 'next/link'
import type { Post } from '@/lib/content'

interface BlogHanziProps {
  posts: Post[]
}

const DECO_CHARS = ['道', '德', '力', '武', '技', '工', '文', '心', '志', '气', '道', '明']

function formatDate(dateStr: string): { day: string; month: string; year: string } {
  if (!dateStr) return { day: '—', month: '—', year: '—' }
  const d = new Date(dateStr)
  return {
    day: String(d.getUTCDate()).padStart(2, '0'),
    month: d.toLocaleString('en', { month: 'short', timeZone: 'UTC' }).toUpperCase(),
    year: String(d.getUTCFullYear()),
  }
}

export default function BlogHanzi({ posts }: BlogHanziProps) {
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
        }}>scroll</div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem' }}>
          <h1 style={{
            fontFamily: 'Georgia, "Times New Roman", serif',
            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
            fontWeight: 400,
            letterSpacing: '0.15em',
            color: '#e8e0d0',
          }}>writing</h1>
          <span style={{
            fontFamily: '"Noto Serif SC", "Source Han Serif", Georgia, serif',
            fontSize: '1.4rem',
            color: 'rgba(196,30,58,0.5)',
          }}>文章</span>
        </div>
        <div style={{
          marginTop: '1rem',
          width: '3rem',
          height: '1px',
          background: '#c41e3a',
        }} />
      </div>

      {/* Posts */}
      <div style={{ padding: '1rem 4rem 6rem' }}>
        {posts.map((post, i) => {
          const { day, month, year } = formatDate(post.date)
          const deco = DECO_CHARS[i % DECO_CHARS.length]

          return (
            <div key={post.slug} style={{ position: 'relative' }}>
              {/* Large decorative character per post */}
              <span style={{
                position: 'absolute',
                right: '0',
                top: '50%',
                transform: 'translateY(-50%)',
                fontFamily: '"Noto Serif SC", "Source Han Serif", Georgia, serif',
                fontSize: 'clamp(4rem, 8vw, 7rem)',
                fontWeight: 900,
                color: 'rgba(196,30,58,0.04)',
                lineHeight: 1,
                userSelect: 'none',
                pointerEvents: 'none',
              }}>{deco}</span>

              <Link
                href={`/blog/${post.slug}`}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '5rem 1fr',
                  gap: '2.5rem',
                  padding: '2.25rem 0',
                  textDecoration: 'none',
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                {/* Date column */}
                <div style={{
                  textAlign: 'right',
                  borderRight: '1px solid rgba(196,30,58,0.2)',
                  paddingRight: '1.5rem',
                }}>
                  <div style={{
                    fontFamily: '"JetBrains Mono", monospace',
                    fontSize: '1.1rem',
                    color: 'rgba(196,30,58,0.6)',
                    lineHeight: 1,
                    marginBottom: '0.2rem',
                  }}>{day}</div>
                  <div style={{
                    fontFamily: '"JetBrains Mono", monospace',
                    fontSize: '0.55rem',
                    color: 'rgba(232,224,208,0.3)',
                    letterSpacing: '0.1em',
                  }}>{month}</div>
                  <div style={{
                    fontFamily: '"JetBrains Mono", monospace',
                    fontSize: '0.55rem',
                    color: 'rgba(232,224,208,0.2)',
                    letterSpacing: '0.05em',
                    marginTop: '0.15rem',
                  }}>{year}</div>
                </div>

                {/* Content column */}
                <div style={{ paddingRight: '8rem' }}>
                  <div style={{
                    fontFamily: 'Georgia, "Times New Roman", serif',
                    fontSize: '1.05rem',
                    fontWeight: 400,
                    color: '#e8e0d0',
                    letterSpacing: '0.04em',
                    marginBottom: '0.5rem',
                    lineHeight: 1.3,
                  }}>{post.title}</div>

                  <div style={{
                    fontFamily: '"JetBrains Mono", monospace',
                    fontSize: '0.65rem',
                    color: 'rgba(232,224,208,0.4)',
                    lineHeight: 1.7,
                    marginBottom: '0.75rem',
                    maxWidth: '480px',
                  }}>{post.description}</div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span style={{
                      fontFamily: '"JetBrains Mono", monospace',
                      fontSize: '0.55rem',
                      color: 'rgba(196,30,58,0.4)',
                      letterSpacing: '0.1em',
                    }}>{post.readingTime}</span>

                    {post.tags.slice(0, 2).map(tag => (
                      <span key={tag} style={{
                        fontFamily: '"JetBrains Mono", monospace',
                        fontSize: '0.5rem',
                        color: 'rgba(232,224,208,0.25)',
                        border: '1px solid rgba(196,30,58,0.15)',
                        padding: '0.1rem 0.35rem',
                        letterSpacing: '0.06em',
                      }}>{tag}</span>
                    ))}
                  </div>
                </div>
              </Link>

              {/* Divider */}
              <div style={{
                height: '1px',
                background: 'rgba(196,30,58,0.1)',
              }} />
            </div>
          )
        })}

        {posts.length === 0 && (
          <div style={{
            padding: '4rem 0',
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: '0.7rem',
            color: 'rgba(232,224,208,0.25)',
            letterSpacing: '0.1em',
          }}>no posts yet.</div>
        )}
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
        <span>lscythe.dev / writing</span>
        <span style={{
          fontFamily: '"Noto Serif SC", "Source Han Serif", Georgia, serif',
          color: 'rgba(196,30,58,0.15)',
        }}>文</span>
        <span>{new Date().getFullYear()}</span>
      </footer>
    </div>
  )
}
