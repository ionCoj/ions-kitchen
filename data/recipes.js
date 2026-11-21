/* =====================================================================
   data/recipes.js — ALL the content of Ion's Kitchen lives here.

   To add a dish: copy one entry in RECIPES, change it, save. Nothing else
   needs editing. The dish appears in its sections, under its tags and in
   search automatically. ADDING-A-DISH.md explains every field.

   Rules for writing a dish:
   - Amounts go ONLY in the ingredient list (qty + unit). Steps name the
     ingredient ("add the paprika") but never repeat the amount, so the
     Small / Medium / Large buttons can change the amounts safely.
   - Nutrition is for the MEDIUM portion, the amount from the meal plan.
   ===================================================================== */

/* The five sections on the home page, in the order they are shown.
   hue = the colour (0–360 on the colour wheel) used for placeholder art. */
const SECTIONS = [
  { id: "breakfast", label: "Breakfast", emoji: "🥣", hue: 38 },
  { id: "brunch",    label: "Brunch",    emoji: "🍳", hue: 14 },
  { id: "lunch",     label: "Lunch",     emoji: "🥗", hue: 95 },
  { id: "dinner",    label: "Dinner",    emoji: "🍲", hue: 345 },
  { id: "snacks",    label: "Snacks",    emoji: "🥤", hue: 190 },
];

/* Ingredient tags. A tag only shows on the site once at least one dish uses it. */
const TAGS = {
  "chicken":    { label: "Chicken",    emoji: "🍗" },
  "red-meat":   { label: "Red meat",   emoji: "🥩" },
  "pork":       { label: "Pork",       emoji: "🥓" },
  "fish":       { label: "Fish",       emoji: "🐟" },
  "eggs":       { label: "Eggs",       emoji: "🥚" },
  "cheese":     { label: "Cheese",     emoji: "🧀" },
  "dairy":      { label: "Yogurt & milk", emoji: "🥛" },
  "oats":       { label: "Oats",       emoji: "🌾" },
  "legumes":    { label: "Legumes",    emoji: "🫘" },
  "vegetarian": { label: "Vegetarian", emoji: "🥦" },
};

const RECIPES = [

  /* ---------------------------------------------------------------
     1. Cheese omelette — a single-portion dish (no "batch").
     --------------------------------------------------------------- */
  {
    id: "cheese-omelette",
    emoji: "🍳",
    name: "High-Protein Cheese Omelette",
    sections: ["breakfast", "brunch", "dinner"],
    tags: ["eggs", "cheese", "vegetarian"],
    time: 10,
    photo: "images/cheese-omelette.jpg",
    intro: "Cottage cheese whisked into the eggs makes the omelette fluffy and adds protein. The yellow cheese melts inside the fold.",
    nutrition: { kcal: 603, protein: 44, carbs: 38, fat: 28 },
    nutritionNote: "1 omelette with 2 slices of whole-wheat bread.",
    ingredients: [
      { group: "Egg mix", items: [
        { qty: 3, name: "egg", plural: "eggs" },
        { qty: 50, unit: "g", name: "cottage cheese 5%" },
        { name: "salt", note: "a pinch" },
        { name: "black pepper", note: "a pinch" },
      ]},
      { group: "Filling", items: [
        { qty: 100, unit: "g", name: "vegetables", note: "onion, pepper, tomato or spinach, chopped small" },
        { qty: 40, unit: "g", name: "yellow cheese 9%", note: "sliced" },
      ]},
      { group: "For the pan", items: [
        { qty: 1, unit: "tsp", name: "oil" },
      ]},
      { group: "To serve", items: [
        { qty: 2, unit: "slices", name: "whole-wheat bread", round: 0.5 },
      ]},
    ],
    steps: {
      stove: [
        { text: "Chop the vegetables into small pieces." },
        { text: "In a bowl, whisk the eggs with the cottage cheese, salt and black pepper until the eggs are one even yellow. Small cottage lumps are fine.", time: "30 sec" },
        { text: "Heat the oil in a non-stick pan. Fry the vegetables until soft.", heat: "Medium", time: "2–3 min", timer: 3 },
        { text: "While the vegetables fry, put the bread in the toaster." },
        { text: "Spread the vegetables evenly over the pan and pour the egg mix over them.", heat: "Medium" },
        { text: "Turn the heat down. Cook, lifting the edges with a spatula so the raw egg runs underneath.", heat: "Medium-low", time: "2–3 min", timer: 3 },
        { text: "When the top is almost set, lay the cheese on one half.", heat: "Medium-low" },
        { text: "Fold the other half over the cheese, cover the pan and cook until the cheese melts.", heat: "Medium-low", time: "1 min", timer: 1 },
        { text: "Slide the omelette onto a plate and serve with the toast." },
      ],
    },
    tip: "Take the pan off the heat while the top still looks a little wet. The heat inside the eggs finishes the cooking, so the omelette stays soft instead of rubbery. A pinch of za'atar or chopped chives in the egg mix adds a lot of flavour for zero calories.",
  },

  /* ---------------------------------------------------------------
     2. Shakshuka — a batch dish: one pan makes 2 portions.
        Groups marked scale: "portion" change with Small/Medium/Large;
        the others are for the whole pan and stay the same.
     --------------------------------------------------------------- */
  {
    id: "shakshuka",
    emoji: "🍅",
    name: "Shakshuka",
    sections: ["breakfast", "brunch", "dinner"],
    tags: ["eggs", "cheese", "vegetarian"],
    time: 30,
    photo: "images/shakshuka.jpg",
    intro: "Eggs cooked in a thick tomato and pepper sauce. Make the sauce from scratch, or use the no-time sauce from a ready jar. One pan makes 2 portions; serve yours with bread and white cheese.",
    source: { label: "10dakot recipe", url: "https://www.10dakot.co.il/recipe/%d7%9e%d7%aa%d7%9b%d7%95%d7%9f-%d7%9c%d7%a9%d7%a7%d7%a9%d7%95%d7%a7%d7%94/" },
    batch: { makes: 2, unit: "pan" },
    nutrition: { kcal: 574, protein: 33, carbs: 59, fat: 24 },   // with the Full sauce
    nutritionNote: "½ of the pan with 2 slices of whole-wheat bread and 100 g white cheese 5%.",
    // Pick one sauce. Its ingredients come first and its steps go in before step 1 (the eggs).
    choices: [
      {
        id: "sauce",
        label: "Sauce",
        at: 0,
        options: [
          {
            id: "full",
            name: "Full sauce",
            emoji: "🍅",
            note: "From scratch: fresh tomatoes, red pepper and onion. About 30 minutes.",
            ingredients: [
              { group: "Full sauce (whole pan)", items: [
                { qty: 1, unit: "tbsp", name: "oil" },
                { qty: 1, unit: "large", name: "onion", note: "chopped" },
                { qty: 4, unit: "medium", name: "tomatoes", note: "cut into cubes; soft, ripe ones are best" },
                { qty: 0.5, name: "red pepper (gamba)", note: "cut into cubes" },
                { qty: 3, name: "garlic clove", plural: "garlic cloves", note: "crushed (4 if you love garlic)" },
                { name: "salt", note: "a little, added with the tomatoes" },
                { name: "hot pepper", note: "optional, chopped, for a spicy version" },
              ]},
              { group: "Sauce seasoning (whole pan)", items: [
                { qty: 1, unit: "tbsp", name: "tomato paste" },
                { qty: 1, unit: "tsp", name: "sweet paprika", note: "heaped" },
                { name: "black pepper", note: "to taste" },
                { name: "salt", note: "to taste" },
                { name: "hot paprika", note: "optional, 1 tsp instead of the hot pepper" },
              ]},
            ],
            steps: {
              cook: [
                { text: "Chop the onion. Cut the tomatoes and red pepper into cubes. Crush the garlic." },
                { text: "Heat the oil in a wide pan and fry the onion until light golden.", heat: "Medium", time: "6–8 min", timer: 7 },
                { text: "Add the tomatoes, red pepper, garlic and hot pepper (if using). Add a little salt now.", heat: "Medium" },
                { text: "Cover and cook, stirring now and then, until the pepper softens.", heat: "Medium-low", time: "5 min", timer: 5 },
                { text: "Stir in the tomato paste, sweet paprika, black pepper and hot paprika (if using). Cook uncovered until the sauce thickens.", heat: "Medium", time: "3–4 min", timer: 4 },
                { text: "While the sauce thickens, put the bread in the toaster and put the white cheese on your plate." },
              ],
            },
          },
          {
            id: "no-time",
            name: "No-time sauce",
            emoji: "⏱️",
            time: 25,
            note: "A ready shakshuka sauce from a jar (Yad Mordechai spicy, 350 g), upgraded with fried onion, garlic and tomato paste. No salt: the jar is salty already.",
            nutritionDelta: { kcal: -48, protein: 0, carbs: -6, fat: -5 },
            ingredients: [
              { group: "No-time sauce (whole pan)", items: [
                { qty: 1, unit: "jar", name: "ready shakshuka sauce", note: "350 g, Yad Mordechai spicy or similar" },
                { qty: 1, unit: "tsp", name: "oil" },
                { qty: 0.5, name: "onion", note: "medium, finely chopped" },
                { qty: 2, name: "garlic clove", plural: "garlic cloves", note: "grated on the fine side" },
                { qty: 1, unit: "tbsp", name: "tomato paste", note: "the very concentrated kind is fine" },
                { qty: 0.25, unit: "tsp", name: "smoked paprika", note: "optional" },
                { qty: 2, unit: "tbsp", name: "water", note: "to rinse the jar" },
                { name: "salt", note: "none: the jar is salted" },
              ]},
            ],
            steps: {
              cook: [
                { text: "Finely chop the onion, grate the garlic and open the jar." },
                { text: "Heat the oil and fry the onion until soft with golden edges.", heat: "Medium", time: "5–6 min", timer: 5 },
                { text: "Add the garlic and stir for 20–30 seconds, then add the tomato paste (and smoked paprika) and press it into the pan for 1 minute, until it turns brick red.", heat: "Medium", time: "1 min" },
                { text: "Pour in the sauce, rinse the jar with the water and add it. Simmer uncovered, stirring every 2 minutes, until a spoon dragged through leaves a channel that fills slowly.", heat: "Medium", time: "5–8 min", timer: 6 },
                { text: "While the sauce thickens, put the bread in the toaster and put the white cheese on your plate." },
              ],
            },
          },
        ],
      },
    ],
    // Topping steps go in after the sauce and before the eggs.
    toppingSlots: { cook: 0 },
    toppings: [
      {
        id: "spiced-chicken",
        name: "Spiced ground chicken",
        emoji: "🍗",
        time: 3,
        nutrition: { kcal: 295, protein: 30, carbs: 6, fat: 18 },
        nutritionNote: "1 box (about 160 g) of leftover spiced chicken per portion",
        ingredients: [
          { group: "Spiced chicken (whole pan)", items: [
            { qty: 320, unit: "g", name: "cooked spiced ground chicken", note: "2 boxes left over from the hummus topping" },
          ]},
        ],
        steps: {
          cook: [
            { text: "Stir the spiced chicken into the sauce and break up any clumps. After 1 minute, push some into a mound and probe it: as soon as it reads 74 °C, turn the heat to low and go on to the eggs.", heat: "Medium", time: "1–3 min" },
          ],
        },
      },
    ],
    ingredients: [
      { group: "Eggs (whole pan)", items: [
        { qty: 4, name: "egg", plural: "eggs" },
      ]},
      { group: "To serve (your portion)", scale: "portion", items: [
        { qty: 2, unit: "slices", name: "whole-wheat bread", round: 0.5 },
        { qty: 100, unit: "g", name: "white cheese 5%" },
      ]},
    ],
    steps: {
      // The sauce steps come from the chosen sauce above; these are the steps both sauces share.
      stove: [
        { text: "Make 4 small hollows in the sauce with a spoon and crack an egg into each.", heat: "Low" },
        { text: "Cover and cook until the eggs are done the way you like: 4–5 minutes for runny yolks, 8–12 minutes for firm.", heat: "Low", time: "4–12 min", timer: 5 },
        { text: "Taste the sauce before adding any salt. Serve half the pan with the bread and white cheese." },
      ],
    },
    tip: "Crack each egg into a small cup first, then slide it into its hollow. The yolks stay whole and no shell ends up in the sauce. If the sauce tastes sour, a pinch of sugar fixes it; chopped parsley or coriander on top makes it look and taste fresher.",
  },

  /* ---------------------------------------------------------------
     3. Oven chicken thighs — a batch dish with a Ninja Combi version.
        Combi times come from the Ninja manual: Combi Meals builder
        (white rice 400 g + 950 ml water; chicken thighs 200 °C, 15–18 min;
        delicate veg in the last 5–7 min).
     --------------------------------------------------------------- */
  {
    id: "oven-chicken-thighs",
    emoji: "🍗",
    name: "Chicken Thighs in Silan & Soy with Rice",
    sections: ["lunch", "dinner"],
    tags: ["chicken"],
    time: 55,
    combiTime: 35,
    photo: "images/oven-chicken-thighs.jpg",
    intro: "Sticky, sweet-salty chicken thighs with rice and vegetables. One tray makes 5 portions for the week.",
    source: { label: "10dakot recipe", url: "https://www.10dakot.co.il/recipe/%d7%a4%d7%a8%d7%92%d7%99%d7%95%d7%aa-%d7%91%d7%aa%d7%a0%d7%95%d7%a8/" },
    batch: { makes: 5, unit: "tray", portion: { qty: 200, unit: "g", name: "raw chicken" } },
    nutrition: { kcal: 694, protein: 47, carbs: 85, fat: 17 },
    nutritionNote: "200 g chicken (weighed raw), 80 g rice (weighed dry) and 200 g vegetables.",
    ingredients: [
      { group: "Chicken (whole tray)", items: [
        { qty: 1, unit: "kg", name: "chicken thigh steaks (pargiot)", note: "boneless" },
      ]},
      { group: "Sauce (whole tray)", items: [
        { qty: 3, unit: "tbsp", name: "silan (date honey)" },
        { qty: 3, unit: "tbsp", name: "soy sauce" },
        { qty: 1, unit: "tbsp", name: "sweet chili sauce" },
        { qty: 1, unit: "tbsp", name: "olive or canola oil" },
        { qty: 2, name: "garlic clove", plural: "garlic cloves", note: "crushed" },
        { qty: 1, unit: "tsp", name: "dried parsley or coriander", note: "both together is best" },
        { name: "black pepper", note: "a pinch" },
      ]},
      { group: "Rice (5 portions)", items: [
        { qty: 400, unit: "g", name: "white rice", note: "weighed dry, rinsed" },
        { qty: 0.5, unit: "tsp", name: "salt" },
        { name: "water", note: "amount is in the steps; it differs for the stove and the Combi" },
      ]},
      { group: "Vegetables (your portion)", scale: "portion", items: [
        { qty: 200, unit: "g", name: "vegetables", note: "broccoli, green beans or carrot" },
        { name: "salt", note: "a pinch" },
      ]},
    ],
    steps: {
      stove: [
        { text: "Heat the oven.", heat: "200 °C" },
        { text: "Cut each thigh steak in half across, not lengthwise, so the pieces stay thick and don't dry out." },
        { text: "Mix all the sauce ingredients in a bowl. Add the chicken and mix until every piece is coated." },
        { text: "Move the chicken and sauce to a medium baking dish, cover with aluminium foil and bake.", heat: "200 °C", time: "30 min", timer: 30 },
        { text: "While the chicken bakes, rinse the rice in a sieve until the water runs clear." },
        { text: "Put the rice, the salt and 700 ml boiling water in a pot. Bring to a boil, cover, then turn to the lowest heat.", heat: "High, then lowest", time: "15 min", timer: 15 },
        { text: "Turn off the rice and leave it covered. Don't lift the lid.", time: "10 min", timer: 10 },
        { text: "Take the foil off the chicken. Raise the oven and roast until browned: 10 minutes for light colour, 15 for dark caramel. Not longer, or the sugars burn.", heat: "230 °C", time: "10–15 min", timer: 12 },
        { text: "While the chicken browns, cut the vegetables. Cook them in a covered pan with 3 tbsp water and the salt until bright and just tender.", heat: "Medium", time: "5–6 min", timer: 6 },
        { text: "Fluff the rice with a fork. Plate your portion of chicken with rice and vegetables. Keep the rest in closed boxes in the fridge for up to 3 days." },
      ],
      combi: [
        { text: "Cut each thigh steak in half across, not lengthwise, so the pieces stay thick and don't dry out." },
        { text: "Mix all the sauce ingredients in a bowl. Add the chicken and mix until every piece is coated." },
        { text: "Rinse the rice until the water runs clear. Put it in the Combi Pan with the salt and 950 ml water and stir. (Ninja's chart also adds 1 tbsp oil; it's left out here to save 120 kcal.)" },
        { text: "Slide the Combi Pan into Level 1 (bottom)." },
        { text: "Lay the chicken on the Bake Tray in a single layer, pieces can touch. Slide it into Level 2 (top)." },
        { text: "Close the door. Flip the SmartSwitch to COMBI COOKER, select COMBI MEALS, set 200 °C and 15 minutes, press START/STOP. The unit builds steam for 5–10 minutes before its timer starts. Don't open the door during the steam.", heat: "Combi Meals 200 °C", time: "15 min + steam" },
        { text: "While it cooks, cut the vegetables and toss them with the salt." },
        { text: "When the Ninja timer shows 6 minutes left, open the door and put the vegetables on the Bake Tray beside the chicken. Close the door.", heat: "Combi Meals 200 °C", time: "last 6 min" },
        { text: "When it beeps, check one piece of chicken: cooked through with clear juices (74 °C inside if you have a thermometer). Not done? Give it 3 more minutes.", time: "3 min if needed", timer: 3 },
        { text: "Fluff the rice with a fork. Plate your portion of chicken with rice and vegetables. Keep the rest in closed boxes in the fridge for up to 3 days." },
      ],
    },
    tip: "Before the browning step, spoon the sauce from the bottom of the dish back over the chicken. It cooks down into a sticky glaze on the meat instead of burning at the edges. Sprinkle sesame seeds and sliced green onion on top for crunch and colour.",
  },

  /* =================================================================
     BREAKFAST
     ================================================================= */

  {
    id: "overnight-oats",
    emoji: "🫙",
    name: "Overnight Oats with PRO Yogurt",
    sections: ["breakfast"],
    tags: ["oats", "dairy", "vegetarian"],
    time: 5,
    extraTime: "8 h in the fridge",
    photo: "images/overnight-oats.jpg",
    intro: "Mix it in the evening, eat it cold in the morning. A big jar that fills you up like a full breakfast.",
    source: { label: "Allrecipes recipe", url: "https://www.allrecipes.com/recipe/244251/no-cook-overnight-oatmeal/" },
    nutrition: { kcal: 663, protein: 38, carbs: 88, fat: 18 },
    nutritionNote: "1 jar with honey and granola.",
    ingredients: [
      { group: "Dry base", items: [
        { qty: 60, unit: "g", name: "rolled oats" },
        { qty: 10, unit: "g", name: "chia seeds" },
        { qty: 0.25, unit: "tsp", name: "ground cinnamon" },
      ]},
      { group: "Wet mix", items: [
        { qty: 200, unit: "g", name: "PRO yogurt, natural", note: "1 cup" },
        { qty: 150, unit: "ml", name: "milk 3%" },
        { qty: 1, unit: "tsp", name: "honey" },
      ]},
      { group: "Fruit", items: [
        { qty: 100, unit: "g", name: "frozen mixed berries", note: "straight from the freezer" },
      ]},
      { group: "Topping (in the morning)", items: [
        { qty: 20, unit: "g", name: "granola" },
      ]},
    ],
    steps: {
      stove: [
        { text: "In the evening, put the oats, chia seeds and cinnamon into a jar or box with a lid that holds at least 500 ml." },
        { text: "Add the PRO yogurt, milk and honey." },
        { text: "Close the lid and shake hard, or stir, until no dry oats are left.", time: "30 sec" },
        { text: "Add the frozen berries and fold them in gently." },
        { text: "Close it and put it in the fridge overnight.", time: "8 h or more" },
        { text: "In the morning, stir well. Too thick? Add a splash of milk." },
        { text: "Sprinkle the granola on top just before eating, so it stays crunchy." },
      ],
    },
    tip: "Make 3 jars at once on Sunday: they keep 3–4 days with fruit inside. Grate a little orange or lemon zest into the wet mix; it makes the berries taste brighter without adding calories.",
  },

  {
    id: "protein-overnight-oats",
    emoji: "🥣",
    name: "Protein Overnight Oats",
    sections: ["breakfast"],
    tags: ["oats", "dairy", "vegetarian"],
    time: 5,
    extraTime: "8 h in the fridge",
    photo: "images/protein-overnight-oats.jpg",
    intro: "The overnight oats with a scoop of whey instead of honey and granola: 62 g protein before your day starts.",
    source: { label: "Allrecipes recipe", url: "https://www.allrecipes.com/recipe/244251/no-cook-overnight-oatmeal/" },
    nutrition: { kcal: 702, protein: 62, carbs: 74, fat: 18 },
    nutritionNote: "1 jar with whey, no honey or granola.",
    ingredients: [
      { group: "Dry base", items: [
        { qty: 60, unit: "g", name: "rolled oats" },
        { qty: 10, unit: "g", name: "chia seeds" },
        { qty: 30, unit: "g", name: "whey protein", note: "1 scoop; vanilla or plain works best" },
        { qty: 0.25, unit: "tsp", name: "ground cinnamon" },
      ]},
      { group: "Wet mix", items: [
        { qty: 200, unit: "g", name: "PRO yogurt, natural", note: "1 cup" },
        { qty: 200, unit: "ml", name: "milk 3%" },
      ]},
      { group: "Fruit", items: [
        { qty: 100, unit: "g", name: "frozen mixed berries", note: "straight from the freezer" },
      ]},
    ],
    steps: {
      stove: [
        { text: "In the evening, put the oats, chia seeds, whey and cinnamon into a jar or box with a lid that holds at least 500 ml." },
        { text: "Add the PRO yogurt and milk." },
        { text: "Close the lid and shake hard until there are no powder lumps or dry oats left.", time: "30 sec" },
        { text: "Add the frozen berries and fold them in gently." },
        { text: "Close it and put it in the fridge overnight.", time: "8 h or more" },
        { text: "In the morning, stir well. Too thick? Add a splash of milk." },
      ],
    },
    tip: "Shake the dry part first (oats, chia, whey, cinnamon) before adding anything wet. The whey spreads out between the oats and won't form lumps when the yogurt and milk go in.",
  },

  {
    id: "oatmeal-whey-banana",
    emoji: "🍌",
    name: "Warm Oatmeal with Whey & Banana",
    sections: ["breakfast"],
    tags: ["oats", "dairy", "vegetarian"],
    time: 8,
    photo: "images/oatmeal-whey-banana.jpg",
    intro: "Creamy 5-minute oatmeal with protein stirred in at the end. No stove? Microwave the oats and milk in a big bowl: 1 minute, stir, then 1–1½ minutes more.",
    nutrition: { kcal: 603, protein: 41, carbs: 82, fat: 13 },
    nutritionNote: "1 bowl with whey and a banana.",
    ingredients: [
      { group: "Oatmeal", items: [
        { qty: 60, unit: "g", name: "rolled oats" },
        { qty: 250, unit: "ml", name: "milk 3%" },
        { name: "salt", note: "a pinch, cooked with the milk" },
      ]},
      { group: "Stirred in off the heat", items: [
        { qty: 30, unit: "g", name: "whey protein", note: "1 scoop" },
        { name: "milk", note: "a splash, to loosen the whey" },
      ]},
      { group: "Toppings", items: [
        { qty: 1, name: "banana", plural: "bananas", note: "sliced" },
        { name: "ground cinnamon", note: "a sprinkle" },
      ]},
    ],
    steps: {
      stove: [
        { text: "Pour the milk into a small pot with the salt and heat until it bubbles at the edges.", heat: "Medium", time: "3 min" },
        { text: "Stir in the oats and lower the heat.", heat: "Medium-low" },
        { text: "Cook, stirring often so it doesn't stick, until thick and creamy.", heat: "Medium-low", time: "4–5 min", timer: 5 },
        { text: "While it cooks, slice the banana." },
        { text: "Take the pot off the heat and let it rest. It thickens as it sits.", time: "1 min" },
        { text: "Stir in the whey with a splash of milk, off the heat. Whey added while boiling turns lumpy." },
        { text: "Top with the banana and cinnamon and eat." },
      ],
    },
    tip: "Toast the dry oats in the empty pot for 2 minutes before adding the milk. They smell nutty and the oatmeal tastes much richer. On a training day, add 1 tbsp peanut butter (+95 kcal).",
  },

  {
    id: "cheese-toast",
    emoji: "🧀",
    name: "Cheese Toast with Salad & Labane",
    sections: ["breakfast", "brunch"],
    tags: ["cheese", "vegetarian"],
    time: 10,
    combiTime: 12,
    photo: "images/cheese-toast.jpg",
    intro: "Crisp toast with melted cheese and tomato, a fresh salad and a spoon of labane on the side.",
    nutrition: { kcal: 471, protein: 32, carbs: 47, fat: 14 },
    nutritionNote: "2 toasts, a salad with 1 tsp olive oil and 2 tbsp labane.",
    ingredients: [
      { group: "Toast", items: [
        { qty: 2, unit: "slices", name: "whole-wheat bread", round: 0.5 },
        { qty: 60, unit: "g", name: "yellow cheese 9%", note: "sliced" },
        { name: "tomato", note: "a few slices" },
      ]},
      { group: "On top of the toast", items: [
        { name: "za'atar, oregano or black pepper", note: "a sprinkle, after it comes out" },
      ]},
      { group: "Salad", items: [
        { qty: 250, unit: "g", name: "vegetables", note: "cucumber, tomato, pepper" },
        { qty: 1, unit: "tsp", name: "olive oil" },
        { name: "lemon juice", note: "a squeeze" },
        { name: "salt", note: "a pinch" },
      ]},
      { group: "On the side", items: [
        { qty: 30, unit: "g", name: "labane 5%", note: "about 2 tbsp" },
      ]},
    ],
    steps: {
      stove: [
        { text: "Lay the cheese and tomato slices on the bread." },
        { text: "Put the slices in a dry non-stick pan.", heat: "Medium-low" },
        { text: "Cover with a lid and cook until the bottom is crisp and the cheese melts.", heat: "Medium-low", time: "3–4 min", timer: 4 },
        { text: "While it cooks, chop the salad vegetables and dress them with the olive oil, lemon juice and salt." },
        { text: "Sprinkle the za'atar, oregano or black pepper on the toast. Serve with the salad and the labane." },
      ],
      combi: [
        { text: "Flip the SmartSwitch to AIR FRY/HOB, select BAKE, set 200 °C and 6 minutes, press START/STOP. The unit preheats for about 3 minutes first.", heat: "Bake 200 °C" },
        { text: "While it preheats, lay the cheese and tomato slices on the bread and put the slices on the Bake Tray." },
        { text: "When preheating ends, slide the Bake Tray into Level 2 and close the door. Bake until the cheese bubbles and the edges are golden.", heat: "Bake 200 °C", time: "5–6 min" },
        { text: "While it bakes, chop the salad vegetables and dress them with the olive oil, lemon juice and salt." },
        { text: "Sprinkle the za'atar, oregano or black pepper on the toast. Serve with the salad and the labane." },
      ],
    },
    tip: "Put the tomato slices under the cheese, not on top. The cheese melts over them and holds them in place, and the bread stays crisp instead of getting soggy from tomato juice.",
  },

  {
    id: "tuna-toast",
    emoji: "🥪",
    name: "Tuna Toast with Labane",
    sections: ["breakfast", "dinner"],
    tags: ["fish"],
    time: 5,
    photo: "images/tuna-toast.jpg",
    intro: "Your own recipe: spiced tuna on toast spread with labane. 5 minutes, 41 g protein.",
    nutrition: { kcal: 587, protein: 41, carbs: 52, fat: 23 },
    nutritionNote: "2 toasts with tuna in oil and a side salad. Without the salad: 487 kcal, 38 g protein.",
    ingredients: [
      { group: "Tuna mix", items: [
        { qty: 1, unit: "can", name: "tuna in oil", note: "drained well and pressed" },
        { qty: 1, unit: "tbsp", name: "light mayo" },
        { qty: 1, unit: "tbsp", name: "ketchup" },
        { qty: 0.25, unit: "tsp", name: "paprika" },
        { qty: 0.25, unit: "tsp", name: "garlic powder" },
        { name: "chili powder", note: "a pinch" },
      ]},
      { group: "Toast", items: [
        { qty: 2, unit: "slices", name: "whole-wheat bread", round: 0.5 },
        { qty: 30, unit: "g", name: "labane 5%", note: "about 2 tbsp" },
      ]},
      { group: "Side salad", items: [
        { qty: 250, unit: "g", name: "vegetables", note: "cucumber, tomato, pepper" },
        { qty: 1, unit: "tsp", name: "olive oil" },
        { name: "lemon juice and salt", note: "a little" },
      ]},
    ],
    steps: {
      stove: [
        { text: "Drain the tuna well. Press it with a fork against the side of the can to squeeze out the oil." },
        { text: "Put the tuna in a bowl with the mayo, ketchup, paprika, garlic powder and chili powder. Mix well." },
        { text: "Toast the bread if you like it crunchy.", time: "2–3 min" },
        { text: "While it toasts, chop the salad and dress it with the olive oil, lemon juice and salt." },
        { text: "Spread the labane on the bread, pile the tuna mix on top and serve with the salad." },
      ],
    },
    tip: "Add a few drops of lemon juice and some chopped pickle or red onion to the tuna mix. The sourness cuts through the oil and makes it taste fresh instead of heavy.",
  },

  /* =================================================================
     BRUNCH
     ================================================================= */

  {
    id: "labane-plate",
    emoji: "🫓",
    name: "Labane Plate with Eggs & Pita",
    sections: ["brunch", "dinner"],
    tags: ["eggs", "cheese", "vegetarian"],
    time: 15,
    photo: "images/labane-plate.jpg",
    intro: "An Israeli-style plate: labane with olive oil and za'atar, boiled eggs, chopped salad and warm pita.",
    nutrition: { kcal: 585, protein: 30, carbs: 64, fat: 21 },
    nutritionNote: "100 g labane, 2 eggs, a chopped salad and 1 pita.",
    ingredients: [
      { group: "Labane", items: [
        { qty: 100, unit: "g", name: "labane 5%" },
        { qty: 1, unit: "tsp", name: "olive oil", note: "drizzled on top" },
        { name: "za'atar", note: "a good sprinkle on top" },
      ]},
      { group: "Eggs", items: [
        { qty: 2, name: "egg", plural: "eggs" },
      ]},
      { group: "Chopped salad", items: [
        { qty: 200, unit: "g", name: "vegetables", note: "cucumber, tomato, a little onion" },
        { name: "lemon juice and salt", note: "a little" },
      ]},
      { group: "To serve", items: [
        { qty: 1, name: "pita", plural: "pitas", round: 0.5 },
      ]},
    ],
    steps: {
      stove: [
        { text: "Bring a small pot of water to a boil.", heat: "High" },
        { text: "Lower the eggs in gently with a spoon and boil.", heat: "Medium-high", time: "10 min", timer: 10 },
        { text: "While the eggs cook, chop the vegetables small and season them with lemon juice and salt." },
        { text: "Spread the labane on a plate with the back of a spoon, drizzle the olive oil and sprinkle the za'atar." },
        { text: "Move the eggs to cold water, then peel and halve them.", time: "2 min", timer: 2 },
        { text: "Warm the pita in a dry pan or toaster and serve everything together.", heat: "Medium", time: "1 min" },
      ],
    },
    tip: "Make a swirl in the labane with the spoon before adding the oil. The oil pools in the grooves and every bite gets some. A few olives or a pinch of sumac make the plate look like a café brunch.",
  },

  {
    id: "egg-salad",
    emoji: "🥚",
    name: "Egg Salad on Toast",
    sections: ["brunch", "dinner"],
    tags: ["eggs", "vegetarian"],
    time: 15,
    photo: "images/egg-salad.jpg",
    intro: "Creamy egg salad made lighter with labane, on whole-wheat toast with a salad on the side.",
    nutrition: { kcal: 595, protein: 37, carbs: 47, fat: 27 },
    nutritionNote: "3 eggs + 2 extra whites, on 2 slices of bread, with a salad and 1 tsp olive oil.",
    ingredients: [
      { group: "Eggs", items: [
        { qty: 3, name: "egg", plural: "eggs" },
        { qty: 2, name: "egg white", plural: "egg whites", note: "boil 2 more eggs and keep only the whites" },
      ]},
      { group: "Dressing", items: [
        { qty: 1, unit: "tbsp", name: "light mayo" },
        { qty: 1, unit: "tbsp", name: "labane" },
        { qty: 1, name: "green onion", plural: "green onions", note: "chopped, or a little fresh dill" },
        { name: "salt and black pepper", note: "to taste" },
        { name: "Dijon mustard or chopped pickle", note: "optional, ½ tsp mustard" },
      ]},
      { group: "To serve", items: [
        { qty: 2, unit: "slices", name: "whole-wheat bread", round: 0.5 },
        { qty: 200, unit: "g", name: "salad vegetables" },
        { qty: 1, unit: "tsp", name: "olive oil", note: "for the salad" },
      ]},
    ],
    steps: {
      stove: [
        { text: "Bring a pot of water to a boil.", heat: "High" },
        { text: "Lower all the eggs in with a spoon and boil.", heat: "Medium-high", time: "10 min", timer: 10 },
        { text: "While they boil, chop the green onion and the salad vegetables." },
        { text: "Move the eggs to cold water.", time: "2 min", timer: 2 },
        { text: "Peel the eggs. For the extra whites, cut those eggs and remove the yolks." },
        { text: "Mash the eggs and whites with a fork, leaving some small chunks." },
        { text: "Mix in the mayo, labane, green onion, salt and pepper (and mustard or pickle if you like)." },
        { text: "Toast the bread, pile on the egg salad, and serve with the salad dressed with the olive oil." },
      ],
    },
    tip: "Mash the eggs while they are still a little warm. The yolks blend into the dressing and make it creamy, so you need less mayo. It keeps 2 days in a closed box in the fridge.",
  },

  /* =================================================================
     LUNCH
     ================================================================= */

  {
    id: "chicken-rice-bowl",
    emoji: "🍚",
    name: "Chicken Breast & Rice Bowl",
    sections: ["lunch"],
    tags: ["chicken"],
    time: 30,
    combiTime: 35,
    photo: "images/chicken-rice-bowl.jpg",
    intro: "The basic high-protein lunch: juicy chicken breast, rice and vegetables. 54 g protein.",
    nutrition: { kcal: 680, protein: 54, carbs: 73, fat: 18 },
    nutritionNote: "200 g chicken breast (weighed raw), 80 g rice (weighed dry), 200 g vegetables and 1 tbsp olive oil.",
    ingredients: [
      { group: "Chicken", items: [
        { qty: 200, unit: "g", name: "chicken breast" },
        { qty: 0.5, unit: "tbsp", name: "olive oil" },
      ]},
      { group: "Chicken seasoning (suggested)", items: [
        { qty: 0.5, unit: "tsp", name: "sweet paprika" },
        { qty: 0.25, unit: "tsp", name: "garlic powder" },
        { name: "salt and black pepper", note: "a pinch of each" },
      ]},
      { group: "Rice", items: [
        { qty: 80, unit: "g", name: "white rice", note: "weighed dry, rinsed" },
        { qty: 150, unit: "ml", name: "boiling water" },
        { name: "salt", note: "a pinch" },
      ]},
      { group: "Vegetables", items: [
        { qty: 200, unit: "g", name: "vegetables", note: "broccoli, zucchini, pepper or green beans" },
        { qty: 0.5, unit: "tbsp", name: "olive oil" },
        { name: "salt", note: "a pinch" },
      ]},
    ],
    steps: {
      stove: [
        { text: "Rinse the rice until the water runs clear. Put it in a small pot with the boiling water and salt, bring to a boil, cover, then turn to the lowest heat.", heat: "High, then lowest", time: "15 min", timer: 15 },
        { text: "Take the chicken out of the fridge. If it's thicker than 2 cm, cut it in half through the side so it cooks evenly." },
        { text: "Rub the chicken with its olive oil, sweet paprika, garlic powder, salt and pepper." },
        { text: "Heat a non-stick or grill pan and cook the chicken without moving it.", heat: "Medium-high", time: "5 min", timer: 5 },
        { text: "Flip the chicken and cook the other side until cooked through (74 °C inside).", heat: "Medium", time: "4–5 min", timer: 5 },
        { text: "Turn off the rice and leave it covered. Don't lift the lid.", time: "10 min", timer: 10 },
        { text: "Move the chicken to a board to rest. In the same pan, cook the vegetables with their olive oil and salt until tender-crisp.", heat: "Medium-high", time: "4–5 min", timer: 5 },
        { text: "Slice the chicken, fluff the rice and build your bowl." },
      ],
      combi: [
        { text: "Rub the chicken with its olive oil, sweet paprika, garlic powder, salt and pepper." },
        { text: "Pour 240 ml water into the Combi Pan and slide it into Level 1 (bottom)." },
        { text: "Put the chicken on the Bake Tray and slide it into Level 2 (top)." },
        { text: "Close the door. Flip the SmartSwitch to COMBI COOKER, select COMBI CRISP, set 190 °C and 18 minutes, press START/STOP. Steam builds for 5–10 minutes before the timer starts.", heat: "Combi Crisp 190 °C", time: "15–20 min + steam" },
        { text: "While it cooks, start the rice on the stove: rinse it, put it in a small pot with the boiling water and salt, boil, cover, then lowest heat.", heat: "High, then lowest", time: "15 min", timer: 15 },
        { text: "Turn off the rice and leave it covered.", time: "10 min", timer: 10 },
        { text: "Cook the vegetables in a pan with their olive oil and salt until tender-crisp.", heat: "Medium-high", time: "4–5 min", timer: 5 },
        { text: "When the Ninja beeps, check the chicken: 74 °C inside or clear juices. Let it rest 3 minutes, slice it, and build your bowl.", time: "3 min", timer: 3 },
      ],
    },
    tip: "Salt the chicken 30 minutes before cooking (or the night before) and keep it in the fridge. The salt soaks in and the breast stays juicy instead of dry. Always let it rest 3 minutes before slicing so the juices stay inside.",
  },

  {
    id: "chili-con-carne",
    emoji: "🌶️",
    name: "Chili con Carne with Rice",
    sections: ["lunch", "dinner"],
    tags: ["red-meat", "legumes"],
    time: 35,
    photo: "images/chili-con-carne.jpg",
    intro: "Lean beef, beans and tomatoes with warm spices, over rice. A big, filling plate for 760 kcal.",
    nutrition: { kcal: 760, protein: 51, carbs: 105, fat: 14 },
    nutritionNote: "150 g lean beef 5% (weighed raw) with beans and tomato, and 80 g rice (weighed dry).",
    ingredients: [
      { group: "Base", items: [
        { qty: 1, unit: "tsp", name: "oil" },
        { qty: 100, unit: "g", name: "onion and red pepper", note: "chopped" },
        { qty: 2, name: "garlic clove", plural: "garlic cloves", note: "crushed" },
        { qty: 150, unit: "g", name: "lean ground beef 5%" },
      ]},
      { group: "Spices (into the pan with the beef)", items: [
        { qty: 1, unit: "tsp", name: "ground cumin" },
        { qty: 1, unit: "tsp", name: "sweet paprika" },
        { qty: 0.5, unit: "tsp", name: "chili powder", note: "more if you like it hot" },
        { name: "salt and black pepper", note: "to taste" },
      ]},
      { group: "Sauce", items: [
        { qty: 200, unit: "g", name: "crushed tomatoes" },
        { qty: 120, unit: "g", name: "kidney beans", note: "drained and rinsed" },
      ]},
      { group: "Rice", items: [
        { qty: 80, unit: "g", name: "white rice", note: "weighed dry, rinsed" },
        { qty: 150, unit: "ml", name: "boiling water" },
        { name: "salt", note: "a pinch" },
      ]},
    ],
    steps: {
      stove: [
        { text: "Rinse the rice. Put it in a small pot with the boiling water and salt, bring to a boil, cover, then turn to the lowest heat.", heat: "High, then lowest", time: "15 min", timer: 15 },
        { text: "Heat the oil in a pan and fry the onion and red pepper until soft.", heat: "Medium", time: "4 min", timer: 4 },
        { text: "Add the beef and the garlic. Break the meat up with a spoon and cook until it's no longer pink.", heat: "Medium-high", time: "5 min", timer: 5 },
        { text: "Add the cumin, sweet paprika, chili powder, salt and pepper. Stir so the spices fry in the meat juices.", heat: "Medium-high", time: "30 sec" },
        { text: "Turn off the rice and leave it covered.", time: "10 min", timer: 10 },
        { text: "Add the crushed tomatoes and kidney beans, stir, and simmer uncovered until thick.", heat: "Low", time: "12–15 min", timer: 13 },
        { text: "Taste and add salt if needed. Serve the chili over the rice." },
      ],
    },
    tip: "Frying the spices in the meat for 30 seconds before the tomatoes go in is what makes chili taste deep instead of dusty. For an extra layer, add 1 tsp cocoa powder or a square of dark chocolate with the tomatoes.",
  },

  {
    id: "chicken-pasta",
    emoji: "🍝",
    name: "Chicken Pasta in Tomato Sauce",
    sections: ["lunch", "dinner"],
    tags: ["chicken", "cheese"],
    time: 25,
    photo: "images/chicken-pasta.jpg",
    intro: "Pasta with chicken, vegetables and a quick tomato sauce, finished with parmesan. 68 g protein.",
    nutrition: { kcal: 785, protein: 68, carbs: 92, fat: 13 },
    nutritionNote: "100 g pasta (weighed dry), 200 g chicken breast (weighed raw), 200 g vegetables and 15 g parmesan.",
    ingredients: [
      { group: "Pasta", items: [
        { qty: 100, unit: "g", name: "pasta", note: "weighed dry" },
        { name: "salt", note: "for the pasta water" },
      ]},
      { group: "Chicken", items: [
        { qty: 200, unit: "g", name: "chicken breast", note: "cut into 2 cm cubes" },
        { qty: 1, unit: "tsp", name: "olive oil" },
        { name: "salt and black pepper", note: "a pinch of each" },
      ]},
      { group: "Sauce", items: [
        { qty: 200, unit: "g", name: "vegetables", note: "onion, zucchini, pepper or mushrooms, chopped" },
        { qty: 2, name: "garlic clove", plural: "garlic cloves", note: "crushed" },
        { qty: 200, unit: "g", name: "crushed tomatoes" },
      ]},
      { group: "Sauce seasoning (suggested)", items: [
        { qty: 1, unit: "tsp", name: "dried oregano or basil" },
        { name: "chili flakes", note: "optional, a pinch" },
        { name: "salt", note: "to taste" },
      ]},
      { group: "To finish", items: [
        { qty: 15, unit: "g", name: "parmesan", note: "grated" },
      ]},
    ],
    steps: {
      stove: [
        { text: "Bring a big pot of water to a boil and salt it well.", heat: "High", time: "8 min" },
        { text: "While the water heats, cut the chicken and chop the vegetables. Season the chicken with salt and pepper." },
        { text: "Heat the olive oil in a wide pan and brown the chicken cubes.", heat: "Medium-high", time: "5 min", timer: 5 },
        { text: "Add the pasta to the boiling water and cook to the time on the packet.", heat: "High", time: "9–11 min", timer: 10 },
        { text: "Add the vegetables and garlic to the chicken and cook until soft.", heat: "Medium", time: "4 min", timer: 4 },
        { text: "Add the crushed tomatoes, oregano or basil and chili flakes. Simmer while the pasta finishes.", heat: "Medium-low", time: "5 min" },
        { text: "Before draining, keep a cup of pasta water. Drain the pasta and add it to the sauce." },
        { text: "Stir, adding a splash of pasta water until the sauce coats the pasta. Taste for salt, plate it and top with the parmesan." },
      ],
    },
    tip: "The splash of starchy pasta water is the secret of restaurant pasta: it makes the tomato sauce glossy and stick to every piece without adding any oil.",
  },

  {
    id: "pan-fried-pargiot",
    emoji: "🧅",
    name: "Pan-Fried Chicken Thighs with Rice",
    sections: ["lunch", "dinner"],
    tags: ["chicken"],
    time: 30,
    photo: "images/pan-fried-pargiot.jpg",
    intro: "Spiced chicken thigh pieces with golden onions, ready in about 15 minutes. Also great in a pita.",
    source: { label: "10dakot recipe", url: "https://www.10dakot.co.il/recipe/%d7%a4%d7%a8%d7%92%d7%99%d7%95%d7%aa-%d7%91%d7%9e%d7%97%d7%91%d7%aa/" },
    batch: { makes: 3, unit: "pan", portion: { qty: 165, unit: "g", name: "raw chicken" } },
    nutrition: { kcal: 671, protein: 38, carbs: 69, fat: 26 },
    nutritionNote: "⅓ of the pan with 80 g rice (weighed dry).",
    ingredients: [
      { group: "Chicken (whole pan)", items: [
        { qty: 500, unit: "g", name: "boneless chicken thighs (pargiot)", note: "cut into small pieces" },
        { qty: 1, unit: "tbsp", name: "oil", note: "for frying the chicken" },
      ]},
      { group: "Chicken spices (whole pan)", items: [
        { qty: 1, unit: "tsp", name: "sweet paprika" },
        { qty: 0.25, unit: "tsp", name: "turmeric" },
        { qty: 0.25, unit: "tsp", name: "ground cumin" },
        { qty: 0.33, unit: "tsp", name: "salt" },
        { name: "black pepper", note: "a pinch" },
        { name: "hot paprika", note: "optional, ¼ tsp" },
      ]},
      { group: "Onion (whole pan)", items: [
        { qty: 1, unit: "large", name: "onion", note: "halved and cut into thin half-rings" },
        { qty: 2, unit: "tbsp", name: "oil", note: "for frying the onion" },
      ]},
      { group: "Rice (your portion)", scale: "portion", items: [
        { qty: 80, unit: "g", name: "white rice", note: "weighed dry, rinsed" },
        { qty: 150, unit: "ml", name: "boiling water" },
        { name: "salt", note: "a pinch" },
      ]},
    ],
    steps: {
      stove: [
        { text: "Rinse the rice. Put it in a small pot with the boiling water and salt, bring to a boil, cover, then turn to the lowest heat.", heat: "High, then lowest", time: "15 min", timer: 15 },
        { text: "Heat a wide pan with the onion's oil and fry the onion until golden. Move it to a plate.", heat: "Medium", time: "8 min", timer: 8 },
        { text: "While the onion fries, season the chicken pieces with the sweet paprika, turmeric, cumin, salt, black pepper and hot paprika." },
        { text: "Turn off the rice and leave it covered.", time: "10 min", timer: 10 },
        { text: "Heat the chicken's oil in the same pan. Fry the chicken uncovered, about 2 minutes on each side.", heat: "Medium", time: "4 min", timer: 4 },
        { text: "Put the onion back in and stir.", heat: "Medium" },
        { text: "Cover and cook, stirring now and then, until the chicken is cooked through.", heat: "Medium-low", time: "5 min", timer: 5 },
        { text: "Taste, add salt if needed, and serve your third of the pan with the rice." },
      ],
    },
    tip: "Don't crowd the pan: if the pieces touch, they steam instead of browning. Fry in two rounds if your pan is small, and squeeze a little lemon over the chicken just before serving.",
  },

  {
    id: "salmon-potatoes",
    emoji: "🐟",
    name: "Salmon in Silan & Soy with Potatoes",
    sections: ["lunch", "dinner"],
    tags: ["fish"],
    time: 55,
    combiTime: 40,
    photo: "images/salmon-potatoes.jpg",
    intro: "Glazed salmon on a tray of crispy potato and sweet potato cubes. A full meal on one tray.",
    source: { label: "10dakot recipe", url: "https://www.10dakot.co.il/recipe/%d7%a1%d7%9c%d7%9e%d7%95%d7%9f-%d7%91%d7%a1%d7%99%d7%9c%d7%90%d7%9f-%d7%95%d7%a1%d7%95%d7%99%d7%94/" },
    batch: { makes: 4, unit: "tray" },
    nutrition: { kcal: 646, protein: 41, carbs: 38, fat: 35 },
    nutritionNote: "1 salmon fillet with ¼ of the potatoes.",
    ingredients: [
      { group: "Potatoes (whole tray)", items: [
        { qty: 1, unit: "large", name: "potato", note: "cut into cubes up to 1.5 cm" },
        { qty: 1, unit: "large", name: "sweet potato (batata)", note: "cut into cubes up to 1.5 cm" },
      ]},
      { group: "Potato seasoning (whole tray)", items: [
        { qty: 2, unit: "tbsp", name: "oil" },
        { qty: 1, unit: "tbsp", name: "silan" },
        { qty: 0.25, unit: "tsp", name: "salt" },
        { name: "black pepper", note: "a pinch" },
      ]},
      { group: "Salmon (whole tray)", items: [
        { qty: 4, name: "salmon fillet", plural: "salmon fillets", note: "700–800 g in total" },
      ]},
      { group: "Salmon glaze (whole tray)", items: [
        { qty: 1.5, unit: "tbsp", name: "silan" },
        { qty: 2, unit: "tbsp", name: "soy sauce" },
        { qty: 1, unit: "tbsp", name: "oil" },
        { qty: 1, unit: "tbsp", name: "lemon juice" },
        { qty: 2, name: "garlic clove", plural: "garlic cloves", note: "crushed" },
        { qty: 0.25, unit: "tsp", name: "salt" },
        { name: "black pepper", note: "a pinch" },
      ]},
      { group: "To serve", items: [
        { name: "green onion", note: "optional, chopped" },
      ]},
    ],
    steps: {
      stove: [
        { text: "Heat the oven. Line a very large baking tray with baking paper.", heat: "190 °C" },
        { text: "Mix the potato and sweet potato cubes with their oil, silan, salt and pepper, and spread them on the tray." },
        { text: "Bake the potatoes.", heat: "190 °C", time: "25 min", timer: 25 },
        { text: "While they bake, mix the salmon glaze in a small bowl." },
        { text: "Take the tray out. Place the salmon skin-side down between the potatoes and brush the glaze over it. Keep about 1 tbsp of glaze aside." },
        { text: "Bake again.", heat: "190 °C", time: "15 min", timer: 15 },
        { text: "Brush the rest of the glaze on the salmon and bake once more.", heat: "190 °C", time: "5–7 min", timer: 6 },
        { text: "Sprinkle green onion on top if you like and serve 1 fillet with a quarter of the potatoes." },
      ],
      combi: [
        { text: "Mix the potato and sweet potato cubes with their oil, silan, salt and pepper." },
        { text: "Pour 240 ml water into the Combi Pan and slide it into Level 1 (bottom)." },
        { text: "Spread the potatoes on the Bake Tray, leaving room for the salmon, and slide it into Level 2 (top)." },
        { text: "Close the door. Flip the SmartSwitch to COMBI COOKER, select COMBI CRISP, set 205 °C and 22 minutes, press START/STOP. Steam builds for 5–10 minutes before the timer starts.", heat: "Combi Crisp 205 °C", time: "22 min + steam" },
        { text: "While it cooks, mix the salmon glaze and brush it over the fillets. Keep about 1 tbsp aside." },
        { text: "When the Ninja timer shows 8 minutes left, open the door and lay the salmon skin-side down on the tray between the potatoes. Close the door.", heat: "Combi Crisp 205 °C", time: "last 8 min" },
        { text: "When it beeps, brush the rest of the glaze on the salmon. Sprinkle green onion on top and serve 1 fillet with a quarter of the potatoes." },
      ],
    },
    tip: "Take the salmon out when the thickest part just flakes and is still slightly pink in the middle. It keeps cooking on the plate. Salmon is higher in fat than chicken, so keep the rest of that day lean: tuna salad or cottage cheese for dinner.",
  },

  {
    id: "cold-chicken-salad",
    emoji: "🥗",
    name: "Cold Chicken Salad with Vinaigrette",
    sections: ["lunch", "dinner"],
    tags: ["chicken"],
    time: 15,
    photo: "images/cold-chicken-salad.jpg",
    intro: "Crunchy vegetables, soy-honey chicken strips and a honey-mustard vinaigrette. 50 g protein.",
    source: { label: "10dakot recipe", url: "https://www.10dakot.co.il/recipe/%d7%a1%d7%9c%d7%98-%d7%a2%d7%95%d7%a3-%d7%a7%d7%a8/" },
    nutrition: { kcal: 501, protein: 50, carbs: 27, fat: 22 },
    nutritionNote: "the higher-protein version with 200 g chicken. For lunch, add 2 slices of bread: 681 kcal, 58 g protein.",
    ingredients: [
      { group: "Vegetables", items: [
        { qty: 4, name: "lettuce leaf", plural: "lettuce leaves", note: "cut up" },
        { qty: 0.5, name: "small red onion", plural: "small red onions", note: "thinly sliced" },
        { qty: 1, name: "cucumber", plural: "cucumbers", note: "cut into sticks" },
        { qty: 5, name: "cherry tomato", plural: "cherry tomatoes", note: "halved" },
        { qty: 0.5, name: "carrot", plural: "carrots", note: "coarsely grated" },
      ]},
      { group: "Chicken", items: [
        { qty: 200, unit: "g", name: "chicken breast", note: "cut into strips 1.5 cm thick" },
        { qty: 1, unit: "tsp", name: "oil", note: "for frying" },
      ]},
      { group: "Chicken marinade", items: [
        { qty: 1, unit: "tbsp", name: "soy sauce" },
        { qty: 0.5, unit: "tsp", name: "honey" },
        { name: "salt and black pepper", note: "a little" },
      ]},
      { group: "Vinaigrette", items: [
        { qty: 1, unit: "tbsp", name: "olive oil" },
        { qty: 1, unit: "tbsp", name: "lemon juice" },
        { qty: 1, unit: "tsp", name: "honey" },
        { qty: 0.5, unit: "tsp", name: "Dijon mustard" },
        { qty: 0.5, name: "garlic clove", plural: "garlic cloves", note: "crushed" },
        { qty: 0.25, unit: "tsp", name: "salt" },
        { name: "black pepper", note: "a pinch" },
      ]},
    ],
    steps: {
      stove: [
        { text: "Put all the vegetables in a bowl." },
        { text: "In a small bowl, mix the vinaigrette." },
        { text: "Season the chicken strips with the soy sauce, honey, salt and pepper." },
        { text: "Heat the oil in a grill pan or regular pan and fry the strips until browned and cooked through.", heat: "Medium", time: "2–3 min each side", timer: 5 },
        { text: "Pour the vinaigrette over the vegetables, put the chicken on top and serve right away." },
      ],
    },
    tip: "For a lunch box, pack the salad, the dressing and the chicken separately and mix just before eating, so the lettuce stays crisp. Toasted sesame or sunflower seeds on top add crunch for about 30 kcal a spoon.",
  },

  {
    id: "hummus-plate",
    emoji: "🧆",
    name: "Homemade Hummus Plate",
    sections: ["lunch"],
    tags: ["legumes"],
    time: 15,
    photo: "images/hummus-plate.jpg",
    intro: "Smooth homemade hummus with a chopped salad and warm pita. One batch of hummus covers about 7 plates. Add a topping below for protein.",
    source: { label: "10dakot recipe", url: "https://www.10dakot.co.il/recipe/%d7%97%d7%95%d7%9e%d7%95%d7%a1-%d7%91%d7%99%d7%aa%d7%99/" },
    batch: { makes: 7, unit: "hummus batch", portion: { qty: 100, unit: "g", name: "hummus" } },
    nutrition: { kcal: 545, protein: 20, carbs: 70, fat: 19 },
    nutritionNote: "100 g hummus, 1 pita and a chopped salad.",
    ingredients: [
      { group: "Hummus (whole batch, about 770 g)", items: [
        { qty: 1, unit: "can", name: "chickpeas", note: "550 g can, 290 g after draining" },
        { qty: 1, unit: "cup", name: "raw tahini" },
        { qty: 5, unit: "tbsp", name: "lemon juice" },
        { qty: 1, name: "garlic clove", plural: "garlic cloves" },
        { qty: 0.5, unit: "tsp", name: "salt" },
        { qty: 0.25, unit: "tsp", name: "ground cumin" },
        { qty: 0.67, unit: "cup", name: "cold water" },
      ]},
      { group: "On top of the hummus", items: [
        { name: "olive oil", note: "a few drops" },
        { name: "ground cumin or sweet paprika", note: "a sprinkle" },
        { name: "whole chickpeas", note: "a few, kept from the can" },
      ]},
      { group: "To serve (your portion)", scale: "portion", items: [
        { qty: 1, name: "pita", plural: "pitas", round: 0.5 },
        { qty: 150, unit: "g", name: "vegetables", note: "cucumber and tomato, finely chopped" },
        { name: "lemon juice and salt", note: "for the salad" },
      ]},
    ],
    steps: {
      stove: [
        { text: "Drain the chickpeas and rinse them under the tap. Keep a few whole ones for the top." },
        { text: "Put the chickpeas, tahini, lemon juice, garlic, salt, cumin and cold water in a food processor. Weak processor? Blend the chickpeas and garlic first, then add the rest." },
        { text: "Blend until completely smooth. Too thick: add water a spoon at a time. Too thin: add a little tahini.", time: "3–4 min" },
        { text: "Chop the salad and season it with lemon juice and salt." },
        { text: "Spread 100 g hummus on a plate, drizzle the olive oil, sprinkle cumin or paprika and add the whole chickpeas." },
        { text: "Warm the pita and serve with the salad. Keep the rest of the hummus in a closed box in the fridge for up to 5 days." },
      ],
    },
    // Topping steps go in before step 4 (the salad) and before step 6 (serving). Counting starts at 0.
    toppingSlots: { cook: 3, serve: 5 },
    toppings: [
      {
        id: "spiced-chicken",
        name: "Spiced ground chicken",
        emoji: "🍗",
        time: 35,
        nutrition: { kcal: 360, protein: 31, carbs: 7, fat: 24 },
        nutritionNote: "⅓ of the spiced chicken (about 160 g cooked) with 10 g walnuts",
        ingredients: [
          { group: "Spiced chicken topping (whole pan, 3 portions)", items: [
            { qty: 500, unit: "g", name: "ground chicken", note: "medium fat" },
            { qty: 150, unit: "g", name: "onion", note: "1 medium, finely chopped" },
            { qty: 2, unit: "tsp", name: "oil", note: "one for the chicken, one for the onion" },
            { qty: 30, unit: "g", name: "walnuts", note: "roughly chopped, pea-sized" },
            { qty: 1.5, unit: "tsp", name: "ground cumin" },
            { qty: 1, unit: "tsp", name: "smoked paprika" },
            { qty: 0.25, unit: "tsp", name: "nutmeg", note: "level, no more" },
            { qty: 0.5, unit: "tsp", name: "garlic powder" },
            { qty: 0.5, unit: "tsp", name: "black pepper" },
            { qty: 1, unit: "tsp", name: "dried parsley" },
            { qty: 1, unit: "tsp", name: "salt", note: "half with the spices, the rest to taste" },
            { name: "chili powder", note: "a pinch, optional" },
            { qty: 1.5, unit: "tbsp", name: "lemon juice", note: "about ½ lemon" },
            { qty: 3, unit: "tbsp", name: "water" },
          ]},
          { group: "Spiced chicken (your portion)", scale: "portion", items: [
            { qty: 160, unit: "g", name: "cooked spiced chicken", note: "⅓ of the pan" },
            { qty: 10, unit: "g", name: "toasted walnuts" },
          ]},
        ],
        steps: {
          cook: [
            { text: "For the topping: finely chop the onion, chop the walnuts, mix all the spices with half the salt in a small bowl and squeeze the lemon. Keep the probe thermometer near the stove." },
            { text: "Toast the walnuts in the dry pan, shaking every 30 seconds, until they smell nutty. Tip them onto a plate: they wait there until serving.", heat: "Medium", time: "3–4 min" },
            { text: "Add the first spoon of oil, then the chicken. Press it flat from edge to edge, about 1 cm thick, and don't touch it until it's golden-brown underneath.", heat: "Medium-high", time: "3–4 min" },
            { text: "Flip in big pieces and break into crumbs, stirring only once a minute. From 2 minutes on, push the crumbs into a mound and probe it every 30 seconds. Move on as soon as it reads 74 °C: past that it dries out fast.", heat: "Medium-high", time: "3–5 min" },
            { text: "Push the chicken to the sides, add the second spoon of oil and the onion in the middle, and cook until soft. Then mix it in.", heat: "Medium", time: "4–5 min", timer: 5 },
            { text: "Add the spice mix and stir for 30–60 seconds. Turn the heat off, stir in the lemon juice and the water, then taste and add the rest of the salt.", heat: "Medium-low, then off", time: "1 min" },
          ],
          serve: [
            { text: "Spoon your portion of spiced chicken onto the hummus and sprinkle the walnuts on top. Box the other two portions, with their walnuts kept apart, and keep them in the fridge for up to 3 days." },
          ],
        },
      },
    ],
    tip: "Use ice-cold water and blend for a full 4 minutes: that's how hummus restaurants get it fluffy and pale. The tahini makes hummus high in fat, so weigh your 100 g instead of eating from the bowl.",
  },

  {
    id: "quinoa-carrot",
    emoji: "🥕",
    name: "Quinoa with Carrot",
    sections: ["lunch"],
    tags: ["vegetarian"],
    time: 40,
    photo: "images/quinoa-carrot.jpg",
    intro: "A sweet and earthy carb side for chicken, salmon or thighs. One pot makes 4 portions.",
    source: { label: "10dakot recipe", url: "https://www.10dakot.co.il/recipe/%D7%A7%D7%99%D7%A0%D7%95%D7%90%D7%94-%D7%A2%D7%9D-%D7%92%D7%96%D7%A8/" },
    batch: { makes: 4, unit: "pot" },
    nutrition: { kcal: 275, protein: 8, carbs: 39, fat: 10 },
    nutritionNote: "¼ of the pot. It's a side: add a protein from Lunch to make a meal.",
    ingredients: [
      { group: "Base (whole pot)", items: [
        { qty: 2, unit: "tbsp", name: "olive oil" },
        { qty: 0.5, name: "medium onion", plural: "medium onions", note: "chopped" },
        { qty: 2, unit: "large", name: "carrots", note: "grated" },
      ]},
      { group: "Quinoa and seasoning (whole pot)", items: [
        { qty: 200, unit: "g", name: "quinoa", note: "1 cup, rinsed well" },
        { qty: 1, unit: "tsp", name: "silan (date honey)", note: "level" },
        { qty: 0.5, unit: "tsp", name: "ground cumin" },
        { qty: 0.5, unit: "tsp", name: "salt" },
        { name: "black pepper", note: "a pinch" },
      ]},
      { group: "Liquid (whole pot)", items: [
        { qty: 480, unit: "ml", name: "boiling water", note: "2 cups" },
      ]},
    ],
    steps: {
      stove: [
        { text: "Rinse the quinoa well in a sieve and let it drain. This removes the bitter taste." },
        { text: "Heat the olive oil in a pot and fry the onion until light golden.", heat: "Medium", time: "5 min", timer: 5 },
        { text: "Add the grated carrot and cook, stirring, until it softens.", heat: "Medium", time: "5 min", timer: 5 },
        { text: "Add the quinoa with the silan, cumin, salt and black pepper. Stir for a minute.", heat: "Medium" },
        { text: "Pour in the boiling water, stir, and bring to a boil.", heat: "High" },
        { text: "Lower the heat, cover and cook.", heat: "Low", time: "20 min", timer: 20 },
        { text: "Turn off the heat and leave the pot covered.", time: "10 min", timer: 10 },
        { text: "Fluff with a fork and serve a quarter of the pot." },
      ],
    },
    tip: "Toast the drained quinoa in the pot for 2 minutes with the carrots before the water goes in; it turns nutty instead of grassy. To save 120 kcal on the pot, fry in 1 tbsp oil instead of 2.",
  },

  /* =================================================================
     DINNER
     ================================================================= */

  {
    id: "tuna-salad",
    emoji: "🥒",
    name: "Tuna Salad with Toast",
    sections: ["dinner"],
    tags: ["fish", "eggs"],
    time: 15,
    photo: "images/tuna-salad.jpg",
    intro: "A big, light salad bowl with tuna and a boiled egg. High protein, good for late evenings.",
    nutrition: { kcal: 564, protein: 45, carbs: 46, fat: 22 },
    nutritionNote: "the salad bowl with tuna in oil and 2 slices of bread. Bowl alone: 384 kcal. With ½ avocado instead of bread: 544 kcal.",
    ingredients: [
      { group: "Salad", items: [
        { qty: 1, unit: "can", name: "tuna in oil", note: "drained well and pressed" },
        { qty: 1, name: "egg", plural: "eggs" },
        { qty: 300, unit: "g", name: "vegetables", note: "cucumber, tomato, red pepper, a little red onion" },
      ]},
      { group: "Dressing", items: [
        { qty: 1, unit: "tbsp", name: "light mayo", note: "or 1 tsp olive oil for a lighter version" },
        { qty: 1, unit: "tbsp", name: "lemon juice" },
        { name: "salt and black pepper", note: "to taste" },
      ]},
      { group: "To serve", items: [
        { qty: 2, unit: "slices", name: "whole-wheat bread", round: 0.5 },
        { name: "pickle, parsley or ½ avocado", note: "optional" },
      ]},
    ],
    steps: {
      stove: [
        { text: "Lower the egg into boiling water and cook.", heat: "Medium-high", time: "10 min", timer: 10 },
        { text: "While the egg cooks, chop the vegetables into small cubes and put them in a bowl." },
        { text: "Drain the tuna well, pressing out the oil, and add it to the bowl." },
        { text: "Move the egg to cold water, then peel and chop it into the bowl.", time: "2 min", timer: 2 },
        { text: "Add the mayo, lemon juice, salt and pepper and mix." },
        { text: "If you use avocado, cube it and fold it in gently at the end. Serve with the bread." },
      ],
    },
    tip: "Boil 6 eggs at once at the start of the week and keep them in the fridge, peeled. Then this salad takes 5 minutes, and you always have a ready protein snack.",
  },

  {
    id: "tuna-avocado-salad",
    emoji: "🥑",
    name: "Tuna & Avocado Salad with Toast",
    sections: ["dinner"],
    tags: ["fish", "eggs"],
    time: 15,
    photo: "images/tuna-avocado-salad.jpg",
    intro: "The most filling dinner salad: tuna, avocado, egg and lots of vegetables, with toast.",
    nutrition: { kcal: 710, protein: 47, carbs: 53, fat: 37 },
    nutritionNote: "1 can tuna in oil, ½ avocado, 1 egg, 300 g vegetables, 1 tsp olive oil and 2 slices of bread.",
    ingredients: [
      { group: "Salad", items: [
        { qty: 1, unit: "can", name: "tuna in oil", note: "drained well and pressed" },
        { qty: 0.5, name: "avocado", plural: "avocados", note: "about 100 g" },
        { qty: 1, name: "egg", plural: "eggs" },
        { qty: 300, unit: "g", name: "vegetables", note: "cucumber, tomato, pepper, a little red onion" },
      ]},
      { group: "Dressing", items: [
        { qty: 1, unit: "tsp", name: "olive oil" },
        { name: "lemon juice", note: "1–2 tbsp" },
        { name: "salt and black pepper", note: "to taste" },
      ]},
      { group: "To serve", items: [
        { qty: 2, unit: "slices", name: "whole-wheat bread", round: 0.5 },
      ]},
    ],
    steps: {
      stove: [
        { text: "Lower the egg into boiling water and cook.", heat: "Medium-high", time: "10 min", timer: 10 },
        { text: "While the egg cooks, chop the vegetables and put them in a bowl." },
        { text: "Drain the tuna well, pressing out the oil, and add it to the bowl." },
        { text: "Move the egg to cold water, then peel and chop it into the bowl.", time: "2 min", timer: 2 },
        { text: "Dress with the olive oil, lemon juice, salt and pepper and mix." },
        { text: "Cube the avocado and fold it in gently at the end. Toast the bread and serve." },
      ],
    },
    tip: "This is the highest-fat dinner in your plan, so pick it on days when lunch was lean (chicken breast, chili). Squeeze the lemon over the avocado first: it stops it turning brown if you pack it for later.",
  },

  {
    id: "cottage-cheese-plate",
    emoji: "🍽️",
    name: "Cottage Cheese Plate",
    sections: ["dinner"],
    tags: ["cheese", "vegetarian"],
    time: 7,
    photo: "images/cottage-cheese-plate.jpg",
    intro: "The fastest dinner in the plan: a full tub of cottage cheese, a chopped salad and a slice of bread.",
    nutrition: { kcal: 430, protein: 35, carbs: 32, fat: 18 },
    nutritionNote: "250 g cottage cheese 5%, a chopped salad with 1 tsp olive oil and 1 slice of bread.",
    ingredients: [
      { group: "Cottage cheese", items: [
        { qty: 250, unit: "g", name: "cottage cheese 5%", note: "1 tub" },
        { name: "black pepper or za'atar", note: "on top" },
      ]},
      { group: "Chopped salad", items: [
        { qty: 250, unit: "g", name: "vegetables", note: "cucumber, tomato, pepper" },
        { qty: 1, unit: "tsp", name: "olive oil" },
        { name: "lemon juice and salt", note: "a little" },
      ]},
      { group: "To serve", items: [
        { qty: 1, unit: "slice", name: "whole-wheat bread", round: 0.5 },
      ]},
    ],
    steps: {
      stove: [
        { text: "Chop the vegetables small and dress them with the olive oil, lemon juice and salt." },
        { text: "Toast the bread if you like.", time: "2–3 min" },
        { text: "Spoon the cottage cheese onto the plate, top with black pepper or za'atar, and serve with the salad and bread." },
      ],
    },
    tip: "Mix half the chopped salad straight into the cottage cheese with some chopped green onion and dill. It turns into a fresh, savoury spread that tastes like much more than a tub of cottage.",
  },

  /* =================================================================
     SNACKS
     ================================================================= */

  {
    id: "protein-shake",
    emoji: "🥤",
    name: "Berry Protein Shake",
    sections: ["snacks"],
    tags: ["dairy", "vegetarian"],
    time: 3,
    photo: "images/protein-shake.jpg",
    intro: "Whey, milk and frozen berries blended into a thick, cold shake. 33 g protein.",
    nutrition: { kcal: 315, protein: 33, carbs: 25, fat: 9 },
    nutritionNote: "1 large glass.",
    ingredients: [
      { group: "Into the blender", items: [
        { qty: 250, unit: "ml", name: "milk 3%" },
        { qty: 30, unit: "g", name: "whey protein", note: "1 scoop" },
        { qty: 100, unit: "g", name: "frozen berries" },
      ]},
    ],
    steps: {
      stove: [
        { text: "Pour the milk into the blender first, then add the whey and the frozen berries." },
        { text: "Blend until smooth.", time: "30–45 sec" },
        { text: "Pour into a glass and drink right away." },
      ],
    },
    tip: "Liquid first, powder second, frozen fruit last: the blades spin freely and the whey never sticks to the bottom. For a thicker, milkshake-like texture, add 3 ice cubes.",
  },

  {
    id: "mango-smoothie",
    emoji: "🥭",
    name: "Mango Protein Smoothie",
    sections: ["snacks"],
    tags: ["dairy", "vegetarian"],
    time: 3,
    photo: "images/mango-smoothie.jpg",
    intro: "PRO yogurt and frozen mango blended into a thick, tropical smoothie. 24 g protein.",
    nutrition: { kcal: 290, protein: 24, carbs: 35, fat: 7 },
    nutritionNote: "1 large glass.",
    ingredients: [
      { group: "Into the blender", items: [
        { qty: 100, unit: "ml", name: "milk 3%" },
        { qty: 200, unit: "g", name: "PRO yogurt, natural", note: "1 cup" },
        { qty: 150, unit: "g", name: "frozen mango" },
      ]},
    ],
    steps: {
      stove: [
        { text: "Put the milk, yogurt and frozen mango in the blender, in that order." },
        { text: "Blend until smooth. Too thick? Add a splash more milk.", time: "45 sec" },
        { text: "Pour into a glass and drink right away." },
      ],
    },
    tip: "A squeeze of lime juice and a pinch of cardamom turn this into a mango lassi. Both add flavour without calories.",
  },

  {
    id: "yogurt-granola-bowl",
    emoji: "🫐",
    name: "PRO Yogurt with Granola & Berries",
    sections: ["snacks"],
    tags: ["dairy", "vegetarian"],
    time: 2,
    photo: "images/yogurt-granola-bowl.jpg",
    intro: "A 2-minute snack bowl with 24 g protein and some crunch.",
    nutrition: { kcal: 320, protein: 24, carbs: 38, fat: 8 },
    nutritionNote: "1 PRO yogurt, 30 g granola and 100 g frozen berries.",
    ingredients: [
      { group: "Bowl", items: [
        { qty: 200, unit: "g", name: "PRO yogurt", note: "1 cup" },
        { qty: 100, unit: "g", name: "frozen berries" },
      ]},
      { group: "Topping", items: [
        { qty: 30, unit: "g", name: "granola" },
      ]},
    ],
    steps: {
      stove: [
        { text: "Put the frozen berries in a bowl. If you have 5 minutes, let them thaw a little or microwave them for 30 seconds." },
        { text: "Spoon the yogurt over the berries." },
        { text: "Sprinkle the granola on top just before eating, so it stays crunchy." },
      ],
    },
    tip: "Microwave the frozen berries for 30–40 seconds until they release their juice: you get a warm berry sauce under cold yogurt, like a dessert.",
  },

  {
    id: "yogurt-banana",
    emoji: "🍌",
    name: "PRO Yogurt with Banana",
    sections: ["snacks"],
    tags: ["dairy", "vegetarian"],
    time: 2,
    photo: "images/yogurt-banana.jpg",
    intro: "The simplest snack in the plan: 21 g protein in 2 minutes.",
    nutrition: { kcal: 245, protein: 21, carbs: 35, fat: 3 },
    nutritionNote: "1 PRO yogurt with 1 banana. With an apple instead: 235 kcal.",
    ingredients: [
      { group: "Bowl", items: [
        { qty: 200, unit: "g", name: "PRO yogurt", note: "1 cup" },
        { qty: 1, name: "banana", plural: "bananas", note: "sliced" },
        { name: "ground cinnamon", note: "a sprinkle" },
      ]},
    ],
    steps: {
      stove: [
        { text: "Slice the banana into a bowl." },
        { text: "Spoon the yogurt over it and sprinkle cinnamon on top." },
      ],
    },
    tip: "Slice the banana and fry the slices for 1 minute per side in a dry non-stick pan until caramelised. Warm, golden banana on cold yogurt tastes like a dessert, same calories.",
  },

  {
    id: "cottage-veggies",
    emoji: "🍅",
    name: "Cottage Cheese with Vegetables",
    sections: ["snacks"],
    tags: ["cheese", "vegetarian"],
    time: 3,
    photo: "images/cottage-veggies.jpg",
    intro: "A savoury snack with 30 g protein: cottage cheese, cherry tomatoes and cucumber.",
    nutrition: { kcal: 282, protein: 30, carbs: 13, fat: 12 },
    nutritionNote: "250 g cottage cheese 5% with cherry tomatoes and cucumber.",
    ingredients: [
      { group: "Bowl", items: [
        { qty: 250, unit: "g", name: "cottage cheese 5%", note: "1 tub" },
        { qty: 150, unit: "g", name: "cherry tomatoes and cucumber" },
        { name: "black pepper or za'atar", note: "on top" },
      ]},
    ],
    steps: {
      stove: [
        { text: "Halve the cherry tomatoes and cut the cucumber into sticks or cubes." },
        { text: "Spoon the cottage cheese into a bowl, add the vegetables and season with black pepper or za'atar." },
      ],
    },
    tip: "Use the cucumber sticks as spoons and dip them into the cottage cheese. It feels like a snack platter instead of a diet bowl.",
  },

  {
    id: "cottage-yogurt-honey",
    emoji: "🍯",
    name: "Cottage Cheese, PRO Yogurt & Honey",
    sections: ["snacks"],
    tags: ["cheese", "dairy", "vegetarian"],
    time: 2,
    photo: "images/cottage-yogurt-honey.jpg",
    intro: "Your evening protein bomb: 48 g protein in one bowl, like a creamy cheesecake filling.",
    nutrition: { kcal: 380, protein: 48, carbs: 18, fat: 12 },
    nutritionNote: "250 g cottage cheese 5%, 1 PRO yogurt and 1 tsp honey.",
    ingredients: [
      { group: "Bowl", items: [
        { qty: 250, unit: "g", name: "cottage cheese 5%", note: "1 tub" },
        { qty: 200, unit: "g", name: "PRO yogurt", note: "1 cup" },
        { qty: 1, unit: "tsp", name: "honey" },
        { name: "ground cinnamon", note: "optional, a sprinkle" },
      ]},
    ],
    steps: {
      stove: [
        { text: "Mix the cottage cheese and yogurt in a bowl." },
        { text: "Drizzle the honey on top and sprinkle cinnamon if you like." },
      ],
    },
    tip: "Blend the cottage cheese and yogurt with a stick blender for 20 seconds. It turns completely smooth, like cheesecake filling, and feels much more like a dessert.",
  },

  {
    id: "cottage-toast",
    emoji: "🍞",
    name: "Cottage Cheese on Toast",
    sections: ["snacks"],
    tags: ["cheese", "vegetarian"],
    time: 5,
    photo: "images/cottage-toast.jpg",
    intro: "Warm toast piled with cottage cheese: a filling evening snack with 32 g protein.",
    nutrition: { kcal: 330, protein: 32, carbs: 20, fat: 13 },
    nutritionNote: "250 g cottage cheese 5% with 1 slice of bread.",
    ingredients: [
      { group: "Toast", items: [
        { qty: 1, unit: "slice", name: "whole-wheat bread", round: 0.5 },
        { qty: 250, unit: "g", name: "cottage cheese 5%", note: "1 tub" },
        { name: "black pepper, za'atar or tomato slices", note: "on top" },
      ]},
    ],
    steps: {
      stove: [
        { text: "Toast the bread.", time: "2–3 min" },
        { text: "Pile the cottage cheese on top (the rest on the side) and finish with black pepper, za'atar or tomato slices." },
      ],
    },
    tip: "Drain the cottage cheese in a sieve for a minute before spreading. The toast stays crisp instead of soaking up the liquid.",
  },

  {
    id: "boiled-eggs",
    emoji: "🥚",
    name: "Boiled Eggs with Cucumber",
    sections: ["snacks"],
    tags: ["eggs", "vegetarian"],
    time: 13,
    photo: "images/boiled-eggs.jpg",
    intro: "Two boiled eggs and a cucumber: a light snack with 13 g protein.",
    nutrition: { kcal: 155, protein: 13, carbs: 3, fat: 10 },
    nutritionNote: "2 eggs with 1 cucumber.",
    ingredients: [
      { group: "Snack", items: [
        { qty: 2, name: "egg", plural: "eggs" },
        { qty: 1, name: "cucumber", plural: "cucumbers", note: "cut into sticks" },
        { name: "salt and black pepper", note: "a pinch" },
      ]},
    ],
    steps: {
      stove: [
        { text: "Bring a small pot of water to a boil.", heat: "High" },
        { text: "Lower the eggs in gently with a spoon and boil: 7 minutes for a soft yolk, 10 for hard.", heat: "Medium-high", time: "7–10 min", timer: 10 },
        { text: "Move them to cold water, then peel.", time: "2 min", timer: 2 },
        { text: "Halve the eggs, season with salt and pepper and eat with the cucumber sticks." },
      ],
    },
    tip: "Eggs a week old peel much more easily than fresh ones. Crack the shell all over on the counter and peel under running water.",
  },

];
