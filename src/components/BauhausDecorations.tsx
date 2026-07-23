'use client'

/* ------------------------------------------------------------
   BauhausDecorations
   Three geometric shapes that form the visual identity of
   the site: circle (red), square (blue), diagonal bar (ochre).
   Always aria-hidden — purely decorative.
   ------------------------------------------------------------ */

interface BauhausDecorationsProps {
  /** Additional wrapper class for positioning context */
  className?: string
  /** Override default colour assignments */
  variant?: 'default' | 'inverted'
}

export function BauhausDecorations({
  className = '',
  variant = 'default',
}: BauhausDecorationsProps) {
  const isInverted = variant === 'inverted'

  return (
    <div
      aria-hidden="true"
      className={className}
      style={{ position: 'relative', pointerEvents: 'none' }}
    >
      <div
        className="decoration decoration-circle"
        style={
          isInverted
            ? { borderColor: 'var(--bone)' }
            : undefined
        }
      />
      <div
        className="decoration decoration-square"
        style={
          isInverted
            ? { borderColor: 'var(--bone)' }
            : undefined
        }
      />
      <div
        className="decoration decoration-diagonal"
        style={
          isInverted
            ? { background: 'var(--bone)' }
            : undefined
        }
      />
    </div>
  )
}
