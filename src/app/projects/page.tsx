import { getAllProjects } from '@/lib/content'
import Link from 'next/link'
import Reveal from '@/components/Reveal'

export const metadata = { title: 'projects' }

export default function ProjectsPage() {
  const projects = getAllProjects()

  return (
    <div className="list-page">
      <Reveal className="list-page__sidebar">
        <p className="section-heading__num prompt">objects</p>
        <h1>projects</h1>
        <p>libraries, tools, and experiments. all open source.</p>
      </Reveal>

      <div className="list-page__content">
        {projects.map((project, i) => (
          <Reveal key={project.slug} delay={i * 50}>
            <Link href={`/projects/${project.slug}`} className="proj-row">
              <span className="proj-row__num">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <div className="proj-row__title">{project.title}</div>
                <div className="proj-row__desc">{project.description}</div>
                <div className="proj-row__tags">
                  {project.tags.map(t => <span key={t} className="tag">{t}</span>)}
                </div>
              </div>
              <div className="proj-row__meta">
                <span className="proj-row__year">{project.year}</span>
                <span className={`status-badge status-badge--${project.status}`}>{project.status}</span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  )
}
