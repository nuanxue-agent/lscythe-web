'use client'

import Link from 'next/link'

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
    <div style={{ display: 'flex', maxWidth: '960px', margin: '0 auto', background: 'var(--black)' }}>
      {/* Sidebar */}
      <aside className="retro-sidebar" style={{
        width: '180px',
        minWidth: '180px',
        borderRight: '1px solid var(--border)',
        padding: '2rem 1rem',
        background: 'var(--surface)',
      }}>
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{
            fontSize: '1rem',
            fontWeight: 'bold',
            marginBottom: '0.75rem',
            fontFamily: 'Georgia, serif',
          }}>
            Site Nav
          </h2>
          <ul style={{ listStyle: 'none', fontSize: '0.85rem', lineHeight: 2 }}>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/blog">Writing</Link></li>
            <li><Link href="/projects">Projects</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>

        <div style={{
          padding: '0.75rem',
          border: '1px solid var(--border)',
          background: 'var(--black)',
          fontSize: '0.75rem',
          lineHeight: 1.6,
        }}>
          <strong style={{ display: 'block', marginBottom: '0.25rem', fontFamily: 'Georgia, serif' }}>
            About the author
          </strong>
          <span style={{ color: 'var(--dim)' }}>
            Android engineer from Jakarta. Writes about mobile, architecture, and tooling.
          </span>
        </div>
      </aside>

      {/* Main */}
      <main className="retro-column" style={{ flex: 1, maxWidth: '680px', padding: '2rem 2.5rem' }}>
        <header style={{ marginBottom: '2.5rem', borderBottom: '2px solid var(--border)', paddingBottom: '1rem' }}>
          <h1 style={{
            fontSize: '2rem',
            fontWeight: 'bold',
            fontFamily: 'Georgia, serif',
            marginBottom: '0.25rem',
          }}>
            Writing
          </h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--dim)', fontStyle: 'italic' }}>
            opinions, deep dives, and things i figured out the hard way.
          </p>
        </header>

        <ul className="retro-list" style={{ listStyle: 'none' }}>
          {posts.map((post, i) => (
            <li
              key={post.slug}
              style={{
                marginBottom: '2.5rem',
                paddingBottom: '2.5rem',
                borderBottom: i < posts.length - 1 ? '1px solid var(--border)' : 'none',
              }}
            >
              <div style={{
                fontSize: '0.75rem',
                color: 'var(--dim)',
                marginBottom: '0.35rem',
                fontFamily: 'monospace',
              }}>
                {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                {' · '}
                {post.readingTime}
              </div>

              <h2 style={{
                fontSize: '1.4rem',
                fontWeight: 'bold',
                fontFamily: 'Georgia, serif',
                marginBottom: '0.5rem',
                lineHeight: 1.3,
              }}>
                <Link href={`/blog/${post.slug}`}>
                  {post.title}
                </Link>
              </h2>

              <p style={{
                fontSize: '0.9rem',
                lineHeight: 1.65,
                color: 'var(--dim)',
                marginBottom: '0.75rem',
                fontFamily: 'Georgia, serif',
              }}>
                {post.description}
              </p>

              <div style={{ fontSize: '0.75rem', color: 'var(--dim)' }}>
                Tags: {post.tags.join(', ')}
              </div>

              <p style={{ marginTop: '0.5rem', fontSize: '0.85rem' }}>
                <Link href={`/blog/${post.slug}`}>Read more →</Link>
              </p>
            </li>
          ))}
        </ul>

        <footer style={{
          marginTop: '4rem',
          paddingTop: '2rem',
          borderTop: '1px solid var(--border)',
          fontSize: '0.75rem',
          color: 'var(--dim)',
          textAlign: 'center',
        }}>
          lscythe.dev © {new Date().getFullYear()}
        </footer>
      </main>
    </div>
  )
}
