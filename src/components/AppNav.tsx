import * as React from 'react'
import { Bell, Lock } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Pill, type PillStatus } from './ui/Pill'
import { useAuth } from '../lib/auth'
import { cn } from '../lib/utils'

// How long Ambient rests before Q surfaces the Detect signal (mocked trigger).
const DETECT_DELAY_MS = 6000

const ROUTE_PILL: Record<string, PillStatus> = {
  '/detect': 'detecting',
  '/activate': 'suggesting',
  '/focus': 'focus',
  '/reorient': 'recalculating',
  '/clear': 'clear',
}

function todayLabel() {
  return new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  })
}

function QLogo() {
  return (
    <div
      className="flex h-10 w-10 select-none items-center justify-center rounded-xl bg-[var(--color-gray-900)] font-sans text-lg font-bold leading-none text-white"
      aria-hidden
    >
      Q
    </div>
  )
}

export default function AppNav() {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const [detecting, setDetecting] = React.useState(false)
  const [menuOpen, setMenuOpen] = React.useState(false)
  const menuRef = React.useRef<HTMLDivElement>(null)

  const path = location.pathname
  const isAmbient = path === '/ambient'
  const isFocus = path === '/focus'

  // On Ambient, Q rests quietly, then surfaces the Detecting signal. Its
  // appearance in the nav IS the Detect cue.
  React.useEffect(() => {
    setDetecting(false)
    if (!isAmbient) return
    const t = window.setTimeout(() => setDetecting(true), DETECT_DELAY_MS)
    return () => window.clearTimeout(t)
  }, [isAmbient, path])

  // Close the avatar menu on outside click.
  React.useEffect(() => {
    if (!menuOpen) return
    const onDown = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [menuOpen])

  const routeStatus = ROUTE_PILL[path]

  let center: React.ReactNode = null
  if (isAmbient) {
    center = detecting ? (
      <Pill status="detecting" pulse onClick={() => navigate('/detect')} />
    ) : (
      <span className="text-sm text-content-muted">{todayLabel()}</span>
    )
  } else if (routeStatus) {
    center = <Pill status={routeStatus} pulse={routeStatus !== 'clear'} />
  }

  return (
    <nav className="fixed inset-x-0 top-0 z-50 flex h-14 items-center justify-between border-b border-line-subtle bg-surface-default px-4 sm:px-6">
      {/* Left: code-generated Q logo, home affordance */}
      <button
        type="button"
        onClick={() => navigate('/ambient')}
        className="rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-state-focus"
        aria-label="Go to Ambient home"
      >
        <QLogo />
      </button>

      {/* Center: the status pill (or resting date) */}
      <div className="pointer-events-none absolute left-1/2 -translate-x-1/2">
        <div className="pointer-events-auto">{center}</div>
      </div>

      {/* Right: held-notifications (Focus) or bell, plus avatar + menu */}
      <div className="flex items-center gap-3">
        {isFocus ? (
          <button
            type="button"
            onClick={() => navigate('/reorient')}
            className="flex items-center gap-1.5 rounded-full bg-surface-subtle px-3 py-1 text-xs text-content-muted transition-colors hover:text-content-secondary"
            aria-label="3 notifications held — view interruption"
          >
            <Lock className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
            3 held · quiet
          </button>
        ) : (
          <button
            type="button"
            className="relative -m-1.5 rounded-full p-1.5 text-content-muted transition-colors hover:text-content-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-state-focus"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" strokeWidth={2} />
            <span className="absolute right-0 top-0 h-2 w-2 rounded-full bg-action-primary" />
          </button>
        )}

        <div className="relative" ref={menuRef}>
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-surface-elevated text-sm font-semibold text-content-primary transition-colors hover:bg-surface-overlay focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-state-focus"
            aria-haspopup="menu"
            aria-expanded={menuOpen}
            aria-label="Account menu"
          >
            {user?.initial ?? 'S'}
          </button>

          {menuOpen && (
            <div
              role="menu"
              className={cn(
                'absolute right-0 top-11 w-44 overflow-hidden rounded-xl border border-line-default bg-surface-default shadow-lg',
              )}
            >
              <div className="border-b border-line-subtle px-4 py-3">
                <p className="text-sm font-medium text-content-primary">
                  {user?.name ?? 'Sam'}
                </p>
                <p className="text-xs text-content-muted">
                  {user?.email ?? 'sam@q.app'}
                </p>
              </div>
              <button
                type="button"
                role="menuitem"
                onClick={() => {
                  setMenuOpen(false)
                  logout()
                  navigate('/login', { replace: true })
                }}
                className="w-full px-4 py-3 text-left text-sm text-content-secondary transition-colors hover:bg-surface-subtle hover:text-content-primary"
              >
                Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
