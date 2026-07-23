import Link from 'next/link'
import type { Metadata } from 'next'
import { getAllProjects, getProjectBySlug } from '@/lib/content'
import { markdownToHtml } from '@/lib/markdown'
import { notFound } from 'next/navigation'
import AsciiIllustration from '@/components/AsciiIllustration'
import ArticleSceneWrapper from '@/components/ArticleSceneWrapper'

export async function generateStaticParams() {
  return getAllProjects().map(project => ({ slug: project.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) return {}
  return { title: `${project.title} -- lscythe`, description: project.description }
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) notFound()

  const html = markdownToHtml(project.content)

  return (
    <article>
      <div className="article-page">
        <Link href="/projects" className="back-link">← objects</Link>

        <div className="article-kicker">
          {project.year && <span>{project.year}</span>}
          <span className={`status-badge status-badge--${project.status}`}>{project.status}</span>
        </div>

        <h1 className="article-title">{project.title}</h1>

        {/* 3D scene directly below title */}
        <div style={{ position: 'relative', height: '340px', background: 'var(--surface)', border: '1px solid var(--border)', marginBottom: '2rem', overflow: 'hidden' }}>
          <ArticleSceneWrapper slug={slug} />
          <div style={{
            position: 'absolute', bottom: '1rem', right: '1.5rem', zIndex: 2,
            fontFamily: 'var(--mono)', fontSize: '0.6rem', color: 'var(--dim)', letterSpacing: '0.12em',
          }}>
            &gt; {slug}.3d
          </div>
        </div>

        {project.tags.length > 0 && (
          <div className="article-tags">
            {project.tags.map(t => <span key={t} className="tag">{t}</span>)}
          </div>
        )}

        {(project.url || project.repo) && (
          <div className="article-links">
            {project.url && (
              <a href={project.url} className="article-link" target="_blank" rel="noopener noreferrer">
                visit →
              </a>
            )}
            {project.repo && (
              <a href={project.repo} className="article-link" target="_blank" rel="noopener noreferrer">
                source →
              </a>
            )}
          </div>
        )}

        <AsciiIllustration slug={slug} />

        {html && (
          <div className="article-content" dangerouslySetInnerHTML={{ __html: html }} />
        )}
      </div>
    </article>
  )
}
