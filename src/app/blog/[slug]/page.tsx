import { getAllPosts, getPostBySlug } from '@/lib/content'
import { markdownToHtml } from '@/lib/markdown'
import { notFound } from 'next/navigation'
import BlogArticleSwitcher from '@/components/layouts/BlogArticleSwitcher'

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
    <BlogArticleSwitcher
      slug={slug}
      title={post.title}
      date={post.date}
      readingTime={post.readingTime}
      tags={post.tags}
      html={html}
    />
  )
}
