/* =====================================================================
   js/app.js — builds every page and decides which page to show.

   The site is one HTML page. The part of the address after "#" says
   which page to draw (this is called hash routing):
     #/                       home
     #/section/dinner         a section
     #/section/dinner/chicken a section filtered by a tag
     #/tag/chicken            every dish with a tag
     #/dish/shakshuka         one dish
   When the address changes, render() draws the matching page.
   ===================================================================== */

/* ================= Small helpers ================= */

/** Escape text before putting it in HTML, so a "<" in a recipe can't break the page. */
function esc(text) {
  const map = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
  return String(text ?? "").replace(/[&<>"']/g, (char) => map[char]);
}

function findDish(id) { return RECIPES.find((dish) => dish.id === id); }
function findSection(id) { return SECTIONS.find((section) => section.id === id); }

/** The tags that at least one of `dishes` uses, in the order they are listed in TAGS. */
function tagsUsedBy(dishes) {
  return Object.keys(TAGS).filter((tag) => dishes.some((dish) => dish.tags.includes(tag)));
}

/**
 * Colour hue of a dish's placeholder art: the hue of its first section,
 * shifted a little (up to ±20) based on the dish id, so cards in the same
 * section don't all look identical. The same dish always gets the same shift.
 */
function dishHue(dish) {
  const section = findSection(dish.sections[0]);
  const base = section ? section.hue : 30;
  let sum = 0;
  for (const char of dish.id) sum += char.charCodeAt(0);
  return base + (sum % 41) - 20;
}

/** "55 min" or "1 h 10 min". */
function formatTime(minutes) {
  if (minutes < 60) return minutes + " min";
  const rest = minutes % 60;
  return Math.floor(minutes / 60) + " h" + (rest ? " " + rest + " min" : "");
}

/* ================= Theme (dark is the main design) ================= */

function currentTheme() {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

function toggleTheme() {
  const next = currentTheme() === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = next;
  store.set("theme", next);
  document.querySelector('meta[name="theme-color"]').content = next === "dark" ? "#14110e" : "#faf6ef";
  render();
}

/** Moon icon in dark mode, sun icon in light mode. */
function themeIcon() {
  if (currentTheme() === "dark") {
    return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>';
  }
  return '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4.5"/><path d="M12 1.5v2.5M12 20v2.5M4.6 4.6l1.8 1.8M17.6 17.6l1.8 1.8M1.5 12h2.5M20 12h2.5M4.6 19.4l1.8-1.8M17.6 6.4l1.8-1.8"/></svg>';
}

function themeButton() {
  const label = currentTheme() === "dark" ? "Switch to light theme" : "Switch to dark theme";
  return `<button class="icon-btn" data-action="toggle-theme" aria-label="${label}">${themeIcon()}</button>`;
}

/* ================= Shared page parts ================= */

/** Top bar for every page except home. */
function topBar(backHref, backLabel) {
  return `
    <header class="topbar">
      <a class="back-link" href="${backHref}">‹ ${esc(backLabel)}</a>
      <a class="topbar-brand" href="#/">Ion's Kitchen</a>
      ${themeButton()}
    </header>`;
}

function footer() {
  return `
    <footer class="footer">
      <p>Nutrition values are estimates from typical labels. Check your own products.</p>
      <p>Ion's Kitchen</p>
    </footer>`;
}

/** Placeholder art used until a real photo exists. The photo, if found, covers it. */
function dishArt(dish, big) {
  // The dish's own emoji if it has one, else its first tag's emoji.
  const emoji = dish.emoji || (dish.tags.length ? TAGS[dish.tags[0]].emoji : "🍽️");
  return `
    <div class="art ${big ? "art-big" : ""}" style="--hue:${dishHue(dish)}">
      <span class="art-emoji" aria-hidden="true">${emoji}</span>
      <img src="${esc(dish.photo)}" alt="${esc(dish.name)}" loading="lazy" onerror="this.remove()">
    </div>`;
}

/** One dish card: picture, name, time and nutrition. */
function dishCard(dish) {
  const n = dish.nutrition;
  return `
    <a class="card" href="#/dish/${dish.id}">
      ${dishArt(dish, false)}
      <div class="card-body">
        <h3 class="card-title">${esc(dish.name)}</h3>
        <p class="card-time">${formatTime(dish.time)}${dish.extraTime ? " + fridge" : ""}</p>
        <p class="card-macros"><b>${n.kcal}</b> kcal · ${n.protein}P · ${n.carbs}C · ${n.fat}F</p>
      </div>
    </a>`;
}

function cardGrid(dishes) {
  if (!dishes.length) return `<p class="empty">No dishes here yet.</p>`;
  return `<div class="card-grid">${dishes.map(dishCard).join("")}</div>`;
}

/** Row of round tag buttons. `hrefFor(tag)` builds each link; `activeTag` is highlighted. */
function tagRow(tags, hrefFor, activeTag) {
  return tags.map((tag) => `
    <a class="tag ${tag === activeTag ? "is-active" : ""}" href="${hrefFor(tag)}">
      <span class="tag-circle" aria-hidden="true">${TAGS[tag].emoji}</span>
      <span class="tag-label">${esc(TAGS[tag].label)}</span>
    </a>`).join("");
}

/* ================= Home page ================= */

function renderHome() {
  const tiles = SECTIONS.map((section) => `
    <a class="tile" href="#/section/${section.id}" style="--hue:${section.hue}">
      <span class="tile-art"><span class="tile-emoji" aria-hidden="true">${section.emoji}</span></span>
      <span class="tile-label">${esc(section.label)}</span>
    </a>`).join("");

  return `
    <div class="page">
      <header class="hero">
        <div class="hero-row">
          <h1 class="brand">Ion's Kitchen</h1>
          ${themeButton()}
        </div>
        <p class="tagline">High-protein food that tastes <span class="script">like home.</span></p>
      </header>

      <label class="search">
        <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/></svg>
        <input id="search-input" type="search" placeholder="Search dishes or ingredients" autocomplete="off" aria-label="Search dishes or ingredients">
      </label>

      <div id="search-results"></div>

      <div id="home-browse">
        <nav class="tiles" aria-label="Sections">${tiles}</nav>

        <h2 class="eyebrow">Browse by ingredient</h2>
        <nav class="tag-row" aria-label="Ingredient tags">
          ${tagRow(tagsUsedBy(RECIPES), (tag) => "#/tag/" + tag, null)}
        </nav>
      </div>
      ${footer()}
    </div>`;
}

/** Does a dish match the search text? Looks at the name, tags and ingredient names. */
function matchesSearch(dish, query) {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  const haystack = [
    dish.name,
    ...dish.tags.map((tag) => TAGS[tag].label),
    ...dish.ingredients.flatMap((group) => group.items.map((item) => item.name + " " + (item.plural || ""))),
    ...(dish.toppings || []).flatMap((topping) => [
      topping.name,
      ...topping.ingredients.flatMap((group) => group.items.map((item) => item.name)),
    ]),
  ].join(" ").toLowerCase();
  return words.every((word) => haystack.includes(word));
}

/** Redraw only the search results, so the keyboard stays open while typing. */
function updateSearch(query) {
  const results = document.getElementById("search-results");
  const browse = document.getElementById("home-browse");
  if (!query.trim()) {
    results.innerHTML = "";
    browse.hidden = false;
    return;
  }
  const found = RECIPES.filter((dish) => matchesSearch(dish, query));
  browse.hidden = true;
  results.innerHTML = `
    <p class="result-count">${found.length} ${found.length === 1 ? "dish" : "dishes"} found</p>
    ${cardGrid(found)}`;
}

/* ================= Section page ================= */

function renderSection(sectionId, activeTag) {
  const section = findSection(sectionId);
  if (!section) return renderNotFound();

  const inSection = RECIPES.filter((dish) => dish.sections.includes(section.id));
  const shown = activeTag ? inSection.filter((dish) => dish.tags.includes(activeTag)) : inSection;
  const tags = tagsUsedBy(inSection);

  const filters = tags.length > 1 ? `
    <nav class="filter-row" aria-label="Filter by ingredient">
      <a class="filter ${activeTag ? "" : "is-active"}" href="#/section/${section.id}">All</a>
      ${tags.map((tag) => `
        <a class="filter ${tag === activeTag ? "is-active" : ""}" href="#/section/${section.id}/${tag}">
          ${TAGS[tag].emoji} ${esc(TAGS[tag].label)}
        </a>`).join("")}
    </nav>` : "";

  return `
    ${topBar("#/", "Home")}
    <div class="page">
      <header class="page-head" style="--hue:${section.hue}">
        <p class="eyebrow">${section.emoji} Section</p>
        <h1 class="page-title">${esc(section.label)}</h1>
        <p class="page-sub">${shown.length} ${shown.length === 1 ? "dish" : "dishes"}</p>
      </header>
      ${filters}
      ${cardGrid(shown)}
      ${footer()}
    </div>`;
}

/* ================= Tag page ================= */

function renderTag(tagId) {
  const tag = TAGS[tagId];
  if (!tag) return renderNotFound();
  const dishes = RECIPES.filter((dish) => dish.tags.includes(tagId));

  return `
    ${topBar("#/", "Home")}
    <div class="page">
      <header class="page-head">
        <p class="eyebrow">Ingredient</p>
        <h1 class="page-title">${tag.emoji} ${esc(tag.label)}</h1>
        <p class="page-sub">${dishes.length} ${dishes.length === 1 ? "dish" : "dishes"} in all sections</p>
      </header>
      ${cardGrid(dishes)}
      ${footer()}
    </div>`;
}

/* ================= Toppings ================= */

/** The toppings Ion has added to this dish, in the order the dish lists them. */
function chosenToppings(dish, state) {
  if (!dish.toppings) return [];
  return dish.toppings.filter((topping) => state.toppings.includes(topping.id));
}

/**
 * The dish with its chosen toppings folded in: their ingredients go after the
 * dish's own, their "cook" steps go in at dish.toppingSlots.cook and their
 * "serve" steps at dish.toppingSlots.serve (both default to the end), and
 * their nutrition is added. With no toppings chosen, the dish comes back as is.
 */
function withToppings(dish, state) {
  const chosen = chosenToppings(dish, state);
  if (!chosen.length) return dish;

  const cook = chosen.flatMap((topping) => topping.steps.cook || []);
  const serve = chosen.flatMap((topping) => topping.steps.serve || []);
  const slots = dish.toppingSlots || {};
  const steps = {};
  for (const mode of Object.keys(dish.steps)) {
    const base = dish.steps[mode];
    const cookAt = Math.min(slots.cook ?? base.length, base.length);
    const serveAt = Math.max(cookAt, Math.min(slots.serve ?? base.length, base.length));
    steps[mode] = [...base.slice(0, cookAt), ...cook, ...base.slice(cookAt, serveAt), ...serve, ...base.slice(serveAt)];
  }

  const nutrition = { ...dish.nutrition };
  for (const topping of chosen) {
    for (const key of Object.keys(nutrition)) nutrition[key] += topping.nutrition[key];
  }

  return {
    ...dish,
    time: dish.time + chosen.reduce((sum, topping) => sum + (topping.time || 0), 0),
    nutrition: nutrition,
    nutritionNote: [dish.nutritionNote, ...chosen.map((topping) => topping.nutritionNote)]
      .map((note) => note.replace(/\.$/, "")).join(" + ") + ".",
    ingredients: [...dish.ingredients, ...chosen.flatMap((topping) => topping.ingredients)],
    steps: steps,
  };
}

/** The "Add a topping" block: one button per topping. Tapping adds or removes it. */
function toppingBlock(dish, state) {
  if (!dish.toppings || !dish.toppings.length) return "";
  const buttons = dish.toppings.map((topping) => {
    const on = state.toppings.includes(topping.id);
    const n = topping.nutrition;
    return `
      <button class="topping ${on ? "is-on" : ""}" data-action="topping" data-topping="${esc(topping.id)}" aria-pressed="${on}">
        <span class="topping-emoji" aria-hidden="true">${topping.emoji || "➕"}</span>
        <span class="topping-text">
          <b>${esc(topping.name)}</b>
          <span>+${n.kcal} kcal · ${n.protein} g protein${topping.time ? " · +" + formatTime(topping.time) : ""}</span>
        </span>
        <span class="topping-sign">${on ? "✓ Added" : "+ Add"}</span>
      </button>`;
  }).join("");
  return `
    <section class="block">
      <h2 class="block-title">Add a topping</h2>
      <p class="hint">Adding one puts its ingredients and steps into the recipe below.</p>
      <div class="topping-list">${buttons}</div>
    </section>`;
}

/* ================= Dish page ================= */

/** The steps for the chosen mode, with any added toppings. Falls back to stove if the dish has no Combi version. */
function stepsFor(dish, state) {
  const full = withToppings(dish, state);
  if (state.mode === "combi" && full.steps.combi) return full.steps.combi;
  return full.steps.stove;
}

/** Small "Medium · 200 °C" and "⏱ 5 min" labels under a step. */
function stepChips(step) {
  let html = "";
  if (step.heat) html += `<span class="chip chip-heat">🔥 ${esc(step.heat)}</span>`;
  if (step.time) html += `<span class="chip">⏱ ${esc(step.time)}</span>`;
  if (step.timer) {
    html += `<a class="chip chip-timer" href="${timerUrl(step.timer)}">Start ${step.timer} min timer</a>`;
  }
  return html ? `<div class="chips">${html}</div>` : "";
}

function renderDish(dishId) {
  const dish = findDish(dishId);
  if (!dish) return renderNotFound();

  const state = loadDishState(dish.id);
  if (state.mode === "combi" && !dish.steps.combi) state.mode = "stove";
  const factor = SIZES[state.portion].factor;
  const full = withToppings(dish, state);   // the dish plus any added toppings
  const n = scaledNutrition(full, factor);
  const cooking = state.cooking;

  /* --- Section pills and tags --- */
  const sectionLinks = dish.sections.map((id) => {
    const section = findSection(id);
    return `<a class="pill" href="#/section/${id}">${esc(section.label)}</a>`;
  }).join("");
  const tagLinks = dish.tags.map((tag) =>
    `<a class="pill pill-soft" href="#/tag/${tag}">${TAGS[tag].emoji} ${esc(TAGS[tag].label)}</a>`).join("");

  /* --- Portion buttons --- */
  const sizeButtons = Object.keys(SIZES).map((key) => `
    <button class="seg ${state.portion === key ? "is-active" : ""}" data-action="portion" data-size="${key}"
      aria-pressed="${state.portion === key}">${SIZES[key].label}</button>`).join("");

  const batchLine = dish.batch ? `
    <p class="batch-line">The recipe makes <b>${dish.batch.makes} portions</b>. Your portion: <b>${batchPortionText(dish, factor)}</b>.</p>` : "";

  /* --- Ingredients, one block per group --- */
  const ingredientHtml = full.ingredients.map((group, groupIndex) => {
    const scales = groupScales(dish, group);
    const items = group.items.map((item, itemIndex) => {
      const key = groupIndex + "-" + itemIndex;
      const ticked = state.ingTicks.includes(key);
      const parts = ingredientParts(item, scales ? factor : 1);
      const check = cooking ? `<span class="check ${ticked ? "is-on" : ""}" aria-hidden="true"></span>` : `<span class="dot" aria-hidden="true"></span>`;
      const attrs = cooking ? `data-action="tick-ing" data-key="${key}" role="checkbox" aria-checked="${ticked}" tabindex="0"` : "";
      return `
        <li class="ing ${ticked ? "is-done" : ""}" ${attrs}>
          ${check}
          <span class="ing-text">
            ${parts.amount ? `<b class="qty">${esc(parts.amount)}</b> ` : ""}${esc(parts.name)}${parts.note ? `<span class="note">, ${esc(parts.note)}</span>` : ""}
          </span>
        </li>`;
    }).join("");
    return `
      <div class="ing-group">
        <h3 class="group-title">${esc(group.group)}</h3>
        <ul class="ing-list">${items}</ul>
      </div>`;
  }).join("");

  /* --- Steps in the current order --- */
  const steps = stepsFor(dish, state);
  const order = stepOrder(state, steps);
  const ticks = state.stepTicks[state.mode];
  const current = cooking ? currentStepIndex(state, steps) : -1;

  const stepHtml = order.map((stepIndex, position) => {
    const step = steps[stepIndex];
    const done = ticks.includes(stepIndex);
    const isCurrent = stepIndex === current;
    const marker = cooking
      ? `<button class="step-check ${done ? "is-on" : ""}" data-action="tick-step" data-step="${stepIndex}"
           aria-label="${done ? "Untick" : "Tick"} step ${position + 1}">${done ? "✓" : position + 1}</button>`
      : `<span class="step-num">${position + 1}</span>`;
    const handle = cooking ? `<button class="drag-handle" aria-label="Drag to move step ${position + 1}">⠿</button>` : "";
    return `
      <li class="step ${done ? "is-done" : ""} ${isCurrent ? "is-current" : ""}" data-step="${stepIndex}">
        ${marker}
        <div class="step-body">
          ${isCurrent ? `<span class="now-tag">Now</span>` : ""}
          <p>${esc(step.text)}</p>
          ${stepChips(step)}
        </div>
        ${handle}
      </li>`;
  }).join("");

  const modeSwitch = dish.steps.combi ? `
    <div class="segmented mode-switch" role="group" aria-label="Cooking method">
      <button class="seg ${state.mode === "stove" ? "is-active" : ""}" data-action="mode" data-mode="stove" aria-pressed="${state.mode === "stove"}">Stove / Oven</button>
      <button class="seg ${state.mode === "combi" ? "is-active" : ""}" data-action="mode" data-mode="combi" aria-pressed="${state.mode === "combi"}">Ninja Combi</button>
    </div>` : "";

  const timeText = formatTime(full.time) +
    (dish.extraTime ? ` + ${dish.extraTime}` : "") +
    (dish.combiTime ? ` · Combi ${formatTime(dish.combiTime)}` : "");

  return `
    ${topBar("#/section/" + dish.sections[0], findSection(dish.sections[0]).label)}
    <article class="page dish ${cooking ? "is-cooking" : ""}">
      ${dishArt(dish, true)}

      <header class="dish-head">
        <div class="pills">${sectionLinks}</div>
        <h1 class="dish-title">${esc(dish.name)}</h1>
        <p class="dish-meta">⏱ ${timeText}</p>
        <div class="pills">${tagLinks}</div>
        ${dish.intro ? `<p class="dish-intro">${esc(dish.intro)}</p>` : ""}
      </header>

      <section class="panel" aria-label="Nutrition and portion">
        <div class="nutrition">
          <div class="nut nut-kcal"><b>${n.kcal}</b><span>kcal</span></div>
          <div class="nut"><b>${n.protein} g</b><span>protein</span></div>
          <div class="nut"><b>${n.carbs} g</b><span>carbs</span></div>
          <div class="nut"><b>${n.fat} g</b><span>fat</span></div>
        </div>
        <p class="nut-note">${portionNote(full, state.portion)}</p>
        <div class="segmented" role="group" aria-label="Portion size">${sizeButtons}</div>
        ${batchLine}
      </section>

      ${toppingBlock(dish, state)}

      <section class="block">
        <h2 class="block-title">Ingredients</h2>
        ${cooking ? `<p class="hint">Tap an ingredient when it's ready.</p>` : ""}
        ${ingredientHtml}
      </section>

      <section class="block">
        <h2 class="block-title">Steps</h2>
        ${modeSwitch}
        ${cooking ? `<p class="hint">Drag ⠿ to change the order. Ticks move the Now card to the next step.</p>` : ""}
        <ol class="steps" id="step-list">${stepHtml}</ol>
      </section>

      <section class="tip">
        <h2 class="tip-title">Chef's tip</h2>
        <p>${esc(dish.tip)}</p>
        ${dish.source ? `<p class="source">Based on the <a href="${esc(dish.source.url)}" target="_blank" rel="noopener">${esc(dish.source.label)}</a>.</p>` : ""}
      </section>

      ${footer()}
    </article>
    ${cooking ? nowPanel(dish, state, steps) : startBar()}`;
}

/** Line under the nutrition: what the numbers are for. */
function portionNote(dish, size) {
  const medium = `<b>Medium</b> = ${esc(dish.nutritionNote)}`;
  if (size === "M") return medium;
  const percent = Math.round(SIZES[size].factor * 100);
  return `<b>${SIZES[size].label}</b> = ${percent}% of Medium. ${medium}`;
}

/** Bottom bar before cooking starts. */
function startBar() {
  return `
    <div class="bottom-bar start-bar">
      <button class="btn btn-primary btn-wide" data-action="start-cooking">Start cooking</button>
    </div>`;
}

/** The big "Now" card fixed at the bottom while cooking. */
function nowPanel(dish, state, steps) {
  const current = currentStepIndex(state, steps);
  const total = steps.length;
  const doneCount = state.stepTicks[state.mode].length;

  if (current === -1) {
    return `
      <div class="bottom-bar now-panel">
        <p class="now-label">All ${total} steps done</p>
        <p class="now-text">Enjoy your meal.</p>
        <button class="btn btn-primary btn-wide" data-action="finish-cooking">Finish</button>
      </div>`;
  }

  const step = steps[current];
  const next = nextStepIndex(state, steps);
  const position = stepOrder(state, steps).indexOf(current) + 1;
  const timer = step.timer ? `<a class="btn btn-ghost" href="${timerUrl(step.timer)}">⏱ ${step.timer} min</a>` : "";

  return `
    <div class="bottom-bar now-panel">
      <div class="now-top">
        <p class="now-label">Now · step ${position} of ${total} <span class="now-progress">${doneCount} done</span></p>
        <button class="link-btn" data-action="finish-cooking">Finish</button>
      </div>
      <p class="now-text">${esc(step.text)}</p>
      ${step.heat || step.time ? `<div class="chips">${step.heat ? `<span class="chip chip-heat">🔥 ${esc(step.heat)}</span>` : ""}${step.time ? `<span class="chip">⏱ ${esc(step.time)}</span>` : ""}</div>` : ""}
      <div class="now-actions">
        <button class="btn btn-primary" data-action="done-current">✓ Done</button>
        <button class="btn btn-ghost" data-action="speak-current" aria-label="Read this step aloud">🔊</button>
        ${timer}
      </div>
      ${next !== -1 ? `<p class="now-next"><span>Next:</span> ${esc(steps[next].text)}</p>` : `<p class="now-next">This is the last step.</p>`}
    </div>`;
}

function renderNotFound() {
  return `
    ${topBar("#/", "Home")}
    <div class="page"><p class="empty">This page doesn't exist. <a href="#/">Go home</a>.</p></div>`;
}

/* ================= Router ================= */

/** Split "#/section/dinner/chicken" into { page: "section", id: "dinner", extra: "chicken" }. */
function parseRoute() {
  const parts = location.hash.replace(/^#\/?/, "").split("/").filter(Boolean).map(decodeURIComponent);
  return { page: parts[0] || "home", id: parts[1], extra: parts[2] };
}

let lastHash = null;

/** Draw the page for the current address. Also used to redraw after a change. */
function render() {
  const route = parseRoute();
  const app = document.getElementById("app");

  if (route.page === "section") app.innerHTML = renderSection(route.id, route.extra);
  else if (route.page === "tag") app.innerHTML = renderTag(route.id);
  else if (route.page === "dish") app.innerHTML = renderDish(route.id);
  else app.innerHTML = renderHome();

  // Jump to the top only when the page itself changed, not after a tick.
  if (location.hash !== lastHash) window.scrollTo(0, 0);
  lastHash = location.hash;

  afterRender(route);
}

/** Things that need the page to exist first: search box, drag, screen lock. */
function afterRender(route) {
  const search = document.getElementById("search-input");
  if (search) search.addEventListener("input", () => updateSearch(search.value));

  const isDish = route.page === "dish" && findDish(route.id);
  const state = isDish ? loadDishState(route.id) : null;
  keepScreenOn(Boolean(state && state.cooking));
  document.body.classList.toggle("has-now-panel", Boolean(state && state.cooking));
  document.body.classList.toggle("has-bottom-bar", Boolean(isDish));

  const list = document.getElementById("step-list");
  if (isDish && state.cooking && list) {
    enableStepDrag(list, (newOrder) => {
      const fresh = loadDishState(route.id);
      fresh.order[fresh.mode] = newOrder;
      saveDishState(route.id, fresh);
      render();
    });
  }
}

/* ================= Buttons (one listener for the whole page) ================= */

/** Change the open dish's saved state with `change(state)`, then redraw. */
function updateDish(change) {
  const route = parseRoute();
  const dish = findDish(route.id);
  if (!dish) return;
  const state = loadDishState(dish.id);
  const result = change(state, dish) || state;
  saveDishState(dish.id, result);
  render();
}

function handleAction(element) {
  const action = element.dataset.action;

  if (action === "toggle-theme") return toggleTheme();

  if (action === "portion") return updateDish((state) => { state.portion = element.dataset.size; });

  if (action === "mode") return updateDish((state) => { state.mode = element.dataset.mode; });

  if (action === "start-cooking") return updateDish((state) => { state.cooking = true; });

  if (action === "topping") {
    // Adding or removing a topping changes the ingredient and step lists, so ticks and custom order reset.
    const route = parseRoute();
    const saved = loadDishState(route.id);
    const hasTicks = saved.ingTicks.length || saved.stepTicks.stove.length || saved.stepTicks.combi.length;
    if (saved.cooking && hasTicks && !confirm("Change toppings? This clears your ticks.")) return;
    return updateDish((state) => {
      state.toppings = toggleInList(state.toppings, element.dataset.topping);
      state.ingTicks = [];
      state.stepTicks = { stove: [], combi: [] };
      state.order = { stove: null, combi: null };
    });
  }

  if (action === "finish-cooking") {
    if (!confirm("Finish cooking? This clears your ticks and resets the step order.")) return;
    return updateDish((state) => finishCooking(state));
  }

  if (action === "tick-ing") {
    return updateDish((state) => { state.ingTicks = toggleInList(state.ingTicks, element.dataset.key); });
  }

  if (action === "tick-step") {
    const index = Number(element.dataset.step);
    return updateDish((state) => {
      state.stepTicks[state.mode] = toggleInList(state.stepTicks[state.mode], index);
    });
  }

  if (action === "done-current") {
    return updateDish((state, dish) => {
      const current = currentStepIndex(state, stepsFor(dish, state));
      if (current !== -1) state.stepTicks[state.mode].push(current);
    });
  }

  if (action === "speak-current") {
    const dish = findDish(parseRoute().id);
    const state = loadDishState(dish.id);
    const steps = stepsFor(dish, state);
    const current = currentStepIndex(state, steps);
    if (current !== -1) speak(steps[current].text);
  }
}

document.addEventListener("click", (event) => {
  const element = event.target.closest("[data-action]");
  if (element) handleAction(element);
});

/* Space or Enter ticks an ingredient row when using a keyboard. */
document.addEventListener("keydown", (event) => {
  const element = event.target.closest('[data-action="tick-ing"]');
  if (element && (event.key === " " || event.key === "Enter")) {
    event.preventDefault();
    handleAction(element);
  }
});

window.addEventListener("hashchange", render);
render();
