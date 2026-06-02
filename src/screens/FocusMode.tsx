import { motion } from 'framer-motion'
import { Lock } from 'lucide-react'

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: 'easeOut' as const, delay },
})

export function FocusModeBackground() {
  return (
    <div className="flex h-full min-h-[calc(100vh-3rem)] flex-col bg-surface-default">
      <div className="flex items-center justify-end px-6 pt-6">
        <div className="flex items-center gap-1.5 text-content-muted">
          <Lock className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
          <span className="text-xs">4 notifications held</span>
        </div>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center px-6 pb-24">
        <motion.h1
          {...fadeUp(0)}
          className="max-w-sm text-center text-4xl font-bold tracking-tight text-content-primary"
        >
          Review Q3 proposal draft
        </motion.h1>

        <motion.div {...fadeUp(0.15)} className="mt-6 w-48">
          <div className="h-[3px] overflow-hidden rounded-full bg-surface-elevated">
            <div className="h-full w-1/3 rounded-full bg-state-success" />
          </div>
          <p className="mt-2 text-center text-xs text-content-muted">
            33% complete
          </p>
        </motion.div>

        <motion.p
          {...fadeUp(0.3)}
          className="mt-8 text-center text-sm font-medium tracking-wide text-content-secondary"
        >
          Great progress. Keep going.
        </motion.p>
      </div>

      <motion.button
        {...fadeUp(0.45)}
        type="button"
        className="pb-10 text-center text-xs text-content-muted underline"
      >
        Exit focus mode
      </motion.button>
    </div>
  )
}

export default function FocusMode() {
  return <FocusModeBackground />
}
