# 002 — Add restrained GSAP hero parallax

- **Status**: TODO
- **Commit**: 6ec55d0
- **Severity**: MEDIUM
- **Category**: Performance / missed opportunity
- **Estimated scope**: 2 files, small

## Problem

The hero card and decorative notes currently remain fixed while the user scrolls. The hero is the primary visual focal point, so a restrained depth relationship would explain the composition without changing layout. Current hero motion is CSS-only:

```css
/* src/styles.css:30-32 — current */
.card-stack{width:min(390px,86%);z-index:1;filter:drop-shadow(0 28px 35px #0009)}
.float-note{position:absolute;z-index:3;display:flex;align-items:center;gap:11px;padding:13px 16px;border:1px solid #ffffff18;background:#1a1b20dd;backdrop-filter:blur(14px);border-radius:10px;box-shadow:0 15px 35px #0006;color:#f4f5f0;min-width:190px}
```

## Target

Use GSAP ScrollTrigger to create a single scrubbed timeline scoped to `.hero`. As the hero scrolls from `top top` to `bottom top`:

- `.card-stack`: `yPercent: -10`, `rotate: -8`, `transformOrigin: '50% 50%'`;
- `.note-top`: `yPercent: -18`;
- `.note-bottom`: `yPercent: 12`;
- `.art-caption`: `yPercent: -8` and `opacity: 0.45`.

Use `scrub: 0.8`, `start: 'top top'`, `end: 'bottom top'`, and `invalidateOnRefresh: true`. Animate transforms and opacity only. Do not pin the hero.

## Repo conventions to follow

- Keep animation setup in `src/App.tsx` using `useLayoutEffect` and a `.app-shell` ref.
- Reuse the `gsap.matchMedia()` reduced-motion branch from plan 001.
- Existing `.card-stack` CSS uses `transform: rotate(-12deg)`; the GSAP animation must preserve that visual baseline by setting the initial rotation to `-12` before scrubbing.

## Steps

1. Add the hero selectors to the GSAP context created for `App`.
2. In the non-reduced-motion branch, create a `gsap.timeline` with `scrollTrigger` values `trigger: '.hero'`, `start: 'top top'`, `end: 'bottom top'`, `scrub: 0.8`, and `invalidateOnRefresh: true`.
3. Set `.card-stack` initial rotation to `-12` and tween it to `-8` with `yPercent: -10`; add the three decorative element tweens at the same progress with the exact target values above.
4. In reduced motion, clear the parallax transforms and restore `.art-caption` opacity to `1`.
5. Verify cleanup through the existing `gsap.context()` revert.

## Boundaries

- Do NOT pin the hero.
- Do NOT animate filters, shadows, dimensions, or layout properties.
- Do NOT change the card's hover animation.
- Do NOT add a continuous rAF loop.

## Verification

- **Mechanical**: run `npm run build`.
- **Feel check**: scroll slowly through the first viewport; the card should drift slightly slower than the page, while notes move at different depths. There must be no horizontal overflow or jump at the top.
- Toggle reduced motion and confirm the card keeps its static design and notes do not move.
- **Done when**: the hero has subtle depth, remains readable and interactive, and only compositor-friendly properties change.
