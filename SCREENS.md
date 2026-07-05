# Q — Screen & State Specification

Q is a focus/prioritization app. Premise: professionals lose time not because they can't work, but because they can't decide what to work on when cognitive load peaks. Q watches for that moment, intervenes, and surfaces ONE task instead of a list.

Four-state system: Detect -> Activate -> Focus -> Disrupt/Reorient, plus a resting Ambient home and a closing Clear state.

## The core flow
Login -> Ambient
Ambient -> (signals trip) -> Detect -> Activate -> Focus -> Clear
Detect "I'm fine, thanks" -> Ambient
Activate "View all tasks" -> Ambient
Focus "Exit focus mode" -> Ambient
Focus + disruption -> Reorient -> (Continue -> Focus) or (Switch -> Activate)
The spine is Ambient -> Detect -> Activate -> Focus. The user can always exit to Ambient. Never trapped.

## 1. AMBIENT (home / resting)
Function: the base. Leads with STATE — how many tasks, the shape of the day — with a small, de-emphasized task list underneath. This replaced a flat tat; the flat list reproduced the overwhelm, the ambient view does the first pass of sense-making for the user. Q runs quietly here, watching, doing nothing visible.
On screen: app nav (logo left; center = date, NOT a status pill — the pill only appears once Q engages; bell + avatar right); a state summary (task count, day shape); a small de-emphasized task list.
Relation: origin and fallback. Detect renders on top of Ambient (dimmed scrim). Activate replaces the summary with one task. Every active state returns here.
Key detail: no status pill at rest. Its absence is meaningful — its later appearance in Detect is itself the signal.

## 2. DETECT (intervention)
Function: Q has observed behavioural signals (rapid switching, idle time, interruptions) and offers help. It asks, does not auto-activate — the user decides. Gentle overlay, not a takeover.
On screen: Ambient behind, dimmed by a ~50% scrim; nav pill appears "Detecting" (amber); a small "Q has a suggestion" eyebrow above the card; a bright Detect heading "Things have shifted.", body with the specific signal (e.g. "You've switched tasks 4 times in 20 minutes. Want help deciding what matters right now?"), primary "Yes, help me focus" -> Activate, ghost "I'm fine, thanks" -> Ambient.
Relation: the hinge. Accept -> Activate. Decline -> Ambient.
Key detail: detection is automatic (no manual toggle). In the MVP the trigger can be mocked (timer or dev button).

## 3. ACTIVATE (one task surfaced)
Function: the thesis screen. Q recalculated and surfaced a SINGLE next task — not a list. GPS pattern: silent recalculation, one clear instruction. The pool is gone; one task with a reason remains.
On screen: nav pill "Suggesting" (blue); context line "Here's where to start."; Task Card (hero): status pill in card, rationale tags (e.g. Urgent, Blocks others), the one task large (e.g. "Reply to Sarah re: Q3 budget approval"), rationale line ("Q surfaced this from your context — it's the oldest unblocked item and three people are waiting on it before end of day."rimary "Start task" -> Focus, low-emphasis "View all tasks (11 others waiting)" -> Ambient.
Relation: payoff of Detect, direct contrast to Ambient. Start task -> Focus. View all -> Ambient (escape hatch).
Key detail: the rationale line is Q's stated AI position — the task is inferred from context. In MVP the surfaced task can be hardcoded or simple-rules (oldest unblocked + soonest deadline). If an AI call is desired, this is where a Claude API call ranks the list and returns the one task + rationale.

## 4. FOCUS (protected working state)
Function: user committed. Strip everything that helped them decide; keep only what helps them do. Notifications held and contained. The calmest screen — maximum whitespace.
On screen: nav pill "Focus active" (green); held-notifications pill where the bell was ("3 held - quiet"); Focus card (stripped): the one task centered, progress bar (green fill) + reinforcement label ("Halfway there. Keep going."), primary "Mark complete" -> Clear, low-emphasis "Exit focus mode" -bient.
Relation: follows Activate. Complete -> Clear. Exit -> Ambient. Disruption -> Reorient.
Key detail: whole screen speaks one color (green). Progress copy honest to the level.

## 5. DISRUPT / REORIENT (recalculate on interruption)
Function: a disruption arrives during Focus. Q auto-recalculates and asks: continue or switch? User always decides.
On screen: nav pill "Recalculating" (blue); current task dimmed (paused, not lost); an interruption panel: what arrived, Q's recommendation with reasoning, Continue -> Focus (original task), Switch -> Activate (new task).
Relation: branches off Focus; resolves to Focus or Activate.
Key detail: triggers automatically on interruption. Optional for MVP v1 — add after the core spine works.

## 6. CLEAR (resolution)
Function: task done / priorities handled. Calm, nearly empty — the opposite of a crowded list. From overwhelm to "you're clear."
On screen: nav pill "All clear" (gray); minimal confirmation ("Nice work — you're clear for now."), lots of whitespace;et way back to Ambient.
Relation: reached from Focus (Mark complete). Bookends Ambient — start busy, end calm.
Key detail: optional for MVP v1 — cheapest screen, nice closer.

## Status pill — the through-line
One component; state signals what Q is doing now.
Ambient: none (date shown). Detect: Detecting (amber). Activate: Suggesting (blue). Focus: Focus active (green). Reorient: Recalculating (blue). Clear: All clear (gray).
Color arc: amber (notices) -> blue (helps) -> green (works) -> gray (rests). Pill absent at rest so its appearance is the Detect signal.

## MVP scope
Functional in v1: all screens, the flow between them, existing components and tokens, the scrim overlay for Detect, mocked login as Sam.
Mocked in v1: detection trigger (timer or dev button, not real tracking); task prioritization (hardcoded or simple rules); notifications (static count); persistence/auth (in-memory).
Goal: a clickable front-end demonstrating overwhelm -> noticing -> one task -> protected focus -> clear.
