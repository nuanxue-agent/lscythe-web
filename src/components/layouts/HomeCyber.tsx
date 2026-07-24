'use client'

import Link from 'next/link'
import type { Project } from '@/lib/content'

const NEON_COLORS = ['#ff003c', '#f7e500', '#00d9ff']

const TICKER_TEXT = '// SYSTEM ONLINE // ANDROID ENGINEER // JAKARTA, ID // AVAILABLE // KMP SPECIALIST // OPEN TO WORK // KOTLIN MULTIPLATFORM // '

interface Props { featured: Project[] }

export default function HomeCyber({ featured }: Props) {
  return (
    <div style={{ background: '#0a0a0f', minHeight: '100vh', fontFamily: '"Inter", sans-serif', position: 'relative' }}>

      {/* Global scanlines overlay */}
      <div className="cyber-scanlines" />

      {/* Ticker / marquee below nav */}
      <div style={{
        width: '100%',
        overflow: 'hidden',
        background: 'rgba(255,0,60,0.06)',
        borderBottom: '1px solid rgba(255,0,60,0.25)',
        borderTop: '1px solid rgba(255,0,60,0.15)',
        padding: '0.45rem 0',
        position: 'relative',
        zIndex: 10,
      }}>
        <div style={{
          display: 'inline-block',
          whiteSpace: 'nowrap',
          animation: 'cyber-ticker 28s linear infinite',
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: '0.62rem',
          letterSpacing: '0.15em',
          color: '#ff003c',
          textShadow: '0 0 8px rgba(255,0,60,0.7)',
        }}>
          {TICKER_TEXT}{TICKER_TEXT}{TICKER_TEXT}
        </div>
      </div>

      <style>{`
        @keyframes cyber-ticker {
          from { transform: translateX(0); }
          to { transform: translateX(-33.333%); }
        }
        @keyframes cyber-boot {
          0% { opacity: 0; }
          60% { opacity: 0; }
          100% { opacity: 1; }
        }
        @keyframes cyber-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes cyber-status-pulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
      `}</style>

      {/* Hero */}
      <section style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        padding: '2rem',
      }}>
        {/* Rain - slightly more visible */}
        <div className="cyber-rain" style={{ opacity: 0.55 }} />

        {/* City skyline silhouette (CSS clip-path) */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '35vh',
          pointerEvents: 'none',
          zIndex: 0,
        }}>
          <svg
            viewBox="0 0 1440 300"
            preserveAspectRatio="xMidYMax slice"
            style={{ width: '100%', height: '100%' }}
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Skyline silhouette filled with very dark near-black */}
            <path
              d="M0,300 L0,220 L40,220 L40,180 L60,180 L60,160 L80,160 L80,140 L100,140 L100,120
                 L115,120 L115,100 L130,100 L130,80 L145,80 L145,100 L160,100 L160,60 L175,60
                 L175,50 L185,50 L185,60 L200,60 L200,130 L220,130 L220,90 L235,90 L235,70
                 L250,70 L250,90 L265,90 L265,140 L280,140 L280,110 L295,110 L295,85 L305,85
                 L305,110 L320,110 L320,150 L340,150 L340,120 L360,120 L360,100 L370,100
                 L370,80 L385,80 L385,100 L400,100 L400,130 L415,130 L415,110 L430,110 L430,90
                 L445,90 L445,60 L455,60 L455,45 L465,45 L465,60 L480,60 L480,100 L500,100
                 L500,140 L520,140 L520,120 L535,120 L535,100 L550,100 L550,80 L565,80 L565,100
                 L580,100 L580,130 L600,130 L600,110 L620,110 L620,90 L635,90 L635,70 L645,70
                 L645,90 L660,90 L660,120 L680,120 L680,95 L695,95 L695,75 L710,75 L710,55
                 L720,55 L720,45 L730,45 L730,55 L745,55 L745,75 L760,75 L760,100 L780,100
                 L780,130 L800,130 L800,110 L815,110 L815,90 L825,90 L825,70 L840,70 L840,90
                 L855,90 L855,120 L870,120 L870,140 L890,140 L890,100 L905,100 L905,80 L920,80
                 L920,60 L935,60 L935,80 L950,80 L950,110 L970,110 L970,130 L990,130 L990,100
                 L1005,100 L1005,75 L1020,75 L1020,55 L1030,55 L1030,45 L1040,45 L1040,55
                 L1055,55 L1055,75 L1070,75 L1070,100 L1090,100 L1090,120 L1110,120 L1110,90
                 L1125,90 L1125,70 L1140,70 L1140,90 L1155,90 L1155,110 L1175,110 L1175,130
                 L1195,130 L1195,100 L1210,100 L1210,75 L1225,75 L1225,55 L1240,55 L1240,40
                 L1255,40 L1255,55 L1270,55 L1270,75 L1285,75 L1285,100 L1305,100 L1305,130
                 L1325,130 L1325,150 L1345,150 L1345,130 L1365,130 L1365,170 L1390,170 L1390,200
                 L1420,200 L1440,200 L1440,300 Z"
              fill="#070710"
            />
            {/* Window lights */}
            {[
              [168, 67], [172, 72], [180, 63], [302, 93], [308, 100],
              [372, 88], [378, 93], [458, 52], [462, 58], [721, 52],
              [726, 58], [731, 64], [912, 68], [918, 75], [1033, 52],
              [1038, 58], [1243, 48], [1248, 55], [1253, 62],
            ].map(([cx, cy], idx) => (
              <rect
                key={idx}
                x={cx}
                y={cy}
                width="3"
                height="4"
                fill={idx % 3 === 0 ? 'rgba(255,0,60,0.6)' : idx % 3 === 1 ? 'rgba(0,217,255,0.5)' : 'rgba(247,229,0,0.5)'}
              />
            ))}
          </svg>
        </div>

        {/* Background city glow */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 80% 50% at 50% 60%, rgba(255,0,60,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          {/* Eyebrow */}
          <p style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: '0.65rem',
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            color: '#00d9ff',
            textShadow: '0 0 10px #00d9ff',
            marginBottom: '1.5rem',
          }}>
            &gt;&gt; system online // android engineer // jakarta, id
          </p>

          {/* Glitch title - data-text must match content */}
          <h1
            className="cyber-glitch cyber-glow-red"
            data-text="LSCYTHE"
            style={{
              fontSize: 'clamp(5rem, 18vw, 13rem)',
              fontWeight: 900,
              lineHeight: 0.85,
              letterSpacing: '-0.02em',
              textTransform: 'uppercase',
              color: '#ff003c',
              marginBottom: '1.5rem',
            }}
          >
            LSCYTHE
          </h1>

          {/* Subtitle */}
          <p
            className="cyber-glow-yellow"
            style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: 'clamp(0.75rem, 1.8vw, 1.1rem)',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: '#f7e500',
              marginBottom: '1.5rem',
            }}
          >
            android // kotlin multiplatform // available for work
          </p>

          {/* ACCESS GRANTED boot sequence */}
          <div style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: '0.62rem',
            color: 'rgba(0,255,80,0.7)',
            letterSpacing: '0.12em',
            marginBottom: '2.5rem',
            lineHeight: 2,
            animation: 'cyber-boot 2s ease-out forwards',
          }}>
            <div>&gt; AUTH CHECK ............... <span style={{ color: '#00ff50' }}>OK</span></div>
            <div>&gt; IDENTITY VERIFIED ........ <span style={{ color: '#00ff50' }}>OK</span></div>
            <div style={{ color: '#ff003c', textShadow: '0 0 8px rgba(255,0,60,0.8)' }}>
              &gt; ACCESS GRANTED{' '}
              <span style={{ animation: 'cyber-blink 1s step-end infinite' }}>█</span>
            </div>
          </div>

          {/* Chips */}
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '3rem' }}>
            {[
              { label: 'android', color: '#ff003c' },
              { label: 'kmp', color: '#f7e500' },
              { label: 'open to work', color: '#00d9ff' },
            ].map(({ label, color }) => (
              <span key={label} style={{
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: '0.65rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                padding: '0.45rem 1rem',
                border: `2px solid ${color}`,
                color,
                boxShadow: `0 0 12px ${color}88, inset 0 0 12px ${color}11`,
                background: `${color}0d`,
              }}>
                {label}
              </span>
            ))}
          </div>

          <Link href="/projects" style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: '0.75rem',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            padding: '0.9rem 2.5rem',
            background: 'transparent',
            color: '#ff003c',
            border: '2px solid #ff003c',
            boxShadow: '0 0 20px rgba(255,0,60,0.4), inset 0 0 20px rgba(255,0,60,0.05)',
            display: 'inline-block',
            transition: 'box-shadow 0.2s',
            textDecoration: 'none',
          }}>
            VIEW WORK →
          </Link>
        </div>

        {/* Scroll hint */}
        <div style={{
          position: 'absolute', bottom: '6rem', left: '50%', transform: 'translateX(-50%)',
          fontFamily: '"JetBrains Mono", monospace', fontSize: '0.55rem', letterSpacing: '0.25em',
          color: 'rgba(255,0,60,0.5)', textTransform: 'uppercase', zIndex: 2,
        }}>
          scroll ↓
        </div>
      </section>

      {/* Featured Projects */}
      <section style={{ padding: '6rem 2rem', position: 'relative' }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg, #0a0a0f 0%, #12121a 50%, #0a0a0f 100%)',
        }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: '1100px', margin: '0 auto' }}>
          {/* Section header */}
          <div style={{ marginBottom: '4rem' }}>
            {/* Classification label */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              marginBottom: '1rem',
              padding: '0.3rem 0.75rem',
              border: '1px solid rgba(255,0,60,0.4)',
              background: 'rgba(255,0,60,0.06)',
            }}>
              <span style={{
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: '0.55rem',
                letterSpacing: '0.2em',
                color: '#ff003c',
                textTransform: 'uppercase',
                textShadow: '0 0 6px rgba(255,0,60,0.6)',
              }}>CLASSIFIED</span>
              <span style={{ width: '1px', height: '0.8rem', background: 'rgba(255,0,60,0.4)' }} />
              <span style={{
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: '0.55rem',
                letterSpacing: '0.2em',
                color: 'rgba(255,0,60,0.7)',
                textTransform: 'uppercase',
              }}>LEVEL 3 ACCESS</span>
            </div>
            <p style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: '0.6rem', letterSpacing: '0.35em',
              color: '#ff003c', textTransform: 'uppercase',
              textShadow: '0 0 10px rgba(255,0,60,0.5)',
              marginBottom: '0.75rem',
            }}>
              &gt;&gt; selected_work
            </p>
            <h2 style={{
              fontSize: 'clamp(2rem, 5vw, 4rem)',
              fontWeight: 900, textTransform: 'uppercase',
              letterSpacing: '-0.02em',
              color: '#e0e0e5',
              textShadow: '0 0 40px rgba(255,0,60,0.2)',
            }}>
              FEATURED WORK
            </h2>
          </div>

          {/* Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '1.5rem',
          }}>
            {featured.map((project, i) => {
              const color = NEON_COLORS[i % 3]
              return (
                <Link key={project.slug} href={`/projects/${project.slug}`} style={{
                  display: 'block',
                  padding: '2rem',
                  background: '#0f0f17',
                  border: `2px solid ${color}`,
                  boxShadow: `0 0 20px ${color}33`,
                  position: 'relative',
                  overflow: 'hidden',
                  textDecoration: 'none',
                  transition: 'box-shadow 0.2s',
                }}>
                  {/* Rain overlay on card */}
                  <div className="cyber-rain" style={{ opacity: 0.5 }} />

                  {/* Big number */}
                  <div style={{
                    position: 'absolute', top: '-0.5rem', right: '1rem',
                    fontSize: '6rem', fontWeight: 900, lineHeight: 1,
                    color,
                    opacity: 0.12,
                    userSelect: 'none',
                    fontFamily: '"JetBrains Mono", monospace',
                  }}>
                    {String(i + 1).padStart(2, '0')}
                  </div>

                  <div style={{ position: 'relative', zIndex: 1 }}>
                    {/* Number label */}
                    <div style={{
                      fontFamily: '"JetBrains Mono", monospace',
                      fontSize: '0.58rem', letterSpacing: '0.25em',
                      color, textTransform: 'uppercase',
                      textShadow: `0 0 8px ${color}`,
                      marginBottom: '1rem',
                    }}>
                      {String(i + 1).padStart(2, '0')} // project
                    </div>

                    <h3 style={{
                      fontSize: '1.2rem', fontWeight: 700,
                      textTransform: 'uppercase', letterSpacing: '0.02em',
                      marginBottom: '0.75rem',
                      color,
                      textShadow: `0 0 15px ${color}88`,
                    }}>
                      {project.title}
                    </h3>

                    <p style={{
                      fontFamily: '"JetBrains Mono", monospace',
                      fontSize: '0.82rem', color: 'rgba(224,224,229,0.6)',
                      lineHeight: 1.6, marginBottom: '1.25rem',
                    }}>
                      {project.description}
                    </p>

                    <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                      {project.tags.slice(0, 3).map(t => (
                        <span key={t} style={{
                          fontFamily: '"JetBrains Mono", monospace',
                          fontSize: '0.55rem', letterSpacing: '0.12em',
                          textTransform: 'uppercase',
                          padding: '0.2rem 0.5rem',
                          border: `1px solid ${color}66`,
                          color: `${color}cc`,
                        }}>{t}</span>
                      ))}
                    </div>
                  </div>
                </Link>
              )
            })}

            {/* All projects link */}
            <Link href="/projects" style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: '2rem', minHeight: '180px',
              border: '2px dashed rgba(255,0,60,0.3)',
              background: 'rgba(255,0,60,0.03)',
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: '0.7rem', letterSpacing: '0.2em',
              color: 'rgba(255,0,60,0.6)', textTransform: 'uppercase',
              textDecoration: 'none',
            }}>
              ALL PROJECTS →
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid rgba(255,0,60,0.2)',
        padding: '2rem', textAlign: 'center',
        background: '#0a0a0f',
        fontFamily: '"JetBrains Mono", monospace',
        fontSize: '0.6rem', letterSpacing: '0.15em',
        color: 'rgba(255,0,60,0.4)',
        paddingBottom: '5rem', // room for fixed status bar
      }}>
        <span style={{ color: '#ff003c', textShadow: '0 0 8px rgba(255,0,60,0.5)' }}>LSCYTHE.DEV</span>
        {' '}// {new Date().getFullYear()} // ALL SYSTEMS OPERATIONAL
      </footer>

      {/* Fixed bottom status bar */}
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: '2rem',
        background: 'rgba(10,10,15,0.96)',
        borderTop: '1px solid rgba(255,0,60,0.3)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 1.5rem',
        gap: '2rem',
        zIndex: 50,
        fontFamily: '"JetBrains Mono", monospace',
        fontSize: '0.52rem',
        letterSpacing: '0.12em',
      }}>
        <span style={{
          color: '#00ff50',
          animation: 'cyber-status-pulse 2s ease-in-out infinite',
        }}>
          ● ONLINE
        </span>
        <span style={{ color: 'rgba(0,217,255,0.6)' }}>SYS:OK</span>
        <span style={{ color: 'rgba(247,229,0,0.5)' }}>UPTIME: {new Date().getFullYear() - 2019}Y</span>
        <span style={{ color: 'rgba(255,0,60,0.5)' }}>LOC: JAKARTA/ID</span>
        <span style={{ flex: 1 }} />
        <span style={{
          color: 'rgba(255,0,60,0.6)',
          animation: 'cyber-blink 1.8s step-end infinite',
        }}>
          ▌
        </span>
        <span style={{ color: 'rgba(224,224,229,0.3)' }}>
          {new Date().toISOString().slice(0, 16).replace('T', ' ')} UTC
        </span>
      </div>
    </div>
  )
}
