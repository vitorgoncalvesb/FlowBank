# 001 — Replace section reveals with GSAP ScrollTrigger

- **Status**: TODO
- **Commit**: 6ec55d0
- **Severity**: MEDIUM
- **Category**: Performance / compatibility
- **Estimated scope**: 3 files, small-to-medium

## Problem

Section entrance motion currently depends on experimental CSS scroll-driven animation support:

```css
/* src/styles.css:15 — current */
@supports (animation-timeline:view()){.product,.features,.platforms,.proof{animation:flow-reveal linear both;animation-timeline:view();animation-range:entry 0% cover 28%}}@keyframes flow-reveal{from{opacity:0;transform:translate3d(0,18px,0) scale(.98)}to{opacity:1;transform:translate3d(0,0,0) scale(1)}}
```

This produces no equivalent reveal in browsers without `animation-timeline`, and the CSS animation cannot be centrally cleaned up when React remounts or the locale changes. The page already has a motion system in `src/styles.css:9-16`, but no GSAP integration.

## Target

Add GSAP and ScrollTrigger. In `src/App.tsx`, create a `useLayoutEffect` scoped with `gsap.context()` that targets `.product`, `.features`, `.platforms`, and `.proof`. Each section starts at `opacity: 0`, `y: 18`, `scale: 0.98` and animates to `opacity: 1`, `y: 0`, `scale: 1` with:

- duration: `0.72` seconds;
- ease: `power3.out`;
- `start: 'top 82%'`;
- `once: true`;
- no layout-property animation.

Use `gsap.matchMedia()` and make the reduced-motion branch set `opacity: 1`, `y: 0`, and `scale: 1` without creating ScrollTriggers. Remove the `@supports (animation-timeline:view())` rule and `@keyframes flow-reveal` from `src/styles.css` so GSAP is the single owner of these animations.

## Repo conventions to follow

- React entry is `src/main.tsx`; the page component is `src/App.tsx`.
- Existing motion is kept in the final motion section of `src/styles.css` and uses transform/opacity only.
- Existing reduced-motion handling uses `@media (prefers-reduced-motion:reduce)` in `src/styles.css:16`.
- The page uses functional React components and TypeScript; use `useLayoutEffect`, not a separate animation component.

## Steps

1. In `package.json`, add `gsap` to `dependencies` without removing existing packages.
2. In `src/App.tsx`, import `useLayoutEffect` from React and import `gsap` plus `ScrollTrigger` from GSAP; register the plugin once at module scope with `gsap.registerPlugin(ScrollTrigger)`.
3. Add a `useLayoutEffect` inside `App` after the localized state is available. Wrap all selectors and triggers in `gsap.context(() => { ... }, root)` where `root` is a ref attached to `.app-shell`.
4. Inside the context, use `gsap.matchMedia()` with `(prefers-reduced-motion: reduce)` and its inverse. Reduced motion must immediately set the four section selectors to visible/resting values. Normal motion must call `gsap.fromTo()` for each section with the exact target values above and a `scrollTrigger` object using `start: 'top 82%'`, `once: true`, and `invalidateOnRefresh: true`.
5. Return a cleanup function that calls `context.revert()`; ensure the match-media cleanup is included by the context cleanup.
6. Remove only the CSS scroll-timeline declaration and `flow-reveal` keyframes. Keep the existing hero and waitlist CSS animations for plan 002/003.

## Boundaries

- Do NOT animate width, height, margin, padding, top, left, or filter.
- Do NOT add smooth-scroll libraries.
- Do NOT remove the existing `prefers-reduced-motion` rules for unrelated animations.
- Do NOT change section markup or copy.
- If the current CSS motion block differs from the cited excerpt, stop and report instead of improvising.

## Verification

- **Mechanical**: run `npm run build`; expected result is a successful TypeScript check and Vite build.
- **Feel check**: open the page, scroll slowly from the hero through Product, Features, Platforms, and Security. Each section should enter once near 82% viewport height, move upward only 18px, and settle without layout shift.
- In DevTools, set playback to 10% and confirm only opacity/transform are changing.
- Toggle `prefers-reduced-motion` and confirm all four sections are immediately visible with no movement.
- Resize the viewport and confirm `ScrollTrigger.refresh()` through `invalidateOnRefresh` does not create duplicate reveals.
- **Done when**: no `animation-timeline` dependency remains, all four sections reveal consistently in supported browsers, and build passes.
