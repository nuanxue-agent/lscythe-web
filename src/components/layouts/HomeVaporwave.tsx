'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'
import type { Project } from '@/lib/content'

// Vaporwave 3D grid floor using canvas
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

      // sky gradient
      const sky = ctx.createLinearGradient(0, 0, 0, h * 0.55)
      sky.addColorStop(0, '#0d0015')
      sky.addColorStop(1, '#2d0a4e')
      ctx.fillStyle = sky
      ctx.fillRect(0, 0, w, h * 0.55)

      // sun
      const sunY = h * 0.38
      const sunR = Math.min(w, h) * 0.14
      const sunGrad = ctx.createRadialGradient(w/2, sunY, 0, w/2, sunY, sunR)
      sunGrad.addColorStop(0, '#fffb00')
      sunGrad.addColorStop(0.4, '#ff71ce')
      sunGrad.addColorStop(1, 'transparent')
      ctx.fillStyle = sunGrad
      ctx.beginPath()
      ctx.arc(w/2, sunY, sunR, 0, Math.PI * 2)
      ctx.fill()

      // sun stripes (horizontal cuts)
      ctx.fillStyle = '#0d0015'
      for (let i = 0; i < 7; i++) {
        const y = sunY - sunR * 0.5 + i * sunR * 0.18
        const thickness = 3 + i * 1.5
        ctx.fillRect(w/2 - sunR, y, sunR * 2, thickness)
      }

      // horizon glow
      const horizonGrad = ctx.createLinearGradient(0, h*0.5, 0, h*0.58)
      horizonGrad.addColorStop(0, 'rgba(255,113,206,0.8)')
      horizonGrad.addColorStop(1, 'transparent')
      ctx.fillStyle = horizonGrad
      ctx.fillRect(0, h*0.5, w, h*0.08)

      // grid floor
      const floorTop = h * 0.55
      const floorBot = h
      const horizon = floorTop
      const vp = { x: w/2, y: horizon }

      // vertical lines
      const vLineCount = 20
      for (let i = -vLineCount/2; i <= vLineCount/2; i++) {
        const xBottom = w/2 + i * (w / vLineCount)
        ctx.beginPath()
        ctx.moveTo(vp.x, horizon)
        ctx.lineTo(xBottom, floorBot)
        const alpha = 0.15 + Math.abs(i) * 0.01
        ctx.strokeStyle = `rgba(185,103,255,${Math.min(alpha, 0.5)})`
        ctx.lineWidth = 1
        ctx.stroke()
      }

      // horizontal lines with scroll animation
      const hLineCount = 12
      const scrollOffset = (frame * 0.6) % (h / hLineCount)
      for (let i = 0; i <= hLineCount; i++) {
        const t = i / hLineCount
        const perspT = Math.pow(t, 2.5)
        const y = horizon + perspT * (floorBot - horizon) + scrollOffset * perspT
        if (y > floorBot) continue
        const alpha = perspT * 0.6
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(w, y)
        ctx.strokeStyle = `rgba(255,113,206,${alpha})`
        ctx.lineWidth = 1
        ctx.stroke()
      }

      // floor gradient overlay
      const floorGrad = ctx.createLinearGradient(0, floorTop, 0, floorBot)
      floorGrad.addColorStop(0, 'rgba(13,0,21,0)')
      floorGrad.addColorStop(1, 'rgba(13,0,21,0.85)')
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

interface Props { featured: Project[] }

export default function HomeVaporwave({ featured }: Props) {
  return (
    <div style={{ background: '#0d0015', minHeight: '100vh', fontFamily: '"Inter", sans-serif' }}>

      {/* Hero */}
      <section style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <VaporGrid />

        {/* Content overlay */}
        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '2rem' }}>
          {/* Chrome title */}
          <h1 style={{
            fontSize: 'clamp(4rem, 14vw, 11rem)',
            fontWeight: 900,
            lineHeight: 0.85,
            letterSpacing: '-0.03em',
            textTransform: 'uppercase',
            background: 'linear-gradient(180deg, #ffffff 0%, #ff71ce 40%, #b967ff 70%, #01cdfe 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            filter: 'drop-shadow(0 0 30px rgba(255,113,206,0.8))',
            marginBottom: '0.5rem',
          }}>
            LSCYTHE
          </h1>

          {/* Subtitle */}
          <p style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: 'clamp(0.75rem, 1.5vw, 1rem)',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: '#01cdfe',
            textShadow: '0 0 20px #01cdfe',
            marginBottom: '3rem',
          }}>
            android engineer // jakarta // est. 2019
          </p>

          {/* Neon chips */}
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '3rem' }}>
            {[
              { label: 'android', color: '#ff71ce' },
              { label: 'kmp', color: '#b967ff' },
              { label: 'available', color: '#01cdfe' },
            ].map(({ label, color }) => (
              <span key={label} className="vaporwave-chip" style={{
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: '0.72rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                padding: '0.5rem 1.2rem',
                border: `1px solid ${color}`,
                color,
                boxShadow: `0 0 12px ${color}66, inset 0 0 12px ${color}22`,
                background: `${color}11`,
              }}>
                {label}
              </span>
            ))}
          </div>

          <Link href="/projects" style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: '0.8rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            padding: '0.8rem 2rem',
            background: 'linear-gradient(90deg, #ff71ce, #b967ff)',
            color: '#fff',
            boxShadow: '0 0 30px rgba(255,113,206,0.5)',
            display: 'inline-block',
          }}>
            view work →
          </Link>
        </div>

        {/* Scroll hint */}
        <div style={{
          position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)',
          fontFamily: '"JetBrains Mono", monospace', fontSize: '0.6rem', letterSpacing: '0.2em',
          color: 'rgba(185,103,255,0.6)', textTransform: 'uppercase', zIndex: 2,
          animation: 'vw-pulse 2s ease-in-out infinite',
        }}>
          scroll ↓
        </div>
      </section>

      {/* Projects section */}
      <section style={{ padding: '6rem 2rem', position: 'relative' }}>
        {/* Section bg */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg, #0d0015 0%, #160a2a 50%, #0d0015 100%)',
        }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <p style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: '0.65rem', letterSpacing: '0.3em', color: '#b967ff',
              textTransform: 'uppercase', marginBottom: '1rem',
            }}>
              &gt;&gt; selected_work
            </p>
            <h2 style={{
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
              fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.03em',
              background: 'linear-gradient(135deg, #ff71ce, #b967ff, #01cdfe)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              filter: 'drop-shadow(0 0 20px rgba(185,103,255,0.5))',
            }}>
              featured work
            </h2>
          </div>

          {/* Asymmetric grid */}
          <div className="vaporwave-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1.5rem',
          }}>
            {featured.map((project, i) => (
              <Link key={project.slug} href={`/projects/${project.slug}`} style={{
                display: 'block',
                padding: '2rem',
                background: i % 2 === 0
                  ? 'linear-gradient(135deg, rgba(255,113,206,0.08), rgba(185,103,255,0.08))'
                  : 'linear-gradient(135deg, rgba(1,205,254,0.08), rgba(185,103,255,0.08))',
                border: `1px solid ${i % 2 === 0 ? 'rgba(255,113,206,0.3)' : 'rgba(1,205,254,0.3)'}`,
                boxShadow: i % 2 === 0
                  ? '0 4px 24px rgba(255,113,206,0.15)'
                  : '0 4px 24px rgba(1,205,254,0.15)',
                gridRow: i === 0 ? 'span 1' : 'auto',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}>
                <div style={{
                  fontFamily: '"JetBrains Mono", monospace',
                  fontSize: '0.6rem', letterSpacing: '0.2em',
                  color: i % 2 === 0 ? '#ff71ce' : '#01cdfe',
                  marginBottom: '1rem',
                }}>
                  {String(i + 1).padStart(2, '0')} / project
                </div>
                <h3 style={{
                  fontSize: '1.3rem', fontWeight: 700, textTransform: 'uppercase',
                  letterSpacing: '-0.01em', marginBottom: '0.75rem',
                  color: i % 2 === 0 ? '#ff71ce' : '#01cdfe',
                  textShadow: i % 2 === 0 ? '0 0 20px rgba(255,113,206,0.5)' : '0 0 20px rgba(1,205,254,0.5)',
                }}>
                  {project.title}
                </h3>
                <p style={{ fontSize: '0.83rem', color: '#9b89b8', lineHeight: 1.6, marginBottom: '1rem' }}>
                  {project.description}
                </p>
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                  {project.tags.slice(0, 3).map(t => (
                    <span key={t} style={{
                      fontFamily: '"JetBrains Mono", monospace', fontSize: '0.58rem',
                      letterSpacing: '0.1em', padding: '0.2rem 0.5rem',
                      border: '1px solid rgba(185,103,255,0.4)', color: '#b967ff',
                    }}>{t}</span>
                  ))}
                </div>
              </Link>
            ))}

            <Link href="/projects" style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: '2rem', minHeight: '160px',
              border: '1px dashed rgba(185,103,255,0.3)',
              background: 'rgba(185,103,255,0.04)',
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: '0.8rem', letterSpacing: '0.15em',
              color: '#b967ff', textTransform: 'uppercase',
            }}>
              all projects →
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid rgba(185,103,255,0.2)',
        padding: '2rem', textAlign: 'center',
        background: '#0d0015',
        fontFamily: '"JetBrains Mono", monospace',
        fontSize: '0.62rem', letterSpacing: '0.15em',
        color: 'rgba(185,103,255,0.4)',
      }}>
        <span style={{ color: '#ff71ce' }}>lscythe.dev</span> © {new Date().getFullYear()}
      </footer>

      <style>{`
        @keyframes vw-pulse {
          0%, 100% { opacity: 0.4; transform: translateX(-50%) translateY(0); }
          50% { opacity: 1; transform: translateX(-50%) translateY(6px); }
        }
      `}</style>
    </div>
  )
}
