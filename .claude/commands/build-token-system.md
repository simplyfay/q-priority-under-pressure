# /build-token-system

Convert raw.json into a complete semantic token system.

## Input
tokens/raw.json must exist from /extract-tokens

## Process
1. Read tokens/raw.json
2. Build three-layer architecture:
   - Primitive: raw values (colors, sizes, weights)
   - Semantic: named by purpose (surface, content, action, state)
   - Component: specific to UI patterns (card, button, badge)

3. Generate these files:
   - tokens/variables.css (CSS custom properties, :root scope)
   - tokens/design-tokens.json (full structured token system)
   - tailwind.config.js (semantic colors mapped to CSS variables)
   - tokens/conventions.md (human-readable reference table)

4. Run a contrast audit on all text/background combinations
   Flag any combination below WCAG AA (4.5:1 for normal text)

5. Semantic naming conventions:
   Backgrounds: surface-default, surface-subtle, surface-raised,
                surface-elevated, surface-overlay
   Text: content-primary, content-secondary, content-muted, 
         content-accent, content-inverse
   Borders: line-default, line-subtle, line-strong
   Actions: action-primary, action-secondary, action-destructive
   States: state-urgent, state-moderate, state-low, 
           state-success, state-focus
   Ambient: ambient-calm, ambient-building, ambient-heavy

## Output
- tokens/variables.css
- tokens/design-tokens.json
- tailwind.config.js
- tokens/conventions.md
- Contrast audit summary
