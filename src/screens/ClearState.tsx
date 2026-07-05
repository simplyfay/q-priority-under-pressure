import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button'

export default function ClearState() {
  const navigate = useNavigate()
  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] items-center justify-center bg-surface-default px-6">
      <div className="max-w-md text-center">
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-4xl font-bold tracking-tight text-content-primary"
        >
          You&apos;re clear.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.3 }}
          className="mt-3 text-xl font-medium text-content-secondary"
        >
          Nothing needs you right now.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.6 }}
          className="mt-12 text-sm text-content-muted"
        >
          Q will let you know when that changes.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.9 }}
          className="mt-10 flex justify-center"
        >
          <Button variant="secondary" onClick={() => navigate('/ambient')}>
            Back to Ambient
          </Button>
        </motion.div>
      </div>
    </div>
  )
}
