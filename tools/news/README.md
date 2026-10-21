# EARNED Miles — News carousel renderer
Usage (from this folder):
  npm install            # fonts (@fontsource); playwright is at /opt/npm-tools/node_modules/playwright
  PW=/opt/npm-tools/node_modules/playwright CHROME=/opt/pw-browsers/chromium-1194/chrome-linux/chrome node news.js spec.json outDir
Spec: see sample.json. Icons: names from assets/news (trophy, megaphone, podium, globe, flame, finish, laurel, newspaper) or assets/icons (shoe, shoe2, trailshoe, stopwatch, watch, medal, heart, runner, runneruphill, runnerback, hill, moon, bolt, target, calendar, bib, thermo, leg, knee, ankle, ...).
Output: 1.png..5.png at 1080x1350 (cover, 3 content slides, CTA). Slide order: cover, what happened, numbers, why it matters, sources.

Theming: spec fields accent, accentDeep, hue (hue-rotate deg from volt, target hue minus 72), kicker. See TASK.md CATEGORY COLOURS.
