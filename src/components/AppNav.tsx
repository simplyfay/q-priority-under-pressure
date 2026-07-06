import * as React from 'react'
import { Bell, Lock } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Pill, type PillStatus } from './ui/Pill'
import { useAuth } from '../lib/auth'
import { cn } from '../lib/utils'

// How long Ambient rests before Q surfaces the Detect intervention on its own
// (mocked trigger). The user never has to click the pill.
const DETECT_DELAY_MS = 3000

// Q auto-surfaces Detect once per session so returning to Ambient afterwards
// stays a genuine resting state (never traps the user in a detect loop).
let autoDetectFired = false

// Notifications Q holds quietly while it watches (static, mocked).
const HELD_NOTIFICATIONS = [
  { from: 'Sarah', subject: 'Q3 proposal' },
  { from: 'Slack', subject: '#product-launch' },
  { from: 'Calendar', subject: '2pm standup' },
]

const ROUTE_PILL: Record<string, PillStatus> = {
  '/detect': 'detecting',
  '/activate': 'suggesting',
  '/focus': 'focus',
  '/recalculating': 'recalculating',
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
  const [notifOpen, setNotifOpen] = React.useState(false)
  const menuRef = React.useRef<HTMLDivElement>(null)
  const notifRef = React.useRef<HTMLDivElement>(null)

  const path = location.pathname
  const isAmbient = path === '/ambient'
  const isFocus = path === '/focus'

  // On Ambient, Q rests quietly, then surfaces the Detecting signal in the nav
  // and auto-opens the Detect intervention — no click required.
  React.useEffect(() => {
    setDetecting(false)
    if (!isAmbient || autoDetectFired) return
    const showPill = window.setTimeout(() => setDetecting(true), DETECT_DELAY_MS)
    const surface = window.setTimeout(() => {
      autoDetectFired = true
      navigate('/detect')
    }, DETECT_DELAY_MS + 600)
    return () => {
      window.clearTimeout(showPill)
      window.clearTimeout(surface)
    }
  }, [isAmbient, path, navigate])

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

  // Close the notifications popover on outside click.
  React.useEffect(() => {
    if (!notifOpen) return
    const onDown = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false)
      }
    }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [notifOpen])

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

      {/* Right: held-notifications (Focus) or bell popover, plus avatar + menu */}
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
          <div className="relative" ref={notifRef}>
            <button
              type="button"
              onClick={() => setNotifOpen((o) => !o)}
              className="relative -m-1.5 rounded-full p-1.5 text-content-muted transition-colors hover:text-content-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-state-focus"
              aria-haspopup="menu"
              aria-expanded={notifOpen}
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5" strokeWidth={2} />
              <span className="absolute right-0 top-0 h-2 w-2 rounded-full bg-action-primary" />
            </button>

            {notifOpen && (
              <div
                role="menu"
                className="absolute right-0 top-11 w-60 overflow-hidden rounded-xl border border-line-default bg-surface-default shadow-lg"
              >
                <div className="border-b border-line-subtle px-4 py-3">
                  <p className="text-sm font-medium text-content-primary">
                    Notifications
                  </p>
                  <p className="text-xs text-content-muted">
                    {HELD_NOTIFICATIONS.length} held while you focus
                  </p>
                </div>
                <ul>
                  {HELD_NOTIFICATIONS.map((n) => (
                    <li
                      key={`${n.from}-${n.subject}`}
                      className="flex items-baseline gap-1.5 px-4 py-3 text-sm"
                    >
                      <span className="font-medium text-content-primary">
                        {n.from}
                      </span>
                      <span className="text-content-muted">—</span>
                      <span className="truncate text-content-secondary">
                        {n.subject}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
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
