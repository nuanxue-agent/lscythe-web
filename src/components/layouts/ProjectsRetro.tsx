'use client'

import Link from 'next/link'

import type { Project } from '@/lib/content'

interface ProjectsRetroProps {
  projects: Project[]
}

export default function ProjectsRetro({ projects }: ProjectsRetroProps) {
  return (
    <div style={{ display: 'flex', maxWidth: '960px', margin: '0 auto', background: 'var(--black)' }}>
      {/* Sidebar */}
      <aside className="retro-sidebar" style={{
        width: '180px',
        minWidth: '180px',
        borderRight: '1px solid var(--border)',
        padding: '2rem 1rem',
        background: 'var(--surface)',
      }}>
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: '0.75rem', fontFamily: 'Georgia, serif' }}>
            Site Nav
          </h2>
          <ul style={{ listStyle: 'none', fontSize: '0.85rem', lineHeight: 2 }}>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/blog">Writing</Link></li>
            <li><Link href="/projects">Projects</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '0.9rem', fontWeight: 'bold', marginBottom: '0.5rem', fontFamily: 'Georgia, serif' }}>
            Filter
          </h3>
          <ul style={{ listStyle: 'none', fontSize: '0.8rem', lineHeight: 1.9 }}>
            <li>All ({projects.length})</li>
            <li>Active ({projects.filter(p => p.status === 'active').length})</li>
            <li>Completed ({projects.filter(p => p.status === 'completed').length})</li>
          </ul>
        </div>
      </aside>

      {/* Main */}
      <main className="retro-column" style={{ flex: 1, maxWidth: '680px', padding: '2rem 2.5rem' }}>
        <header style={{ marginBottom: '2.5rem', borderBottom: '2px solid var(--border)', paddingBottom: '1rem' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold', fontFamily: 'Georgia, serif', marginBottom: '0.25rem' }}>
            Projects
          </h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--dim)', fontStyle: 'italic' }}>
            libraries, tools, and experiments. all open source.
          </p>
        </header>

        <ul className="retro-list" style={{ listStyle: 'none' }}>
          {projects.map((project, i) => (
            <li
              key={project.slug}
              style={{
                marginBottom: '2rem',
                paddingBottom: '2rem',
                borderBottom: i < projects.length - 1 ? '1px solid var(--border)' : 'none',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.25rem' }}>
                <h2 style={{ fontSize: '1.3rem', fontWeight: 'bold', fontFamily: 'Georgia, serif' }}>
                  <Link href={`/projects/${project.slug}`}>{project.title}</Link>
                </h2>
                <span style={{ fontSize: '0.75rem', color: 'var(--dim)', fontFamily: 'monospace', marginLeft: '1rem', whiteSpace: 'nowrap' }}>
                  {project.year} · {project.status}
                </span>
              </div>

              <p style={{ fontSize: '0.9rem', lineHeight: 1.65, color: 'var(--dim)', marginBottom: '0.6rem', fontFamily: 'Georgia, serif' }}>
                {project.description}
              </p>

              <div style={{ fontSize: '0.75rem', color: 'var(--dim)' }}>
                Tags: {project.tags.join(', ')}
              </div>
            </li>
          ))}
        </ul>

        <footer style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid var(--border)', fontSize: '0.75rem', color: 'var(--dim)', textAlign: 'center' }}>
          lscythe.dev © {new Date().getFullYear()}
        </footer>
      </main>
    </div>
  )
}
