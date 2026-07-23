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
      <div className="article-page">
        <Link href="/blog" className="back-link">← writing</Link>

        <div className="article-kicker">
          <span>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
          <span>{post.readingTime}</span>
        </div>

        <h1 className="article-title">{post.title}</h1>

        {/* 3D scene directly below title */}
        <div style={{ position: 'relative', height: '340px', background: 'var(--surface)', border: '1px solid var(--border)', marginBottom: '2rem', overflow: 'hidden' }}>
          <ArticleSceneWrapper slug={slug} />
          <div style={{
            position: 'absolute', bottom: '1rem', right: '1.5rem', zIndex: 2,
            fontFamily: 'var(--mono)', fontSize: '0.6rem', color: 'var(--dim)', letterSpacing: '0.12em',
          }}>
            &gt; {slug}.3d
          </div>
        </div>

        <div className="article-tags">
          {post.tags.map(t => <span key={t} className="tag">{t}</span>)}
        </div>

        <AsciiIllustration slug={slug} />

        <div className="article-content" dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </article>
  )
}
