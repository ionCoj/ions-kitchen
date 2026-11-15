# Adding a dish

Every dish lives in one file: `data/recipes.js`. One dish is one entry in the `RECIPES` list. Add an entry, save, reload the page. The dish shows up in its sections, under its tags and in search. No other file needs editing.

The easy way: tell Claude the dish ("add my lentil soup: ingredients…, how I make it…") and it writes the entry for you.

## A complete example

```js
{
  id: "shakshuka",                       // unique, lowercase, dashes: used in the address #/dish/shakshuka
  name: "Shakshuka",                     // shown on cards and the dish page
  emoji: "🍅",                           // shown on the placeholder until a photo exists
  sections: ["breakfast", "brunch", "dinner"],   // one or more of: breakfast, brunch, lunch, dinner, snacks
  tags: ["eggs", "cheese", "vegetarian"],        // keys from TAGS at the top of the file
  time: 30,                              // total minutes on the stove/oven
  combiTime: 25,                         // optional: minutes with the Ninja Combi
  extraTime: "8 h in the fridge",        // optional: waiting time, shown after the minutes
  photo: "images/shakshuka.jpg",         // put the photo file here later; until then a placeholder shows
  intro: "One or two sentences about the dish.",
  source: { label: "10dakot recipe", url: "https://..." },   // optional: where the recipe came from

  batch: { makes: 2, unit: "pan" },      // optional: only for dishes cooked as a batch (see below)

  nutrition: { kcal: 574, protein: 33, carbs: 59, fat: 24 },  // for the MEDIUM portion
  nutritionNote: "½ of the pan with 2 slices of bread and 100 g white cheese 5%.",

  ingredients: [
    { group: "Base (whole pan)", items: [
      { qty: 1, unit: "tbsp", name: "oil" },
      { qty: 3, name: "garlic clove", plural: "garlic cloves", note: "crushed" },
      { name: "salt", note: "a little, added with the tomatoes" },     // no qty = no amount
    ]},
    { group: "To serve (your portion)", scale: "portion", items: [
      { qty: 2, unit: "slices", name: "whole-wheat bread", round: 0.5 },
    ]},
  ],

  steps: {
    stove: [
      { text: "Heat the oil and fry the onion until light golden.", heat: "Medium", time: "6–8 min", timer: 7 },
      { text: "While the sauce thickens, toast the bread." },
    ],
    combi: [ /* optional: same shape, shown when "Ninja Combi" is chosen */ ],
  },

  tip: "Chef's tip shown at the end.",
},
```

## The fields that need care

**Ingredient items**

| Field | Meaning |
| --- | --- |
| `qty` | The amount for the Medium portion. Leave it out for "a pinch" or "to taste". |
| `unit` | `g`, `ml`, `kg`, `tsp`, `tbsp`, or a word like `slices`, `can`, `large`. Leave out for counted things (eggs). |
| `name` | What it is. |
| `plural` | Optional. Used when the amount is more than 1: `egg` → `eggs`. |
| `note` | Optional extra words after a comma: "chopped", "weighed dry". Never put an amount here, because notes don't scale. |
| `round` | Optional. Counted things round to whole numbers; `round: 0.5` allows halves (bread slices). |

**Steps**

| Field | Meaning |
| --- | --- |
| `text` | One action. Name the ingredient but **don't repeat its amount** ("add the paprika", not "add 1 tsp paprika"), so Small/Large stay correct. |
| `heat` | Optional: "Medium", "Low", "200 °C", "Combi Crisp 205 °C". |
| `time` | Optional text: "5 min", "4–5 min". |
| `timer` | Optional number of minutes. Adds a "Start N min timer" button. Leave it out for steps the Ninja times itself. |

Write steps in the order you'd really cook, with side tasks where they fit ("While the rice cooks, chop the salad").

**Batch dishes**

Use `batch` when one cooking makes several portions (a pan, a tray, a pot):

- `batch: { makes: 5, unit: "tray" }` shows "Your portion: ⅕ of the tray".
- Add `portion: { qty: 200, unit: "g", name: "raw chicken" }` to also show grams.
- In a batch dish, ingredient groups stay at the full-batch amount. Give a group `scale: "portion"` when it's per person (your rice, your bread). Those change with Small/Medium/Large.

In a normal (non-batch) dish, every amount scales.

**Sections and tags**

- Sections: `breakfast`, `brunch`, `lunch`, `dinner`, `snacks`. A dish can be in several.
- Tags come from `TAGS` at the top of `recipes.js`. To add a new tag (for example `"pork"` is already there), add a line to `TAGS`. A tag appears on the site as soon as one dish uses it.

## Adding a photo

1. Save the photo as a `.jpg` in the `images` folder, named like the dish id: `images/shakshuka.jpg`.
2. Square-ish or 4:3 photos look best. Keep it under about 300 KB so it loads fast on the phone.
3. Reload. The photo replaces the coloured placeholder.

## Checking your new dish

1. Reload the site and open the dish.
2. Press Small, Medium and Large and check the amounts make sense.
3. If the page is blank, there's a typo in `recipes.js`: usually a missing comma or bracket. Open the browser console (F12 on the computer) to see the line number.
