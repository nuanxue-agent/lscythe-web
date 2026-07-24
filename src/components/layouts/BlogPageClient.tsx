'use client'

import { useTheme } from '@/components/ThemeProvider'
import BlogTerminal from '@/components/layouts/BlogTerminal'
import BlogVaporwave from '@/components/layouts/BlogVaporwave'
import BlogRetro from '@/components/layouts/BlogRetro'
import BlogCyber from '@/components/layouts/BlogCyber'
import BlogHanzi from '@/components/layouts/BlogHanzi'
import type { Post } from '@/lib/content'

interface BlogPageClientProps {
  posts: Post[]
}

export default function BlogPageClient({ posts }: BlogPageClientProps) {
  const { theme, mounted } = useTheme()
  if (!mounted) return null

  if (theme === 'vaporwave') return <BlogVaporwave posts={posts} />
  if (theme === 'retro') return <BlogRetro posts={posts} />
  if (theme === 'cyber') return <BlogCyber posts={posts} />
  if (theme === 'hanzi') return <BlogHanzi posts={posts} />
  return <BlogTerminal posts={posts} />
}
