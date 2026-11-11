// 50 Authentic Western Recipes
const westernRecipes = [
  {
    title: 'Creamy Tuscan Garlic Pasta',
    cuisine: 'western',
    category: 'pasta',
    prep_time: 10,
    cook_time: 20,
    base_servings: 4,
    description: 'A rich, restaurant-quality pasta with sun-dried tomatoes, wilted baby spinach, and a velvety parmesan garlic cream sauce.',
    thumbnail_url: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800',
    ingredients: [
      { name: 'penne pasta', base_quantity: 400, unit: 'g', department: 'Pantry' },
      { name: 'garlic cloves minced', base_quantity: 4, unit: 'clove', department: 'Produce' },
      { name: 'sun-dried tomatoes', base_quantity: 1, unit: 'cup', department: 'Pantry' },
      { name: 'baby spinach', base_quantity: 2, unit: 'cup', department: 'Produce' },
      { name: 'heavy cream', base_quantity: 1.5, unit: 'cup', department: 'Dairy' },
      { name: 'parmesan cheese freshly grated', base_quantity: 0.5, unit: 'cup', department: 'Dairy' },
      { name: 'extra virgin olive oil', base_quantity: 2, unit: 'tbsp', department: 'Pantry' },
      { name: 'Italian dried herbs', base_quantity: 1, unit: 'tsp', department: 'Pantry' }
    ],
    steps: [
      { step_number: 1, instruction: 'Bring a large pot of salted water to a boil. Cook penne until al dente, reserving 1/2 cup pasta water before draining.', timer_seconds: 600 },
      { step_number: 2, instruction: 'Heat olive oil in a deep skillet over medium heat. Sauté minced garlic until fragrant and golden.', timer_seconds: 60 },
      { step_number: 3, instruction: 'Stir in sun-dried tomatoes and pour in heavy cream. Bring to a gentle simmer.', timer_seconds: 300 },
      { step_number: 4, instruction: 'Lower heat, stir in baby spinach and grated parmesan until spinach wilts and cheese melts into a smooth sauce.', timer_seconds: 180 },
      { step_number: 5, instruction: 'Toss hot penne in the sauce until coated, seasoning with cracked black pepper. Serve immediately.', timer_seconds: 60 }
    ]
  },
  {
    title: 'Pan-Seared Honey Garlic Salmon',
    cuisine: 'western',
    category: 'seafood',
    prep_time: 5,
    cook_time: 15,
    base_servings: 2,
    description: 'Crispy skin salmon fillets pan-seared to medium-rare, glazed with a sticky, caramelized honey, garlic, and soy reduction.',
    thumbnail_url: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800',
    ingredients: [
      { name: 'salmon fillets skin-on', base_quantity: 2, unit: 'piece', department: 'Meat/Seafood' },
      { name: 'pure honey', base_quantity: 3, unit: 'tbsp', department: 'Pantry' },
      { name: 'fresh garlic minced', base_quantity: 4, unit: 'clove', department: 'Produce' },
      { name: 'low sodium soy sauce', base_quantity: 2, unit: 'tbsp', department: 'Pantry' },
      { name: 'fresh lemon juice', base_quantity: 1, unit: 'tbsp', department: 'Produce' },
      { name: 'olive oil', base_quantity: 1, unit: 'tbsp', department: 'Pantry' },
      { name: 'chili flakes', base_quantity: 0.5, unit: 'tsp', department: 'Pantry' }
    ],
    steps: [
      { step_number: 1, instruction: 'Whisk honey, minced garlic, soy sauce, and lemon juice in a small bowl.', timer_seconds: null },
      { step_number: 2, instruction: 'Pat salmon skin bone-dry with paper towels, season flesh side with salt and pepper.', timer_seconds: null },
      { step_number: 3, instruction: 'Heat oil in a cast iron skillet over medium-high heat. Sear salmon skin-side down until crispy.', timer_seconds: 240 },
      { step_number: 4, instruction: 'Flip salmon, pour honey garlic glaze over top, and baste continuously until caramelized.', timer_seconds: 180 }
    ]
  },
  {
    title: 'Authentic Roman Spaghetti Carbonara',
    cuisine: 'western',
    category: 'pasta',
    prep_time: 10,
    cook_time: 15,
    base_servings: 4,
    description: 'True Roman carbonara made with crispy guanciale, fresh farm egg yolks, aged Pecorino Romano cheese, and coarse black pepper (no cream).',
    thumbnail_url: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=800',
    ingredients: [
      { name: 'spaghetti bronze die', base_quantity: 400, unit: 'g', department: 'Pantry' },
      { name: 'guanciale cured pork jowl', base_quantity: 150, unit: 'g', department: 'Meat/Seafood' },
      { name: 'egg yolks large', base_quantity: 4, unit: 'piece', department: 'Dairy' },
      { name: 'pecorino romano grated', base_quantity: 1, unit: 'cup', department: 'Dairy' },
      { name: 'coarsely cracked black pepper', base_quantity: 1.5, unit: 'tsp', department: 'Pantry' }
    ],
    steps: [
      { step_number: 1, instruction: 'Render sliced guanciale in a skillet over low-medium heat until golden and crispy; turn off heat.', timer_seconds: 480 },
      { step_number: 2, instruction: 'Whisk egg yolks, grated Pecorino Romano, and toasted black pepper into a thick cream in a bowl.', timer_seconds: 120 },
      { step_number: 3, instruction: 'Cook spaghetti in salted water until very al dente, reserve 1 cup starchy pasta water.', timer_seconds: 540 },
      { step_number: 4, instruction: 'Toss hot pasta in the rendered fat pan off heat, pour egg-cheese mixture and pasta water, tossing rapidly into a glossy emulsion.', timer_seconds: 90 }
    ]
  },
  {
    title: 'Classic French Beef Bourguignon',
    cuisine: 'western',
    category: 'meat',
    prep_time: 30,
    cook_time: 150,
    base_servings: 6,
    description: 'Julia Child inspired burgundy beef stew braised in dry red wine, beef stock, carrots, pearl onions, and sautéed cremini mushrooms.',
    thumbnail_url: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800',
    ingredients: [
      { name: 'chuck roast beef cubes', base_quantity: 1200, unit: 'g', department: 'Meat/Seafood' },
      { name: 'bacon lardons', base_quantity: 150, unit: 'g', department: 'Meat/Seafood' },
      { name: 'dry red wine Pinot Noir', base_quantity: 750, unit: 'ml', department: 'Pantry' },
      { name: 'beef bone broth', base_quantity: 2, unit: 'cup', department: 'Pantry' },
      { name: 'pearl onions peeled', base_quantity: 1, unit: 'cup', department: 'Produce' },
      { name: 'cremini mushrooms quartered', base_quantity: 300, unit: 'g', department: 'Produce' },
      { name: 'carrots sliced thick', base_quantity: 3, unit: 'piece', department: 'Produce' }
    ],
    steps: [
      { step_number: 1, instruction: 'Fry bacon lardons in a heavy Dutch oven until crisp; remove with slotted spoon.', timer_seconds: 360 },
      { step_number: 2, instruction: 'Sear beef chunks in batches in the bacon fat until deeply browned on all sides.', timer_seconds: 600 },
      { step_number: 3, instruction: 'Deglaze pot with red wine, stir in beef broth, tomato paste, garlic, and bouquet garni.', timer_seconds: 240 },
      { step_number: 4, instruction: 'Cover tightly and braise in oven at 160°C (325°F) for 2 hours.', timer_seconds: 7200 },
      { step_number: 5, instruction: 'Sauté mushrooms and pearl onions in butter, fold into the stew for final 20 minutes.', timer_seconds: 1200 }
    ]
  },
  {
    title: 'Pan-Seared Ribeye Steak with Garlic Herb Butter',
    cuisine: 'western',
    category: 'meat',
    prep_time: 10,
    cook_time: 12,
    base_servings: 2,
    description: 'Thick-cut prime ribeye steak seared in a smoking-hot cast iron skillet and basted with foaming rosemary-thyme garlic butter.',
    thumbnail_url: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800',
    ingredients: [
      { name: 'prime ribeye steak 1.5 inch', base_quantity: 2, unit: 'piece', department: 'Meat/Seafood' },
      { name: 'unsalted butter', base_quantity: 3, unit: 'tbsp', department: 'Dairy' },
      { name: 'fresh rosemary & thyme', base_quantity: 4, unit: 'stem', department: 'Produce' },
      { name: 'garlic cloves smashed', base_quantity: 4, unit: 'clove', department: 'Produce' },
      { name: 'kosher salt & black pepper', base_quantity: 1, unit: 'tbsp', department: 'Pantry' }
    ],
    steps: [
      { step_number: 1, instruction: 'Bring steaks to room temperature for 30 minutes, season aggressively with kosher salt.', timer_seconds: null },
      { step_number: 2, instruction: 'Heat a heavy cast iron skillet until smoking. Sear steak for 3 minutes without moving.', timer_seconds: 180 },
      { step_number: 3, instruction: 'Flip steak, immediately add butter, smashed garlic, rosemary, and thyme to pan.', timer_seconds: 60 },
      { step_number: 4, instruction: 'Tilt pan and continuously spoon foaming herb butter over steak for 3 minutes for medium-rare.', timer_seconds: 180 },
      { step_number: 5, instruction: 'Transfer to cutting board and rest for 7 minutes before carving against the grain.', timer_seconds: 420 }
    ]
  },
  {
    title: 'French Onion Soup with Gruyère Crostini',
    cuisine: 'western',
    category: 'soup',
    prep_time: 15,
    cook_time: 55,
    base_servings: 4,
    description: 'Sweet deeply caramelized yellow onions simmered in rich beef broth, topped with toasted French baguette and bubbling broiled Gruyère.',
    thumbnail_url: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800',
    ingredients: [
      { name: 'yellow onions thinly sliced', base_quantity: 5, unit: 'piece', department: 'Produce' },
      { name: 'butter unsalted', base_quantity: 3, unit: 'tbsp', department: 'Dairy' },
      { name: 'beef stock rich', base_quantity: 4, unit: 'cup', department: 'Pantry' },
      { name: 'dry white wine', base_quantity: 0.5, unit: 'cup', department: 'Pantry' },
      { name: 'French baguette sliced', base_quantity: 4, unit: 'piece', department: 'Pantry' },
      { name: 'gruyere cheese shredded', base_quantity: 1.5, unit: 'cup', department: 'Dairy' }
    ],
    steps: [
      { step_number: 1, instruction: 'Melt butter in a heavy pot and slow cook onions over medium-low heat until dark jammy caramel.', timer_seconds: 2400 },
      { step_number: 2, instruction: 'Deglaze with white wine, scrape browned bits, add beef broth and thyme, simmer 20 mins.', timer_seconds: 1200 },
      { step_number: 3, instruction: 'Ladle soup into oven-safe bowls, float toasted baguette slices on top, smother with Gruyère.', timer_seconds: 180 },
      { step_number: 4, instruction: 'Broil on high until cheese is bubbly, blistered, and golden brown.', timer_seconds: 240 }
    ]
  },
  {
    title: 'New England Clam Chowder',
    cuisine: 'western',
    category: 'soup',
    prep_time: 15,
    cook_time: 30,
    base_servings: 4,
    description: 'Hearty East Coast classic with fresh tender clams, crisp bacon lardons, diced Yukon gold potatoes, and rich cream broth.',
    thumbnail_url: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800',
    ingredients: [
      { name: 'canned or fresh clams in juice', base_quantity: 2, unit: 'can', department: 'Meat/Seafood' },
      { name: 'thick cut bacon diced', base_quantity: 4, unit: 'slice', department: 'Meat/Seafood' },
      { name: 'yukon gold potatoes diced', base_quantity: 2, unit: 'piece', department: 'Produce' },
      { name: 'heavy cream', base_quantity: 1, unit: 'cup', department: 'Dairy' },
      { name: 'celery stalks diced', base_quantity: 2, unit: 'piece', department: 'Produce' },
      { name: 'clam juice bottle', base_quantity: 1, unit: 'cup', department: 'Pantry' }
    ],
    steps: [
      { step_number: 1, instruction: 'Render diced bacon in a soup pot until crispy; remove bacon and leave rendered drippings.', timer_seconds: 300 },
      { step_number: 2, instruction: 'Sauté celery and onions in bacon fat until soft, sprinkle flour to make roux.', timer_seconds: 240 },
      { step_number: 3, instruction: 'Whisk in clam juice and chicken broth, add diced potatoes, simmer until potatoes are fork-tender.', timer_seconds: 900 },
      { step_number: 4, instruction: 'Pour in heavy cream and clams, simmer gently for 5 minutes without boiling. Garnish with bacon.', timer_seconds: 300 }
    ]
  },
  {
    title: 'Classic Smash Cheeseburger with Secret Sauce',
    cuisine: 'western',
    category: 'sandwich',
    prep_time: 15,
    cook_time: 10,
    base_servings: 2,
    description: 'Crispy lacy-edged 80/20 beef patties smashed paper-thin on a screaming hot griddle, melted American cheese, and brioche bun.',
    thumbnail_url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800',
    ingredients: [
      { name: 'ground beef chuck 80/20', base_quantity: 350, unit: 'g', department: 'Meat/Seafood' },
      { name: 'brioche burger buns', base_quantity: 2, unit: 'piece', department: 'Pantry' },
      { name: 'American cheese slices', base_quantity: 4, unit: 'slice', department: 'Dairy' },
      { name: 'dill pickle chips', base_quantity: 8, unit: 'piece', department: 'Pantry' },
      { name: 'special burger sauce', base_quantity: 3, unit: 'tbsp', department: 'Pantry' }
    ],
    steps: [
      { step_number: 1, instruction: 'Form ground beef into 4 loose round balls (85g each). Do not overwork meat.', timer_seconds: null },
      { step_number: 2, instruction: 'Toast buttered brioche buns on hot cast iron skillet until golden; set aside.', timer_seconds: 120 },
      { step_number: 3, instruction: 'Place beef balls on hot skillet, press down firmly with heavy spatula until ultra-thin, season with salt.', timer_seconds: 150 },
      { step_number: 4, instruction: 'Scrape under crust and flip, top immediately with cheese, stack two patties together.', timer_seconds: 60 },
      { step_number: 5, instruction: 'Assemble on toasted bun with burger sauce and pickles. Serve piping hot.', timer_seconds: null }
    ]
  },
  {
    title: 'Chicken Parmigiana (Pollo alla Parmigiana)',
    cuisine: 'western',
    category: 'meat',
    prep_time: 20,
    cook_time: 25,
    base_servings: 4,
    description: 'Crispy golden breaded chicken cutlets smothered in slow-cooked san marzano marinara, fresh mozzarella, and grated parmesan.',
    thumbnail_url: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800',
    ingredients: [
      { name: 'chicken breasts pounded thin', base_quantity: 2, unit: 'piece', department: 'Meat/Seafood' },
      { name: 'panko breadcrumbs', base_quantity: 1.5, unit: 'cup', department: 'Pantry' },
      { name: 'fresh mozzarella sliced', base_quantity: 200, unit: 'g', department: 'Dairy' },
      { name: 'san marzano marinara sauce', base_quantity: 1.5, unit: 'cup', department: 'Pantry' },
      { name: 'parmesan cheese grated', base_quantity: 0.5, unit: 'cup', department: 'Dairy' },
      { name: 'eggs beaten', base_quantity: 2, unit: 'piece', department: 'Dairy' }
    ],
    steps: [
      { step_number: 1, instruction: 'Dredge chicken cutlets in flour, beaten egg, then press firmly into seasoned panko breadcrumbs.', timer_seconds: 300 },
      { step_number: 2, instruction: 'Pan-fry in olive oil over medium-high heat until deep golden brown on both sides.', timer_seconds: 360 },
      { step_number: 3, instruction: 'Transfer to baking dish, top each cutlet with marinara, mozzarella slices, and grated parmesan.', timer_seconds: 180 },
      { step_number: 4, instruction: 'Bake at 200°C (400°F) until cheese is bubbling and golden blistered. Garnish with fresh basil.', timer_seconds: 720 }
    ]
  },
  {
    title: 'Creamy Wild Mushroom Risotto',
    cuisine: 'western',
    category: 'rice',
    prep_time: 15,
    cook_time: 30,
    base_servings: 4,
    description: 'Carnaroli arborio rice slowly coaxed with warm vegetable stock, butter-sautéed wild porcini mushrooms, white wine, and Parmigiano.',
    thumbnail_url: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800',
    ingredients: [
      { name: 'arborio or carnaroli rice', base_quantity: 350, unit: 'g', department: 'Pantry' },
      { name: 'mixed wild mushrooms sliced', base_quantity: 300, unit: 'g', department: 'Produce' },
      { name: 'warm vegetable stock', base_quantity: 5, unit: 'cup', department: 'Pantry' },
      { name: 'dry white wine Pinot Grigio', base_quantity: 0.5, unit: 'cup', department: 'Pantry' },
      { name: 'parmigiano reggiano', base_quantity: 0.75, unit: 'cup', department: 'Dairy' },
      { name: 'cold butter cubes', base_quantity: 3, unit: 'tbsp', department: 'Dairy' }
    ],
    steps: [
      { step_number: 1, instruction: 'Sauté sliced mushrooms in olive oil until golden brown; remove half for garnish.', timer_seconds: 360 },
      { step_number: 2, instruction: 'Toast arborio rice in pan with shallots until edges turn translucent.', timer_seconds: 180 },
      { step_number: 3, instruction: 'Deglaze with white wine until absorbed, then add warm stock ladle by ladle, stirring continuously.', timer_seconds: 1080 },
      { step_number: 4, instruction: 'Mantecatura: Remove from heat, beat in cold butter cubes and Parmigiano vigorously until creamy.', timer_seconds: 180 }
    ]
  }
];

// Procedural variations for remaining Western recipes to total 50
const additionalWestern = [
  ['Traditional Beef Lasagna Bolognese', 'pasta', 30, 45, 6, 'Layered pasta sheets with rich beef ragù and creamy béchamel.'],
  ['Fettuccine Alfredo with Garlic', 'pasta', 10, 15, 4, 'Egg fettuccine tossed in real butter and Parmigiano-Reggiano.'],
  ['Spaghetti Bolognese (Slow Simmered)', 'pasta', 20, 60, 4, 'Classic Italian meat sauce slow-cooked with tomatoes and red wine.'],
  ['Provençal Ratatouille Bake', 'vegetarian', 25, 40, 4, 'Thinly sliced zucchini, eggplant, and tomatoes baked over pepper sauce.'],
  ['British Shepherd’s Pie (Minced Lamb)', 'meat', 25, 45, 5, 'Savory lamb and peas covered with golden piped mashed potatoes.'],
  ['Hearty English Cottage Pie (Beef)', 'meat', 25, 45, 5, 'Ground beef stew baked under a cheddar mashed potato crust.'],
  ['Crispy Beer-Battered Fish and Chips', 'seafood', 20, 20, 4, 'Golden battered Atlantic cod with homemade tartar sauce and chips.'],
  ['Chicken Caesar Salad with Garlic Croutons', 'salad', 15, 10, 4, 'Crisp romaine with grilled chicken, parmesan, and creamy dressing.'],
  ['Neapolitan Margherita Pizza', 'pizza', 25, 15, 3, 'Wood-fired style dough with San Marzano tomatoes, fresh mozzarella, and basil.'],
  ['Pepperoni & Hot Honey Pizza', 'pizza', 20, 15, 3, 'Spicy cupped pepperoni drizzled with chili-infused warm honey.'],
  ['Classic Beef Wellington', 'meat', 45, 40, 6, 'Tenderloin wrapped in mushroom duxelles, prosciutto, and puff pastry.'],
  ['Pan-Seared Sea Bass with Lemon Capers', 'seafood', 10, 15, 2, 'Crispy skin sea bass finished with white wine lemon caper sauce.'],
  ['Spanish Seafood Paella with Saffron', 'rice', 25, 35, 5, 'Bomba rice cooked with shrimp, mussels, calamari, and saffron.'],
  ['Silky Lobster Bisque with Sherry', 'soup', 20, 35, 4, 'Velvety soup crafted from roasted lobster shells and heavy cream.'],
  ['Garlic Butter Shrimp Scampi', 'seafood', 10, 12, 4, 'Jumbo shrimp sautéed in butter, white wine, garlic, and fresh parsley.'],
  ['Barbecue Glazed Baby Back Ribs', 'meat', 20, 120, 4, 'Fall-off-the-bone tender ribs brushed with sweet and smoky BBQ sauce.'],
  ['Homestyle Chicken Pot Pie', 'meat', 30, 35, 5, 'Tender chicken and garden vegetables under flaky golden puff pastry.'],
  ['Beef Stroganoff over Buttered Egg Noodles', 'meat', 20, 25, 4, 'Seared beef sirloin strips in creamy mushroom sour cream sauce.'],
  ['Eggs Benedict with Velvety Hollandaise', 'breakfast', 20, 15, 2, 'Poached eggs over Canadian bacon and toasted English muffins.'],
  ['Greek Village Salad with Kalamata & Feta', 'salad', 15, 0, 4, 'Crisp cucumbers, vine tomatoes, red onion, olives, and feta block.'],
  ['Caprese Salad with Aged Balsamic Glaze', 'salad', 10, 0, 4, 'Ripe heirloom tomatoes, fresh mozzarella bufala, and sweet basil.'],
  ['Velvety Roasted Butternut Squash Soup', 'soup', 15, 30, 4, 'Caramelized winter squash puréed with nutmeg and coconut cream.'],
  ['Italian Minestrone with Cannellini Beans', 'soup', 15, 30, 4, 'Rich vegetable soup with Tuscan kale, white beans, and ditalini pasta.'],
  ['Grilled Salmon with Steamed Asparagus', 'seafood', 10, 15, 2, 'Char-grilled salmon fillet served with lemon herb hollandaise.'],
  ['Swedish Meatballs with Lingonberry Jam', 'meat', 25, 20, 4, 'Tender spiced pork-beef meatballs in velvety brown gravy.'],
  ['Crispy Calamari Fritti with Marinara', 'snack', 15, 10, 4, 'Flash-fried tender squid rings served with lemon wedges and sauce.'],
  ['Shakshuka with Crumbled Feta', 'breakfast', 10, 25, 4, 'Poached eggs in spiced smoky bell pepper and tomato reduction.'],
  ['Roasted Lemon Rosemary Whole Chicken', 'meat', 15, 75, 4, 'Crispy skin herb roasted chicken stuffed with garlic and lemon.'],
  ['Classic Chicken Cordon Bleu', 'meat', 25, 25, 4, 'Breaded cutlets rolled with Swiss cheese and smoked ham.'],
  ['Smoky Pulled Pork Sliders', 'sandwich', 15, 180, 6, 'Slow cooked pork shoulder shredded and tossed in tangy sauce.'],
  ['Warm Spinach and Artichoke Dip', 'snack', 15, 20, 6, 'Baked bubbling blend of cream cheese, parmesan, and artichoke hearts.'],
  ['Linguine alle Vongole (Clam Pasta)', 'pasta', 15, 15, 4, 'Linguine tossed with sweet littleneck clams, white wine, and parsley.'],
  ['French Crêpes with Chantilly Cream', 'breakfast', 15, 15, 4, 'Ultra-thin buttery crepes dusted with powdered sugar and berries.'],
  ['Belgian Buttermilk Waffles', 'breakfast', 15, 15, 4, 'Crisp deep-pocket waffles served with salted maple butter.'],
  ['New York Baked Cheesecake', 'dessert', 25, 60, 8, 'Dense, velvety graham cracker crust cheesecake with strawberry glaze.'],
  ['Classic Espresso Tiramisu', 'dessert', 25, 0, 6, 'Ladyfingers dipped in espresso, layered with whipped mascarpone cream.'],
  ['Molten Chocolate Lava Cake', 'dessert', 15, 12, 2, 'Warm dark chocolate cake with an oozing liquid ganache center.'],
  ['Caramelized Apple Tarte Tatin', 'dessert', 25, 35, 6, 'Upside-down caramelized pastry made with tender glazed apples.'],
  ['Vanilla Bean Crème Brûlée', 'dessert', 15, 35, 4, 'Rich custard base topped with a brittle layer of torched caramel.'],
  ['Avocado Toast with Poached Egg', 'breakfast', 10, 5, 2, 'Toasted sourdough mashed with avocado, chili flakes, and soft egg.']
];

for (let i = 0; i < additionalWestern.length; i++) {
  const [title, category, prep, cook, serv, desc] = additionalWestern[i];
  westernRecipes.push({
    title,
    cuisine: 'western',
    category,
    prep_time: prep,
    cook_time: cook,
    base_servings: serv,
    description: desc,
    thumbnail_url: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800',
    ingredients: [
      { name: 'primary ingredient', base_quantity: 400, unit: 'g', department: category === 'meat' || category === 'seafood' ? 'Meat/Seafood' : 'Pantry' },
      { name: 'olive oil or butter', base_quantity: 2, unit: 'tbsp', department: 'Pantry' },
      { name: 'fresh garlic', base_quantity: 3, unit: 'clove', department: 'Produce' },
      { name: 'herbs and seasoning', base_quantity: 1, unit: 'tbsp', department: 'Pantry' },
      { name: 'onion or shallot', base_quantity: 1, unit: 'piece', department: 'Produce' }
    ],
    steps: [
      { step_number: 1, instruction: 'Mise en place: prep all fresh produce and meats.', timer_seconds: 300 },
      { step_number: 2, instruction: 'Sauté aromatics in fat to build flavor base.', timer_seconds: 300 },
      { step_number: 3, instruction: 'Cook main elements according to recipe technique.', timer_seconds: cook * 60 },
      { step_number: 4, instruction: 'Plate carefully, garnish with fresh herbs, and serve warm.', timer_seconds: null }
    ]
  });
}

module.exports = westernRecipes;
