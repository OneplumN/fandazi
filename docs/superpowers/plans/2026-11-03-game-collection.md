# 搭子小馆 Implementation Plan

> Execute inline, task by task, in the user-requested order. Existing design and game concepts have been approved; complete implementation, verification and deployment without an additional approval gate.

**Goal:** Ship BBQ, milk tea, hotpot and breakfast games alongside the existing malatang game, with working mobile and desktop controls.

**Architecture:** Reuse the current React runtime and Food/Avatar renderer through props. Add a hash-based collection router with independent game components, pure rule functions and shared result/clock controls. Deploy a new immutable static release by switching the existing current symlink, retaining rollback.

**Tech Stack:** Existing React, native SVG, CSS, Node assert tests, Playwright/skill game client.

**Spec:** User-approved game concepts in this chat; dark brown outlined illustrated foods, warm cream palette, no additional frameworks, touch and keyboard controls, preserved original game.

## Tasks

- [x] BBQ: pure rules and tests for both sides, burn/raw states, seasoning, budget and final score; selectable skewers, start/pause/flip/serve/reset UI; deterministic clock and SVG grill. Files: `src/games/rules.js`, `src/games/bbq.js`, shared `common.js`, `tests/games.test.mjs`.
- [x] Milk tea: tea/milk/sugar/ice/toppings state, fixed guest requests, price/capacity, mixing and score feedback; custom layered cup art. Files: `milk-tea.js`, rules/tests.
- [x] Hotpot: broth selection, ingredient-specific cook ranges, capacity, ingredient selection/removal/scoring, pause/resume/finish/reset. Files: `hotpot.js`, rules/tests.
- [x] Breakfast: three customer orders per shift, wrap/egg/fillings/sauce, timed griddle and folded presentation, accuracy/freshness scoring, next-order/end-shift and replay. Files: `breakfast.js`, rules/tests.
- [x] Collection: 5 live game entries, shared responsive shell, in-game rules, persistent bests, navigation confirmation during a run, browser history and accessibility. Files: `hub.js`, `common.js`, `art.js`, `public/assets/games.css`, root app adapter.
- [x] Verify: pure rules, each game action lifecycle via the skill client and Playwright, 320/375/390/430/tablet/desktop + landscape bounds, clocks/visibility/limits/reset/keyboard/reload, original malatang regression, inspect screenshots.
- [x] Deploy: build static release, checksum uploaded files, atomic switch, validate HTTPS with public server and all 5 games, preserve previous release, update docs and downloadable package.

No repository initialization, commits, new services, paid providers or database changes are needed.
