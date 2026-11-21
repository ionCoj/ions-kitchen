/* =====================================================================
   js/cooking.js — everything for cooking mode.

   - Each dish keeps its own saved state (ticks, step order, portion,
     stove/Combi choice), so two dishes can be cooked at the same time.
   - "Finish" clears the ticks and puts the steps back in the
     suggested order.
   - Keeps the screen on while cooking (Screen Wake Lock API).
   - Reads a step aloud, only when the speaker button is pressed.
   - Lets you drag steps to a new place with your finger.
   - Builds the link that starts the iPhone timer through Shortcuts.
   ===================================================================== */

/* ---------------- Saved state per dish ---------------- */

/** A fresh state for a dish that has never been cooked. */
function emptyDishState() {
  return {
    portion: "M",                       // S, M or L
    mode: "stove",                      // "stove" or "combi"
    cooking: false,                     // is cooking mode on?
    ingTicks: [],                       // ticked ingredients, as "group-item" keys like "0-2"
    stepTicks: { stove: [], combi: [] },// ticked steps, as original step numbers
    order: { stove: null, combi: null },// custom step order, or null for the suggested order
    toppings: [],                       // ids of the toppings added to this dish
    choices: {},                        // picked option per choice, e.g. { sauce: "no-time" }
  };
}

/** Load a dish's saved state, filling in anything missing. */
function loadDishState(dishId) {
  const saved = store.get("dish." + dishId, null);
  const state = emptyDishState();
  if (!saved) return state;
  return {
    ...state,
    ...saved,
    stepTicks: { ...state.stepTicks, ...(saved.stepTicks || {}) },
    order: { ...state.order, ...(saved.order || {}) },
  };
}

/** Save a dish's state. */
function saveDishState(dishId, state) {
  store.set("dish." + dishId, state);
}

/** "Finish": clear ticks and custom order, keep the portion, stove/Combi choice, toppings and choices. */
function finishCooking(state) {
  const fresh = emptyDishState();
  return { ...fresh, portion: state.portion, mode: state.mode, toppings: state.toppings, choices: state.choices };
}

/* ---------------- Step order and the current step ---------------- */

/**
 * The order to show the steps in, as a list of original step numbers.
 * Uses Ion's custom order if it still matches the recipe; otherwise 0, 1, 2, ...
 */
function stepOrder(state, steps) {
  const suggested = steps.map((step, index) => index);
  const custom = state.order[state.mode];
  if (!custom || custom.length !== steps.length) return suggested;
  const valid = suggested.every((index) => custom.includes(index));
  return valid ? custom : suggested;
}

/** The first step in the current order that isn't ticked yet, or -1 when all are done. */
function currentStepIndex(state, steps) {
  const ticks = state.stepTicks[state.mode];
  const order = stepOrder(state, steps);
  const next = order.find((index) => !ticks.includes(index));
  return next === undefined ? -1 : next;
}

/** The step after the current one (for the "Next:" line), or -1. */
function nextStepIndex(state, steps) {
  const ticks = state.stepTicks[state.mode];
  const order = stepOrder(state, steps);
  const open = order.filter((index) => !ticks.includes(index));
  return open.length > 1 ? open[1] : -1;
}

/** Add `value` to the list if missing, remove it if present. Returns a new list. */
function toggleInList(list, value) {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
}

/* ---------------- Keep the screen on ---------------- */

let wakeLock = null;       // the active screen lock, or null
let wantScreenOn = false;  // should the screen stay on right now?

/** Turn "keep the screen on" on or off. Silently does nothing on browsers without support. */
async function keepScreenOn(on) {
  wantScreenOn = on;
  if (!("wakeLock" in navigator)) return;

  if (on && !wakeLock) {
    try {
      wakeLock = await navigator.wakeLock.request("screen");
      wakeLock.addEventListener("release", () => { wakeLock = null; });
    } catch (error) {
      wakeLock = null;   // e.g. low battery mode: the phone may refuse
    }
  }
  if (!on && wakeLock) {
    wakeLock.release();
    wakeLock = null;
  }
}

/* iPhone drops the lock when you switch apps. Ask again when the page comes back. */
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible" && wantScreenOn) keepScreenOn(true);
});

/* ---------------- Read a step aloud ---------------- */

/** Speak `text` once. Only called when Ion presses the speaker button. */
function speak(text) {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();                 // stop anything still talking
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  utterance.rate = 0.95;
  window.speechSynthesis.speak(utterance);
}

/* ---------------- iPhone timer link ---------------- */

/**
 * Link that runs Ion's Shortcut called "Kitchen Timer" with the minutes as input.
 * The Shortcut starts the Clock app's timer. (Setup steps are in the README.)
 *
 * It uses the "x-callback-url" form: when the Shortcut finishes (or fails),
 * iPhone opens the x-success / x-error / x-cancel address, which is this
 * same recipe page. So you land back on the recipe instead of staying in
 * the Shortcuts app.
 */
function timerUrl(minutes) {
  const backToRecipe = encodeURIComponent(location.href);
  return "shortcuts://x-callback-url/run-shortcut" +
         "?name=" + encodeURIComponent("Kitchen Timer") +
         "&input=text&text=" + encodeURIComponent(String(minutes)) +
         "&x-success=" + backToRecipe +
         "&x-error=" + backToRecipe +
         "&x-cancel=" + backToRecipe;
}

/* ---------------- Drag steps with a finger ---------------- */

/**
 * Make the items in `list` draggable by their ".drag-handle".
 * When a drag ends, `onDrop(newOrder)` gets the new list of step numbers.
 * Uses Pointer Events, which work for both a finger and a mouse.
 */
function enableStepDrag(list, onDrop) {
  let dragged = null;

  list.addEventListener("pointerdown", (event) => {
    const handle = event.target.closest(".drag-handle");
    if (!handle) return;
    event.preventDefault();
    dragged = handle.closest(".step");
    dragged.classList.add("dragging");
    handle.setPointerCapture(event.pointerId);   // keep getting moves even outside the handle
  });

  list.addEventListener("pointermove", (event) => {
    if (!dragged) return;
    const y = event.clientY;

    // Find the first step whose middle is below the finger, and drop in front of it.
    const others = [...list.querySelectorAll(".step:not(.dragging)")];
    const before = others.find((step) => {
      const box = step.getBoundingClientRect();
      return y < box.top + box.height / 2;
    });
    if (before) list.insertBefore(dragged, before);
    else list.appendChild(dragged);

    // Scroll the page when the finger is near the top or bottom edge.
    const panel = document.querySelector(".bottom-bar");
    const bottomEdge = window.innerHeight - (panel ? panel.offsetHeight : 0);
    if (y < 90) window.scrollBy(0, -14);
    else if (y > bottomEdge - 60) window.scrollBy(0, 14);
  });

  const endDrag = () => {
    if (!dragged) return;
    dragged.classList.remove("dragging");
    dragged = null;
    const newOrder = [...list.querySelectorAll(".step")].map((step) => Number(step.dataset.step));
    onDrop(newOrder);
  };
  list.addEventListener("pointerup", endDrag);
  list.addEventListener("pointercancel", endDrag);
}
