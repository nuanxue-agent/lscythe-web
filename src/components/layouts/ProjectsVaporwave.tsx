'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import GlitchText from '@/components/GlitchText'

import type { Project } from '@/lib/content'

interface ProjectsVaporwaveProps {
  projects: Project[]
}

const statusColors: Record<string, string> = {
  active: 'var(--accent)',
  completed: 'var(--accent2)',
  archived: 'var(--dim)',
}

export default function ProjectsVaporwave({ projects }: ProjectsVaporwaveProps) {
  return (
    <div style={{ background: 'var(--black)', minHeight: '100vh' }}>
      {/* Header */}
      <section style={{
        padding: '6rem 2rem 4rem',
        textAlign: 'center',
        background: 'linear-gradient(180deg, var(--surface) 0%, var(--black) 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: [
            'repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(185,103,255,0.06) 40px, rgba(185,103,255,0.06) 41px)',
            'repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(185,103,255,0.06) 40px, rgba(185,103,255,0.06) 41px)',
          ].join(','),
          pointerEvents: 'none',
        }} />

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          style={{
            fontSize: 'clamp(3rem, 9vw, 7rem)',
            fontWeight: 900,
            textTransform: 'uppercase',
            letterSpacing: '-0.04em',
            background: 'linear-gradient(135deg, var(--accent2), var(--accent3))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            position: 'relative',
            zIndex: 1,
            filter: 'drop-shadow(0 0 30px rgba(1,205,254,0.4))',
          }}
        >
          projects
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          style={{ color: 'var(--dim)', fontSize: '1rem', position: 'relative', zIndex: 1, marginTop: '1rem' }}
        >
          libraries, tools, and experiments. all open source.
        </motion.p>
      </section>

      {/* Asymmetric masonry grid */}
      <section style={{ padding: '4rem 2rem' }}>
        <div className="vaporwave-grid">
          {projects.map((project, i) => (
            <motion.article
              key={project.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <Link
                href={`/projects/${project.slug}`}
                style={{
                  display: 'block',
                  padding: '2.5rem',
                  background: 'linear-gradient(135deg, rgba(1,205,254,0.07), rgba(185,103,255,0.07))',
                  border: '1px solid var(--border)',
                  boxShadow: '0 4px 24px rgba(1,205,254,0.1)',
                  transition: 'box-shadow 0.3s',
                  height: '100%',
                }}
              >
                {/* Status + year header */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '1.5rem',
                }}>
                  <span style={{
                    fontFamily: 'var(--mono)',
                    fontSize: '0.62rem',
                    letterSpacing: '0.12em',
                    color: statusColors[project.status] ?? 'var(--dim)',
                    textTransform: 'uppercase',
                    border: `1px solid ${statusColors[project.status] ?? 'var(--dim)'}`,
                    padding: '0.2rem 0.5rem',
                  }}>
                    {project.status}
                  </span>
                  {project.year && (
                    <span style={{
                      fontFamily: 'var(--mono)',
                      fontSize: '0.62rem',
                      color: 'var(--dim)',
                      letterSpacing: '0.1em',
                    }}>
                      {project.year}
                    </span>
                  )}
                </div>

                <h2 style={{
                  fontSize: '1.4rem',
                  fontWeight: 700,
                  marginBottom: '1rem',
                  color: 'var(--accent2)',
                  textTransform: 'uppercase',
                  letterSpacing: '-0.01em',
                  lineHeight: 1.2,
                }}>
                  <GlitchText text={project.title} />
                </h2>

                <p style={{
                  color: 'var(--dim)',
                  lineHeight: 1.7,
                  fontSize: '0.88rem',
                  marginBottom: '1.5rem',
                }}>
                  {project.description}
                </p>

                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                  {project.tags.map(t => (
                    <span
                      key={t}
                      style={{
                        fontFamily: 'var(--mono)',
                        fontSize: '0.62rem',
                        letterSpacing: '0.1em',
                        padding: '0.2rem 0.5rem',
                        border: '1px solid var(--accent3)',
                        color: 'var(--accent3)',
                        textTransform: 'lowercase',
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </section>
    </div>
  )
}
