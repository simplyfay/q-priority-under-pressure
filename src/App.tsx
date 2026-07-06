import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom'
import AppNav from './components/AppNav'
import { AuthProvider, RequireAuth } from './lib/auth'
import { TaskProvider } from './lib/tasks'
import Login from './screens/Login'
import DesignSystem from './screens/DesignSystem'
import AmbientView from './screens/AmbientView'
import DetectOffer from './screens/DetectOffer'
import TaskCard from './screens/TaskCard'
import FocusMode from './screens/FocusMode'
import ReorientPrompt from './screens/ReorientPrompt'
import Recalculating from './screens/Recalculating'
import ClearState from './screens/ClearState'

// Layout for every in-flow app page: persistent top nav + routed screen.
function AppLayout() {
  return (
    <div className="min-h-screen bg-surface-default font-sans text-content-primary">
      <AppNav />
      <main className="pt-14">
        <Outlet />
      </main>
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <BrowserRouter>
          <Routes>
            {/* Login — no nav */}
            <Route path="/login" element={<Login />} />

            {/* Design system — kept in the repo but unlinked from the flow */}
            <Route path="/design" element={<DesignSystem />} />

            {/* The app flow — guarded, wrapped in the persistent nav */}
            <Route
              element={
                <RequireAuth>
                  <AppLayout />
                </RequireAuth>
              }
            >
              <Route path="/ambient" element={<AmbientView />} />
              <Route path="/detect" element={<DetectOffer />} />
              <Route path="/activate" element={<TaskCard />} />
              <Route path="/focus" element={<FocusMode />} />
              <Route path="/recalculating" element={<Recalculating />} />
              <Route path="/reorient" element={<ReorientPrompt />} />
              <Route path="/clear" element={<ClearState />} />
            </Route>

            <Route path="/" element={<Navigate to="/ambient" replace />} />
            <Route path="*" element={<Navigate to="/ambient" replace />} />
          </Routes>
        </BrowserRouter>
      </TaskProvider>
    </AuthProvider>
  )
}

export default App
