'use client'

import Link from 'next/link'
import AsciiIllustration from '@/components/AsciiIllustration'
import ArticleSceneWrapper from '@/components/ArticleSceneWrapper'

interface ArticleTerminalProps {
  backHref: string
  backLabel: string
  kicker: React.ReactNode
  title: string
  slug: string
  tags: string[]
  links?: { url?: string; repo?: string }
  html: string
  showScene?: boolean
}

export default function ArticleTerminal({
  backHref,
  backLabel,
  kicker,
  title,
  slug,
  tags,
  links,
  html,
  showScene = true,
}: ArticleTerminalProps) {
  return (
    <article>
      <div className="article-page">
        <Link href={backHref} className="back-link">← {backLabel}</Link>

        <div className="article-kicker">{kicker}</div>

        <h1 className="article-title">{title}</h1>

        {showScene && (
          <div style={{
            position: 'relative',
            height: '340px',
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            marginBottom: '2rem',
            overflow: 'hidden',
          }}>
            <ArticleSceneWrapper slug={slug} />
            <div style={{
              position: 'absolute', bottom: '1rem', right: '1.5rem', zIndex: 2,
              fontFamily: 'var(--mono)', fontSize: '0.6rem', color: 'var(--dim)', letterSpacing: '0.12em',
            }}>
              &gt; {slug}.3d
            </div>
          </div>
        )}

        {tags.length > 0 && (
          <div className="article-tags">
            {tags.map(t => <span key={t} className="tag">{t}</span>)}
          </div>
        )}

        {(links?.url || links?.repo) && (
          <div className="article-links">
            {links.url && (
              <a href={links.url} className="article-link" target="_blank" rel="noopener noreferrer">visit →</a>
            )}
            {links.repo && (
              <a href={links.repo} className="article-link" target="_blank" rel="noopener noreferrer">source →</a>
            )}
          </div>
        )}

        <AsciiIllustration slug={slug} />

        {html && <div className="article-content" dangerouslySetInnerHTML={{ __html: html }} />}
      </div>
    </article>
  )
}
