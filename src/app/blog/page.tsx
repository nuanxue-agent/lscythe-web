import { getAllPosts } from '@/lib/content'
import Link from 'next/link'
import Reveal from '@/components/Reveal'

export const metadata = { title: 'writing' }

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <div className="list-page">
      <Reveal className="list-page__sidebar">
        <p className="section-heading__num prompt">writing</p>
        <h1>blog</h1>
        <p>opinions, deep dives, and things i figured out the hard way.</p>
      </Reveal>

      <div className="list-page__content">
        {posts.map((post, i) => (
          <Reveal key={post.slug} delay={i * 50}>
            <Link href={`/blog/${post.slug}`} className="post-row">
              <span className="post-row__num">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <div className="post-row__title">{post.title}</div>
                <div className="post-row__meta">
                  <span>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                  <span>{post.readingTime}</span>
                </div>
                <div className="post-row__desc">{post.description}</div>
                <div className="post-row__tags">
                  {post.tags.map(t => <span key={t} className="tag">{t}</span>)}
                </div>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  )
}
