'use client'

import { useTheme } from '@/components/ThemeProvider'
import BlogTerminal from '@/components/layouts/BlogTerminal'
import BlogVaporwave from '@/components/layouts/BlogVaporwave'
import BlogRetro from '@/components/layouts/BlogRetro'
import type { Post } from '@/lib/content'

interface BlogPageClientProps {
  posts: Post[]
}

export default function BlogPageClient({ posts }: BlogPageClientProps) {
  const { theme } = useTheme()

  if (theme === 'vaporwave') return <BlogVaporwave posts={posts} />
  if (theme === 'retro') return <BlogRetro posts={posts} />
  return <BlogTerminal posts={posts} />
}
