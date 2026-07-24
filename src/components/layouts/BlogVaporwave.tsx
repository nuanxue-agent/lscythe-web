'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

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

function VaporGrid() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    let animId: number
    let frame = 0

    const draw = () => {
      const w = canvas.width = canvas.offsetWidth
      const h = canvas.height = canvas.offsetHeight
      ctx.clearRect(0, 0, w, h)

      const sky = ctx.createLinearGradient(0, 0, 0, h * 0.55)
      sky.addColorStop(0, '#0d0015')
      sky.addColorStop(1, '#2d0a4e')
      ctx.fillStyle = sky
      ctx.fillRect(0, 0, w, h * 0.55)

      const sunY = h * 0.38
      const sunR = Math.min(w, h) * 0.12
      const sunGrad = ctx.createRadialGradient(w / 2, sunY, 0, w / 2, sunY, sunR)
      sunGrad.addColorStop(0, '#fffb00')
      sunGrad.addColorStop(0.4, '#ff71ce')
      sunGrad.addColorStop(1, 'transparent')
      ctx.fillStyle = sunGrad
      ctx.beginPath()
      ctx.arc(w / 2, sunY, sunR, 0, Math.PI * 2)
      ctx.fill()

      ctx.fillStyle = '#0d0015'
      for (let i = 0; i < 7; i++) {
        const y = sunY - sunR * 0.5 + i * sunR * 0.18
        ctx.fillRect(w / 2 - sunR, y, sunR * 2, 3 + i * 1.5)
      }

      const horizonGrad = ctx.createLinearGradient(0, h * 0.5, 0, h * 0.58)
      horizonGrad.addColorStop(0, 'rgba(255,113,206,0.8)')
      horizonGrad.addColorStop(1, 'transparent')
      ctx.fillStyle = horizonGrad
      ctx.fillRect(0, h * 0.5, w, h * 0.08)

      const floorTop = h * 0.55
      const floorBot = h
      const horizon = floorTop
      const vp = { x: w / 2, y: horizon }

      const vLineCount = 20
      for (let i = -vLineCount / 2; i <= vLineCount / 2; i++) {
        const xBottom = w / 2 + i * (w / vLineCount)
        ctx.beginPath()
        ctx.moveTo(vp.x, horizon)
        ctx.lineTo(xBottom, floorBot)
        const alpha = 0.15 + Math.abs(i) * 0.01
        ctx.strokeStyle = `rgba(185,103,255,${Math.min(alpha, 0.5)})`
        ctx.lineWidth = 1
        ctx.stroke()
      }

      const hLineCount = 12
      const scrollOffset = (frame * 0.6) % (h / hLineCount)
      for (let i = 0; i <= hLineCount; i++) {
        const t = i / hLineCount
        const perspT = Math.pow(t, 2.5)
        const y = horizon + perspT * (floorBot - horizon) + scrollOffset * perspT
        if (y > floorBot) continue
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(w, y)
        ctx.strokeStyle = `rgba(255,113,206,${perspT * 0.6})`
        ctx.lineWidth = 1
        ctx.stroke()
      }

      const floorGrad = ctx.createLinearGradient(0, floorTop, 0, floorBot)
      floorGrad.addColorStop(0, 'rgba(13,0,21,0)')
      floorGrad.addColorStop(1, 'rgba(13,0,21,0.9)')
      ctx.fillStyle = floorGrad
      ctx.fillRect(0, floorTop, w, floorBot - floorTop)

      frame++
      animId = requestAnimationFrame(draw)
    }

    draw()
    return () => cancelAnimationFrame(animId)
  }, [])

  return <canvas ref={ref} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
}

export default function BlogVaporwave({ posts }: BlogVaporwaveProps) {
  return (
    <div style={{ background: '#0d0015', minHeight: '100vh', fontFamily: '"Inter", sans-serif' }}>

      {/* Hero header with canvas grid */}
      <section style={{
        position: 'relative',
        height: '340px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <VaporGrid />

        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '2rem' }}>
          <p style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: '0.65rem',
            letterSpacing: '0.3em',
            color: '#b967ff',
            textTransform: 'uppercase',
            marginBottom: '0.75rem',
          }}>
            &gt;&gt; writing
          </p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            style={{
              fontSize: 'clamp(3rem, 10vw, 7rem)',
              fontWeight: 900,
              lineHeight: 0.9,
              letterSpacing: '-0.04em',
              textTransform: 'uppercase',
              background: 'linear-gradient(180deg, #ffffff 0%, #ff71ce 40%, #b967ff 70%, #01cdfe 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 0 30px rgba(255,113,206,0.8))',
            }}
          >
            blog
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: '0.7rem',
              letterSpacing: '0.2em',
              color: '#01cdfe',
              textShadow: '0 0 16px #01cdfe',
              marginTop: '1rem',
              textTransform: 'uppercase',
            }}
          >
            opinions, deep dives, and things i figured out the hard way.
          </motion.p>
        </div>
      </section>

      {/* Posts list */}
      <section style={{ padding: '4rem 2rem 6rem', maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {posts.map((post, i) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.07 }}
              whileHover={{ x: 4 }}
            >
              <Link
                href={`/blog/${post.slug}`}
                style={{
                  display: 'block',
                  padding: '1.75rem 2rem',
                  background: i % 2 === 0
                    ? 'linear-gradient(135deg, rgba(255,113,206,0.07), rgba(185,103,255,0.05))'
                    : 'linear-gradient(135deg, rgba(1,205,254,0.07), rgba(185,103,255,0.05))',
                  border: `1px solid ${i % 2 === 0 ? 'rgba(255,113,206,0.25)' : 'rgba(1,205,254,0.25)'}`,
                  boxShadow: i % 2 === 0
                    ? '0 2px 20px rgba(255,113,206,0.12)'
                    : '0 2px 20px rgba(1,205,254,0.12)',
                  transition: 'box-shadow 0.3s, transform 0.2s',
                  textDecoration: 'none',
                }}
              >
                {/* Date + reading time */}
                <div style={{
                  fontFamily: '"JetBrains Mono", monospace',
                  fontSize: '0.62rem',
                  letterSpacing: '0.14em',
                  color: i % 2 === 0 ? '#ff71ce' : '#01cdfe',
                  marginBottom: '0.7rem',
                  display: 'flex',
                  gap: '1.25rem',
                  alignItems: 'center',
                }}>
                  <span>
                    {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                  </span>
                  <span style={{ color: '#b967ff', opacity: 0.85 }}>{post.readingTime}</span>
                </div>

                <h2 style={{
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '-0.01em',
                  lineHeight: 1.2,
                  marginBottom: '0.65rem',
                  color: i % 2 === 0 ? '#ff71ce' : '#01cdfe',
                  textShadow: i % 2 === 0
                    ? '0 0 18px rgba(255,113,206,0.45)'
                    : '0 0 18px rgba(1,205,254,0.45)',
                }}>
                  {post.title}
                </h2>

                <p style={{
                  fontSize: '0.86rem',
                  color: '#9b89b8',
                  lineHeight: 1.65,
                  marginBottom: '1rem',
                }}>
                  {post.description}
                </p>

                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                  {post.tags.map(t => (
                    <span
                      key={t}
                      style={{
                        fontFamily: '"JetBrains Mono", monospace',
                        fontSize: '0.58rem',
                        letterSpacing: '0.1em',
                        padding: '0.2rem 0.5rem',
                        border: '1px solid rgba(185,103,255,0.4)',
                        color: '#b967ff',
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

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid rgba(185,103,255,0.2)',
        padding: '2rem',
        textAlign: 'center',
        background: '#0d0015',
        fontFamily: '"JetBrains Mono", monospace',
        fontSize: '0.62rem',
        letterSpacing: '0.15em',
        color: 'rgba(185,103,255,0.4)',
      }}>
        <span style={{ color: '#ff71ce' }}>lscythe.dev</span> © {new Date().getFullYear()}
      </footer>
    </div>
  )
}
