# Ion's Kitchen

My recipe book: 29 high-protein dishes from my meal plan, built for cooking from an iPhone next to the stove.

Plain HTML, CSS and JavaScript: no framework, no build step.

## Features

- Five sections (Breakfast, Brunch, Lunch, Dinner, Snacks), ingredient tags and search
- Nutrition on every dish, with Small / Medium / Large portions that rescale amounts and numbers
- Ingredients split by part of the dish (sauce, base, to serve), with each spice where it goes
- Steps with heat and time, plus a Ninja Combi version where it fits
- Cooking mode: tick ingredients and steps, a "Now" card for the current step, drag to reorder, read a step aloud, keep the screen on, and one-tap iPhone timers
- Dark theme first, with a light theme

## Run it on the computer

From this folder:

```bash
python -m http.server 5173
```

Then open http://localhost:5173.

## Set up the iPhone timer (once)

The timer buttons run a Shortcut called **Kitchen Timer**.

1. Open the **Shortcuts** app, tap **+**.
2. Rename it to exactly `Kitchen Timer`.
3. Add the action **Get Numbers from Input**. Tap its input and choose **Shortcut Input** (it must turn blue).
4. Add the action **Start Timer**. Set its time to the blue **Numbers** variable, unit **minutes**.
5. Tap **Done**.

Tapping "Start 7 min timer" on the site now starts a 7-minute Clock timer and returns to the recipe.

## Files

- `data/recipes.js`: all dishes. How to add one: [ADDING-A-DISH.md](ADDING-A-DISH.md)
- How the code works: [CODE-TOUR.md](CODE-TOUR.md)
- `images/`: dish photos, named after the dish id (`shakshuka.jpg`)

Nutrition values are estimates from typical labels.
