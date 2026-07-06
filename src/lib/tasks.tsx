import * as React from 'react'

// Shared, in-memory task state so the flow is honest across screens:
//  - which single task Q has surfaced (Activate/Focus), and whether Reorient
//    swapped it for the new priority
//  - real completion progress (starts at 0, climbs as tasks are marked done)
export type TaskTag = { label: string; tone: 'urgent' | 'accent' }

export type ActiveTask = {
  eyebrow: string
  title: string
  rationale: string
  tags: TaskTag[]
}

// The task Q surfaces on the normal Detect -> Activate path.
const DEFAULT_TASK: ActiveTask = {
  eyebrow: 'HIGHEST IMPACT · DUE BY 3PM · FROM YOUR MANAGER',
  title: 'Review Q3 proposal draft',
  rationale:
    "Q surfaced this from your context — it's the oldest unblocked item and three people are waiting on it before end of day.",
  tags: [
    { label: 'URGENT', tone: 'urgent' },
    { label: 'HIGH IMPACT', tone: 'accent' },
  ],
}

// The new priority Q surfaces when Reorient's "Switch" is taken.
const SWITCHED_TASK: ActiveTask = {
  eyebrow: 'NEW · FROM SARAH · TIME-SENSITIVE',
  title: 'Reply to Sarah re: Q3 proposal',
  rationale:
    'Sarah asked to move the deadline to 6pm. A quick reply keeps the proposal on track and unblocks the three people waiting on it.',
  tags: [
    { label: 'URGENT', tone: 'urgent' },
    { label: 'WAITING ON YOU', tone: 'accent' },
  ],
}

export const TOTAL_TASKS = 12

type TaskContextValue = {
  activeTask: ActiveTask
  switchTask: () => void
  resetTask: () => void
  completed: number
  total: number
  progress: number // 0..1
  completeTask: () => void
}

const TaskContext = React.createContext<TaskContextValue | null>(null)

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [activeTask, setActiveTask] = React.useState<ActiveTask>(DEFAULT_TASK)
  const [completed, setCompleted] = React.useState(0)

  const switchTask = React.useCallback(() => setActiveTask(SWITCHED_TASK), [])
  const resetTask = React.useCallback(() => setActiveTask(DEFAULT_TASK), [])
  const completeTask = React.useCallback(
    () => setCompleted((c) => Math.min(c + 1, TOTAL_TASKS)),
    [],
  )

  const value = React.useMemo(
    () => ({
      activeTask,
      switchTask,
      resetTask,
      completed,
      total: TOTAL_TASKS,
      progress: completed / TOTAL_TASKS,
      completeTask,
    }),
    [activeTask, completed, switchTask, resetTask, completeTask],
  )

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>
}

export function useTasks() {
  const ctx = React.useContext(TaskContext)
  if (!ctx) throw new Error('useTasks must be used within TaskProvider')
  return ctx
}
