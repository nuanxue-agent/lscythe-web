'use client'

import { useTheme } from '@/components/ThemeProvider'
import ArticleTerminal from '@/components/layouts/ArticleTerminal'
import ArticleVaporwave from '@/components/layouts/ArticleVaporwave'
import ArticleRetro from '@/components/layouts/ArticleRetro'

interface ProjectArticleSwitcherProps {
  slug: string
  title: string
  year?: string
  status: string
  tags: string[]
  url?: string
  repo?: string
  html: string
}

export default function ProjectArticleSwitcher({
  slug,
  title,
  year,
  status,
  tags,
  url,
  repo,
  html,
}: ProjectArticleSwitcherProps) {
  const { theme } = useTheme()

  const kicker = (
    <>
      {year && <span>{year}</span>}
      <span className={`status-badge status-badge--${status}`}>{status}</span>
    </>
  )

  const links = { url, repo }

  if (theme === 'vaporwave') {
    return (
      <ArticleVaporwave
        backHref="/projects"
        backLabel="objects"
        kicker={kicker}
        title={title}
        slug={slug}
        tags={tags}
        links={links}
        html={html}
      />
    )
  }

  if (theme === 'retro') {
    return (
      <ArticleRetro
        backHref="/projects"
        backLabel="objects"
        kicker={kicker}
        title={title}
        slug={slug}
        tags={tags}
        links={links}
        html={html}
      />
    )
  }

  return (
    <ArticleTerminal
      backHref="/projects"
      backLabel="objects"
      kicker={kicker}
      title={title}
      slug={slug}
      tags={tags}
      links={links}
      html={html}
    />
  )
}
