(function (global) {
  const STORAGE_KEY = "tastevibe_recipes";

  const seedRecipes = [
    {
      id: "seed-citrus-quinoa",
      title: "Citrus Quinoa Salad",
      description: "Zesty quinoa with oranges, mint, and crunchy veggies.",
      category: "Healthy",
      time: "20 min",
      servings: "2 servings",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=400&fit=crop",
      ingredients: [
        "1 cup cooked quinoa",
        "1 orange, segmented",
        "1/2 cucumber, diced",
        "Handful fresh mint",
        "2 tbsp olive oil",
        "1 tbsp lemon juice",
        "Salt and pepper to taste"
      ],
      steps: [
        "Whisk olive oil, lemon juice, salt, and pepper.",
        "Combine quinoa, orange, cucumber, and mint.",
        "Toss with dressing and serve chilled."
      ],
      createdAt: new Date().toISOString(),
      source: "seed"
    },
    {
      id: "seed-oat-parfait",
      title: "Berry Oat Parfait",
      description: "Creamy yogurt layered with oats, berries, and honey.",
      category: "Breakfast",
      time: "10 min",
      servings: "1 serving",
      image: "https://images.unsplash.com/photo-1505253758473-96b7015fcd40?w=600&h=400&fit=crop",
      ingredients: [
        "1/2 cup Greek yogurt",
        "1/3 cup rolled oats",
        "1/2 cup mixed berries",
        "1 tbsp honey",
        "1 tbsp chopped nuts"
      ],
      steps: [
        "Layer yogurt, oats, and berries in a glass.",
        "Drizzle with honey and top with nuts.",
        "Serve immediately."
      ],
      createdAt: new Date().toISOString(),
      source: "seed"
    }
  ];

  const storageSupported = () => {
    try {
      const testKey = "__tastevibe_test__";
      localStorage.setItem(testKey, "ok");
      localStorage.removeItem(testKey);
      return true;
    } catch (err) {
      return false;
    }
  };

  let memoryStore = seedRecipes.slice();

  const readAll = () => {
    if (!storageSupported()) return memoryStore.slice();
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return seedRecipes.slice();
    try {
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : seedRecipes.slice();
    } catch (err) {
      return seedRecipes.slice();
    }
  };

  const persist = (recipes) => {
    const data = Array.isArray(recipes) ? recipes : [];
    memoryStore = data;
    if (storageSupported()) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }
  };

  const ensureSeeded = () => {
    if (storageSupported()) {
      const existing = localStorage.getItem(STORAGE_KEY);
      if (!existing) {
        persist(seedRecipes.slice());
      }
    } else {
      memoryStore = seedRecipes.slice();
    }
  };

  const normalizeRecipe = (recipe) => {
    const now = new Date().toISOString();
    return {
      id: recipe.id || `recipe-${Date.now()}`,
      title: (recipe.title || "Untitled recipe").trim(),
      description: (recipe.description || "").trim() || "Shared via Tastevibe",
      category: (recipe.category || "Uncategorized").trim(),
      time: (recipe.time || "Any").trim(),
      servings: (recipe.servings || "").trim(),
      image: (recipe.image || "").trim(),
      ingredients: Array.isArray(recipe.ingredients)
        ? recipe.ingredients
        : (recipe.ingredients || "")
            .split("\n")
            .map((item) => item.trim())
            .filter(Boolean),
      steps: Array.isArray(recipe.steps)
        ? recipe.steps
        : (recipe.steps || "")
            .split("\n")
            .map((item) => item.trim())
            .filter(Boolean),
      createdAt: recipe.createdAt || now,
      source: recipe.source || "user"
    };
  };

  const addRecipe = (recipe) => {
    const all = readAll();
    const prepared = normalizeRecipe(recipe);
    all.unshift(prepared);
    persist(all);
    return prepared;
  };

  const reset = () => {
    persist(seedRecipes.slice());
  };

  ensureSeeded();

  global.RecipeDB = {
    getAll: readAll,
    add: addRecipe,
    reset,
    ensureSeeded
  };
})(window);
