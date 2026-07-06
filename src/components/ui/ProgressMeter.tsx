// Shared progress bar so Ambient (day/queue scope) and Focus (current-task
// scope) read identically: a scope label on the left, a percentage on the
// right, and a filling bar beneath. Only the tone (fill color) differs.
type ProgressMeterProps = {
  pct: number // 0..100
  label: string
  tone?: 'primary' | 'success'
  className?: string
}

export function ProgressMeter({
  pct,
  label,
  tone = 'primary',
  className,
}: ProgressMeterProps) {
  const clamped = Math.max(0, Math.min(100, Math.round(pct)))
  const fill = tone === 'success' ? 'bg-state-success' : 'bg-action-primary'

  return (
    <div className={className}>
      <div className="mb-2 flex items-center justify-between text-xs text-content-muted">
        <span>{label}</span>
        <span>{clamped}%</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-surface-elevated">
        <div
          className={`h-full rounded-full transition-[width] duration-500 ${fill}`}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  )
}
