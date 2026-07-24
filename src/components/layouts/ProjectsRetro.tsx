'use client'

import Link from 'next/link'
import RetroHitCounter from '@/components/RetroHitCounter'

import type { Project } from '@/lib/content'

interface ProjectsRetroProps {
  projects: Project[]
}

const statusLabel: Record<string, string> = {
  active: 'Active',
  completed: 'Completed',
  archived: 'Archived',
}

export default function ProjectsRetro({ projects }: ProjectsRetroProps) {
  return (
    <div style={{
      background: '#ffffff',
      minHeight: '100vh',
      fontFamily: 'Georgia, serif',
      color: '#000000',
    }}>
      <div className="retro-layout-shell" style={{ display: 'flex', maxWidth: '960px', margin: '0 auto' }}>

        {/* Sidebar */}
        <aside style={{
          width: '180px',
          minWidth: '180px',
          borderRight: '1px solid #cccccc',
          padding: '1.5rem 1rem',
          background: '#f9f9f9',
        }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{
              background: '#dddddd',
              padding: '0.4rem 0.6rem',
              fontFamily: 'Trebuchet MS, sans-serif',
              fontSize: '0.8rem',
              fontWeight: 'bold',
              marginBottom: '0.5rem',
              borderBottom: '1px solid #bbbbbb',
            }}>
              Navigation
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.85rem', lineHeight: 2 }}>
              <li><Link href="/" style={{ color: '#0000ee', textDecoration: 'underline' }}>Home</Link></li>
              <li><Link href="/blog" style={{ color: '#0000ee', textDecoration: 'underline' }}>Writing</Link></li>
              <li><Link href="/projects" style={{ color: '#0000ee', textDecoration: 'underline' }}>Projects</Link></li>
              <li><Link href="/about" style={{ color: '#0000ee', textDecoration: 'underline' }}>About</Link></li>
              <li><Link href="/contact" style={{ color: '#0000ee', textDecoration: 'underline' }}>Contact</Link></li>
            </ul>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{
              background: '#dddddd',
              padding: '0.4rem 0.6rem',
              fontFamily: 'Trebuchet MS, sans-serif',
              fontSize: '0.8rem',
              fontWeight: 'bold',
              marginBottom: '0.5rem',
              borderBottom: '1px solid #bbbbbb',
            }}>
              Filter
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.8rem', lineHeight: 1.9 }}>
              <li>All ({projects.length})</li>
              <li>Active ({projects.filter(p => p.status === 'active').length})</li>
              <li>Completed ({projects.filter(p => p.status === 'completed').length})</li>
              <li>Archived ({projects.filter(p => p.status === 'archived').length})</li>
            </ul>
          </div>

          <div style={{
            background: '#f9f9f9',
            border: '1px solid #cccccc',
            padding: '0.6rem',
            fontSize: '0.72rem',
            lineHeight: 1.6,
            color: '#444444',
          }}>
            Open source projects by lscythe. All code on GitHub.
          </div>
        </aside>

        {/* Main */}
        <main style={{ flex: 1, padding: '1.5rem 2rem' }}>
          <div style={{
            borderBottom: '2px solid #000000',
            paddingBottom: '0.75rem',
            marginBottom: '1.5rem',
          }}>
            <h1 style={{
              fontFamily: 'Georgia, serif',
              fontSize: '1.8rem',
              fontWeight: 'bold',
              margin: 0,
              marginBottom: '0.2rem',
            }}>
              Projects
            </h1>
            <p style={{ margin: 0, fontSize: '0.85rem', color: '#555555', fontStyle: 'italic' }}>
              libraries, tools, and experiments. all open source.
            </p>
          </div>

          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: '0.88rem',
          }}>
            <thead>
              <tr style={{ background: '#dddddd', borderBottom: '2px solid #aaaaaa' }}>
                <th style={{
                  fontFamily: 'Trebuchet MS, sans-serif',
                  fontSize: '0.78rem',
                  textAlign: 'left',
                  padding: '0.5rem 0.75rem',
                  fontWeight: 'bold',
                }}>
                  Project
                </th>
                <th style={{
                  fontFamily: 'Trebuchet MS, sans-serif',
                  fontSize: '0.78rem',
                  textAlign: 'left',
                  padding: '0.5rem 0.75rem',
                  fontWeight: 'bold',
                }}>
                  Description
                </th>
                <th style={{
                  fontFamily: 'Trebuchet MS, sans-serif',
                  fontSize: '0.78rem',
                  textAlign: 'center',
                  padding: '0.5rem 0.75rem',
                  fontWeight: 'bold',
                  whiteSpace: 'nowrap',
                }}>
                  Year
                </th>
                <th style={{
                  fontFamily: 'Trebuchet MS, sans-serif',
                  fontSize: '0.78rem',
                  textAlign: 'center',
                  padding: '0.5rem 0.75rem',
                  fontWeight: 'bold',
                }}>
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project, i) => (
                <tr
                  key={project.slug}
                  style={{ background: i % 2 === 0 ? '#ffffff' : '#f9f9f9', borderBottom: '1px solid #e0e0e0' }}
                >
                  <td style={{ padding: '0.65rem 0.75rem', verticalAlign: 'top' }}>
                    <Link
                      href={`/projects/${project.slug}`}
                      style={{ color: '#0000ee', textDecoration: 'underline', fontWeight: 'bold' }}
                    >
                      {project.title}
                    </Link>
                    <div style={{ marginTop: '0.25rem', fontSize: '0.72rem', color: '#777777', fontFamily: 'Courier New, monospace' }}>
                      {project.tags.join(', ')}
                    </div>
                  </td>
                  <td style={{ padding: '0.65rem 0.75rem', verticalAlign: 'top', color: '#333333', lineHeight: 1.55 }}>
                    {project.description}
                  </td>
                  <td style={{
                    padding: '0.65rem 0.75rem',
                    verticalAlign: 'top',
                    textAlign: 'center',
                    fontFamily: 'Courier New, monospace',
                    fontSize: '0.8rem',
                    color: '#555555',
                    whiteSpace: 'nowrap',
                  }}>
                    {project.year ?? '—'}
                  </td>
                  <td style={{
                    padding: '0.65rem 0.75rem',
                    verticalAlign: 'top',
                    textAlign: 'center',
                    fontFamily: 'Courier New, monospace',
                    fontSize: '0.75rem',
                    color: '#555555',
                    whiteSpace: 'nowrap',
                  }}>
                    {statusLabel[project.status] ?? project.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <footer style={{
            marginTop: '3rem',
            paddingTop: '1rem',
            borderTop: '1px solid #cccccc',
            fontSize: '0.72rem',
            color: '#777777',
            textAlign: 'center',
            fontFamily: 'Courier New, monospace',
          }}>
            <RetroHitCounter />
            <div style={{ marginTop: '0.75rem' }}>
              lscythe.dev © {new Date().getFullYear()} &nbsp;|&nbsp; best viewed in 1024×768
            </div>
          </footer>
        </main>
      </div>
    </div>
  )
}
