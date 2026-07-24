import { getAllPosts } from '@/lib/content'
import BlogPageClient from '@/components/layouts/BlogPageClient'

export const metadata = { title: 'writing' }

export default function BlogPage() {
  const posts = getAllPosts()
  return <BlogPageClient posts={posts} />
}
