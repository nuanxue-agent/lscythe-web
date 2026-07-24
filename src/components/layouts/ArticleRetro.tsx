'use client'

import Link from 'next/link'

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
  tags,
  links,
  html,
}: ArticleRetroProps) {
  return (
    <div style={{
      background: '#ffffff',
      minHeight: '100vh',
      fontFamily: 'Georgia, serif',
      color: '#000000',
    }}>
      <div style={{ display: 'flex', maxWidth: '960px', margin: '0 auto' }}>

        {/* Sidebar */}
        <aside style={{
          width: '180px',
          minWidth: '180px',
          borderRight: '1px solid #cccccc',
          padding: '1.5rem 1rem',
          background: '#f9f9f9',
        }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{
              background: '#dddddd',
              padding: '0.4rem 0.6rem',
              fontFamily: 'Trebuchet MS, sans-serif',
              fontSize: '0.8rem',
              fontWeight: 'bold',
              marginBottom: '0.5rem',
              borderBottom: '1px solid #bbbbbb',
            }}>
              Navigation
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.85rem', lineHeight: 2 }}>
              <li><Link href="/" style={{ color: '#0000ee', textDecoration: 'underline' }}>Home</Link></li>
              <li><Link href="/blog" style={{ color: '#0000ee', textDecoration: 'underline' }}>Writing</Link></li>
              <li><Link href="/projects" style={{ color: '#0000ee', textDecoration: 'underline' }}>Projects</Link></li>
              <li><Link href="/about" style={{ color: '#0000ee', textDecoration: 'underline' }}>About</Link></li>
              <li><Link href="/contact" style={{ color: '#0000ee', textDecoration: 'underline' }}>Contact</Link></li>
            </ul>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{
              background: '#dddddd',
              padding: '0.4rem 0.6rem',
              fontFamily: 'Trebuchet MS, sans-serif',
              fontSize: '0.8rem',
              fontWeight: 'bold',
              marginBottom: '0.5rem',
              borderBottom: '1px solid #bbbbbb',
            }}>
              Filed under
            </div>
            {tags.length > 0 ? (
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.8rem', lineHeight: 1.9 }}>
                {tags.map(t => (
                  <li key={t} style={{ color: '#333333' }}>{t}</li>
                ))}
              </ul>
            ) : (
              <p style={{ fontSize: '0.78rem', color: '#777777', margin: 0 }}>—</p>
            )}
          </div>

          <div>
            <Link
              href={backHref}
              style={{ fontSize: '0.8rem', color: '#0000ee', textDecoration: 'underline' }}
            >
              ← {backLabel}
            </Link>
          </div>
        </aside>

        {/* Article */}
        <article style={{ flex: 1, padding: '1.5rem 2rem', maxWidth: '700px' }}>

          {/* Breadcrumb */}
          <div style={{
            fontSize: '0.8rem',
            marginBottom: '1.25rem',
            paddingBottom: '0.75rem',
            borderBottom: '1px solid #e0e0e0',
          }}>
            <Link href="/" style={{ color: '#0000ee', textDecoration: 'underline' }}>Home</Link>
            {' / '}
            <Link href={backHref} style={{ color: '#0000ee', textDecoration: 'underline' }}>{backLabel}</Link>
          </div>

          {/* Kicker / meta */}
          <div style={{
            fontFamily: 'Courier New, monospace',
            fontSize: '0.75rem',
            color: '#777777',
            marginBottom: '0.5rem',
          }}>
            {kicker}
          </div>

          {/* Title */}
          <h1 style={{
            fontFamily: 'Georgia, serif',
            fontSize: '1.9rem',
            fontWeight: 'bold',
            lineHeight: 1.2,
            margin: '0 0 1rem 0',
            paddingBottom: '1rem',
            borderBottom: '2px solid #000000',
          }}>
            {title}
          </h1>

          {/* Tags inline */}
          {tags.length > 0 && (
            <div style={{
              fontSize: '0.78rem',
              color: '#555555',
              fontFamily: 'Courier New, monospace',
              marginBottom: '1.25rem',
            }}>
              Tags:{' '}
              {tags.map((t, i) => (
                <span key={t}>
                  <span style={{ color: '#000000' }}>{t}</span>
                  {i < tags.length - 1 ? ', ' : ''}
                </span>
              ))}
            </div>
          )}

          {/* External links */}
          {(links?.url || links?.repo) && (
            <div style={{
              marginBottom: '1.5rem',
              padding: '0.75rem',
              background: '#f9f9f9',
              border: '1px solid #dddddd',
              fontSize: '0.85rem',
              display: 'flex',
              gap: '1.25rem',
              flexWrap: 'wrap',
            }}>
              {links.url && (
                <a
                  href={links.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#0000ee', textDecoration: 'underline' }}
                >
                  [Visit project]
                </a>
              )}
              {links.repo && (
                <a
                  href={links.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#0000ee', textDecoration: 'underline' }}
                >
                  [View source]
                </a>
              )}
            </div>
          )}

          {/* Content */}
          {html && (
            <div
              style={{
                fontSize: '1rem',
                lineHeight: 1.85,
                fontFamily: 'Georgia, serif',
                color: '#111111',
              }}
              dangerouslySetInnerHTML={{ __html: html }}
            />
          )}

          {/* Footer */}
          <footer style={{
            marginTop: '3rem',
            paddingTop: '1rem',
            borderTop: '1px solid #cccccc',
            fontSize: '0.75rem',
            color: '#777777',
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '0.5rem',
            fontFamily: 'Courier New, monospace',
          }}>
            <Link href={backHref} style={{ color: '#0000ee', textDecoration: 'underline' }}>
              ← back to {backLabel}
            </Link>
            <span>lscythe.dev &nbsp;|&nbsp; best viewed in 1024×768</span>
          </footer>
        </article>
      </div>

      {/* Prose styles for retro markdown content */}
      <style>{`
        article a { color: #0000ee; text-decoration: underline; }
        article a:visited { color: #551a8b; }
        article h2, article h3, article h4 {
          font-family: Georgia, serif;
          font-weight: bold;
          margin-top: 2rem;
          margin-bottom: 0.5rem;
          color: #000000;
        }
        article h2 { font-size: 1.35rem; border-bottom: 1px solid #cccccc; padding-bottom: 0.3rem; }
        article h3 { font-size: 1.1rem; }
        article code {
          font-family: Courier New, monospace;
          font-size: 0.85em;
          background: #f4f4f4;
          border: 1px solid #dddddd;
          padding: 0.1em 0.3em;
          color: #333333;
        }
        article pre {
          background: #f4f4f4;
          border: 1px solid #cccccc;
          padding: 1rem;
          overflow-x: auto;
          font-family: Courier New, monospace;
          font-size: 0.82rem;
          line-height: 1.6;
          color: #222222;
          margin: 1.25rem 0;
        }
        article blockquote {
          border-left: 3px solid #aaaaaa;
          padding-left: 1rem;
          color: #555555;
          font-style: italic;
          margin: 1.25rem 0;
        }
        article ul, article ol {
          padding-left: 1.5rem;
          margin: 0.75rem 0;
          line-height: 1.8;
        }
        article p { margin: 0.75rem 0; }
      `}</style>
    </div>
  )
}
