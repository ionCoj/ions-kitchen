# Code tour

How Ion's Kitchen works, file by file. Read it in this order; each section points to the functions worth opening.

Plain HTML, CSS and JavaScript. No framework, no build step, no libraries. You can open any file and it is exactly what the browser runs.

## The big picture

```
index.html          the one HTML page; loads the CSS and the 5 scripts below, in order
data/recipes.js     SECTIONS, TAGS and RECIPES: all content
js/storage.js       store.get / store.set: safe wrappers around localStorage
js/portions.js      Small/Medium/Large maths and number formatting
js/cooking.js       cooking-mode logic: saved state, step order, screen lock, speech, drag, timer link
js/app.js           builds every page as an HTML string and decides which page to show
css/styles.css      all the styling; dark theme first, light theme swaps colour variables
```

The scripts are classic `<script>` tags, not ES modules. Each file defines plain global functions and constants, and later files use earlier ones. That's why the order in `index.html` matters: `app.js` uses things from all the others, so it loads last. (Classic scripts also work when you open the file straight from disk, which modules don't.)

## 1. `index.html`

Very short. Three things to notice:

- `<div id="app">` is empty. JavaScript draws every page into it.
- A tiny inline script in `<head>` reads the saved theme before the page draws, so light-theme users never see a dark flash.
- `viewport-fit=cover` plus `env(safe-area-inset-*)` in the CSS keep things clear of the iPhone notch and home bar.

## 2. `data/recipes.js`

Pure data, no logic. `SECTIONS` is the 5 home tiles. `TAGS` is the ingredient tags. `RECIPES` is the list of dishes. The shape of a dish is explained in `ADDING-A-DISH.md`.

Design decision: **amounts live only in ingredients, never in step text.** That's what makes portion scaling safe: the code only has to change numbers in one place.

## 3. `js/storage.js`

`store.get(key, fallback)`, `store.set(key, value)`, `store.remove(key)`. They add the prefix `ionsKitchen.` to every key and JSON-encode values. Everything is inside `try/catch`, because Safari can throw on `localStorage` (private mode, storage full). If it fails the site still works; it just doesn't remember.

What gets saved:

- `ionsKitchen.theme` → `"dark"` or `"light"`
- `ionsKitchen.dish.<id>` → that dish's cooking state (see section 5)

## 4. `js/portions.js`

- `SIZES`: Small 0.75, Medium 1, Large 1.25.
- `scaleQty(item, factor)`: multiplies and rounds by unit. Grams/ml to 5, spoons to ½ (¼ under 1), counted things to whole numbers (or `item.round`).
- `formatQty(qty)`: 1.5 → "1½", 0.25 → "¼".
- `ingredientParts(item, factor)`: amount text, singular/plural name, note.
- `groupScales(dish, group)`: the batch rule. Normal dish: everything scales. Batch dish: nothing scales unless the group says `scale: "portion"`.
- `scaledNutrition(dish, factor)` and `batchPortionText(dish, factor)` ("⅕ of the tray (200 g raw chicken)").

Note the nutrition is scaled by the exact factor, while amounts are rounded. So Small shows exactly 75% of the kcal even if 2.25 eggs became 2. That's a deliberate simplification; the footer says the numbers are estimates.

## 5. `js/cooking.js`

**Saved state per dish.** `emptyDishState()` shows the shape:

```js
{
  portion: "M",                          // chosen size
  mode: "stove",                         // or "combi"
  cooking: false,                        // is cooking mode on
  ingTicks: ["0-1", "2-0"],              // ticked ingredients as "groupIndex-itemIndex"
  stepTicks: { stove: [0, 1], combi: [] },   // ticked steps, by ORIGINAL step number
  order: { stove: [2, 0, 1, ...], combi: null }, // custom order, or null = suggested
}
```

Steps are always identified by their **original index** in the recipe, not by where they are on screen. Reordering only changes `order`; ticks stay attached to the right step.

- `loadDishState` merges saved data over the empty shape, so old saved data never breaks the page.
- `finishCooking` returns a fresh state but keeps `portion` and `mode`.
- `stepOrder` uses the custom order only if it still has exactly the recipe's steps (if you edit a recipe, a stale order is ignored).
- `currentStepIndex` = first step in the order that isn't ticked. That's the "Now" card.

**Screen lock.** `keepScreenOn(true)` asks for `navigator.wakeLock.request("screen")`. iPhone releases the lock when you leave the app, so a `visibilitychange` listener asks again when you come back. The API only works on **https** pages (GitHub Pages is https; the local test over http isn't).

**Speech.** `speak(text)` uses the browser's built-in `speechSynthesis`. It's only called from the speaker button.

**Timer.** `timerUrl(minutes)` builds a `shortcuts://x-callback-url/run-shortcut?...` link. It runs your "Kitchen Timer" Shortcut with the minutes as input, and `x-success` sends iPhone back to the current recipe address afterwards.

**Drag.** `enableStepDrag(list, onDrop)` uses Pointer Events (one API for finger and mouse):

1. `pointerdown` on a `.drag-handle`: remember the step, add the `dragging` class, and `setPointerCapture` so moves keep coming even when the finger leaves the handle.
2. `pointermove`: find the first other step whose vertical middle is below the finger and `insertBefore` it. The DOM itself is the live preview. It also scrolls the page near the edges.
3. `pointerup`: read the new order from the DOM (`data-step` attributes) and call `onDrop`.

The CSS `touch-action: none` on the handle is what stops iPhone from scrolling the page instead of dragging.

## 6. `js/app.js`

**Routing.** The address after `#` picks the page: `#/section/dinner/chicken`, `#/dish/shakshuka`. `parseRoute()` splits it; `render()` calls the matching `renderX()` function and puts the result into `#app`. The `hashchange` event calls `render()` whenever the address changes. Hash routing needs no server setup, which is why it works on GitHub Pages.

**Pages are strings.** Each `renderX()` returns one big template string of HTML. Any text that comes from data goes through `esc()` first, so a `<` or `&` in a recipe can't break the HTML.

**Redraw everything.** When you tick something, the code doesn't edit the page piece by piece. It saves the new state and calls `render()` again for the whole page. Simple and hard to get out of sync. `render()` only scrolls to the top when the address changed, so a tick doesn't jump you to the top. (The search box is the exception: `updateSearch()` only replaces the results, so the keyboard stays open while you type.)

**One click listener.** Buttons don't have their own listeners. They carry `data-action="..."`, and one `click` listener on the whole document finds the nearest `[data-action]` and passes it to `handleAction()`. This works even for HTML created after the listener was added (this pattern is called event delegation).

**`updateDish(change)`** is the helper every dish action uses: load state, apply a change, save, redraw.

**`afterRender()`** runs after each draw: hooks up the search box, turns the screen lock on or off, adds body classes that make room for the bottom bars, and enables drag when cooking.

Functions worth reading in order: `parseRoute` → `render` → `renderHome` → `dishCard` → `renderDish` → `nowPanel` → `handleAction`.

## 7. `css/styles.css`

Split into numbered parts (tokens, base, shared, home, lists, dish, cooking, larger screens).

- **Tokens.** All colours are CSS variables on `:root` (dark). `:root[data-theme="light"]` redefines only those variables. Nothing else changes between themes.
- **Placeholder art** is layered `radial-gradient`s using `hsl(var(--hue) ...)`, where `--hue` comes from the section (set inline in the HTML). `dishHue()` in `app.js` shifts it a little per dish.
- **Mobile first.** Base styles are for the phone; `@media (min-width: 760px)` adds the wider layouts.
- Inputs are 17px, because iPhone zooms the page into any input under 16px.

## Things you could improve next (good practice)

1. Move to React, as planned: the `renderX()` functions map almost one-to-one to components, and `updateDish` becomes state.
2. Add tests for `portions.js`. It's pure functions, so it's the easiest file to test.
3. Make it installable (a web app manifest + icon) so it opens full-screen from the home screen.
