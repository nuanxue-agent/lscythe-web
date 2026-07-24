'use client'

import Link from 'next/link'
import type { Post } from '@/lib/content'

interface BlogHanziProps {
  posts: Post[]
}

const DECO_CHARS = ['道', '德', '力', '武', '技', '工', '文', '心', '志', '气', '明', '義']

function formatChineseDate(dateStr: string): { yearHanzi: string; monthNum: string; dayNum: string; raw: string } {
  if (!dateStr) return { yearHanzi: '—', monthNum: '—', dayNum: '—', raw: '' }
  const d = new Date(dateStr)
  const year = d.getUTCFullYear()
  const month = d.getUTCMonth() + 1
  const day = d.getUTCDate()
  return {
    yearHanzi: `${year}年`,
    monthNum: `${month}月`,
    dayNum: `${day}日`,
    raw: dateStr,
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
        }}>文</div>

        <div style={{
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: '0.62rem',
          color: 'rgba(232,224,208,0.3)',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          marginBottom: '1.25rem',
        }}>典籍 · scroll / journal</div>

        <div style={{ display: 'flex', alignItems: 'baseline', gap: '1.25rem' }}>
          <h1 style={{
            fontFamily: 'Georgia, "Times New Roman", serif',
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 400,
            letterSpacing: '0.2em',
            color: '#e8e0d0',
          }}>writing</h1>
          <span style={{
            fontFamily: '"Noto Serif SC", "Source Han Serif", Georgia, serif',
            fontSize: '1.6rem',
            color: 'rgba(196,30,58,0.5)',
          }}>文章</span>
        </div>

        {/* Red rule */}
        <div style={{
          marginTop: '1.5rem',
          width: '100%',
          height: '2px',
          background: 'rgba(196,30,58,0.25)',
        }} />
      </div>

      {/* Posts as scroll/journal entries */}
      <div style={{ padding: '0 6rem 8rem' }}>
        {posts.map((post, i) => {
          const { yearHanzi, monthNum, dayNum } = formatChineseDate(post.date)
          const deco = DECO_CHARS[i % DECO_CHARS.length]

          return (
            <div key={post.slug} style={{ position: 'relative' }}>
              {/* Large decorative character per entry */}
              <div style={{
                position: 'absolute',
                right: '-1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                fontFamily: '"Noto Serif SC", "Source Han Serif", Georgia, serif',
                fontSize: 'clamp(5rem, 10vw, 8rem)',
                fontWeight: 900,
                color: 'rgba(196,30,58,0.05)',
                lineHeight: 1,
                userSelect: 'none',
                pointerEvents: 'none',
              }}>{deco}</div>

              <Link
                href={`/blog/${post.slug}`}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '7rem 1fr',
                  gap: '3rem',
                  padding: '3rem 0',
                  textDecoration: 'none',
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                {/* Date column — Chinese date format */}
                <div style={{
                  textAlign: 'right',
                  borderRight: '1px solid rgba(196,30,58,0.2)',
                  paddingRight: '2rem',
                  paddingTop: '0.2rem',
                }}>
                  <div style={{
                    fontFamily: '"Noto Serif SC", "Source Han Serif", Georgia, serif',
                    fontSize: '0.85rem',
                    color: 'rgba(196,30,58,0.7)',
                    lineHeight: 1.6,
                    letterSpacing: '0.05em',
                  }}>
                    <div>{yearHanzi}</div>
                    <div>{monthNum}</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 700 }}>{dayNum}</div>
                  </div>
                </div>

                {/* Content column */}
                <div style={{ paddingRight: '8rem' }}>
                  {/* Entry label */}
                  <div style={{
                    fontFamily: '"JetBrains Mono", monospace',
                    fontSize: '0.58rem',
                    color: 'rgba(196,30,58,0.35)',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    marginBottom: '0.75rem',
                  }}>
                    手記 · entry {String(i + 1).padStart(2, '0')}
                  </div>

                  <div style={{
                    fontFamily: 'Georgia, "Times New Roman", serif',
                    fontSize: 'clamp(1.05rem, 2.5vw, 1.3rem)',
                    fontWeight: 400,
                    color: '#e8e0d0',
                    letterSpacing: '0.05em',
                    marginBottom: '0.75rem',
                    lineHeight: 1.3,
                  }}>{post.title}</div>

                  <div style={{
                    fontFamily: '"JetBrains Mono", monospace',
                    fontSize: '0.68rem',
                    color: 'rgba(232,224,208,0.4)',
                    lineHeight: 1.8,
                    marginBottom: '1rem',
                    maxWidth: '520px',
                  }}>{post.description}</div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
                    <span style={{
                      fontFamily: '"JetBrains Mono", monospace',
                      fontSize: '0.55rem',
                      color: 'rgba(196,30,58,0.4)',
                      letterSpacing: '0.1em',
                    }}>{post.readingTime}</span>

                    {post.tags.slice(0, 3).map(tag => (
                      <span key={tag} style={{
                        fontFamily: '"JetBrains Mono", monospace',
                        fontSize: '0.52rem',
                        color: 'rgba(232,224,208,0.25)',
                        border: '1px solid rgba(196,30,58,0.15)',
                        padding: '0.1rem 0.4rem',
                        letterSpacing: '0.06em',
                      }}>{tag}</span>
                    ))}
                  </div>
                </div>
              </Link>

              {/* Full-width divider */}
              <div style={{
                width: '100%',
                height: '1px',
                background: 'rgba(196,30,58,0.1)',
              }} />
            </div>
          )
        })}

        {posts.length === 0 && (
          <div style={{
            padding: '5rem 0',
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: '0.7rem',
            color: 'rgba(232,224,208,0.25)',
            letterSpacing: '0.1em',
            textAlign: 'center',
          }}>
            <div style={{
              fontFamily: '"Noto Serif SC", "Source Han Serif", Georgia, serif',
              fontSize: '3rem',
              color: 'rgba(196,30,58,0.1)',
              marginBottom: '1rem',
            }}>空</div>
            no entries yet.
          </div>
        )}
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
          <span>lscythe.dev / writing</span>
          <span style={{
            fontFamily: '"Noto Serif SC", "Source Han Serif", Georgia, serif',
            color: 'rgba(196,30,58,0.15)',
          }}>文</span>
          <span>{new Date().getFullYear()}</span>
        </div>
      </footer>
    </div>
  )
}
