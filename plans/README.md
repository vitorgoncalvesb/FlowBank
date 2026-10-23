# Animation plans

| # | Title | Severity | Status |
|---|---|---|---|
| 001 | Replace section reveals with GSAP ScrollTrigger | MEDIUM | TODO |
| 002 | Add restrained GSAP hero parallax | MEDIUM | TODO |
| 003 | Make waitlist illustration viewport-aware | LOW | TODO |

## Recommended execution order

1. **001** — establishes the GSAP dependency, scoped context, ScrollTrigger registration, and reduced-motion foundation.
2. **002** — adds the hero parallax using the shared GSAP setup from 001.
3. **003** — converts the continuous waitlist illustration animation to viewport-aware motion.

Plans 002 and 003 depend on the setup introduced by plan 001. Execute 001 first, then 002 and 003 in either order.
