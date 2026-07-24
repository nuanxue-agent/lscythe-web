import { getAllProjects } from '@/lib/content'
import ProjectsPageClient from '@/components/layouts/ProjectsPageClient'

export const metadata = { title: 'projects' }

export default function ProjectsPage() {
  const projects = getAllProjects()
  return <ProjectsPageClient projects={projects} />
}
