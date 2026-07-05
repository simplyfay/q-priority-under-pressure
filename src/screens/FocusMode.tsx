import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button'

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: 'easeOut' as const, delay },
})

// The calm working surface — one task, progress, reinforcement. Reused
// (dimmed) as the paused backdrop in Reorient, so it holds no actions itself.
export function FocusModeBackground() {
  return (
    <div className="flex h-full min-h-[calc(100vh-3.5rem)] flex-col items-center justify-center bg-surface-default px-6 pb-24">
      <motion.h1
        {...fadeUp(0)}
        className="max-w-sm text-center text-4xl font-bold tracking-tight text-content-primary"
      >
        Review Q3 proposal draft
      </motion.h1>

      <motion.div {...fadeUp(0.15)} className="mt-6 w-48">
        <div className="h-[3px] overflow-hidden rounded-full bg-surface-elevated">
          <div className="h-full w-1/2 rounded-full bg-state-success" />
        </div>
        <p className="mt-2 text-center text-xs text-content-muted">
          Halfway there. Keep going.
        </p>
      </motion.div>
    </div>
  )
}

export default function FocusMode() {
  const navigate = useNavigate()
  return (
    <div className="relative">
      <FocusModeBackground />

      <motion.div
        {...fadeUp(0.4)}
        className="fixed inset-x-0 bottom-0 flex flex-col items-center gap-3 px-6 pb-10"
      >
        <Button
          variant="primary"
          size="lg"
          className="max-w-sm"
          onClick={() => navigate('/clear')}
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
