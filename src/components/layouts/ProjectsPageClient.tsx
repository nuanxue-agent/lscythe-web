'use client'

import { useTheme } from '@/components/ThemeProvider'
import ProjectsTerminal from '@/components/layouts/ProjectsTerminal'
import ProjectsVaporwave from '@/components/layouts/ProjectsVaporwave'
import ProjectsRetro from '@/components/layouts/ProjectsRetro'
import type { Project } from '@/lib/content'

interface ProjectsPageClientProps {
  projects: Project[]
}

export default function ProjectsPageClient({ projects }: ProjectsPageClientProps) {
  const { theme } = useTheme()

  if (theme === 'vaporwave') return <ProjectsVaporwave projects={projects} />
  if (theme === 'retro') return <ProjectsRetro projects={projects} />
  return <ProjectsTerminal projects={projects} />
}
