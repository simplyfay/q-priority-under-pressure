import * as React from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useTasks } from '../lib/tasks'

// Brief transition between finishing one task and surfacing the next:
// "Recalculating… here's what's next." Auto-advances to Activate.
export default function Recalculating() {
  const navigate = useNavigate()
  const { activeTask } = useTasks()

  React.useEffect(() => {
    const t = window.setTimeout(
      () => navigate('/activate', { replace: true }),
      1600,
    )
    return () => window.clearTimeout(t)
  }, [navigate])

  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] flex-col items-center justify-center bg-surface-default px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="flex flex-col items-center"
      >
        <span className="mb-5 h-2.5 w-2.5 animate-pulse rounded-full bg-action-primary" />
        <h1 className="text-2xl font-semibold text-content-primary">
          Recalculating…
        </h1>
        <p className="mt-2 text-sm text-content-secondary">
          Here&apos;s what&apos;s next.
        </p>
        <p className="mt-6 text-base font-medium text-content-primary">
          {activeTask.title}
        </p>
      </motion.div>
    </div>
  )
}
