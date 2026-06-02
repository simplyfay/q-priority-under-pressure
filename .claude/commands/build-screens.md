# /build-screens

Build portfolio-quality screen components using the Q design system.

## Prerequisites
- tokens/variables.css must exist
- tailwind.config.js must have semantic token names
- CLAUDE.md token conventions must be followed

## Rules
- No hardcoded hex values anywhere in component code
- Use only semantic Tailwind class names from CLAUDE.md
- Use shadcn/ui components where appropriate
- Use Framer Motion for all transitions
- Every screen must be full viewport height
- Cards for desktop: max-w-lg minimum, max-w-xl preferred
- Generous padding: p-8 minimum on cards, px-8 on page layouts
- Typography: size contrast must be aggressive between hierarchy levels

## Design principles
Follow all principles in CLAUDE.md exactly.
The confident ally register governs every screen.

## Output
One .tsx file per screen in src/screens/
Update App.tsx router with new routes
Confirm npm run build succeeds
