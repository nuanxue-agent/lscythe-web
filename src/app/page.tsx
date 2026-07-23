import Link from 'next/link'
import { getAllProjects } from '@/lib/content'
import Reveal from '@/components/Reveal'
import Counter from '@/components/Counter'
import HeroCanvas from '@/components/HeroCanvasWrapper'
import GlitchText from '@/components/GlitchText'
import TiltCard from '@/components/TiltCard'

export const metadata = {
  title: 'lscythe',
  description: 'Android engineer from Jakarta. Building mobile systems, KMP libraries, and developer tooling.',
}

export default function HomePage() {
  const featured = getAllProjects().filter(p => p.featured).slice(0, 3)

  return (
    <>
      <div className="deco-bar"><span /><span /><span /><span /><span /></div>

      {/* Hero */}
      <section className="hero scanlines">
        <div className="hero__left">
          <Reveal>
            <span className="hero__kicker prompt">android engineer / jakarta / est. 2019</span>
          </Reveal>

          <div>
            <Reveal delay={100}>
              <h1 className="hero__title">
                <span><GlitchText text="LSCYTHE" /></span>
                <span style={{ color: 'var(--accent)' }}>_</span>
              </h1>
            </Reveal>

            <Reveal delay={200}>
              <p className="hero__statement">
                building <strong>Android</strong> systems, <strong>KMP</strong> libraries,
                and developer tooling at <strong>Nocturn</strong>.<br />
                obsessed with build performance, architecture that scales,
                and the gap between how apps are designed and how they actually run.
              </p>
            </Reveal>

            <Reveal delay={300}>
              <div className="hero__status">
                <span className="status-chip status-chip--green">[AVAILABLE]</span>
                <span className="status-chip status-chip--blue">[ANDROID]</span>
                <span className="status-chip status-chip--pink">[KMP]</span>
              </div>
            </Reveal>
          </div>

          <Reveal delay={400}>
            <div style={{ display: 'flex', gap: '3rem', marginTop: '1rem' }}>
              {[
                { label: 'years exp', val: 6 },
                { label: 'projects', val: 10, suffix: '+' },
                { label: 'blog posts', val: 10, suffix: '+' },
              ].map(({ label, val, suffix = '' }) => (
                <div key={label} className="stat-block">
                  <div style={{
                    fontFamily: 'var(--mono)',
                    fontSize: 'clamp(1.8rem,3vw,2.5rem)',
                    fontWeight: 900,
                    color: 'var(--accent)',
                    lineHeight: 1,
                  }}>
                    <Counter value={val} suffix={suffix} />
                  </div>
                  <div style={{
                    fontFamily: 'var(--mono)',
                    fontSize: '0.62rem',
                    color: 'var(--dim)',
                    letterSpacing: '0.12em',
                    marginTop: '0.3rem',
                  }}>{label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="hero__right">
          <HeroCanvas />
          <span className="hero__canvas-label prompt">3d / interactive</span>
        </div>
      </section>

      {/* Selected work */}
      <section className="objects">
        <Reveal className="objects__heading">
          <p className="section-heading__num prompt">selected_work</p>
          <h2>featured<br />projects</h2>
        </Reveal>

        <div className="objects__list">
          {featured.map((project, i) => (
            <Reveal key={project.slug} delay={i * 80}>
              <TiltCard intensity={4}>
                <Link href={`/projects/${project.slug}`} className="project-row">
                  <span className="project-row__num">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <div className="project-row__title">
                      <GlitchText text={project.title} />
                    </div>
                    <div className="project-row__desc">{project.description}</div>
                  </div>
                  <div className="project-row__tags">
                    {project.tags.slice(0, 3).map(t => (
                      <span key={t} className="tag">{t}</span>
                    ))}
                  </div>
                </Link>
              </TiltCard>
            </Reveal>
          ))}
          <Reveal delay={240}>
            <Link href="/projects" className="project-row" style={{ opacity: 0.45 }}>
              <span className="project-row__num">→</span>
              <div><div className="project-row__title">all projects</div></div>
              <div />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Principle */}
      <Reveal>
        <section className="principle">
          <div className="principle__quote">
            <blockquote>
              "complexity is not a feature.<br />
              it's a failure of design."
            </blockquote>
          </div>
          <div className="principle__aside">
            <div className="principle__circle" />
            <span className="principle__aside-label">
              working principle<br />lscythe / 2026
            </span>
          </div>
        </section>
      </Reveal>

      {/* Footer */}
      <footer style={{
        padding: '1.25rem 2rem',
        borderTop: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontFamily: 'var(--mono)',
        fontSize: '0.62rem',
        letterSpacing: '0.1em',
        color: 'var(--dim)',
      }}>
        <span>lscythe.dev</span>
        <span style={{ color: 'var(--dim)', fontSize: '0.55rem' }}>press ` to open terminal</span>
        <span style={{ color: 'var(--accent)' }}>■</span>
        <span>{new Date().getFullYear()}</span>
      </footer>
    </>
  )
}
