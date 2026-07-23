import Link from 'next/link'
import { getAllProjects } from '@/lib/content'

export const metadata = {
  title: 'projects — lscythe',
  description: 'objects made with intention.',
}

export default function ProjectsIndexPage() {
  const projects = getAllProjects()

  return (
    <>
      <div className="deco-bar">
        <span /><span /><span /><span /><span />
      </div>

      <div className="list-page">
        {/* sidebar */}
        <aside className="list-page__sidebar">
          <div style={{ fontSize: '0.65rem', letterSpacing: '0.2em', opacity: 0.4, marginBottom: '1.5rem' }}>
            03 / objects
          </div>
          <h1>objects</h1>
          <p>
            work spanning design systems, tooling, and interfaces.
            {projects.length > 0 && ` ${projects.length} ${projects.length === 1 ? 'project' : 'projects'}.`}
          </p>

          <div style={{ marginTop: '3rem' }}>
            <div style={{
              width: '40px',
              height: '40px',
              background: 'var(--blue)',
              marginBottom: '0.75rem',
            }} />
            <div style={{
              width: '0',
              height: '0',
              borderLeft: '20px solid transparent',
              borderRight: '20px solid transparent',
              borderBottom: '34px solid var(--ochre)',
            }} />
          </div>
        </aside>

        {/* project list */}
        <main className="list-page__content">
          {projects.length === 0 ? (
            <div style={{
              padding: '4rem 2rem',
              opacity: 0.4,
              fontSize: '0.85rem',
              letterSpacing: '0.1em',
            }}>
              no projects yet.
            </div>
          ) : (
            projects.map((project, i) => (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                className="proj-row"
              >
                <span className="proj-row__num">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <div className="proj-row__title">{project.title}</div>
                  <div className="proj-row__desc">{project.description}</div>
                  {project.tags.length > 0 && (
                    <div className="proj-row__tags">
                      {project.tags.map(t => (
                        <span key={t} className="tag">{t}</span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="proj-row__meta">
                  {project.year && (
                    <span className="proj-row__year">{project.year}</span>
                  )}
                  <span className={`status-badge status-badge--${project.status}`}>
                    {project.status}
                  </span>
                </div>
              </Link>
            ))
          )}
        </main>
      </div>
    </>
  )
}
