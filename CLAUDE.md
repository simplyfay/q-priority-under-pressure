# CLAUDE.md — Q (Priority Under Pressure) web app

## What this is
An existing Vite + React app (React Router), already deployed on Vercel. Most pages already exist. This is a **connect-and-polish** job, **not** a rebuild. The goal is a clickable, demo-ready web app for a UX portfolio.

## The prime directive (read first)
**Do not rebuild, redesign, or re-extract anything. Reuse what exists. Make minimal, surgical changes.**
Before writing any code, **list every existing page/route in the repo and your plan, then wait for confirmation.** Do not write code until the plan is approved.

## Hard constraints (these protect a limited budget — respect them)
- Do NOT read from or connect to any Figma file. All design is already in the repo. There is no external design source for this job.
- Do NOT rebuild existing pages or components. Reuse them as-is.
- Do NOT redefine the design tokens. They already exist in tokens/ and tailwind.config.js — use them.
- Do NOT add a backend, da, real auth, analytics, or any dependency not already present.
- Do NOT invent new page designs. If a page in the flow is missing, STOP and ask.
- Work in ONE focused pass where possible: audit -> plan -> (confirm) -> implement. Minimize round-trips.

## The persona
Single user, hardcoded: **Sam**.
- Avatar initial: **S**
- Login: username sam (or sam@q.app), password hardcoded (pick one, keep it simple). Mocked check only — no real auth backend.
- On successful login -> redirect to the **Ambient** (home) page.

## Theme
**Light-first.** The app defaults to the light theme on every page. Tokens already exist — use them; do not redefine.

## Pages — what to include and exclude

**EXCLUDE from the app flow (the ONLY exclusion):**
- design — the design-system page. Keep it in the repo, but do not link it into the app navigation or user flow.

(There is no landing/marketing page. Do not exclude or remove anything other than design.)

**INCLUDE and connect into the flow** (reuse existing pages):
- **Logimbient
- **Ambient (home)** — the resting state. Leads with STATE: how many tasks, the shape of the day, with a small, de-emphasized task list underneath. This intentionally replaced an older flat task list — the ambient framing is the design; do NOT turn it back into a plain list.
- **Detect** -> offered intervention (renders over Ambient, dimmed scrim behind)
- **Activate** -> one task surfaced
- **Focus** -> protected working state
- **Clear** -> resolution (if the page exists; if not, ask before creating)

Flow, with exits:
Login -> Ambient
Ambient -> Detect -> Activate -> Focus -> Clear
Every active state has an exit back to Ambient (user is never trapped).
Detect "I'm fine, thanks" -> back to Ambient
Activate "View all tasks" -> back to Ambient
Focus "Exit focus mode" -> back to Ambient

## Navigation bar
Add a persistent top nav to all app pages **except** the login page and the design page.
- **Logo (Q) left — generate it in code (do NOT read Figma): the capital letter Q, white, at a bold/heavht, in the app's own font family (the one set in tailwind.config.js / the token system, for visual consistency), centered on a dark near-black rounded-square tile, ~40-48px. Inline SVG or a styled div.
- **Status pill** center — reuse the existing Pill component. State depends on the page:
  - Ambient -> no pill, or a calm resting state (e.g. the date). The pill's appearance is itself the Detect signal.
  - Detect -> "Detecting" (amber)
  - Activate -> "Suggesting" (blue)
  - Focus -> "Focus active" (green)
  - Clear -> "All clear" (gray)
- **Right side:** notification bell + user avatar (avatar = "S" for Sam).

## Anything a real web app needs (add only if trivial and expected)
- A working logout (returns to login) from the avatar/menu.
- Sensible page titles / clean routing so URLs read well.
- Responsive layout that doesn't break on smaller screens.
- Nothing beyond this without asking.

## Deliverable
A clickable web app: log in as Sam -> move through Ambient -> Detect -> Activate -> Focus -> Clear, wh a consistent nav bar throughout, light theme, working exits. Demo-ready for a portfolio.

## Source of truth
This repo's existing code + this file (+ SCREENS.md) are the only sources. There is no Figma or external design source to read for this job.
