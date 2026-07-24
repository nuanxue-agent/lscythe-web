'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import HeroCanvas from '@/components/HeroCanvasWrapper'
import GlitchText from '@/components/GlitchText'

import type { Project } from '@/lib/content'

interface HomeVaporwaveProps {
  featured: Project[]
}

export default function HomeVaporwave({ featured }: HomeVaporwaveProps) {
  return (
    <>
      {/* Full-width hero with floating 3D overlay */}
      <section style={{ 
        position: 'relative', 
        minHeight: '100vh', 
        overflow: 'hidden',
        background: 'linear-gradient(180deg, var(--black) 0%, var(--surface) 100%)',
      }}>
        {/* 3D scene as background */}
        <div style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.4,
          zIndex: 0,
        }}>
          <HeroCanvas />
        </div>

        {/* Gradient text overlay */}
        <div style={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          padding: '4rem 2rem',
          textAlign: 'center',
        }}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 style={{
              fontSize: 'clamp(4rem, 12vw, 10rem)',
              fontWeight: 900,
              lineHeight: 0.9,
              letterSpacing: '-0.05em',
              textTransform: 'uppercase',
              background: 'linear-gradient(135deg, var(--accent), var(--accent2), var(--accent3))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '2rem',
              filter: 'drop-shadow(0 0 40px rgba(255,113,206,0.5))',
            }}>
              <GlitchText text="LSCYTHE" />
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{
              fontSize: 'clamp(1rem, 2vw, 1.4rem)',
              maxWidth: '60ch',
              color: 'var(--dim)',
              lineHeight: 1.7,
              marginBottom: '3rem',
            }}
          >
            android engineer crafting <span style={{ color: 'var(--accent)' }}>mobile systems</span>,{' '}
            <span style={{ color: 'var(--accent2)' }}>KMP libraries</span>, and{' '}
            <span style={{ color: 'var(--accent3)' }}>developer tooling</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center' }}
          >
            {['android', 'kmp', 'available'].map((tag, i) => (
              <span
                key={tag}
                className="vaporwave-float"
                style={{
                  fontFamily: 'var(--mono)',
                  fontSize: '0.75rem',
                  letterSpacing: '0.15em',
                  padding: '0.6rem 1.2rem',
                  border: '2px solid var(--accent)',
                  background: 'rgba(255,113,206,0.1)',
                  boxShadow: '0 0 20px rgba(255,113,206,0.3)',
                  textTransform: 'uppercase',
                  animationDelay: `${i * 0.2}s`,
                }}
              >
                {tag}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Asymmetric masonry grid projects */}
      <section style={{ padding: '4rem 2rem', background: 'var(--black)' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            textAlign: 'center',
            marginBottom: '4rem',
          }}
        >
          <h2 style={{
            fontSize: 'clamp(2.5rem, 6vw, 4rem)',
            fontWeight: 900,
            textTransform: 'uppercase',
            background: 'linear-gradient(135deg, var(--accent), var(--accent3))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '1rem',
          }}>
            featured work
          </h2>
          <p style={{ color: 'var(--dim)', fontSize: '0.9rem' }}>
            selected projects / experiments
          </p>
        </motion.div>

        <div className="vaporwave-grid">
          {featured.map((project, i) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <Link
                href={`/projects/${project.slug}`}
                style={{
                  display: 'block',
                  padding: '2.5rem',
                  background: 'linear-gradient(135deg, rgba(255,113,206,0.1), rgba(185,103,255,0.1))',
                  border: '1px solid var(--border)',
                  boxShadow: '0 8px 32px rgba(255,113,206,0.2)',
                  transition: 'all 0.3s',
                }}
              >
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  marginBottom: '1rem',
                  color: 'var(--accent)',
                  textTransform: 'uppercase',
                }}>
                  <GlitchText text={project.title} />
                </h3>
                <p style={{
                  color: 'var(--dim)',
                  lineHeight: 1.6,
                  marginBottom: '1.5rem',
                  fontSize: '0.9rem',
                }}>
                  {project.description}
                </p>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {project.tags.slice(0, 3).map(t => (
                    <span
                      key={t}
                      style={{
                        fontFamily: 'var(--mono)',
                        fontSize: '0.65rem',
                        letterSpacing: '0.1em',
                        padding: '0.3rem 0.6rem',
                        border: '1px solid var(--accent2)',
                        color: 'var(--accent2)',
                        textTransform: 'lowercase',
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </Link>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: featured.length * 0.1 }}
            whileHover={{ y: -8 }}
          >
            <Link
              href="/projects"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2.5rem',
                border: '2px dashed var(--border)',
                background: 'rgba(255,113,206,0.05)',
                fontSize: '1.2rem',
                fontWeight: 700,
                color: 'var(--accent)',
                textTransform: 'uppercase',
                minHeight: '200px',
              }}
            >
              view all →
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        padding: '2rem',
        borderTop: '2px solid var(--border)',
        textAlign: 'center',
        background: 'var(--surface)',
      }}>
        <div style={{
          fontFamily: 'var(--mono)',
          fontSize: '0.7rem',
          letterSpacing: '0.15em',
          color: 'var(--dim)',
        }}>
          <span style={{ color: 'var(--accent)' }}>lscythe.dev</span> © {new Date().getFullYear()}
        </div>
      </footer>
    </>
  )
}
