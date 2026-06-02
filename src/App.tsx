import {
  BrowserRouter,
  NavLink,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom'
import DesignSystem from './screens/DesignSystem'
import AmbientView from './screens/AmbientView'
import DetectOffer from './screens/DetectOffer'
import TaskCard from './screens/TaskCard'
import FocusMode from './screens/FocusMode'
import ReorientPrompt from './screens/ReorientPrompt'
import ClearState from './screens/ClearState'

const links = [
  { to: '/', label: 'Design', end: true },
  { to: '/ambient', label: 'Ambient' },
  { to: '/detect', label: 'Detect' },
  { to: '/task', label: 'Task' },
  { to: '/focus', label: 'Focus' },
  { to: '/reorient', label: 'Reorient' },
  { to: '/clear', label: 'Clear' },
]

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-surface-default font-sans">
        <nav className="fixed top-0 z-50 flex h-12 w-full items-center justify-between border-b border-line-default bg-surface-elevated px-6">
          <span className="font-bold text-content-primary">Q</span>
          <div className="flex flex-wrap items-center justify-end gap-x-4 gap-y-1">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  `text-sm transition-colors ${
                    isActive
                      ? 'text-content-primary'
                      : 'text-content-secondary hover:text-content-primary'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </nav>

        <main className="pt-12">
          <Routes>
            <Route path="/" element={<DesignSystem />} />
            <Route path="/ambient" element={<AmbientView />} />
            <Route path="/detect" element={<DetectOffer />} />
            <Route path="/task" element={<TaskCard />} />
            <Route path="/focus" element={<FocusMode />} />
            <Route path="/reorient" element={<ReorientPrompt />} />
            <Route path="/clear" element={<ClearState />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
