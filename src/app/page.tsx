import Link from 'next/link'
import { getAllProjects } from '@/lib/content'

export const metadata = {
  title: 'lscythe — form, type, function',
  description: 'designer & developer working at the intersection of form, type, and function.',
}

export default function HomePage() {
  const featured = getAllProjects().filter(p => p.featured).slice(0, 3)

  return (
    <>
      {/* deco bar */}
      <div className="deco-bar">
        <span /><span /><span /><span /><span />
      </div>

      {/* ── Hero ── */}
      <section className="hero">
        <div className="hero__left">
          <span className="hero__kicker">01 / form, type, function</span>

          <h1 className="hero__title">
            <span>l.</span>
            <span>scythe</span>
          </h1>

          <p className="hero__statement">
            a designer &amp; developer working at the intersection of{' '}
            <strong>structured systems</strong> and{' '}
            <strong>expressive form</strong>.
            objects made with intention.
          </p>
        </div>

        <div className="hero__right">
          <div className="hero__geo">
            <div className="geo-circle" />
            <div className="geo-rect" />
            <div className="geo-tri" />
          </div>
          <span className="hero__label">bauhaus</span>
        </div>
      </section>

      {/* ── Featured projects ── */}
      <section className="objects">
        <div className="objects__heading">
          <div className="section-heading__num">02</div>
          <h2>selected<br />objects</h2>
        </div>

        <div className="objects__list">
          {featured.length === 0 ? (
            <div style={{ padding: '2rem', opacity: 0.4, fontSize: '0.85rem' }}>
              no projects yet
            </div>
          ) : (
            featured.map((project, i) => (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                className="project-row"
              >
                <span className="project-row__num">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <div className="project-row__title">{project.title}</div>
                  <div className="project-row__desc">{project.description}</div>
                </div>
                <div className="project-row__tags">
                  {project.tags.slice(0, 3).map(t => (
                    <span key={t} className="tag">{t}</span>
                  ))}
                </div>
              </Link>
            ))
          )}
          <Link
            href="/projects"
            className="project-row"
            style={{ opacity: 0.5 }}
          >
            <span className="project-row__num">→</span>
            <div>
              <div className="project-row__title">all projects</div>
            </div>
            <div />
          </Link>
        </div>
      </section>

      {/* ── Principle ── */}
      <section className="principle">
        <div className="principle__quote">
          <blockquote>
            "form ever follows function — and this is the law."
          </blockquote>
        </div>
        <div className="principle__aside">
          <div className="principle__circle" />
          <span className="principle__aside-label">
            louis sullivan<br />1896
          </span>
        </div>
      </section>

      {/* ── Footer strip ── */}
      <footer style={{
        padding: '1.25rem 2rem',
        borderTop: '2px solid var(--ink)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: '0.7rem',
        letterSpacing: '0.1em',
        opacity: 0.5,
      }}>
        <span>lscythe</span>
        <span>{new Date().getFullYear()}</span>
      </footer>
    </>
  )
}
