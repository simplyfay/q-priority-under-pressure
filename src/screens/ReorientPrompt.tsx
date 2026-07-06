import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { FocusModeBackground } from './FocusMode'
import { useTasks } from '../lib/tasks'

export default function ReorientPrompt() {
  const navigate = useNavigate()
  const { switchTask } = useTasks()

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
          <p className="text-base font-semibold text-content-primary">
            New message from Sarah
          </p>
          <p className="mt-1 text-sm text-content-secondary">
            Re: Q3 proposal — can we push to 6pm?
          </p>
          <p className="mt-3 mb-6 text-xs text-content-accent">
            Q has recalculated. Your current task is still the priority.
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
            onClick={() => {
              switchTask()
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
