import { motion } from 'framer-motion'
import { Button } from '../components/ui/button'

const backgroundTasks = [
  {
    title: 'Review Q3 proposal draft',
    meta: 'Due 3pm · High impact',
  },
  {
    title: 'Send weekly status update',
    meta: 'Due today · Medium',
  },
  {
    title: 'Approve design mockups',
    meta: 'Waiting on you · 1h',
  },
  {
    title: 'Schedule 1:1 with Jordan',
    meta: 'Suggested · Low urgency',
  },
]

export default function DetectOffer() {
  return (
    <div className="relative min-h-[calc(100vh-3rem)] overflow-hidden bg-surface-default">
      <div
        className="pointer-events-none absolute inset-0 px-6 pt-20 opacity-20 blur-sm"
        aria-hidden
      >
        <div className="mx-auto max-w-md space-y-3">
          {backgroundTasks.map((task) => (
            <div
              key={task.title}
              className="rounded-xl border border-line-subtle bg-surface-raised p-4"
            >
              <p className="text-sm font-medium text-content-primary">
                {task.title}
              </p>
              <p className="mt-1 text-xs text-content-secondary">{task.meta}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-10 flex min-h-[calc(100vh-3rem)] flex-col items-center px-6 pt-10">
        <motion.div
          initial={{ y: -48, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="flex items-center gap-3 rounded-full bg-surface-elevated px-5 py-3 shadow-md"
        >
          <span className="h-2 w-2 shrink-0 animate-pulse rounded-full bg-action-primary" />
          <span className="text-sm font-medium text-content-primary">
            Q has a suggestion
          </span>
        </motion.div>

        <motion.div
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4, ease: 'easeOut' }}
          className="mt-8 w-full max-w-sm rounded-2xl bg-surface-raised p-6 shadow-lg"
        >
          <h1 className="text-xl font-semibold text-content-primary">
            Things have shifted.
          </h1>
          <p className="mt-3 text-base leading-relaxed text-content-secondary">
            You&apos;ve switched tasks 4 times in 20 minutes. Want help deciding
            what matters right now?
          </p>

          <div className="mt-6 flex flex-col gap-3">
            <Button variant="primary" size="lg" className="w-full">
              Yes, help me focus
            </Button>
            <Button variant="secondary" size="lg" className="w-full font-medium">
              I&apos;m fine, thanks
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
