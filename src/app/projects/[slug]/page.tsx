import { getAllProjects, getProjectBySlug } from '@/lib/content'
import { markdownToHtml } from '@/lib/markdown'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import ProjectArticleSwitcher from '@/components/layouts/ProjectArticleSwitcher'

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
    <ProjectArticleSwitcher
      slug={slug}
      title={project.title}
      year={project.year}
      status={project.status}
      tags={project.tags}
      url={project.url}
      repo={project.repo}
      html={html}
    />
  )
}
