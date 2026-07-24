'use client'

import { useTheme } from '@/components/ThemeProvider'
import ArticleTerminal from '@/components/layouts/ArticleTerminal'
import ArticleVaporwave from '@/components/layouts/ArticleVaporwave'
import ArticleRetro from '@/components/layouts/ArticleRetro'

interface BlogArticleSwitcherProps {
  slug: string
  title: string
  date: string
  readingTime: string
  tags: string[]
  html: string
}

export default function BlogArticleSwitcher({
  slug,
  title,
  date,
  readingTime,
  tags,
  html,
}: BlogArticleSwitcherProps) {
  const { theme, mounted } = useTheme()
  if (!mounted) return null

  const kicker = (
    <>
      <span>{new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
      <span>{readingTime}</span>
    </>
  )

  if (theme === 'vaporwave') {
    return (
      <ArticleVaporwave
        backHref="/blog"
        backLabel="writing"
        kicker={kicker}
        title={title}
        slug={slug}
        tags={tags}
        html={html}
      />
    )
  }

  if (theme === 'retro') {
    return (
      <ArticleRetro
        backHref="/blog"
        backLabel="writing"
        kicker={kicker}
        title={title}
        slug={slug}
        tags={tags}
        html={html}
      />
    )
  }

  return (
    <ArticleTerminal
      backHref="/blog"
      backLabel="writing"
      kicker={kicker}
      title={title}
      slug={slug}
      tags={tags}
      html={html}
    />
  )
}
