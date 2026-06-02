import { TaskCard } from '../components/test/TokenTest'

type PrimitiveColor = { name: string; hex: string }
type SemanticToken = { name: string; hex: string; usage: string }
type TypeSize = { token: string; tailwindClass: string; valuePx: number }
type SpacingValue = { token: string; valuePx: number }

const sectionLabelClass =
  'text-content-accent tracking-widest text-sm uppercase font-medium'

const primitiveFamilies: Array<{ label: string; tokens: PrimitiveColor[] }> = [
  {
    label: 'Grays',
    tokens: [
      { name: 'black', hex: '#000000' },
      { name: 'gray-950', hex: '#0A0A0A' },
      { name: 'gray-900', hex: '#111111' },
      { name: 'gray-800', hex: '#1A1A1A' },
      { name: 'gray-700', hex: '#2A2A2A' },
      { name: 'gray-600', hex: '#3A3A3A' },
      { name: 'gray-500', hex: '#6B6B6B' },
      { name: 'gray-400', hex: '#BCBBC0' },
      { name: 'gray-300', hex: '#D4D4D4' },
      { name: 'gray-200', hex: '#E8E8E8' },
      { name: 'gray-100', hex: '#F4F4F4' },
      { name: 'gray-50', hex: '#FAFAFA' },
      { name: 'white', hex: '#FFFFFF' },
    ],
  },
  {
    label: 'Navy',
    tokens: [
      { name: 'navy-900', hex: '#1D3557' },
      { name: 'navy-700', hex: '#2E4F7A' },
    ],
  },
  {
    label: 'Slate',
    tokens: [
      { name: 'slate-500', hex: '#457B9D' },
      { name: 'slate-300', hex: '#A8C4D8' },
    ],
  },
  {
    label: 'Green',
    tokens: [
      { name: 'green-600', hex: '#2A7A4B' },
      { name: 'green-100', hex: '#E6F4EC' },
    ],
  },
  {
    label: 'Amber',
    tokens: [
      { name: 'amber-700', hex: '#7A3B1E' },
      { name: 'amber-100', hex: '#FDF6EC' },
    ],
  },
]

const semanticTokens: SemanticToken[] = [
  // Surface
  { name: 'surface-default', hex: '#000000', usage: 'Base app background' },
  { name: 'surface-subtle', hex: '#0A0A0A', usage: 'Subtle panels and depth' },
  { name: 'surface-raised', hex: '#1A1A1A', usage: 'Cards and raised blocks' },
  {
    name: 'surface-elevated',
    hex: '#2A2A2A',
    usage: 'High-elevation surfaces',
  },
  { name: 'surface-overlay', hex: '#3A3A3A', usage: 'Overlays and modal backdrops' },

  // Content
  { name: 'content-primary', hex: '#FFFFFF', usage: 'Primary text on dark surfaces' },
  { name: 'content-secondary', hex: '#BCBBC0', usage: 'Secondary text and labels' },
  { name: 'content-muted', hex: '#6B6B6B', usage: 'Support text and captions' },
  { name: 'content-inverse', hex: '#000000', usage: 'Text/icons on light accents' },
  { name: 'content-accent', hex: '#A8C4D8', usage: 'Highlights and emphasized text' },

  // Line
  { name: 'line-default', hex: '#2A2A2A', usage: 'Primary dividers and borders' },
  { name: 'line-subtle', hex: '#1A1A1A', usage: 'Soft dividers and separators' },
  { name: 'line-strong', hex: '#3A3A3A', usage: 'Strong outlines and focus accents' },

  // Action
  { name: 'action-primary', hex: '#457B9D', usage: 'Primary button background' },
  {
    name: 'action-primary-hover',
    hex: '#A8C4D8',
    usage: 'Primary button hover/active',
  },
  { name: 'action-primary-text', hex: '#FFFFFF', usage: 'Text on action-primary' },
  { name: 'action-secondary', hex: '#2A2A2A', usage: 'Secondary button background' },
  {
    name: 'action-secondary-hover',
    hex: '#3A3A3A',
    usage: 'Secondary button hover/active',
  },
  { name: 'action-secondary-text', hex: '#D4D4D4', usage: 'Text on action-secondary' },
  { name: 'action-destructive', hex: '#7A3B1E', usage: 'Destructive actions (danger)' },

  // State
  { name: 'state-urgent', hex: '#457B9D', usage: 'Urgent badges and status' },
  { name: 'state-moderate', hex: '#BCBBC0', usage: 'Moderate/neutral status' },
  { name: 'state-low', hex: '#3A3A3A', usage: 'Low-priority or muted status' },
  { name: 'state-success', hex: '#2A7A4B', usage: 'Success states and confirmations' },
  { name: 'state-focus', hex: '#1D3557', usage: 'Focus indicators and keyboard navigation' },

  // Ambient
  { name: 'ambient-calm', hex: '#1A1A1A', usage: 'Calm background accents' },
  { name: 'ambient-building', hex: '#2E4F7A', usage: 'Structural ambient accents' },
  { name: 'ambient-heavy', hex: '#1D3557', usage: 'High-importance ambient accents' },
]

const typeSizes: TypeSize[] = [
  { token: 'xs', tailwindClass: 'text-xs', valuePx: 11 },
  { token: 'sm', tailwindClass: 'text-sm', valuePx: 12 },
  { token: 'base', tailwindClass: 'text-base', valuePx: 14 },
  { token: 'md', tailwindClass: 'text-md', valuePx: 15 },
  { token: 'lg', tailwindClass: 'text-lg', valuePx: 16 },
  { token: 'xl', tailwindClass: 'text-xl', valuePx: 18 },
  { token: '2xl', tailwindClass: 'text-2xl', valuePx: 20 },
  { token: '3xl', tailwindClass: 'text-3xl', valuePx: 24 },
  { token: '4xl', tailwindClass: 'text-4xl', valuePx: 28 },
  { token: '5xl', tailwindClass: 'text-5xl', valuePx: 32 },
]

const weights: Array<{ name: string; tailwindClass: string }> = [
  { name: 'Light (300)', tailwindClass: 'font-light' },
  { name: 'Regular (400)', tailwindClass: 'font-normal' },
  { name: 'Medium (500)', tailwindClass: 'font-medium' },
  { name: 'SemiBold (600)', tailwindClass: 'font-semibold' },
  { name: 'Bold (700)', tailwindClass: 'font-bold' },
]

const spacingValues: SpacingValue[] = [
  { token: 'space-1', valuePx: 4 },
  { token: 'space-2', valuePx: 8 },
  { token: 'space-3', valuePx: 12 },
  { token: 'space-4', valuePx: 16 },
  { token: 'space-5', valuePx: 20 },
  { token: 'space-6', valuePx: 24 },
  { token: 'space-8', valuePx: 32 },
  { token: 'space-10', valuePx: 40 },
  { token: 'space-12', valuePx: 48 },
  { token: 'space-16', valuePx: 64 },
  { token: 'space-20', valuePx: 80 },
  { token: 'space-24', valuePx: 96 },
]

function SwatchCircle({ hex }: { hex: string }) {
  return (
    <div
      className="w-8 h-8 rounded-full border border-line-subtle"
      style={{ backgroundColor: hex }}
      aria-label={`Swatch color ${hex}`}
      role="img"
    />
  )
}

function PrimitiveSwatch({ tokenName, hex }: { tokenName: string; hex: string }) {
  return (
    <div className="flex flex-col items-start gap-1">
      <div
        className="w-16 h-16 rounded-lg border border-line-subtle"
        style={{ backgroundColor: hex }}
        aria-label={`Primitive swatch ${tokenName}`}
        role="img"
      />
      <div className="text-content-muted text-xs font-medium">{hex}</div>
      <div className="text-content-secondary text-xs">{tokenName}</div>
    </div>
  )
}

export default function DesignSystem() {
  return (
    <div className="min-h-screen bg-surface-default font-sans text-content-primary">
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6 flex flex-col items-center text-center">
          <h1 className="text-content-primary text-5xl font-bold tracking-tight leading-tight">
            Q
          </h1>
          <p className="text-content-secondary text-xl font-medium leading-snug mt-3">
            Design System
          </p>
          <hr className="border-t border-line-default w-full mt-8" />
        </div>
      </section>

      {/* 2. COLOR PRIMITIVES */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <p className={sectionLabelClass}>PRIMITIVES</p>

          <div className="mt-10 flex flex-col gap-14">
            {primitiveFamilies.map((family) => (
              <div key={family.label}>
                <div className="text-content-muted text-xs font-medium mb-6">
                  {family.label}
                </div>
                <div className="flex flex-wrap gap-x-10 gap-y-10">
                  {family.tokens.map((t) => (
                    <PrimitiveSwatch
                      key={t.name}
                      tokenName={t.name}
                      hex={t.hex}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. SEMANTIC COLORS */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <p className={sectionLabelClass}>SEMANTIC TOKENS</p>

          <div className="mt-10 overflow-x-auto">
            <table className="w-full border border-line-subtle rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-surface-raised">
                  <th className="px-6 py-4 text-left text-xs text-content-muted tracking-widest uppercase">
                    Token name
                  </th>
                  <th className="px-6 py-4 text-left text-xs text-content-muted tracking-widest uppercase">
                    Swatch
                  </th>
                  <th className="px-6 py-4 text-left text-xs text-content-muted tracking-widest uppercase">
                    Hex value
                  </th>
                  <th className="px-6 py-4 text-left text-xs text-content-muted tracking-widest uppercase">
                    Usage
                  </th>
                </tr>
              </thead>
              <tbody>
                {semanticTokens.map((t) => (
                  <tr key={t.name} className="border-t border-line-subtle">
                    <td className="px-6 py-4 text-sm text-content-secondary font-medium">
                      {t.name}
                    </td>
                    <td className="px-6 py-4">
                      <SwatchCircle hex={t.hex} />
                    </td>
                    <td className="px-6 py-4 text-sm text-content-muted font-medium">
                      {t.hex}
                    </td>
                    <td className="px-6 py-4 text-sm text-content-secondary">
                      {t.usage}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 4. TYPOGRAPHY */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <p className={sectionLabelClass}>TYPOGRAPHY</p>

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {typeSizes.map((s) => (
                  <div
                    key={s.token}
                    className="border border-line-subtle rounded-xl p-6 bg-surface-raised"
                  >
                    <div className={s.tailwindClass + ' text-content-primary'}>
                      The quick brown fox
                    </div>
                    <div className="text-content-muted text-xs mt-4">
                      {`text-${s.token}`} · {s.valuePx}px
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="text-content-muted text-xs tracking-widest uppercase font-medium mb-4">
                Weights
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {weights.map((w) => (
                  <div
                    key={w.name}
                    className="border border-line-subtle rounded-xl p-5 bg-surface-raised"
                  >
                    <div className={`text-2xl ${w.tailwindClass} text-content-primary`}>
                      Priority Under Pressure
                    </div>
                    <div className="text-content-muted text-xs mt-3">{w.name}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. SPACING */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <p className={sectionLabelClass}>SPACING</p>

          <div className="mt-10 grid grid-cols-1 gap-6">
            {spacingValues.map((s) => (
              <div key={s.token} className="flex items-center gap-4">
                <div
                  className="h-2 rounded-md bg-action-primary"
                  style={{ width: `${s.valuePx}px` }}
                  aria-label={`Spacing ${s.token} ${s.valuePx}px`}
                  role="img"
                />
                <div className="text-content-muted text-xs font-medium">
                  {s.token} · {s.valuePx}px
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. COMPONENT SAMPLES */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <p className={sectionLabelClass}>COMPONENTS</p>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            {/* Task card */}
            <div className="w-full max-w-sm justify-self-center">
              <TaskCard />
            </div>

            {/* Buttons */}
            <div className="w-full max-w-sm mx-auto flex flex-col gap-4">
              <button
                className="
                  bg-action-primary text-action-primary-text
                  rounded-full
                  px-6 py-3
                  text-base font-semibold
                  transition-colors duration-150
                  hover:bg-action-primary-hover
                "
              >
                Start task
              </button>

              <button
                className="
                  bg-action-secondary text-action-secondary-text
                  rounded-full
                  px-6 py-3
                  text-base font-medium
                  transition-colors duration-150
                  hover:bg-action-secondary-hover
                "
              >
                View all tasks
              </button>
            </div>

            {/* Badge / tag */}
            <div className="w-full max-w-sm mx-auto flex flex-col items-center gap-4">
              <div className="border border-line-subtle rounded-xl bg-surface-raised px-6 py-8 w-full flex justify-center">
                <span className="inline-flex items-center justify-center rounded-full bg-state-urgent px-4 py-2 text-xs font-semibold text-content-primary">
                  URGENT
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

