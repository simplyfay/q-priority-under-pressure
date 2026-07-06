import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { FocusModeBackground } from './FocusMode'
import { useTasks } from '../lib/tasks'

export default function ReorientPrompt() {
  const navigate = useNavigate()
  const { activeTask, queue, currentIndex, switchToTask } = useTasks()

  // The interruption references a DIFFERENT task than the current one: the next
  // not-yet-done priority in the queue (fall back to any other task).
  const incoming =
    queue.find((t, i) => i >= currentIndex && t.id !== activeTask.id) ??
    queue.find((t) => t.id !== activeTask.id) ??
    null

  return (
    <div className="relative min-h-[calc(100vh-3.5rem)] overflow-hidden">
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <FocusModeBackground />
      </div>

      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', duration: 0.35, bounce: 0.12 }}
        className="fixed bottom-0 left-0 right-0 z-20 rounded-t-2xl bg-surface-elevated p-6 pb-10 shadow-lg"
      >
        <div
          className="mx-auto mb-6 h-1 w-10 rounded-full bg-line-default"
          aria-hidden
        />

        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-content-accent">
            New priority came in
          </p>
          {incoming ? (
            <>
              <p className="mt-2 text-base font-semibold text-content-primary">
                {incoming.title}
              </p>
              <p className="mt-1 text-xs uppercase tracking-widest text-content-muted">
                {incoming.eyebrow}
              </p>
            </>
          ) : (
            <p className="mt-2 text-base font-semibold text-content-primary">
              Something needs your attention
            </p>
          )}
          <p className="mt-3 mb-6 text-sm text-content-secondary">
            You&apos;re on{' '}
            <span className="text-content-primary">“{activeTask.title}”</span>.
            Q recalculated — finish this one, or switch to the new priority.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <Button
            variant="primary"
            size="lg"
            onClick={() => navigate('/focus')}
          >
            Continue current task
          </Button>
          <Button
            variant="secondary"
            size="lg"
            className="font-medium"
            disabled={!incoming}
            onClick={() => {
              if (incoming) switchToTask(incoming.id)
              navigate('/activate')
            }}
          >
            Switch to new priority
          </Button>
        </div>
      </motion.div>
    </div>
  )
}
