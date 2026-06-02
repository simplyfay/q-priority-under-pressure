import { motion } from 'framer-motion'

export default function ClearState() {
  return (
    <div className="flex min-h-[calc(100vh-3rem)] items-center justify-center bg-surface-default px-6">
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
      </div>
    </div>
  )
}
