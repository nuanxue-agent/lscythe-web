'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import AsciiIllustration from '@/components/AsciiIllustration'

interface ArticleVaporwaveProps {
  backHref: string
  backLabel: string
  kicker: React.ReactNode
  title: string
  slug: string
  tags: string[]
  links?: { url?: string; repo?: string }
  html: string
}

export default function ArticleVaporwave({
  backHref,
  backLabel,
  kicker,
  title,
  slug,
  tags,
  links,
  html,
}: ArticleVaporwaveProps) {
  return (
    <article style={{ background: 'var(--black)', minHeight: '100vh' }}>
      {/* Hero banner */}
      <div style={{
        padding: '5rem 2rem 3rem',
        background: 'linear-gradient(180deg, var(--surface) 0%, var(--black) 100%)',
        borderBottom: '2px solid var(--border)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Grid overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(185,103,255,0.05) 40px, rgba(185,103,255,0.05) 41px)',
          pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: '820px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <Link
            href={backHref}
            style={{
              fontFamily: 'var(--mono)',
              fontSize: '0.72rem',
              letterSpacing: '0.1em',
              color: 'var(--accent)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '2rem',
              transition: 'gap 0.2s',
            }}
          >
            ← {backLabel}
          </Link>

          <div style={{
            fontFamily: 'var(--mono)',
            fontSize: '0.7rem',
            color: 'var(--accent3)',
            letterSpacing: '0.12em',
            marginBottom: '1rem',
          }}>
            {kicker}
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
              fontWeight: 900,
              lineHeight: 1,
              letterSpacing: '-0.04em',
              textTransform: 'uppercase',
              background: 'linear-gradient(135deg, var(--accent), var(--accent2), var(--accent3))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 0 20px rgba(255,113,206,0.3))',
              marginBottom: '2rem',
            }}
          >
            {title}
          </motion.h1>

          {tags.length > 0 && (
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
              {tags.map(t => (
                <span
                  key={t}
                  style={{
                    fontFamily: 'var(--mono)',
                    fontSize: '0.65rem',
                    letterSpacing: '0.1em',
                    padding: '0.3rem 0.7rem',
                    border: '1px solid var(--accent)',
                    color: 'var(--accent)',
                    background: 'rgba(255,113,206,0.08)',
                    textTransform: 'lowercase',
                    boxShadow: '0 0 8px rgba(255,113,206,0.2)',
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          )}

          {(links?.url || links?.repo) && (
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              {links.url && (
                <a
                  href={links.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: 'var(--mono)',
                    fontSize: '0.72rem',
                    letterSpacing: '0.1em',
                    padding: '0.5rem 1rem',
                    border: '2px solid var(--accent)',
                    color: 'var(--accent)',
                    background: 'rgba(255,113,206,0.1)',
                    boxShadow: '0 0 12px rgba(255,113,206,0.3)',
                    transition: 'all 0.2s',
                  }}
                >
                  visit →
                </a>
              )}
              {links.repo && (
                <a
                  href={links.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: 'var(--mono)',
                    fontSize: '0.72rem',
                    letterSpacing: '0.1em',
                    padding: '0.5rem 1rem',
                    border: '2px solid var(--accent3)',
                    color: 'var(--accent3)',
                    background: 'rgba(185,103,255,0.1)',
                    boxShadow: '0 0 12px rgba(185,103,255,0.3)',
                    transition: 'all 0.2s',
                  }}
                >
                  source →
                </a>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: '820px', margin: '0 auto', padding: '4rem 2rem 6rem' }}>
        <AsciiIllustration slug={slug} />

        {html && (
          <div
            className="article-content"
            style={{
              borderLeft: '3px solid var(--accent)',
              paddingLeft: '2rem',
            }}
            dangerouslySetInnerHTML={{ __html: html }}
          />
        )}
      </div>
    </article>
  )
}
