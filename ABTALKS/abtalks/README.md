# ABTalks — Redesign

A mobile-first (390px) redesign of ABTalks' 60-day coding challenge product.
Static site — vanilla HTML/CSS/JS, no build step, no dependencies beyond
Google Fonts. Data is mocked from `/assets/data.json`.

## Route map

```
/
/dashboard
/day/12
```

These map directly to files, so any static host serves them with clean URLs:

```
/index.html          → /
/dashboard/index.html → /dashboard
/day/12/index.html    → /day/12
```

## Run locally

```
cd abtalks
python3 -m http.server 8000
# open http://localhost:8000/
```

## Deploy (pick one, ~60 seconds)

**Vercel / Netlify (drag-and-drop):** go to vercel.com/new or app.netlify.com/drop
and drag the `abtalks` folder in. No config needed — both auto-detect a
static site and preserve the folder-based routes above.

**GitHub Pages:** push this folder to a repo, enable Pages on the `main`
branch / root, done.

## Design approach

**Concept:** a hostel-room code editor at 1am. Dark, terminal-flavored UI
(Space Grotesk for display type, Inter for body, JetBrains Mono for
data/stats) with an ember-orange accent standing in for "streak fire"
against a near-black background, plus a cool mint accent for
verified/success states.

**Signature element:** the *commit strip* — a row of 60 cells, one per
challenge day. It's introduced on the landing page as the core mechanic,
then reused literally on the dashboard (full 60-day strip) and implicitly
on the day page (the cell being filled right now). Same visual language
end to end.

**The one thoughtful addition — Ember shields.** Missing a day used to
just break your streak, which is discouraging enough that some students
quit rather than restart. Every 5-day streak now earns one "ember shield"
that auto-covers exactly one missed day, keeping the streak alive. It's
explained on the landing page, shown as a mint-colored cell in the commit
strip, and referenced on the day page when relevant. This turns "I missed
a day" from a failure state into a designed-for outcome.

## Edge cases handled

- **First day, no streak:** `assets/data.json` → if a student has zero
  completed days, the dashboard shows an empty-streak notice instead of a
  "0" that reads like a failure, and the badges panel shows "no badges
  yet" copy instead of a wall of greyed-out chips.
- **A missed day:** modeled as `"status": "missed"` (streak-breaking) vs.
  `"status": "missed-saved"` (covered by an Ember shield) in the day
  array — the commit strip renders these as distinct colors, and the day
  page surfaces a banner explaining what happened.
- **Empty profile / zero badges:** the badges section on the dashboard
  swaps to explanatory copy ("your first badge is one commit away") when
  `badges.filter(earned)` is empty, rather than rendering an empty grid.

To see these states directly, edit `assets/data.json` — set
`student.currentDay` to `1` with an empty `days` array for the "brand new
student" state, or add a plain `"missed"` entry to see the broken-streak
color in the strip.

## Files

```
abtalks/
├── index.html            /
├── dashboard/index.html  /dashboard
├── day/12/index.html     /day/12
├── assets/
│   ├── style.css         design tokens + shared styles
│   ├── app.js            data loading, commit-strip renderer, toast
│   └── data.json         mocked student + challenge data
└── README.md
```
