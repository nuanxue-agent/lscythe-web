'use client'

import Link from 'next/link'
import AsciiIllustration from '@/components/AsciiIllustration'

interface ArticleRetroProps {
  backHref: string
  backLabel: string
  kicker: React.ReactNode
  title: string
  slug: string
  tags: string[]
  links?: { url?: string; repo?: string }
  html: string
}

export default function ArticleRetro({
  backHref,
  backLabel,
  kicker,
  title,
  slug,
  tags,
  links,
  html,
}: ArticleRetroProps) {
  return (
    <div style={{ display: 'flex', maxWidth: '960px', margin: '0 auto', background: 'var(--black)' }}>
      {/* Sidebar */}
      <aside className="retro-sidebar" style={{
        width: '180px',
        minWidth: '180px',
        borderRight: '1px solid var(--border)',
        padding: '2rem 1rem',
        background: 'var(--surface)',
      }}>
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: '0.75rem', fontFamily: 'Georgia, serif' }}>
            Site Nav
          </h2>
          <ul style={{ listStyle: 'none', fontSize: '0.85rem', lineHeight: 2 }}>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/blog">Writing</Link></li>
            <li><Link href="/projects">Projects</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>

        <div>
          <p style={{ fontSize: '0.75rem', color: 'var(--dim)', lineHeight: 1.6 }}>
            <Link href={backHref}>← Back to {backLabel}</Link>
          </p>
        </div>
      </aside>

      {/* Article */}
      <article className="retro-column" style={{ flex: 1, maxWidth: '680px', padding: '2rem 2.5rem' }}>
        <div style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '1.5rem' }}>
          <Link href={backHref} style={{ fontSize: '0.85rem' }}>← Back to {backLabel}</Link>
        </div>

        <div style={{
          fontSize: '0.8rem',
          color: 'var(--dim)',
          fontFamily: 'monospace',
          marginBottom: '0.75rem',
        }}>
          {kicker}
        </div>

        <h1 style={{
          fontSize: '2rem',
          fontWeight: 'bold',
          fontFamily: 'Georgia, serif',
          lineHeight: 1.25,
          marginBottom: '1.5rem',
          paddingBottom: '1.5rem',
          borderBottom: '2px solid var(--border)',
        }}>
          {title}
        </h1>

        {tags.length > 0 && (
          <div style={{ marginBottom: '1.5rem', fontSize: '0.8rem', color: 'var(--dim)' }}>
            Filed under:{' '}
            {tags.map((t, i) => (
              <span key={t}>
                <span style={{ color: 'var(--accent)' }}>{t}</span>
                {i < tags.length - 1 ? ', ' : ''}
              </span>
            ))}
          </div>
        )}

        {(links?.url || links?.repo) && (
          <div style={{ marginBottom: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            {links.url && (
              <a
                href={links.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: '0.85rem' }}
              >
                [Visit project]
              </a>
            )}
            {links.repo && (
              <a
                href={links.repo}
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: '0.85rem' }}
              >
                [View source]
              </a>
            )}
          </div>
        )}

        <AsciiIllustration slug={slug} />

        {html && (
          <div
            style={{
              fontSize: '1rem',
              lineHeight: 1.85,
              fontFamily: 'Georgia, serif',
              color: 'var(--white)',
            }}
            dangerouslySetInnerHTML={{ __html: html }}
          />
        )}

        <footer style={{
          marginTop: '4rem',
          paddingTop: '2rem',
          borderTop: '1px solid var(--border)',
          fontSize: '0.75rem',
          color: 'var(--dim)',
        }}>
          <Link href={backHref}>← Back to {backLabel}</Link>
          <span style={{ float: 'right' }}>lscythe.dev</span>
        </footer>
      </article>
    </div>
  )
}
