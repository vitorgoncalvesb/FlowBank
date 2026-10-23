# 003 — Make waitlist illustration viewport-aware

- **Status**: TODO
- **Commit**: 6ec55d0
- **Severity**: LOW
- **Category**: Accessibility / performance
- **Estimated scope**: 2 files, small

## Problem

The waitlist illustration runs a perpetual CSS animation regardless of whether it is visible:

```css
/* src/styles.css:14 — current */
.waitlist-visual img{animation:flow-float 5s ease-in-out infinite;will-change:transform}
```

This is decorative motion and should not consume animation work while the section is offscreen. The existing reduced-motion rule disables it, but normal users still pay for a continuous animation throughout the page lifetime.

## Target

Move the illustration's floating motion to GSAP. Create a paused timeline for `.waitlist-visual img` with:

- `y: -7`, then `y: 7`, then back to `y: -7`;
- `rotation: 0.25`, then `rotation: -0.25`, then back to `0.25`;
- duration `2.5` seconds per half-cycle;
- `ease: 'sine.inOut'`;
- `repeat: -1`;
- `yoyo: true`;
- `ScrollTrigger` `onEnter` plays and `onLeave` pauses, with `onEnterBack` play and `onLeaveBack` pause.

The image must have no CSS animation or `will-change` declaration after implementation.

## Repo conventions to follow

- Use the same `useLayoutEffect`, `gsap.context()`, and `gsap.matchMedia()` setup as plans 001 and 002.
- Existing reduced-motion handling is in `src/styles.css:16`; keep it for other animations but remove only the waitlist image animation declarations.
- Animate transform only, matching the existing `flow-float` visual range.

## Steps

1. Remove `animation:flow-float 5s ease-in-out infinite` and `will-change:transform` from `.waitlist-visual img`.
2. Add a GSAP timeline for `.waitlist-visual img` with `repeat: -1`, `yoyo: true`, `duration: 2.5`, and `ease: 'sine.inOut'`.
3. Attach a ScrollTrigger with `trigger: '.waitlist'`, `start: 'top bottom'`, `end: 'bottom top'`, and lifecycle callbacks that pause outside the viewport and play inside it.
4. In reduced motion, do not create the timeline and explicitly restore `y: 0`, `rotation: 0`, and `clearProps: 'transform'`.
5. Keep the `opacity` and responsive sizing rules unchanged.

## Boundaries

- Do NOT animate the waitlist form, input, or button in this plan.
- Do NOT add blur, scale, or layout animation.
- Do NOT use a requestAnimationFrame loop.
- Do NOT remove unrelated reduced-motion rules.

## Verification

- **Mechanical**: run `npm run build`.
- **Feel check**: scroll to the waitlist and observe a calm, subtle float. Scroll away and confirm the illustration stops; return and confirm it resumes without a jump.
- Toggle reduced motion and confirm the illustration is static.
- In DevTools Performance, confirm no perpetual animation work continues while the waitlist is outside the viewport.
- **Done when**: decorative motion is visible only when useful, disabled for reduced motion, and the image has no CSS animation or `will-change`.
