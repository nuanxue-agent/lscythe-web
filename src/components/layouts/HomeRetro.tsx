'use client'

import Link from 'next/link'
import type { Project } from '@/lib/content'

interface Props { featured: Project[] }

export default function HomeRetro({ featured }: Props) {
  return (
    <div style={{ background: '#ffffff', minHeight: '100vh', color: '#000000' }}>

      {/* Old-school top bar */}
      <div style={{
        background: '#e8e8e8',
        borderBottom: '1px solid #999',
        padding: '0.3rem 1rem',
        fontSize: '11px',
        fontFamily: '"Courier New", monospace',
        color: '#444',
        display: 'flex',
        justifyContent: 'space-between',
      }}>
        <span>lscythe.dev -- personal homepage</span>
        <span>last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</span>
      </div>

      {/* Page title header */}
      <div style={{
        background: '#f0f0f0',
        borderBottom: '2px solid #cccccc',
        padding: '1.5rem 2rem',
      }}>
        <h1 style={{
          fontFamily: 'Georgia, "Times New Roman", serif',
          fontSize: '2.2rem',
          fontWeight: 'bold',
          color: '#1a1a1a',
          margin: 0,
          marginBottom: '0.25rem',
        }}>
          lscythe
        </h1>
        <p style={{
          fontFamily: 'Georgia, serif',
          fontSize: '0.9rem',
          color: '#555',
          fontStyle: 'italic',
          margin: 0,
        }}>
          Android engineer. Jakarta, Indonesia. Writing about software.
        </p>
      </div>

      {/* Main layout: sidebar + content */}
      <div style={{
        display: 'flex',
        maxWidth: '900px',
        margin: '0 auto',
        padding: '1.5rem 1rem',
        gap: '1.5rem',
        alignItems: 'flex-start',
      }}>

        {/* Main content */}
        <main style={{ flex: 1, minWidth: 0 }}>

          {/* Welcome post */}
          <div style={{
            borderBottom: '1px solid #cccccc',
            paddingBottom: '1.5rem',
            marginBottom: '1.5rem',
          }}>
            <h2 style={{
              fontFamily: 'Georgia, serif',
              fontSize: '1.4rem',
              fontWeight: 'bold',
              color: '#1a1a1a',
              marginBottom: '0.5rem',
            }}>
              Welcome
            </h2>
            <p style={{
              fontFamily: 'Georgia, serif',
              fontSize: '0.9rem',
              lineHeight: 1.75,
              color: '#222',
              marginBottom: '0.75rem',
            }}>
              Hi. I'm an Android engineer based in Jakarta. I've been building Android apps and Kotlin
              libraries professionally since 2019. Currently working at{' '}
              <strong>Nocturn</strong>, a fintech startup, where I lead the Android platform team.
            </p>
            <p style={{
              fontFamily: 'Georgia, serif',
              fontSize: '0.9rem',
              lineHeight: 1.75,
              color: '#222',
            }}>
              I write occasionally about Android internals, build systems, Kotlin Multiplatform,
              and the things that frustrate me about how mobile software is built.
              This site is where I keep my projects and notes.
            </p>
          </div>

          {/* Featured projects */}
          <div style={{ marginBottom: '2rem' }}>
            <h2 style={{
              fontFamily: 'Georgia, serif',
              fontSize: '1.2rem',
              fontWeight: 'bold',
              color: '#1a1a1a',
              borderBottom: '1px solid #cccccc',
              paddingBottom: '0.4rem',
              marginBottom: '1rem',
            }}>
              Projects
            </h2>

            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontFamily: 'Georgia, serif',
              fontSize: '0.85rem',
            }}>
              <thead>
                <tr style={{ background: '#f0f0f0', borderBottom: '1px solid #ccc' }}>
                  <th style={{ padding: '0.4rem 0.6rem', textAlign: 'left', fontWeight: 'bold', color: '#333' }}>Project</th>
                  <th style={{ padding: '0.4rem 0.6rem', textAlign: 'left', fontWeight: 'bold', color: '#333' }}>Description</th>
                  <th style={{ padding: '0.4rem 0.6rem', textAlign: 'left', fontWeight: 'bold', color: '#333' }}>Year</th>
                </tr>
              </thead>
              <tbody>
                {featured.map((project, i) => (
                  <tr key={project.slug} style={{
                    borderBottom: '1px solid #e0e0e0',
                    background: i % 2 === 0 ? '#ffffff' : '#f9f9f9',
                  }}>
                    <td style={{ padding: '0.5rem 0.6rem', verticalAlign: 'top' }}>
                      <Link href={`/projects/${project.slug}`} style={{
                        color: '#0000ee',
                        textDecoration: 'underline',
                        fontWeight: 'bold',
                      }}>
                        {project.title}
                      </Link>
                    </td>
                    <td style={{ padding: '0.5rem 0.6rem', color: '#444', verticalAlign: 'top' }}>
                      {project.description}
                    </td>
                    <td style={{ padding: '0.5rem 0.6rem', color: '#888', verticalAlign: 'top', whiteSpace: 'nowrap', fontFamily: '"Courier New", monospace', fontSize: '0.8rem' }}>
                      {project.year}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <p style={{ marginTop: '0.75rem', fontSize: '0.85rem', fontFamily: 'Georgia, serif' }}>
              <Link href="/projects" style={{ color: '#0000ee', textDecoration: 'underline' }}>
                View all projects &raquo;
              </Link>
            </p>
          </div>

          {/* Quote */}
          <blockquote style={{
            borderLeft: '3px solid #999',
            margin: '1.5rem 0',
            paddingLeft: '1rem',
            fontFamily: 'Georgia, serif',
            fontSize: '0.95rem',
            fontStyle: 'italic',
            color: '#444',
          }}>
            "Complexity is not a feature. It's a failure of design."
            <br />
            <span style={{ fontSize: '0.8rem', color: '#888' }}>-- working principle</span>
          </blockquote>

        </main>

        {/* Right sidebar */}
        <aside style={{
          width: '200px',
          flexShrink: 0,
          fontSize: '0.82rem',
          fontFamily: 'Georgia, serif',
        }}>

          {/* About box */}
          <div style={{
            border: '1px solid #cccccc',
            marginBottom: '1rem',
            background: '#f9f9f9',
          }}>
            <div style={{
              background: '#dddddd',
              borderBottom: '1px solid #ccc',
              padding: '0.3rem 0.6rem',
              fontWeight: 'bold',
              fontSize: '0.8rem',
              fontFamily: '"Trebuchet MS", sans-serif',
              color: '#333',
            }}>
              About Me
            </div>
            <div style={{ padding: '0.75rem' }}>
              <p style={{ margin: 0, marginBottom: '0.5rem', lineHeight: 1.6, color: '#333' }}>
                Android engineer, 6 years exp.
              </p>
              <p style={{ margin: 0, lineHeight: 1.6, color: '#333' }}>
                Jakarta, Indonesia.
              </p>
              <p style={{ margin: '0.5rem 0 0', color: '#006600', fontWeight: 'bold', fontSize: '0.78rem' }}>
                &#9679; Available for work
              </p>
            </div>
          </div>

          {/* Navigation */}
          <div style={{
            border: '1px solid #cccccc',
            marginBottom: '1rem',
            background: '#f9f9f9',
          }}>
            <div style={{
              background: '#dddddd',
              borderBottom: '1px solid #ccc',
              padding: '0.3rem 0.6rem',
              fontWeight: 'bold',
              fontSize: '0.8rem',
              fontFamily: '"Trebuchet MS", sans-serif',
              color: '#333',
            }}>
              Navigation
            </div>
            <ul style={{ listStyle: 'none', margin: 0, padding: '0.5rem 0.75rem', lineHeight: 2 }}>
              {[
                { href: '/', label: 'Home' },
                { href: '/projects', label: 'Projects' },
                { href: '/blog', label: 'Blog' },
                { href: '/experience', label: 'Experience' },
                { href: '/contact', label: 'Contact' },
                { href: '/about', label: 'About' },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} style={{ color: '#0000ee', textDecoration: 'underline' }}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Stack */}
          <div style={{
            border: '1px solid #cccccc',
            marginBottom: '1rem',
            background: '#f9f9f9',
          }}>
            <div style={{
              background: '#dddddd',
              borderBottom: '1px solid #ccc',
              padding: '0.3rem 0.6rem',
              fontWeight: 'bold',
              fontSize: '0.8rem',
              fontFamily: '"Trebuchet MS", sans-serif',
              color: '#333',
            }}>
              Current Stack
            </div>
            <ul style={{ listStyle: 'disc', margin: 0, padding: '0.5rem 0.75rem 0.5rem 1.5rem', lineHeight: 1.9, color: '#333' }}>
              {['Kotlin', 'Jetpack Compose', 'KMP', 'Gradle'].map(s => (
                <li key={s} style={{ fontSize: '0.8rem' }}>{s}</li>
              ))}
            </ul>
          </div>

          {/* Links */}
          <div style={{ border: '1px solid #cccccc', background: '#f9f9f9' }}>
            <div style={{
              background: '#dddddd',
              borderBottom: '1px solid #ccc',
              padding: '0.3rem 0.6rem',
              fontWeight: 'bold',
              fontSize: '0.8rem',
              fontFamily: '"Trebuchet MS", sans-serif',
              color: '#333',
            }}>
              Links
            </div>
            <ul style={{ listStyle: 'none', margin: 0, padding: '0.5rem 0.75rem', lineHeight: 2 }}>
              {[
                { href: 'https://github.com/lscythe', label: 'GitHub' },
                { href: 'https://linkedin.com/in/lscythe', label: 'LinkedIn' },
                { href: 'mailto:rendrati15c@gmail.com', label: 'Email' },
              ].map(({ href, label }) => (
                <li key={label}>
                  <a href={href} style={{ color: '#0000ee', textDecoration: 'underline' }} target="_blank" rel="noopener noreferrer">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </aside>
      </div>

      {/* Footer */}
      <div style={{
        borderTop: '1px solid #cccccc',
        background: '#f0f0f0',
        padding: '0.75rem 1rem',
        textAlign: 'center',
        fontSize: '0.78rem',
        fontFamily: '"Courier New", monospace',
        color: '#666',
        marginTop: '2rem',
      }}>
        lscythe.dev &copy; {new Date().getFullYear()} &nbsp;|&nbsp; best viewed in 1024x768
      </div>

    </div>
  )
}
