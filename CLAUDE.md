# Q — Priority Under Pressure
## Project Context for Claude Code

### What this project is
Q is an AI-powered triage tool for overwhelmed knowledge workers.
It surfaces one clear next action at the moment of cognitive overload.
This is a UX portfolio case study and functional MVP.

### Design system
- Framework: React + Vite + TypeScript
- Styling: Tailwind CSS v3 with semantic tokens
- Components: shadcn/ui
- Animation: Framer Motion
- Font: Inter (Google Fonts)

### Token conventions
Never use hardcoded hex values in components.
Always use semantic Tailwind class names:
- Backgrounds: bg-surface-default, bg-surface-raised, 
  bg-surface-elevated, bg-ambient-calm, bg-ambient-building, 
  bg-ambient-heavy
- Text: text-content-primary, text-content-secondary, 
  text-content-muted, text-content-accent
- Borders: border-line-default, border-line-subtle
- Actions: bg-action-primary, bg-action-secondary
- States: text-staturgent, text-state-success, bg-state-focus

### Design principles
1. Confident ally — calm, direct, never alarming
2. One task at a time — never show a list when one item will do
3. Why before what — rationale appears before the task
4. Quiet by default — ambient mode is passive, triage is activated
5. No gamification — no streaks, gems, points, or celebrations

### Emotional register
The product should feel like a trusted colleague who has already 
assessed the situation. Not a drill sergeant. Not a cheerleader. 
A calm, competent person handing you one clear next step.

### Screen inventory
- /ambient → AmbientView.tsx (passive daily view)
- /detect → DetectOffer.tsx (overload detected, offer to help)
- /task → TaskCard.tsx (one task surfaced with rationale)
- /focus → FocusMode.tsx (working, everything else hidden)
- /reorient → ReorientPrompt.tsx (interruption, binary choice)
- /clear → ClearState.tsx (noth

mkdir -p "/Users/fay/Q - Priority under pressure/Q Design System/.claude/commands"
cat > "/Users/fay/Q - Priority under pressure/Q Design System/.claude/commands/extract-tokens.md" << 'EOF'
# /extract-tokens

Extract a design system from reference screenshots or a live URL.

## Input
Reference images should be in /reference/ folder.
Or provide a live URL as an argument.

## Process
1. Analyze all reference images for:
   - Background colors (page, surface, elevated, overlay)
   - Text colors (primary, secondary, muted, accent)
   - Border colors
   - Action/button colors (primary, secondary, destructive)
   - Typography: font family, sizes used, weights used
   - Spacing rhythm: identify the base unit (4px or 8px)
   - Border radius patterns
   - Shadow styles

2. For every value you are uncertain about, add "ESTIMATED: true"
   Do not guess font names — write "VERIFY" if uncertain

3. Output a single file: tokens/raw.json
   Structure:
   {
     "source": "url or screenshot filenames",
     "extracted_at": "timestamp",
     "primitive": { "color": {}, "typography": {}, 
                  "spacing": {}, "radius": {}, "shadow": {} },
     "notes": "anything the designer should manually verify"
   }

## Output
- tokens/raw.json
- A summary of what was extracted and what needs verification
