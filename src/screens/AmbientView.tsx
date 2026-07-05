import * as React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'

// The full pool Q watches quietly. One of these (the Q3 proposal) is what
// Activate later surfaces; the rest are the "11 others waiting."
const tasks = [
  { title: 'Review Q3 proposal draft', meta: 'Due 3pm · High impact' },
  { title: 'Reply to Sarah re: budget approval', meta: 'Waiting on you · 3 people blocked' },
  { title: 'Prep for 2pm standup', meta: 'Due today · Medium' },
  { title: 'Approve design mockups', meta: 'Waiting on you · 1h' },
  { title: 'Send weekly status update', meta: 'Due today · Medium' },
  { title: 'Reply to client email', meta: 'Due today · Low' },
  { title: 'Schedule 1:1 with Jordan', meta: 'Suggested · Low urgency' },
  { title: 'Review pull request #241', meta: 'Blocking 2 others · Medium' },
  { title: 'Update the roadmap doc', meta: 'This week · Low' },
  { title: 'Book travel for offsite', meta: 'This week · Low' },
  { title: 'Expense last week’s receipts', meta: 'No rush · Low' },
  { title: 'Draft retro notes', meta: 'No rush · Low' },
]

export default function AmbientView() {
  const [searchParams] = useSearchParams()
  const [open, setOpen] = React.useState(searchParams.get('tasks') === '1')

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="flex min-h-[calc(100vh-3.5rem)] flex-col items-center px-6 py-10"
    >
      {/* STATE first — the shape of the day, not a raw list. */}
      <div className="w-full max-w-md rounded-2xl bg-ambient-calm p-8 shadow-glow">
        <h1 className="text-2xl font-semibold text-content-primary">
          Your day looks manageable
        </h1>
        <p className="mt-3 text-base text-content-secondary">
          12 tasks · 2 meetings · 4 hours free
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

      {/* The task list stays quiet and collapsed underneath. */}
      <div className="mt-6 w-full max-w-md">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          className="flex w-full items-center justify-between rounded-xl px-2 py-2 text-sm text-content-secondary transition-colors hover:text-content-primary"
        >
          <span className="font-medium">
            {open ? 'Hide tasks' : 'View all tasks'}
            <span className="ml-2 text-content-muted">{tasks.length}</span>
          </span>
          <ChevronDown
            className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`}
            strokeWidth={2}
            aria-hidden
          />
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.ul
              key="task-list"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="mt-2 overflow-hidden"
            >
              <div className="flex flex-col divide-y divide-line-subtle rounded-xl border border-line-subtle">
                {tasks.map((task) => (
                  <li
                    key={task.title}
                    className="flex items-center justify-between gap-4 px-4 py-3"
                  >
                    <span className="text-sm text-content-secondary">
                      {task.title}
                    </span>
                    <span className="shrink-0 text-xs text-content-muted">
                      {task.meta}
                    </span>
                  </li>
                ))}
              </div>
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
