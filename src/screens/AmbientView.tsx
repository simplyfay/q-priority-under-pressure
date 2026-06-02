import { motion } from 'framer-motion'

const topTasks = [
  'Review Q3 proposal draft',
  'Prep for 2pm standup',
  'Reply to client email',
]

function formatTime(date: Date) {
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })
}

export default function AmbientView() {
  const now = formatTime(new Date())

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="flex min-h-[calc(100vh-3rem)] flex-col bg-surface-default"
    >
      <header className="flex items-center justify-between px-6 py-5">
        <span className="text-sm text-content-secondary">Q</span>
        <time className="text-sm text-content-secondary">{now}</time>
      </header>

      <div className="flex flex-1 flex-col items-center justify-center px-6 pb-8">
        <div className="w-full max-w-sm rounded-2xl bg-ambient-calm p-8 shadow-glow">
          <h1 className="text-2xl font-semibold text-content-primary">
            Your day looks manageable
          </h1>
          <p className="mt-3 text-base text-content-secondary">
            3 tasks, 2 meetings, 4 hours free
          </p>

          <div className="mt-8">
            <div className="mb-2 flex justify-between text-xs text-content-muted">
              <span>Day progress</span>
              <span>40%</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-surface-elevated">
              <div className="h-full w-[40%] rounded-full bg-action-primary" />
            </div>
          </div>
        </div>
      </div>

      <footer className="border-t border-line-subtle px-6 py-6">
        <p className="mb-3 text-xs font-medium tracking-widest uppercase text-content-muted">
          Today&apos;s focus
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          {topTasks.map((task) => (
            <span
              key={task}
              className="rounded-full bg-surface-raised px-3 py-1 text-sm text-content-secondary"
            >
              {task}
            </span>
          ))}
        </div>
      </footer>
    </motion.div>
  )
}
