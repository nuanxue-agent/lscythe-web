import Link from 'next/link'

export default function NotFound() {
  return (
    <>
      <div className="deco-bar">
        <span /><span /><span /><span /><span />
      </div>
      <div className="notfound-page">
        <div className="notfound-num">404</div>
        <div className="notfound-label">page not found</div>
        <p style={{ fontSize: '0.8rem', opacity: 0.5, letterSpacing: '0.1em' }}>
          this object does not exist.
        </p>
        <Link href="/" className="notfound-link">
          ← return home
        </Link>
      </div>
    </>
  )
}
