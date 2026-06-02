import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { Button } from '../components/ui/button'

export default function TaskCard() {
  return (
    <div className="flex min-h-[calc(100vh-3rem)] flex-col bg-surface-default">
      <header className="relative flex items-center justify-center px-6 py-5">
        <button
          type="button"
          className="absolute left-6 text-content-secondary transition-colors hover:text-content-primary"
          aria-label="Go back"
        >
          <ArrowLeft className="h-5 w-5" strokeWidth={2} />
        </button>
        <span className="text-sm text-content-secondary">Q</span>
      </header>

      <div className="flex flex-1 flex-col items-center justify-center px-6 pb-16">
        <motion.article
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', duration: 0.3 }}
          className="w-full max-w-md rounded-2xl bg-surface-raised p-6 shadow-lg"
        >
          <p className="mb-3 text-xs font-medium tracking-widest text-content-accent uppercase">
            HIGHEST IMPACT · DUE BY 3PM · FROM YOUR MANAGER
          </p>

          <h1 className="mb-2 text-3xl leading-tight font-bold text-content-primary">
            Review Q3 proposal draft
          </h1>

          <p className="mb-6 text-base leading-relaxed text-content-secondary">
            Sarah flagged this 2 hours ago. Client presentation is at 5pm today.
          </p>

          <div className="mb-6 flex flex-wrap gap-2">
            <span className="rounded-full bg-surface-elevated px-3 py-1 text-xs text-state-urgent">
              URGENT
            </span>
            <span className="rounded-full bg-surface-elevated px-3 py-1 text-xs text-content-accent">
              HIGH IMPACT
            </span>
          </div>

          <div className="flex gap-3">
            <Button variant="primary" className="flex-1">
              Start task
            </Button>
            <Button variant="secondary" className="flex-1 font-medium">
              View all tasks
            </Button>
          </div>
        </motion.article>

        <p className="mt-4 text-center text-xs text-content-muted">
          12 other tasks are waiting. They can.
        </p>
      </div>
    </div>
  )
}
