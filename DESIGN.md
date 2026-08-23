# Portfolio Design Direction

## Goal

Build a memorable student developer portfolio that presents learning projects as clear evidence of curiosity, implementation ability, and technical growth.

## Reference

The interaction direction is informed by the open-source portfolio at:

- Live site: <https://qwqovoewe.github.io/-portfolio/>
- Repository: <https://github.com/qwqovoewe/-portfolio>

The implementation studies the reference's public animation architecture and independently reimplements the ideas: offscreen text sampling, particle assembly and dissolve, pointer repulsion, click ripples, subtle code flow, 3D project cards, scroll reveals, and theme switching. The reference repository does not currently include a license, so its component code is not copied into this project.

## Visual System

- Dark-first near-black canvas with warm white text.
- Lavender, lime, and coral accents give each skill area and project a distinct signal.
- No project imagery is required. Hierarchy comes from typography, spacing, borders, and motion.
- Geist is used for interface and Chinese copy; JetBrains Mono is used for technical labels.
- Corners stay restrained at 3-6px to keep the page sharp and developer-focused.

## Page Rhythm

1. Hero: name, rotating technical roles, introduction, current focus, and interactive node field.
2. Selected work: one featured project followed by two supporting project cards.
3. Capability map: backend, AI application, and engineering practice.
4. Learning journey: honest student-stage growth instead of fabricated work history.
5. Contact: a large, direct closing invitation.

## Interaction

- Canvas points drift, connect, and respond gently to the pointer.
- Atropos provides low-amplitude 3D tilt on project cards.
- Intersection Observer reveals sections as they enter the viewport.
- Theme and navigation controls remain keyboard accessible.
- Motion is disabled when `prefers-reduced-motion` is enabled.

## Content Source

All editable content remains centralized in `src/data/portfolio.ts`. Replace the placeholder name, links, contact details, and the two unfinished project entries there.
