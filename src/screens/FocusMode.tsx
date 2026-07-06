import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { CheckCircle2, Circle } from 'lucide-react'
import { Button } from '../components/ui/button'
import { ProgressMeter } from '../components/ui/ProgressMeter'
import { useTasks, type QueueTask } from '../lib/tasks'

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: 'easeOut' as const, delay },
})

// Current-task progress: how many of this task's steps (prerequisites) are done.
// A task with no prerequisites is a single ready-to-do action.
function stepProgress(task: QueueTask) {
  const total = task.prerequisites.length
  const done = task.prerequisites.filter((p) => p.done).length
  const pct = total ? Math.round((done / total) * 100) : 0
  const label = total ? `${done} of ${total} steps done` : 'Ready to complete'
  return { total, done, pct, label }
}

// The calm paused surface reused (dimmed) as the Reorient backdrop: the current
// task title and its step progress, no actions.
export function FocusModeBackground() {
  const { activeTask } = useTasks()
  const step = stepProgress(activeTask)

  return (
    <div className="flex h-full min-h-[calc(100vh-3.5rem)] flex-col items-center justify-center bg-surface-default px-6 pb-24">
      <motion.h1
        {...fadeUp(0)}
        className="max-w-sm text-center text-4xl font-bold tracking-tight text-content-primary"
      >
        {activeTask.title}
      </motion.h1>
      <motion.div {...fadeUp(0.15)} className="mt-6 w-full max-w-xs">
        <ProgressMeter pct={step.pct} label={step.label} tone="success" />
      </motion.div>
    </div>
  )
}

export default function FocusMode() {
  const navigate = useNavigate()
  const { activeTask, isLastTask, allPrereqsDone, togglePrereq, completeTask } =
    useTasks()
  const step = stepProgress(activeTask)
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
      {/* Content sits toward the top: title, then step progress, then the
          prerequisite checklist directly beneath. Actions pin to the bottom. */}
      <div className="flex min-h-[calc(100vh-3.5rem)] flex-col items-center px-6 pb-40 pt-[10vh]">
        <motion.h1
          {...fadeUp(0)}
          className="max-w-sm text-center text-3xl font-bold tracking-tight text-content-primary sm:text-4xl"
        >
          {activeTask.title}
        </motion.h1>

        <motion.div {...fadeUp(0.12)} className="mt-6 w-full max-w-xs">
          <ProgressMeter pct={step.pct} label={step.label} tone="success" />
        </motion.div>

        {prereqs.length > 0 && (
          <motion.div
            {...fadeUp(0.24)}
            className="mt-6 w-full max-w-sm rounded-2xl border border-line-subtle bg-surface-raised p-4"
          >
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
          </motion.div>
        )}
      </div>

      {/* Actions pinned to the bottom of the page. */}
      <motion.div
        {...fadeUp(0.4)}
        className="fixed inset-x-0 bottom-0 flex flex-col items-center gap-3 bg-gradient-to-t from-surface-default via-surface-default px-6 pb-10 pt-6"
      >
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
