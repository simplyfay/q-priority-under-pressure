import * as React from 'react'

// Shared, in-memory task state for the whole flow.
//  - A QUEUE of tasks (not a single task). Completing one advances to the next;
//    only an empty queue reaches Clear.
//  - Each task carries: legible prioritization rationale (rules, not AI guesses),
//    optional prerequisites that gate completion, and the tools it needs.
//  - Progress reflects queue completion (completed ÷ queue length).
export type TaskTag = { label: string; tone: 'urgent' | 'accent' }

export type ToolId =
  | 'gmail'
  | 'slack'
  | 'excel'
  | 'docs'
  | 'calendar'
  | 'figma'
  | 'github'

export type Prereq = { id: string; label: string; done: boolean }

export type QueueTask = {
  id: string
  eyebrow: string
  title: string
  // Rationale phrased as legible criteria: unblocked + time-sensitive + leverage.
  rationale: string
  tags: TaskTag[]
  prerequisites: Prereq[]
  tools: ToolId[]
}

const URGENT: TaskTag = { label: 'URGENT', tone: 'urgent' }
const HIGH_IMPACT: TaskTag = { label: 'HIGH IMPACT', tone: 'accent' }
const WAITING: TaskTag = { label: 'WAITING ON YOU', tone: 'accent' }
const DUE_TODAY: TaskTag = { label: 'DUE TODAY', tone: 'accent' }

// The task Q swaps in when Reorient's "Switch" is taken.
const SWITCH_TASK_ID = 'sarah-reply'

const INITIAL_QUEUE: QueueTask[] = [
  {
    id: 'q3-review',
    eyebrow: 'UNBLOCKED · DUE 3PM · 3 DEPEND ON IT',
    title: 'Review Q3 proposal draft',
    rationale:
      "Q surfaced this because it's unblocked, due soonest (3pm), and three other tasks depend on it.",
    tags: [URGENT, HIGH_IMPACT],
    prerequisites: [
      { id: 'q3-p1', label: 'Read the latest comments thread', done: false },
      { id: 'q3-p2', label: 'Pull the updated budget numbers', done: false },
    ],
    tools: ['gmail', 'excel', 'docs'],
  },
  {
    id: SWITCH_TASK_ID,
    eyebrow: 'UNBLOCKED · TIME-SENSITIVE · UNBLOCKS 3',
    title: 'Reply to Sarah re: Q3 proposal',
    rationale:
      "Q surfaced this because it's unblocked, the most time-sensitive item right now, and a reply unblocks three people waiting on the proposal.",
    tags: [URGENT, WAITING],
    prerequisites: [],
    tools: ['gmail', 'slack'],
  },
  {
    id: 'standup-prep',
    eyebrow: 'UNBLOCKED · ON TODAY · 4 TEAMMATES WAIT',
    title: 'Prep for 2pm standup',
    rationale:
      "Q surfaced this because it's unblocked, on today's calendar, and four teammates depend on your update.",
    tags: [DUE_TODAY],
    prerequisites: [
      { id: 'sp-p1', label: 'Skim yesterday’s notes', done: false },
      { id: 'sp-p2', label: 'Check the sprint board', done: false },
      { id: 'sp-p3', label: 'Note your current blockers', done: false },
    ],
    tools: ['slack', 'calendar', 'docs'],
  },
  {
    id: 'mockups-approve',
    eyebrow: 'UNBLOCKED · WAITING 1H · UNBLOCKS 1',
    title: 'Approve design mockups',
    rationale:
      "Q surfaced this because it's unblocked, has been waiting on you for an hour, and one teammate is blocked until you sign off.",
    tags: [WAITING],
    prerequisites: [],
    tools: ['figma', 'slack'],
  },
]

type TaskContextValue = {
  activeTask: QueueTask
  queue: QueueTask[]
  currentIndex: number
  completed: number
  total: number
  progress: number // 0..1, queue completion
  isLastTask: boolean
  allPrereqsDone: boolean
  togglePrereq: (prereqId: string) => void
  completeTask: () => void
  switchTask: () => void
}

const TaskContext = React.createContext<TaskContextValue | null>(null)

// Deep clone the seed so per-session prereq toggles never mutate the module.
function seedQueue(): QueueTask[] {
  return INITIAL_QUEUE.map((t) => ({
    ...t,
    tags: t.tags.slice(),
    tools: t.tools.slice(),
    prerequisites: t.prerequisites.map((p) => ({ ...p })),
  }))
}

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [queue, setQueue] = React.useState<QueueTask[]>(seedQueue)
  const [currentIndex, setCurrentIndex] = React.useState(0)

  const total = queue.length
  const safeIndex = Math.min(currentIndex, total - 1)
  const activeTask = queue[safeIndex]
  const completed = Math.min(currentIndex, total)
  const isLastTask = currentIndex >= total - 1
  const allPrereqsDone = activeTask.prerequisites.every((p) => p.done)

  const togglePrereq = React.useCallback((prereqId: string) => {
    setQueue((q) =>
      q.map((t) => ({
        ...t,
        prerequisites: t.prerequisites.map((p) =>
          p.id === prereqId ? { ...p, done: !p.done } : p,
        ),
      })),
    )
  }, [])

  const completeTask = React.useCallback(() => {
    setCurrentIndex((i) => Math.min(i + 1, total))
  }, [total])

  // Reorient "Switch": bring the time-sensitive reply to the front of the
  // remaining queue so it surfaces next. No-op if it's already current/done.
  const switchTask = React.useCallback(() => {
    setQueue((q) => {
      const from = q.findIndex((t) => t.id === SWITCH_TASK_ID)
      if (from < 0 || from <= currentIndex) return q
      const copy = q.slice()
      const [task] = copy.splice(from, 1)
      copy.splice(currentIndex, 0, task)
      return copy
    })
  }, [currentIndex])

  const value = React.useMemo(
    () => ({
      activeTask,
      queue,
      currentIndex,
      completed,
      total,
      progress: total ? completed / total : 0,
      isLastTask,
      allPrereqsDone,
      togglePrereq,
      completeTask,
      switchTask,
    }),
    [
      activeTask,
      queue,
      currentIndex,
      completed,
      total,
      isLastTask,
      allPrereqsDone,
      togglePrereq,
      completeTask,
      switchTask,
    ],
  )

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>
}

export function useTasks() {
  const ctx = React.useContext(TaskContext)
  if (!ctx) throw new Error('useTasks must be used within TaskProvider')
  return ctx
}
