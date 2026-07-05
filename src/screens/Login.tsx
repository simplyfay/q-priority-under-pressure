import * as React from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { useAuth } from '../lib/auth'

export default function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [username, setUsername] = React.useState('sam@q.app')
  const [password, setPassword] = React.useState('focus')
  const [error, setError] = React.useState(false)

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (login(username, password)) {
      navigate('/ambient', { replace: true })
    } else {
      setError(true)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface-default px-6">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="w-full max-w-sm"
      >
        <div className="mb-8 flex flex-col items-center text-center">
          <div
            className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--color-gray-900)] font-sans text-2xl font-bold text-white"
            aria-hidden
          >
            Q
          </div>
          <h1 className="text-2xl font-semibold text-content-primary">
            Welcome back
          </h1>
          <p className="mt-2 text-sm text-content-secondary">
            Sign in to find your focus.
          </p>
        </div>

        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-content-secondary">
              Username or email
            </span>
            <input
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value)
                setError(false)
              }}
              autoComplete="username"
              className="rounded-xl border border-line-default bg-surface-subtle px-4 py-3 text-base text-content-primary outline-none transition-colors focus:border-action-primary"
            />
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-content-secondary">
              Password
            </span>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                setError(false)
              }}
              autoComplete="current-password"
              className="rounded-xl border border-line-default bg-surface-subtle px-4 py-3 text-base text-content-primary outline-none transition-colors focus:border-action-primary"
            />
          </label>

          {error && (
            <p className="text-sm text-action-destructive">
              Incorrect credentials. Try sam / focus.
            </p>
          )}

          <Button type="submit" size="lg" className="mt-2">
            Sign in
          </Button>
        </form>

        <p className="mt-6 text-center text-xs text-content-muted">
          Demo · sam@q.app · password <span className="font-medium">focus</span>
        </p>
      </motion.div>
    </div>
  )
}
