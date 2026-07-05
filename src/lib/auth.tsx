import * as React from 'react'
import { Navigate, useLocation } from 'react-router-dom'

// Mocked, in-memory auth for a single hardcoded persona: Sam.
// Credentials: sam (or sam@q.app) / focus
const VALID_USERS = ['sam', 'sam@q.app']
const VALID_PASSWORD = 'focus'
const STORAGE_KEY = 'q.auth'

type AuthContextValue = {
  isAuthed: boolean
  user: { name: string; initial: string; email: string } | null
  login: (username: string, password: string) => boolean
  logout: () => void
}

const SAM = { name: 'Sam', initial: 'S', email: 'sam@q.app' }

const AuthContext = React.createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthed, setIsAuthed] = React.useState<boolean>(
    () => sessionStorage.getItem(STORAGE_KEY) === '1',
  )

  const login = React.useCallback((username: string, password: string) => {
    const ok =
      VALID_USERS.includes(username.trim().toLowerCase()) &&
      password === VALID_PASSWORD
    if (ok) {
      sessionStorage.setItem(STORAGE_KEY, '1')
      setIsAuthed(true)
    }
    return ok
  }, [])

  const logout = React.useCallback(() => {
    sessionStorage.removeItem(STORAGE_KEY)
    setIsAuthed(false)
  }, [])

  const value = React.useMemo(
    () => ({ isAuthed, user: isAuthed ? SAM : null, login, logout }),
    [isAuthed, login, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = React.useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const { isAuthed } = useAuth()
  const location = useLocation()
  if (!isAuthed) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }
  return <>{children}</>
}
