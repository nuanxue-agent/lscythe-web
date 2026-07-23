import { getAllPosts, getPostBySlug } from '@/lib/content'
import { markdownToHtml } from '@/lib/markdown'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import AsciiIllustration from '@/components/AsciiIllustration'
import ArticleSceneWrapper from '@/components/ArticleSceneWrapper'

export async function generateStaticParams() {
  return getAllPosts().map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}
  return { title: post.title, description: post.description }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  const html = markdownToHtml(post.content)

  return (
    <article>
      {/* 3D scene header */}
      <div style={{ position: 'relative', height: '260px', background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
        <ArticleSceneWrapper slug={slug} />
        <div style={{
          position: 'absolute', inset: 0, zIndex: 2,
          display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
          padding: '1.5rem 2rem',
          background: 'linear-gradient(to top, rgba(8,8,8,0.85) 0%, transparent 60%)',
          pointerEvents: 'none',
        }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: 'var(--accent)', letterSpacing: '0.12em', marginBottom: '0.4rem' }}>
            &gt; writing / {slug}
          </div>
        </div>
      </div>

      {/* ASCII illustration */}
      <AsciiIllustration slug={slug} />

      {/* Article body */}
      <div className="article-page">
        <Link href="/blog" className="back-link">← writing</Link>

        <div className="article-kicker">
          <span>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
          <span>{post.readingTime}</span>
        </div>

        <h1 className="article-title">{post.title}</h1>

        <div className="article-tags">
          {post.tags.map(t => <span key={t} className="tag">{t}</span>)}
        </div>

        <div className="article-content" dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </article>
  )
}
