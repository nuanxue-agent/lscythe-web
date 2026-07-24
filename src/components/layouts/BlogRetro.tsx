'use client'

import Link from 'next/link'
import RetroHitCounter from '@/components/RetroHitCounter'

interface Post {
  slug: string
  title: string
  description: string
  date: string
  readingTime: string
  tags: string[]
}

interface BlogRetroProps {
  posts: Post[]
}

export default function BlogRetro({ posts }: BlogRetroProps) {
  return (
    <div style={{
      background: '#ffffff',
      minHeight: '100vh',
      fontFamily: 'Georgia, serif',
      color: '#000000',
    }}>
      <div className="retro-layout-shell" style={{ display: 'flex', maxWidth: '960px', margin: '0 auto' }}>

        {/* Sidebar */}
        <aside style={{
          width: '180px',
          minWidth: '180px',
          borderRight: '1px solid #cccccc',
          padding: '1.5rem 1rem',
          background: '#f9f9f9',
        }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{
              background: '#dddddd',
              padding: '0.4rem 0.6rem',
              fontFamily: 'Trebuchet MS, sans-serif',
              fontSize: '0.8rem',
              fontWeight: 'bold',
              marginBottom: '0.5rem',
              borderBottom: '1px solid #bbbbbb',
            }}>
              Navigation
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.85rem', lineHeight: 2 }}>
              <li><Link href="/" style={{ color: '#0000ee', textDecoration: 'underline' }}>Home</Link></li>
              <li><Link href="/blog" style={{ color: '#0000ee', textDecoration: 'underline' }}>Writing</Link></li>
              <li><Link href="/projects" style={{ color: '#0000ee', textDecoration: 'underline' }}>Projects</Link></li>
              <li><Link href="/about" style={{ color: '#0000ee', textDecoration: 'underline' }}>About</Link></li>
              <li><Link href="/contact" style={{ color: '#0000ee', textDecoration: 'underline' }}>Contact</Link></li>
            </ul>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{
              background: '#dddddd',
              padding: '0.4rem 0.6rem',
              fontFamily: 'Trebuchet MS, sans-serif',
              fontSize: '0.8rem',
              fontWeight: 'bold',
              marginBottom: '0.5rem',
              borderBottom: '1px solid #bbbbbb',
            }}>
              About
            </div>
            <p style={{
              fontSize: '0.78rem',
              lineHeight: 1.6,
              color: '#444444',
              margin: 0,
            }}>
              Android engineer from Jakarta. Writes about mobile, architecture, and tooling.
            </p>
          </div>

          <div>
            <div style={{
              background: '#dddddd',
              padding: '0.4rem 0.6rem',
              fontFamily: 'Trebuchet MS, sans-serif',
              fontSize: '0.8rem',
              fontWeight: 'bold',
              marginBottom: '0.5rem',
              borderBottom: '1px solid #bbbbbb',
            }}>
              Archive
            </div>
            <p style={{ fontSize: '0.75rem', color: '#666666', margin: 0, lineHeight: 1.7 }}>
              {posts.length} post{posts.length !== 1 ? 's' : ''} total
            </p>
          </div>
        </aside>

        {/* Main */}
        <main style={{ flex: 1, padding: '1.5rem 2rem' }}>
          <div style={{
            borderBottom: '2px solid #000000',
            paddingBottom: '0.75rem',
            marginBottom: '2rem',
          }}>
            <h1 style={{
              fontFamily: 'Georgia, serif',
              fontSize: '1.8rem',
              fontWeight: 'bold',
              margin: 0,
              marginBottom: '0.2rem',
            }}>
              Writing
            </h1>
            <p style={{ margin: 0, fontSize: '0.85rem', color: '#555555', fontStyle: 'italic' }}>
              opinions, deep dives, and things i figured out the hard way.
            </p>
          </div>

          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {posts.map((post, i) => (
              <li
                key={post.slug}
                style={{
                  paddingBottom: '1.75rem',
                  marginBottom: '1.75rem',
                  borderBottom: i < posts.length - 1 ? '1px solid #e0e0e0' : 'none',
                }}
              >
                {/* Date + reading time */}
                <div style={{
                  fontFamily: 'Courier New, monospace',
                  fontSize: '0.72rem',
                  color: '#777777',
                  marginBottom: '0.3rem',
                }}>
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                  {' · '}
                  {post.readingTime}
                </div>

                <h2 style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: '1.35rem',
                  fontWeight: 'bold',
                  lineHeight: 1.3,
                  margin: '0 0 0.4rem 0',
                }}>
                  <Link
                    href={`/blog/${post.slug}`}
                    style={{ color: '#0000ee', textDecoration: 'underline' }}
                  >
                    {post.title}
                  </Link>
                </h2>

                <p style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: '0.9rem',
                  lineHeight: 1.65,
                  color: '#333333',
                  margin: '0 0 0.6rem 0',
                }}>
                  {post.description}
                </p>

                <div style={{
                  fontSize: '0.75rem',
                  color: '#777777',
                  fontFamily: 'Courier New, monospace',
                  marginBottom: '0.5rem',
                }}>
                  Tags: {post.tags.join(', ')}
                </div>

                <Link
                  href={`/blog/${post.slug}`}
                  style={{ fontSize: '0.85rem', color: '#0000ee', textDecoration: 'underline' }}
                >
                  Read more →
                </Link>
              </li>
            ))}
          </ul>

          <footer style={{
            marginTop: '3rem',
            paddingTop: '1rem',
            borderTop: '1px solid #cccccc',
            fontSize: '0.72rem',
            color: '#777777',
            textAlign: 'center',
            fontFamily: 'Courier New, monospace',
          }}>
            <RetroHitCounter />
            <div style={{ marginTop: '0.75rem' }}>
              lscythe.dev © {new Date().getFullYear()} &nbsp;|&nbsp; best viewed in 1024×768
            </div>
          </footer>
        </main>
      </div>
    </div>
  )
}
