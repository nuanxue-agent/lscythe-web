import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const contentDir = path.join(process.cwd(), 'content')

export interface Post {
  slug: string
  title: string
  date: string
  description: string
  tags: string[]
  draft: boolean
  content: string
  readingTime: string
}

export interface Project {
  slug: string
  title: string
  description: string
  longDescription: string
  tags: string[]
  url?: string
  repo?: string
  status: 'active' | 'completed' | 'archived'
  year: string
  featured: boolean
  content: string
}

function estimateReadingTime(text: string): string {
  const wpm = 200
  const words = text.trim().split(/\s+/).length
  const minutes = Math.ceil(words / wpm)
  return `${minutes} min read`
}

export function getAllPosts(): Post[] {
  const dir = path.join(contentDir, 'blog')
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir)
    .filter(f => f.endsWith('.md'))
    .map(filename => {
      const slug = filename.replace('.md', '')
      const raw = fs.readFileSync(path.join(dir, filename), 'utf8')
      const { data, content } = matter(raw)
      return {
        slug,
        title: data.title ?? slug,
        date: data.date ? String(data.date instanceof Date ? data.date.toISOString().slice(0, 10) : data.date) : '',
        description: data.description ?? '',
        tags: data.tags ?? [],
        draft: data.draft ?? false,
        content,
        readingTime: estimateReadingTime(content),
      } as Post
    })
    .filter(p => !p.draft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPostBySlug(slug: string): Post | undefined {
  return getAllPosts().find(p => p.slug === slug)
}

export function getAllProjects(): Project[] {
  const dir = path.join(contentDir, 'projects')
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir)
    .filter(f => f.endsWith('.md'))
    .map(filename => {
      const slug = filename.replace('.md', '')
      const raw = fs.readFileSync(path.join(dir, filename), 'utf8')
      const { data, content } = matter(raw)
      return {
        slug,
        title: data.title ?? slug,
        description: data.description ?? '',
        longDescription: data.longDescription ?? '',
        tags: data.tags ?? [],
        url: data.url,
        repo: data.repo,
        status: data.status ?? 'active',
        year: data.year ?? '',
        featured: data.featured ?? false,
        content,
      } as Project
    })
    .sort((a, b) => b.year.localeCompare(a.year))
}

export function getProjectBySlug(slug: string): Project | undefined {
  return getAllProjects().find(p => p.slug === slug)
}
