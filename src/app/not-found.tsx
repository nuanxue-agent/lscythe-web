import Link from 'next/link'
import ArticleSceneWrapper from '@/components/ArticleSceneWrapper'

export default function NotFoundPage() {
  return (
    <>
      <div className="deco-bar">
        <span /><span /><span /><span /><span />
      </div>

      <div className="notfound-split">
        {/* 3D scene left */}
        <div className="notfound-scene">
          <ArticleSceneWrapper slug="404-error" sceneOverride="wormhole" />
          <div className="notfound-scene__fade" />
        </div>

        {/* Content right */}
        <div className="notfound-content">
          <div style={{
            fontFamily: 'var(--mono)',
            fontSize: '0.65rem',
            color: 'var(--accent2)',
            letterSpacing: '0.2em',
          }}>
            &gt; error / 404
          </div>

          <div className="notfound-num" style={{ color: 'var(--accent2)', textShadow: '0 0 40px rgba(255,51,102,0.4), 0 0 80px rgba(255,51,102,0.2)' }}>
            404
          </div>

          <div className="notfound-label">object not found</div>

          <p style={{
            fontSize: '0.85rem',
            color: 'var(--dim)',
            lineHeight: 1.7,
            maxWidth: '36ch',
          }}>
            the requested path does not exist in this namespace.
            return to base or check the terminal for available routes.
          </p>

          <Link href="/" className="article-link">
            &larr; return home
          </Link>
        </div>
      </div>
    </>
  )
}
