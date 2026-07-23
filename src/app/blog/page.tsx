import Link from 'next/link'
import { getAllPosts } from '@/lib/content'

export const metadata = {
  title: 'writing — lscythe',
  description: 'notes on design, development, and the spaces between.',
}

export default function BlogIndexPage() {
  const posts = getAllPosts()

  return (
    <>
      <div className="deco-bar">
        <span /><span /><span /><span /><span />
      </div>

      <div className="list-page">
        {/* sidebar */}
        <aside className="list-page__sidebar">
          <div style={{ fontSize: '0.65rem', letterSpacing: '0.2em', opacity: 0.4, marginBottom: '1.5rem' }}>
            02 / writing
          </div>
          <h1>writing</h1>
          <p>
            notes on design, development, and the spaces between.
            {posts.length > 0 && ` ${posts.length} ${posts.length === 1 ? 'post' : 'posts'}.`}
          </p>

          <div style={{ marginTop: '3rem' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              border: '2px solid var(--ink)',
              marginBottom: '0.75rem',
            }} />
            <div style={{
              width: '40px',
              height: '40px',
              background: 'var(--red)',
            }} />
          </div>
        </aside>

        {/* post list */}
        <main className="list-page__content">
          {posts.length === 0 ? (
            <div style={{
              padding: '4rem 2rem',
              opacity: 0.4,
              fontSize: '0.85rem',
              letterSpacing: '0.1em',
            }}>
              no posts yet.
            </div>
          ) : (
            posts.map((post, i) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="post-row"
              >
                <span className="post-row__num">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <div className="post-row__title">{post.title}</div>
                  <div className="post-row__meta">
                    <span>{post.date}</span>
                    <span>{post.readingTime}</span>
                  </div>
                  {post.description && (
                    <div className="post-row__desc">{post.description}</div>
                  )}
                  {post.tags.length > 0 && (
                    <div className="post-row__tags">
                      {post.tags.map(t => (
                        <span key={t} className="tag">{t}</span>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            ))
          )}
        </main>
      </div>
    </>
  )
}
