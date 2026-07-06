import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { CheckCircle2, Circle } from 'lucide-react'
import { Button } from '../components/ui/button'
import { useTasks } from '../lib/tasks'

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: 'easeOut' as const, delay },
})

// Reinforcement copy honest to the real completion level.
function focusCopy(progress: number) {
  if (progress >= 0.67) return 'Almost there.'
  if (progress < 0.34) return 'Good start. Keep going.'
  return 'Halfway there. Keep going.'
}

// The calm working surface — one task, progress, reinforcement. Reused
// (dimmed) as the paused backdrop in Reorient, so it holds no actions itself.
export function FocusModeBackground() {
  const { activeTask, progress } = useTasks()
  const pct = Math.round(progress * 100)

  return (
    <div className="flex h-full min-h-[calc(100vh-3.5rem)] flex-col items-center justify-center bg-surface-default px-6 pb-24">
      <motion.h1
        {...fadeUp(0)}
        className="max-w-sm text-center text-4xl font-bold tracking-tight text-content-primary"
      >
        {activeTask.title}
      </motion.h1>

      <motion.div {...fadeUp(0.15)} className="mt-6 w-48">
        <div className="h-[3px] overflow-hidden rounded-full bg-surface-elevated">
          <div
            className="h-full rounded-full bg-state-success transition-[width] duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
        <p className="mt-2 text-center text-xs text-content-muted">
          {focusCopy(progress)}
        </p>
      </motion.div>
    </div>
  )
}

export default function FocusMode() {
  const navigate = useNavigate()
  const { activeTask, isLastTask, allPrereqsDone, togglePrereq, completeTask } =
    useTasks()
  const prereqs = activeTask.prerequisites
  const gated = prereqs.length > 0 && !allPrereqsDone

  const onComplete = () => {
    // Capture before completeTask() advances the queue index.
    const last = isLastTask
    completeTask()
    navigate(last ? '/clear' : '/recalculating')
  }

  return (
    <div className="relative">
      <FocusModeBackground />

      <motion.div
        {...fadeUp(0.4)}
        className="fixed inset-x-0 bottom-0 flex flex-col items-center gap-3 px-6 pb-10"
      >
        {prereqs.length > 0 && (
          <div className="w-full max-w-sm rounded-2xl border border-line-subtle bg-surface-raised p-4">
            <p className="mb-3 text-xs font-medium uppercase tracking-widest text-content-muted">
              Finish these first
            </p>
            <ul className="flex flex-col gap-1">
              {prereqs.map((p) => (
                <li key={p.id}>
                  <button
                    type="button"
                    onClick={() => togglePrereq(p.id)}
                    className="flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left text-sm transition-colors hover:bg-surface-subtle"
                    aria-pressed={p.done}
                  >
                    {p.done ? (
                      <CheckCircle2
                        className="h-4 w-4 shrink-0 text-state-success"
                        strokeWidth={2}
                        aria-hidden
                      />
                    ) : (
                      <Circle
                        className="h-4 w-4 shrink-0 text-content-muted"
                        strokeWidth={2}
                        aria-hidden
                      />
                    )}
                    <span
                      className={
                        p.done
                          ? 'text-content-muted line-through'
                          : 'text-content-secondary'
                      }
                    >
                      {p.label}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        <Button
          variant="primary"
          size="lg"
          className="max-w-sm"
          disabled={gated}
          onClick={onComplete}
        >
          Mark complete
        </Button>
        <button
          type="button"
          onClick={() => navigate('/ambient')}
          className="text-xs text-content-muted underline transition-colors hover:text-content-secondary"
        >
          Exit focus mode
        </button>
      </motion.div>
    </div>
  )
}
