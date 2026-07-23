import Link from 'next/link'
import type { Metadata } from 'next'
import { getAllPosts, getPostBySlug } from '@/lib/content'
import { markdownToHtml } from '@/lib/markdown'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map(post => ({ slug: post.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}
  return {
    title: `${post.title} — lscythe`,
    description: post.description,
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  const html = markdownToHtml(post.content)

  return (
    <>
      <div className="deco-bar">
        <span /><span /><span /><span /><span />
      </div>

      <article className="article-page">
        <Link href="/blog" className="back-link">
          ← writing
        </Link>

        <div className="article-kicker">
          <span>{post.date}</span>
          <span>{post.readingTime}</span>
        </div>

        <h1 className="article-title">{post.title}</h1>

        {post.tags.length > 0 && (
          <div className="article-tags">
            {post.tags.map(t => (
              <span key={t} className="tag">{t}</span>
            ))}
          </div>
        )}

        <div
          className="article-content"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </article>
    </>
  )
}
