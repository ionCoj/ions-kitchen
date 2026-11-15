/* =====================================================================
   js/portions.js — the maths behind the Small / Medium / Large buttons.

   Medium is the amount from the meal plan. Small is 75% of it and
   Large is 125%. Amounts are rounded to values you can actually
   measure in a kitchen (steps of 5 g, half spoons, whole eggs).
   ===================================================================== */

const SIZES = {
  S: { label: "Small",  factor: 0.75 },
  M: { label: "Medium", factor: 1 },
  L: { label: "Large",  factor: 1.25 },
};

/* Units measured by weight or volume: rounded to steps of 5 (or 1 when small). */
const WEIGHT_UNITS = ["g", "ml", "kg"];
/* Spoon units: rounded to half spoons (quarter spoons under 1). */
const SPOON_UNITS = ["tsp", "tbsp"];

/** Round a number to the nearest multiple of `step` (e.g. step 5 → 37 becomes 35). */
function roundTo(value, step) {
  return Math.round(value / step) * step;
}

/**
 * Scale one ingredient amount and round it to a kitchen-friendly value.
 * `item` is one ingredient from recipes.js, `factor` is 0.75, 1 or 1.25.
 */
function scaleQty(item, factor) {
  if (item.qty === undefined) return undefined;   // "salt, a pinch" has no amount
  if (factor === 1) return item.qty;              // Medium: show the recipe exactly

  const raw = item.qty * factor;
  const unit = item.unit || "";

  if (unit === "kg") return Math.max(0.05, roundTo(raw, 0.05));
  if (WEIGHT_UNITS.includes(unit)) return raw >= 20 ? roundTo(raw, 5) : Math.max(1, Math.round(raw));
  if (SPOON_UNITS.includes(unit)) return raw >= 1 ? roundTo(raw, 0.5) : Math.max(0.25, roundTo(raw, 0.25));

  // Counted things (eggs, slices, cloves): whole numbers unless the dish allows halves.
  const step = item.round || 1;
  return Math.max(step, roundTo(raw, step));
}

/* Fractions we show as symbols instead of decimals. */
const FRACTIONS = [
  [0.25, "¼"], [1 / 3, "⅓"], [0.5, "½"], [2 / 3, "⅔"], [0.75, "¾"],
];

/** Turn 1.5 into "1½", 0.25 into "¼", 300 into "300". */
function formatQty(qty) {
  const whole = Math.floor(qty + 1e-9);
  const rest = qty - whole;
  if (rest < 0.02) return String(whole);
  if (rest > 0.98) return String(whole + 1);

  for (const [value, symbol] of FRACTIONS) {
    if (Math.abs(rest - value) < 0.04) return (whole > 0 ? whole : "") + symbol;
  }
  return String(Math.round(qty * 100) / 100);   // e.g. 0.05 kg stays a decimal
}

/**
 * Build the text parts for one ingredient line.
 * Returns { amount: "150 g", name: "cottage cheese 5%", note: "..." }.
 */
function ingredientParts(item, factor) {
  const qty = scaleQty(item, factor);
  let amount = "";
  if (qty !== undefined) amount = formatQty(qty) + (item.unit ? " " + item.unit : "");

  const usePlural = item.plural && qty !== undefined && qty > 1;
  return {
    amount: amount,
    name: usePlural ? item.plural : item.name,
    note: item.note || "",
  };
}

/** Does this ingredient group change with the portion buttons? */
function groupScales(dish, group) {
  if (group.scale) return group.scale === "portion";
  return !dish.batch;   // single-portion dishes: everything scales; batch dishes: nothing by default
}

/** Nutrition for the chosen size, rounded to whole numbers. */
function scaledNutrition(dish, factor) {
  const n = dish.nutrition;
  return {
    kcal: Math.round(n.kcal * factor),
    protein: Math.round(n.protein * factor),
    carbs: Math.round(n.carbs * factor),
    fat: Math.round(n.fat * factor),
  };
}

/* Friendly fractions for "your share of the pan". */
const SHARE_FRACTIONS = [
  [1 / 8, "⅛"], [1 / 6, "⅙"], [1 / 5, "⅕"], [1 / 4, "¼"], [1 / 3, "⅓"], [3 / 8, "⅜"],
  [2 / 5, "⅖"], [1 / 2, "½"], [3 / 5, "⅗"], [5 / 8, "⅝"], [2 / 3, "⅔"], [3 / 4, "¾"], [1, "all"],
];

/**
 * For batch dishes: describe Ion's portion of the batch.
 * Example: "⅕ of the tray (200 g raw chicken)" or "½ of the pan".
 */
function batchPortionText(dish, factor) {
  const share = factor / dish.batch.makes;
  let closest = SHARE_FRACTIONS[0];
  for (const option of SHARE_FRACTIONS) {
    if (Math.abs(option[0] - share) < Math.abs(closest[0] - share)) closest = option;
  }

  let text = closest[1] === "all" ? "the whole " + dish.batch.unit : closest[1] + " of the " + dish.batch.unit;
  const p = dish.batch.portion;
  if (p) text += " (" + formatQty(scaleQty(p, factor)) + " " + p.unit + " " + p.name + ")";
  return text;
}
