'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import GlitchText from '@/components/GlitchText'

interface Post {
  slug: string
  title: string
  description: string
  date: string
  readingTime: string
  tags: string[]
}

interface BlogVaporwaveProps {
  posts: Post[]
}

export default function BlogVaporwave({ posts }: BlogVaporwaveProps) {
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
        {/* Background grid lines */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(185,103,255,0.08) 40px, rgba(185,103,255,0.08) 41px)',
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
            background: 'linear-gradient(135deg, var(--accent), var(--accent3))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            position: 'relative',
            zIndex: 1,
            filter: 'drop-shadow(0 0 30px rgba(255,113,206,0.4))',
          }}
        >
          writing
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          style={{
            color: 'var(--dim)',
            fontSize: '1rem',
            position: 'relative',
            zIndex: 1,
            marginTop: '1rem',
          }}
        >
          opinions, deep dives, and things i figured out the hard way.
        </motion.p>
      </section>

      {/* Masonry-style posts grid */}
      <section style={{ padding: '4rem 2rem' }}>
        <div className="vaporwave-grid">
          {posts.map((post, i) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -6, scale: 1.01 }}
            >
              <Link
                href={`/blog/${post.slug}`}
                style={{
                  display: 'block',
                  padding: '2.5rem',
                  background: 'linear-gradient(135deg, rgba(255,113,206,0.08), rgba(1,205,254,0.06))',
                  border: '1px solid var(--border)',
                  boxShadow: '0 4px 24px rgba(185,103,255,0.15)',
                  transition: 'box-shadow 0.3s, transform 0.3s',
                }}
              >
                <div style={{
                  fontFamily: 'var(--mono)',
                  fontSize: '0.65rem',
                  letterSpacing: '0.12em',
                  color: 'var(--accent)',
                  marginBottom: '1rem',
                  display: 'flex',
                  gap: '1rem',
                }}>
                  <span>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                  <span style={{ color: 'var(--accent3)' }}>{post.readingTime}</span>
                </div>

                <h2 style={{
                  fontSize: '1.3rem',
                  fontWeight: 700,
                  marginBottom: '1rem',
                  color: 'var(--white)',
                  textTransform: 'uppercase',
                  letterSpacing: '-0.01em',
                  lineHeight: 1.2,
                }}>
                  <GlitchText text={post.title} />
                </h2>

                <p style={{
                  color: 'var(--dim)',
                  lineHeight: 1.7,
                  fontSize: '0.88rem',
                  marginBottom: '1.5rem',
                }}>
                  {post.description}
                </p>

                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                  {post.tags.map(t => (
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
