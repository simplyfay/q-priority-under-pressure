# /polish-screens

Polish existing screens for portfolio quality and desktop sizing.

## What to check and fix on every screen

### Layout
- Cards must be max-w-lg or max-w-xl — not max-w-sm or max-w-md
- Page padding: px-8 py-12 minimum
- Vertical centering: use min-h-screen with flex items-center
- Navigation bar height: h-14, not h-12

### Typography
- Heading hierarchy must be aggressive: 
  primary content at text-3xl or larger
  secondary content at text-base or text-lg
  labels and metadata at text-xs or text-sm
- Never use text-xl as a primary heading on desktop

### Spacing
- Card internal padding: p-8 minimum
- Gap between card elements: gap-4 or gap-6
- Button padding: px-8 py-4 for primary, px-6 py-3 for secondary

### Buttons
- Primary buttons: full contrast, rounded-full, font-semibold
- Secondary buttons: visibly different from primary but still clear
- Never style two buttons idtically

### Animations
- All Framer Motion transitions: use spring where possible
- Fade in duration: 0.4s to 0.8s depending on screen weight
- No layout shift on mount — use opacity and transform only

### What not to add
- No clock or time displays at top of browser viewport
- No decorative elements that compete with content
- No more than one primary action per screen
- No placeholder text — every string should be real Q copy

## Output
Updated screen files
Screenshot instructions for portfolio
