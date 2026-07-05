import * as React from 'react'
import { cn } from '../../lib/utils'

// The status pill — Q's through-line. Its state signals what Q is doing now.
// Color arc: amber (notices) -> blue (helps) -> green (works) -> gray (rests).
export type PillStatus =
  | 'detecting'
  | 'suggesting'
  | 'focus'
  | 'recalculating'
  | 'clear'

type PillSpec = { label: string; className: string; dot: string }

// Colors are pulled from the primitive token vars — no new tokens defined.
const SPECS: Record<PillStatus, PillSpec> = {
  detecting: {
    label: 'Detecting',
    className:
      'bg-[var(--color-amber-100)] text-[var(--color-amber-700)]',
    dot: 'bg-[var(--color-amber-700)]',
  },
  suggesting: {
    label: 'Suggesting',
    className:
      'bg-[var(--color-slate-300)] text-[var(--color-navy-900)]',
    dot: 'bg-[var(--color-navy-700)]',
  },
  recalculating: {
    label: 'Recalculating',
    className:
      'bg-[var(--color-slate-300)] text-[var(--color-navy-900)]',
    dot: 'bg-[var(--color-navy-700)]',
  },
  focus: {
    label: 'Focus active',
    className:
      'bg-[var(--color-green-100)] text-[var(--color-green-600)]',
    dot: 'bg-[var(--color-green-600)]',
  },
  clear: {
    label: 'All clear',
    className: 'bg-[var(--color-gray-100)] text-[var(--color-gray-600)]',
    dot: 'bg-[var(--color-gray-500)]',
  },
}

type BaseProps = {
  status: PillStatus
  label?: string
  pulse?: boolean
  className?: string
}

export interface PillProps
  extends BaseProps,
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> {}

export const Pill = React.forwardRef<HTMLButtonElement, PillProps>(
  ({ status, label, pulse = false, className, onClick, ...props }, ref) => {
    const spec = SPECS[status]
    const interactive = typeof onClick === 'function'
    const content = (
      <>
        <span
          className={cn(
            'h-1.5 w-1.5 shrink-0 rounded-full',
            spec.dot,
            pulse && 'animate-pulse',
          )}
          aria-hidden
        />
        {label ?? spec.label}
      </>
    )

    const shared = cn(
      'inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium',
      spec.className,
      className,
    )

    if (interactive) {
      return (
        <button
          ref={ref}
          type="button"
          onClick={onClick}
          className={cn(shared, 'transition-transform hover:scale-[1.03]')}
          {...props}
        >
          {content}
        </button>
      )
    }

    return <span className={shared}>{content}</span>
  },
)
Pill.displayName = 'Pill'
