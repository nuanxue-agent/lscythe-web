import Link from 'next/link'
import type { Metadata } from 'next'
import { getAllProjects, getProjectBySlug } from '@/lib/content'
import { markdownToHtml } from '@/lib/markdown'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const projects = getAllProjects()
  return projects.map(project => ({ slug: project.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) return {}
  return {
    title: `${project.title} — lscythe`,
    description: project.description,
  }
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) notFound()

  const html = markdownToHtml(project.content)

  return (
    <>
      <div className="deco-bar">
        <span /><span /><span /><span /><span />
      </div>

      <article className="article-page">
        <Link href="/projects" className="back-link">
          ← objects
        </Link>

        <div className="article-kicker">
          {project.year && <span>{project.year}</span>}
          <span className={`status-badge status-badge--${project.status}`}>
            {project.status}
          </span>
        </div>

        <h1 className="article-title">{project.title}</h1>

        {project.tags.length > 0 && (
          <div className="article-tags">
            {project.tags.map(t => (
              <span key={t} className="tag">{t}</span>
            ))}
          </div>
        )}

        {(project.url || project.repo) && (
          <div className="article-links">
            {project.url && (
              <a
                href={project.url}
                className="article-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                visit →
              </a>
            )}
            {project.repo && (
              <a
                href={project.repo}
                className="article-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                source →
              </a>
            )}
          </div>
        )}

        {html && (
          <div
            className="article-content"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        )}
      </article>
    </>
  )
}
