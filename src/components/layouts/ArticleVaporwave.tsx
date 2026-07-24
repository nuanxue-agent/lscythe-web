'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

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
  tags,
  links,
  html,
}: ArticleVaporwaveProps) {
  return (
    <article style={{ background: '#0d0015', minHeight: '100vh', fontFamily: '"Inter", sans-serif' }}>

      {/* Hero banner — static grid overlay, no canvas (not cluttered) */}
      <div style={{
        padding: '5rem 2rem 3.5rem',
        background: 'linear-gradient(180deg, #160a2a 0%, #0d0015 100%)',
        borderBottom: '1px solid rgba(185,103,255,0.25)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Static grid lines */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: [
            'repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(185,103,255,0.05) 40px, rgba(185,103,255,0.05) 41px)',
            'repeating-linear-gradient(90deg, transparent, transparent 80px, rgba(1,205,254,0.03) 80px, rgba(1,205,254,0.03) 81px)',
          ].join(','),
          pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: '720px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          {/* Back link */}
          <Link
            href={backHref}
            style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: '0.68rem',
              letterSpacing: '0.12em',
              color: '#01cdfe',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              marginBottom: '2rem',
              textShadow: '0 0 10px rgba(1,205,254,0.5)',
            }}
          >
            ← {backLabel}
          </Link>

          {/* Kicker */}
          <div style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: '0.65rem',
            letterSpacing: '0.2em',
            color: '#b967ff',
            textTransform: 'uppercase',
            marginBottom: '1rem',
          }}>
            {kicker}
          </div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              fontSize: 'clamp(2rem, 6vw, 4rem)',
              fontWeight: 900,
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              textTransform: 'uppercase',
              background: 'linear-gradient(180deg, #ffffff 0%, #ff71ce 40%, #b967ff 70%, #01cdfe 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 0 20px rgba(255,113,206,0.6))',
              marginBottom: '1.75rem',
            }}
          >
            {title}
          </motion.h1>

          {/* Tags as neon chips */}
          {tags.length > 0 && (
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
              {tags.map(t => (
                <span
                  key={t}
                  style={{
                    fontFamily: '"JetBrains Mono", monospace',
                    fontSize: '0.62rem',
                    letterSpacing: '0.12em',
                    padding: '0.3rem 0.75rem',
                    border: '1px solid #ff71ce',
                    color: '#ff71ce',
                    background: 'rgba(255,113,206,0.08)',
                    textTransform: 'lowercase',
                    boxShadow: '0 0 10px rgba(255,113,206,0.25)',
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          )}

          {/* External links */}
          {(links?.url || links?.repo) && (
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              {links.url && (
                <a
                  href={links.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: '"JetBrains Mono", monospace',
                    fontSize: '0.68rem',
                    letterSpacing: '0.12em',
                    padding: '0.45rem 1rem',
                    border: '2px solid #ff71ce',
                    color: '#ff71ce',
                    background: 'rgba(255,113,206,0.1)',
                    boxShadow: '0 0 14px rgba(255,113,206,0.3)',
                    textDecoration: 'none',
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
                    fontFamily: '"JetBrains Mono", monospace',
                    fontSize: '0.68rem',
                    letterSpacing: '0.12em',
                    padding: '0.45rem 1rem',
                    border: '2px solid #b967ff',
                    color: '#b967ff',
                    background: 'rgba(185,103,255,0.1)',
                    boxShadow: '0 0 14px rgba(185,103,255,0.3)',
                    textDecoration: 'none',
                  }}
                >
                  source →
                </a>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Article content */}
      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '4rem 2rem 6rem' }}>
        {html && (
          <div
            style={{
              fontSize: '1rem',
              lineHeight: 1.85,
              color: '#c8b8e8',
              /* Accent links via inline style override on the container */
            }}
            dangerouslySetInnerHTML={{ __html: html }}
          />
        )}

        {/* Back link at bottom */}
        <div style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid rgba(185,103,255,0.2)' }}>
          <Link
            href={backHref}
            style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: '0.68rem',
              letterSpacing: '0.12em',
              color: '#01cdfe',
              textDecoration: 'none',
              textShadow: '0 0 10px rgba(1,205,254,0.4)',
            }}
          >
            ← back to {backLabel}
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid rgba(185,103,255,0.2)',
        padding: '2rem',
        textAlign: 'center',
        background: '#0d0015',
        fontFamily: '"JetBrains Mono", monospace',
        fontSize: '0.62rem',
        letterSpacing: '0.15em',
        color: 'rgba(185,103,255,0.4)',
      }}>
        <span style={{ color: '#ff71ce' }}>lscythe.dev</span> © {new Date().getFullYear()}
      </footer>

      {/* Prose link styling injected globally for this article */}
      <style>{`
        article a { color: #01cdfe; text-decoration: underline; }
        article a:hover { color: #ff71ce; text-shadow: 0 0 10px rgba(255,113,206,0.6); }
        article h2, article h3, article h4 {
          color: #ff71ce;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: -0.01em;
          margin-top: 2.5rem;
          margin-bottom: 0.75rem;
        }
        article code {
          font-family: "JetBrains Mono", monospace;
          font-size: 0.85em;
          color: #b967ff;
          background: rgba(185,103,255,0.1);
          padding: 0.1em 0.35em;
        }
        article pre {
          background: #160a2a;
          border: 1px solid rgba(185,103,255,0.25);
          padding: 1.25rem;
          overflow-x: auto;
          font-family: "JetBrains Mono", monospace;
          font-size: 0.82rem;
          line-height: 1.7;
          color: #c8b8e8;
          margin: 1.5rem 0;
        }
        article blockquote {
          border-left: 3px solid #b967ff;
          padding-left: 1.25rem;
          color: #9b89b8;
          font-style: italic;
          margin: 1.5rem 0;
        }
      `}</style>
    </article>
  )
}
