'use client'

import { useEffect, useRef } from 'react'

/* ------------------------------------------------------------
   ProjectForms
   Animated geometric forms used as visual accents on project
   list items. Each item type maps to a Bauhaus primary shape:
     circle  - red    - identity / brand projects
     square  - blue   - engineering / systems
     line    - ochre  - writing / research
   ------------------------------------------------------------ */

type FormShape = 'circle' | 'square' | 'line'

interface ProjectFormProps {
  /** Which geometric shape to render */
  shape: FormShape
  /** Scale multiplier relative to the base 48 px size (default 1) */
  scale?: number
  /** Whether to play the entrance animation */
  animated?: boolean
  /** Accessible label - omit to inherit aria-hidden from parent */
  label?: string
  className?: string
}

const BASE_SIZE = 48 // px

const SHAPE_COLORS: Record<FormShape, string> = {
  circle: 'var(--red)',
  square: 'var(--blue)',
  line:   'var(--ochre)',
}

/* ── Individual shape renderers ─────────────────────────── */

function CircleForm({ size, color }: { size: number; color: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle
        cx="24"
        cy="24"
        r="21"
        stroke={color}
        strokeWidth="3"
        fill="none"
      />
    </svg>
  )
}

function SquareForm({ size, color }: { size: number; color: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Rotated 45° to become a diamond */}
      <rect
        x="8"
        y="8"
        width="32"
        height="32"
        stroke={color}
        strokeWidth="3"
        fill="none"
        transform="rotate(45 24 24)"
      />
    </svg>
  )
}

function LineForm({ size, color }: { size: number; color: string }) {
  return (
    <svg
      width={size}
      height={Math.round(size * 0.5)}
      viewBox="0 0 48 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <line
        x1="2"
        y1="22"
        x2="46"
        y2="2"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="square"
      />
    </svg>
  )
}

/* ── ProjectForm ─────────────────────────────────────────── */

export function ProjectForm({
  shape,
  scale = 1,
  animated = true,
  label,
  className = '',
}: ProjectFormProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const size = Math.round(BASE_SIZE * scale)
  const color = SHAPE_COLORS[shape]

  /* Entrance animation via CSS custom property injection */
  useEffect(() => {
    const el = ref.current
    if (!el || !animated) return

    el.style.setProperty('--form-opacity', '0')
    el.style.setProperty('--form-translate', '6px')

    // rAF double-frame to ensure first paint before animating
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        el.style.transition =
          'opacity 360ms cubic-bezier(0.16,1,0.3,1), transform 360ms cubic-bezier(0.16,1,0.3,1)'
        el.style.setProperty('--form-opacity', '1')
        el.style.setProperty('--form-translate', '0px')
      })
    })

    return () => cancelAnimationFrame(id)
  }, [animated])

  return (
    <span
      ref={ref}
      className={className}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        opacity: animated ? 'var(--form-opacity, 1)' : 1,
        transform: animated
          ? 'translateY(var(--form-translate, 0px))'
          : 'none',
      }}
    >
      {shape === 'circle' && <CircleForm size={size} color={color} />}
      {shape === 'square' && <SquareForm size={size} color={color} />}
      {shape === 'line'   && <LineForm   size={size} color={color} />}
    </span>
  )
}

/* ── ProjectFormSet - convenience wrapper for list items ── */

interface ProjectFormSetProps {
  /** Shape to use - inferred from index if omitted */
  shape?: FormShape
  /** 0-based list index; cycles through circle → square → line */
  index?: number
  scale?: number
  animated?: boolean
  className?: string
}

const INDEX_SHAPES: FormShape[] = ['circle', 'square', 'line']

export function ProjectFormSet({
  shape,
  index = 0,
  scale = 1,
  animated = true,
  className = '',
}: ProjectFormSetProps) {
  const resolvedShape = shape ?? INDEX_SHAPES[index % INDEX_SHAPES.length]

  return (
    <ProjectForm
      shape={resolvedShape}
      scale={scale}
      animated={animated}
      className={className}
    />
  )
}
