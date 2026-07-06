import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { useTasks } from '../lib/tasks'

export default function TaskCard() {
  const navigate = useNavigate()
  const { activeTask } = useTasks()

  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] flex-col bg-surface-default">
      {/* Eyebrow rests in the upper third; the card centers in the middle. */}
      <div className="flex flex-1 flex-col items-center px-6 pb-10 pt-[14vh]">
        <p className="mb-6 text-sm text-content-secondary">
          Here&apos;s where to start.
        </p>

        <motion.article
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', duration: 0.3 }}
          className="w-full max-w-md rounded-2xl bg-surface-raised p-6 shadow-lg"
        >
          <p className="mb-3 text-xs font-medium tracking-widest text-content-accent uppercase">
            {activeTask.eyebrow}
          </p>

          <h1 className="mb-2 text-3xl leading-tight font-bold text-content-primary">
            {activeTask.title}
          </h1>

          <p className="mb-6 text-base leading-relaxed text-content-secondary">
            {activeTask.rationale}
          </p>

          <div className="mb-6 flex flex-wrap gap-2">
            {activeTask.tags.map((tag) => (
              <span
                key={tag.label}
                className={`rounded-full bg-surface-elevated px-3 py-1 text-xs ${
                  tag.tone === 'urgent'
                    ? 'text-state-urgent'
                    : 'text-content-accent'
                }`}
              >
                {tag.label}
              </span>
            ))}
          </div>

          <div className="flex gap-3">
            <Button
              variant="primary"
              className="flex-1"
              onClick={() => navigate('/focus')}
            >
              Start task
            </Button>
            <Button
              variant="secondary"
              className="flex-1 font-medium"
              onClick={() => navigate('/ambient?tasks=1')}
            >
              View all tasks
            </Button>
          </div>
        </motion.article>

        <p className="mt-4 text-center text-xs text-content-muted">
          11 others are waiting. They can wait.
        </p>
      </div>
    </div>
  )
}
