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
      {/* 3D scene header */}
      <div style={{ position: 'relative', height: '260px', background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
        <ArticleSceneWrapper slug={slug} />
        <div style={{
          position: 'absolute', inset: 0, zIndex: 2,
          display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
          padding: '1.5rem 2rem',
          background: 'linear-gradient(to top, rgba(8,8,8,0.85) 0%, transparent 60%)',
          pointerEvents: 'none',
        }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: 'var(--accent)', letterSpacing: '0.12em', marginBottom: '0.4rem' }}>
            &gt; objects / {slug}
          </div>
        </div>
      </div>

      {/* ASCII illustration */}
      <AsciiIllustration slug={slug} />

      {/* Article body */}
      <div className="article-page">
        <Link href="/projects" className="back-link">← objects</Link>

        <div className="article-kicker">
          {project.year && <span>{project.year}</span>}
          <span className={`status-badge status-badge--${project.status}`}>{project.status}</span>
        </div>

        <h1 className="article-title">{project.title}</h1>

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

        {html && (
          <div className="article-content" dangerouslySetInnerHTML={{ __html: html }} />
        )}
      </div>
    </article>
  )
}
