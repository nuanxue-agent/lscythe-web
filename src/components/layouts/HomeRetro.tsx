'use client'

import Link from 'next/link'

import type { Project } from '@/lib/content'

interface HomeRetroProps {
  featured: Project[]
}

export default function HomeRetro({ featured }: HomeRetroProps) {
  return (
    <div style={{ display: 'flex', maxWidth: '960px', margin: '0 auto', background: 'var(--black)' }}>
      {/* Left sidebar */}
      <aside className="retro-sidebar" style={{
        width: '180px',
        borderRight: '1px solid var(--border)',
        padding: '2rem 1rem',
        background: 'var(--surface)',
      }}>
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{
            fontSize: '1.1rem',
            fontWeight: 'bold',
            marginBottom: '0.5rem',
            fontFamily: 'Georgia, serif',
          }}>
            About
          </h2>
          <p style={{
            fontSize: '0.8rem',
            lineHeight: 1.5,
            color: 'var(--dim)',
          }}>
            Android engineer from Jakarta. Building mobile systems and KMP libraries.
          </p>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{
            fontSize: '0.9rem',
            fontWeight: 'bold',
            marginBottom: '0.5rem',
            fontFamily: 'Georgia, serif',
          }}>
            Navigation
          </h3>
          <ul style={{
            listStyle: 'none',
            fontSize: '0.85rem',
            lineHeight: 1.8,
          }}>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/projects">Projects</Link></li>
            <li><Link href="/blog">Blog</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h3 style={{
            fontSize: '0.9rem',
            fontWeight: 'bold',
            marginBottom: '0.5rem',
            fontFamily: 'Georgia, serif',
          }}>
            Status
          </h3>
          <p style={{
            fontSize: '0.75rem',
            color: 'var(--accent3)',
            fontWeight: 'bold',
          }}>
            ● Available for work
          </p>
        </div>
      </aside>

      {/* Main content column */}
      <main className="retro-column" style={{
        flex: 1,
        maxWidth: '680px',
        padding: '2rem 2.5rem',
      }}>
        {/* Header */}
        <header style={{ marginBottom: '3rem', borderBottom: '2px solid var(--border)', paddingBottom: '1.5rem' }}>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            marginBottom: '0.5rem',
            fontFamily: 'Georgia, serif',
            lineHeight: 1.2,
          }}>
            lscythe
          </h1>
          <p style={{
            fontSize: '0.95rem',
            color: 'var(--dim)',
            fontStyle: 'italic',
          }}>
            Android engineer / Jakarta, Indonesia
          </p>
        </header>

        {/* Intro */}
        <section style={{ marginBottom: '3rem' }}>
          <p style={{
            fontSize: '1rem',
            lineHeight: 1.7,
            marginBottom: '1rem',
            fontFamily: 'Georgia, serif',
          }}>
            Welcome to my personal site. I build Android systems, Kotlin Multiplatform libraries, 
            and developer tooling at Nocturn. This site is a collection of my projects, writings, 
            and experiments.
          </p>
          <p style={{
            fontSize: '1rem',
            lineHeight: 1.7,
            fontFamily: 'Georgia, serif',
          }}>
            I'm obsessed with build performance, architecture that scales, and the gap between 
            how apps are designed and how they actually run.
          </p>
        </section>

        {/* Stats */}
        <section style={{
          marginBottom: '3rem',
          padding: '1.5rem',
          background: 'var(--surface)',
          border: '1px solid var(--border)',
        }}>
          <div style={{ display: 'flex', gap: '2rem', justifyContent: 'space-around' }}>
            {[
              { label: 'Years Experience', val: '6' },
              { label: 'Projects', val: '10+' },
              { label: 'Blog Posts', val: '10+' },
            ].map(({ label, val }) => (
              <div key={label} style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: '2rem',
                  fontWeight: 'bold',
                  color: 'var(--accent)',
                  fontFamily: 'Georgia, serif',
                }}>
                  {val}
                </div>
                <div style={{
                  fontSize: '0.75rem',
                  color: 'var(--dim)',
                  marginTop: '0.25rem',
                }}>
                  {label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Featured projects */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{
            fontSize: '1.8rem',
            fontWeight: 'bold',
            marginBottom: '1.5rem',
            fontFamily: 'Georgia, serif',
            borderBottom: '1px solid var(--border)',
            paddingBottom: '0.5rem',
          }}>
            Featured Projects
          </h2>

          <ul className="retro-list" style={{ listStyle: 'none' }}>
            {featured.map((project, i) => (
              <li
                key={project.slug}
                style={{
                  marginBottom: '1.5rem',
                  paddingBottom: '1.5rem',
                  borderBottom: i < featured.length - 1 ? '1px dotted var(--border)' : 'none',
                }}
              >
                <h3 style={{
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  marginBottom: '0.5rem',
                  fontFamily: 'Georgia, serif',
                }}>
                  <Link href={`/projects/${project.slug}`}>
                    {project.title}
                  </Link>
                </h3>
                <p style={{
                  fontSize: '0.9rem',
                  lineHeight: 1.6,
                  color: 'var(--dim)',
                  marginBottom: '0.5rem',
                }}>
                  {project.description}
                </p>
                <div style={{
                  fontSize: '0.75rem',
                  color: 'var(--dim)',
                }}>
                  Tags: {project.tags.slice(0, 3).join(', ')}
                </div>
              </li>
            ))}
          </ul>

          <p style={{ fontSize: '0.9rem', marginTop: '1rem' }}>
            <Link href="/projects">→ View all projects</Link>
          </p>
        </section>

        {/* Principle quote */}
        <section style={{
          marginBottom: '3rem',
          padding: '2rem',
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderLeft: '4px solid var(--accent)',
        }}>
          <blockquote style={{
            fontSize: '1.2rem',
            fontStyle: 'italic',
            lineHeight: 1.5,
            fontFamily: 'Georgia, serif',
            margin: 0,
          }}>
            "Complexity is not a feature. It's a failure of design."
          </blockquote>
          <p style={{
            fontSize: '0.75rem',
            color: 'var(--dim)',
            marginTop: '0.75rem',
            textAlign: 'right',
          }}>
            — working principle, 2026
          </p>
        </section>

        {/* Footer */}
        <footer style={{
          marginTop: '4rem',
          paddingTop: '2rem',
          borderTop: '1px solid var(--border)',
          fontSize: '0.75rem',
          color: 'var(--dim)',
          textAlign: 'center',
        }}>
          <p>lscythe.dev © {new Date().getFullYear()}</p>
          <p style={{ marginTop: '0.5rem' }}>
            Built with Next.js • Hosted on Vercel
          </p>
        </footer>
      </main>
    </div>
  )
}
