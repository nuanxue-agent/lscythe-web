'use client'

import { useEffect, useRef, useState } from 'react'
import { useTheme } from './ThemeProvider'

const COMMANDS: Record<string, string[]> = {
  help: [
    '> available commands:',
    '  help       - show this',
    '  whoami     - identity',
    '  stack      - tech stack',
    '  status     - availability',
    '  projects   - list projects',
    '  blog       - latest posts',
    '  clear      - clear terminal',
    '  exit       - close terminal',
  ],
  whoami: [
    '> lscythe',
    '  android engineer',
    '  jakarta, indonesia',
    '  est. 2019',
  ],
  stack: [
    '> primary stack:',
    '  kotlin         [████████████] 95%',
    '  jetpack compose[██████████░░] 88%',
    '  kmp            [████████░░░░] 72%',
    '  flutter        [███████░░░░░] 65%',
    '  gradle/build   [████████████] 90%',
  ],
  status: [
    '> current status:',
    '  [AVAILABLE] for work',
    '  [ACTIVE]    nocturn / fintech',
    '  [BUILDING]  spektr, vektor',
    '  [LEARNING]  kmp / compose multiplatform',
  ],
  projects: [
    '> projects:',
    '  01  spektr        design token system',
    '  02  vektor        kmp state machine',
    '  03  nocturnd      background task daemon',
    '  04  gradle-sentinel build analyzer',
    '  05  krate         typed datastore wrapper',
    '  06  prism         screenshot testing',
    '  07  threadwatch   thread safety analyzer',
    '  08  pulsar        kmp websocket client',
    '  09  driftlog      debug overlay HUD',
    '  10  monobase      monorepo template',
    '',
    '  > /projects for details',
  ],
  blog: [
    '> latest posts:',
    '  - coroutine context is not magic',
    '  - the viewmodel is not your state machine',
    '  - koin vs hilt after three years',
    '  - compose stability annotations are a smell',
    '  - build times are a product problem',
    '',
    '  > /blog for all posts',
  ],
  clear: ['__CLEAR__'],
  exit: ['__EXIT__'],
}

const UNKNOWN = (cmd: string) => [`> unknown command: "${cmd}"`, '  type "help" for available commands']

export default function Terminal() {
  const { theme } = useTheme()
  const [open, setOpen] = useState(false)
  const [lines, setLines] = useState<string[]>(['> terminal ready. type "help" to begin.'])
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<string[]>([])
  const [histIdx, setHistIdx] = useState(-1)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // open with ` key — disabled on retro theme
  useEffect(() => {
    if (theme === 'retro') return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === '`') { e.preventDefault(); setOpen(o => !o) }
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [theme])

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50)
  }, [open])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [lines])

  // Hide on retro — doesn't fit the 2004 blog aesthetic
  if (theme === 'retro') return null

  const submit = () => {
    const cmd = input.trim().toLowerCase()
    if (!cmd) return
    setHistory(h => [cmd, ...h])
    setHistIdx(-1)
    setInput('')
    const response = COMMANDS[cmd] ?? UNKNOWN(cmd)
    if (response[0] === '__CLEAR__') { setLines(['> cleared.']); return }
    if (response[0] === '__EXIT__') { setOpen(false); return }
    setLines(l => [...l, `$ ${cmd}`, ...response, ''])
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') { submit(); return }
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      const idx = Math.min(histIdx + 1, history.length - 1)
      setHistIdx(idx)
      setInput(history[idx] ?? '')
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      const idx = Math.max(histIdx - 1, -1)
      setHistIdx(idx)
      setInput(idx === -1 ? '' : history[idx])
    }
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        aria-label="Open terminal"
        style={{
          position: 'fixed',
          bottom: '1.5rem',
          right: '1.5rem',
          zIndex: 200,
          background: 'var(--surface)',
          border: '1px solid var(--accent)',
          color: 'var(--accent)',
          fontFamily: 'var(--mono)',
          fontSize: '0.65rem',
          letterSpacing: '0.1em',
          padding: '0.5rem 0.9rem',
          cursor: 'pointer',
          transition: 'background 0.15s',
          boxShadow: '0 0 12px rgba(0,255,136,0.15)',
        }}
        onMouseEnter={e => (e.currentTarget.style.background = 'rgba(0,255,136,0.1)')}
        onMouseLeave={e => (e.currentTarget.style.background = 'var(--surface)')}
      >
        &gt;_
      </button>
    )
  }

  return (
    <div style={{
      position: 'fixed',
      bottom: '1.5rem',
      right: '1.5rem',
      width: 'min(520px, 92vw)',
      height: '340px',
      background: 'rgba(8,8,8,0.97)',
      border: '1px solid var(--accent)',
      boxShadow: '0 0 40px rgba(0,255,136,0.15), 0 0 80px rgba(0,255,136,0.05)',
      zIndex: 200,
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'var(--mono)',
      fontSize: '0.72rem',
    }}>
      <div style={{
        borderBottom: '1px solid var(--border)',
        padding: '0.5rem 1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        color: 'var(--dim)',
        fontSize: '0.62rem',
        letterSpacing: '0.1em',
      }}>
        <span><span style={{ color: 'var(--accent)' }}>lscythe</span> -- terminal</span>
        <button
          onClick={() => setOpen(false)}
          style={{ background: 'none', border: 'none', color: 'var(--dim)', cursor: 'pointer', fontSize: '0.72rem', padding: '0 0.25rem' }}
        >
          [x]
        </button>
      </div>

      <div style={{
        flex: 1, overflowY: 'auto', padding: '0.75rem 1rem',
        display: 'flex', flexDirection: 'column', gap: '0.15rem',
      }}>
        {lines.map((line, i) => (
          <div key={i} style={{
            color: line.startsWith('$') ? 'var(--dim)' : line.startsWith('>') ? 'var(--accent)' : 'var(--white)',
            whiteSpace: 'pre',
            lineHeight: 1.6,
          }}>
            {line}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div style={{
        borderTop: '1px solid var(--border)',
        padding: '0.5rem 1rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
      }}>
        <span style={{ color: 'var(--accent)' }}>$</span>
        <input
          ref={inputRef}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          style={{
            flex: 1,
            background: 'none',
            border: 'none',
            outline: 'none',
            color: 'var(--white)',
            fontFamily: 'var(--mono)',
            fontSize: '0.72rem',
            letterSpacing: '0.05em',
            caretColor: 'var(--accent)',
          }}
          autoComplete="off"
          spellCheck={false}
        />
      </div>
    </div>
  )
}
