// 50 Authentic Bangladeshi Recipes
const bangladeshiRecipes = [
  {
    title: 'Dhaka Shahi Kacchi Biryani',
    cuisine: 'bangladeshi',
    category: 'rice',
    prep_time: 40,
    cook_time: 90,
    base_servings: 6,
    description: 'Legendary Old Dhaka style dum biryani made with marinated raw mutton, fragrant Chinigura rice, fried potatoes, and saffron milk.',
    thumbnail_url: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800',
    ingredients: [
      { name: 'mutton pieces', base_quantity: 1000, unit: 'g', department: 'Meat/Seafood' },
      { name: 'chinigura rice', base_quantity: 500, unit: 'g', department: 'Pantry' },
      { name: 'potatoes halved', base_quantity: 4, unit: 'piece', department: 'Produce' },
      { name: 'ghee', base_quantity: 4, unit: 'tbsp', department: 'Dairy' },
      { name: 'plain yogurt', base_quantity: 1, unit: 'cup', department: 'Dairy' },
      { name: 'fried onions beresta', base_quantity: 1, unit: 'cup', department: 'Pantry' },
      { name: 'shahi garam masala', base_quantity: 2, unit: 'tbsp', department: 'Pantry' },
      { name: 'saffron milk', base_quantity: 0.5, unit: 'cup', department: 'Dairy' },
      { name: 'alu bukhara prunes', base_quantity: 6, unit: 'piece', department: 'Pantry' },
      { name: 'kewra water', base_quantity: 1, unit: 'tbsp', department: 'Pantry' }
    ],
    steps: [
      { step_number: 1, instruction: 'Marinate mutton with yogurt, ginger-garlic paste, shahi garam masala, chili powder, and salt for 3 hours.', timer_seconds: null },
      { step_number: 2, instruction: 'Deep fry potato halves with pinch of turmeric and salt until golden crust forms.', timer_seconds: 360 },
      { step_number: 3, instruction: 'Parboil soaked Chinigura rice with whole spices (cardamom, cloves, cinnamon) until 70% cooked.', timer_seconds: 420 },
      { step_number: 4, instruction: 'Layer raw marinated mutton at the bottom of a heavy pot, top with fried potatoes, beresta, and parboiled rice.', timer_seconds: null },
      { step_number: 5, instruction: 'Drizzle saffron milk, kewra water, and ghee on top. Seal with dough and cook on low dum.', timer_seconds: 4800 },
      { step_number: 6, instruction: 'Gently mix layers from bottom to top and serve steaming hot with borhani.', timer_seconds: null }
    ]
  },
  {
    title: 'Beef Kala Bhuna (Chittagong Style)',
    cuisine: 'bangladeshi',
    category: 'meat',
    prep_time: 25,
    cook_time: 110,
    base_servings: 6,
    description: 'The crowning glory of Chittagong cuisine: beef slow-cooked in mustard oil until intensely dark, deeply caramelized, and tender.',
    thumbnail_url: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800',
    ingredients: [
      { name: 'beef brisket & shank', base_quantity: 1200, unit: 'g', department: 'Meat/Seafood' },
      { name: 'mustard oil', base_quantity: 0.75, unit: 'cup', department: 'Pantry' },
      { name: 'sliced onions', base_quantity: 3, unit: 'cup', department: 'Produce' },
      { name: 'ginger paste', base_quantity: 2, unit: 'tbsp', department: 'Produce' },
      { name: 'garlic paste', base_quantity: 2, unit: 'tbsp', department: 'Produce' },
      { name: 'radhuni spice powder', base_quantity: 1, unit: 'tsp', department: 'Pantry' },
      { name: 'black cardamom & cloves', base_quantity: 1, unit: 'tbsp', department: 'Pantry' },
      { name: 'fried onions beresta', base_quantity: 1, unit: 'cup', department: 'Pantry' }
    ],
    steps: [
      { step_number: 1, instruction: 'Mix beef with half mustard oil, ginger, garlic, chili, coriander, cumin, and whole spices in a karahi.', timer_seconds: null },
      { step_number: 2, instruction: 'Cover and simmer over medium-low heat until beef releases its juices and absorbs them back.', timer_seconds: 2400 },
      { step_number: 3, instruction: 'In another pan, heat remaining mustard oil and fry sliced onions until golden brown.', timer_seconds: 480 },
      { step_number: 4, instruction: 'Pour the tempered mustard oil and onions over the beef and continue slow roasting (bhuna) with continuous stirring.', timer_seconds: 1800 },
      { step_number: 5, instruction: 'Sprinkle roasted radhuni powder and beresta in the final 10 minutes until the beef reaches signature deep black hue.', timer_seconds: 600 }
    ]
  },
  {
    title: 'Shorshe Ilish (Hilsa in Mustard Gravy)',
    cuisine: 'bangladeshi',
    category: 'seafood',
    prep_time: 15,
    cook_time: 20,
    base_servings: 4,
    description: 'Padma River Hilsa steaks gently simmered in stone-ground yellow and black mustard paste with green chilies and pungent mustard oil.',
    thumbnail_url: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=800',
    ingredients: [
      { name: 'ilish hilsa steaks', base_quantity: 4, unit: 'piece', department: 'Meat/Seafood' },
      { name: 'yellow mustard seeds', base_quantity: 3, unit: 'tbsp', department: 'Pantry' },
      { name: 'black mustard seeds', base_quantity: 1, unit: 'tbsp', department: 'Pantry' },
      { name: 'green chilies slit', base_quantity: 6, unit: 'piece', department: 'Produce' },
      { name: 'pure mustard oil', base_quantity: 4, unit: 'tbsp', department: 'Pantry' },
      { name: 'turmeric powder', base_quantity: 1, unit: 'tsp', department: 'Pantry' },
      { name: 'kalonji nigella seeds', base_quantity: 0.5, unit: 'tsp', department: 'Pantry' }
    ],
    steps: [
      { step_number: 1, instruction: 'Grind yellow and black mustard seeds with 2 green chilies, pinch of salt and water into a fine paste.', timer_seconds: 180 },
      { step_number: 2, instruction: 'Coat ilish steaks lightly with turmeric powder, salt, and 1 tsp mustard oil.', timer_seconds: null },
      { step_number: 3, instruction: 'Heat mustard oil in a pan until smoking point, reduce heat, temper with kalonji seeds and remaining green chilies.', timer_seconds: 60 },
      { step_number: 4, instruction: 'Whisk mustard paste with 1 cup warm water and turmeric, pour into pan and bring to a simmer.', timer_seconds: 180 },
      { step_number: 5, instruction: 'Gently slip fish steaks into gravy, cover and cook without turning to preserve delicate texture.', timer_seconds: 600 },
      { step_number: 6, instruction: 'Drizzle 1 tbsp raw mustard oil over the top, turn off flame, and keep covered for 5 minutes before serving with hot steamed rice.', timer_seconds: 300 }
    ]
  },
  {
    title: 'Chingri Malai Curry',
    cuisine: 'bangladeshi',
    category: 'seafood',
    prep_time: 15,
    cook_time: 25,
    base_servings: 4,
    description: 'Royal freshwater Golda Chingri (giant prawns) cooked in rich, silky coconut milk flavored with cardamom, cinnamon, and mild green chilies.',
    thumbnail_url: 'https://images.unsplash.com/photo-1559742811-822873691df8?w=800',
    ingredients: [
      { name: 'golda chingri jumbo prawns', base_quantity: 8, unit: 'piece', department: 'Meat/Seafood' },
      { name: 'thick coconut milk', base_quantity: 1.5, unit: 'cup', department: 'Pantry' },
      { name: 'onion paste', base_quantity: 0.5, unit: 'cup', department: 'Produce' },
      { name: 'ginger paste', base_quantity: 1, unit: 'tbsp', department: 'Produce' },
      { name: 'ghee', base_quantity: 2, unit: 'tbsp', department: 'Dairy' },
      { name: 'mustard oil', base_quantity: 2, unit: 'tbsp', department: 'Pantry' },
      { name: 'green cardamom & cinnamon', base_quantity: 1, unit: 'tbsp', department: 'Pantry' },
      { name: 'green chilies', base_quantity: 4, unit: 'piece', department: 'Produce' }
    ],
    steps: [
      { step_number: 1, instruction: 'Clean prawns leaving tail intact, devein, and lightly rub with turmeric and salt.', timer_seconds: null },
      { step_number: 2, instruction: 'Heat mustard oil, lightly sear prawns for 60 seconds per side until they turn vibrant orange. Remove immediately.', timer_seconds: 120 },
      { step_number: 3, instruction: 'In the same oil add ghee, temper whole cardamom, cloves, and cinnamon stick.', timer_seconds: 45 },
      { step_number: 4, instruction: 'Sauté onion paste and ginger paste until oil separates and raw aroma disappears.', timer_seconds: 360 },
      { step_number: 5, instruction: 'Pour in thick coconut milk, add slit green chilies, sugar, and salt; bring to a gentle simmer.', timer_seconds: 240 },
      { step_number: 6, instruction: 'Return prawns to the simmering gravy, cover, and cook until luscious and thick.', timer_seconds: 360 }
    ]
  },
  {
    title: 'Morog Polao (Traditional Bengali Chicken Pilaf)',
    cuisine: 'bangladeshi',
    category: 'rice',
    prep_time: 30,
    cook_time: 45,
    base_servings: 5,
    description: 'A celebration centerpiece: bone-in chicken thighs braised in yogurt and spices, layered with fragrant Kalijira rice, alu bukhara, and mawa.',
    thumbnail_url: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=800',
    ingredients: [
      { name: 'chicken whole leg cut in half', base_quantity: 800, unit: 'g', department: 'Meat/Seafood' },
      { name: 'kalijira rice', base_quantity: 500, unit: 'g', department: 'Pantry' },
      { name: 'ghee', base_quantity: 0.5, unit: 'cup', department: 'Dairy' },
      { name: 'sour yogurt', base_quantity: 0.75, unit: 'cup', department: 'Dairy' },
      { name: 'fried onion beresta', base_quantity: 1, unit: 'cup', department: 'Pantry' },
      { name: 'alu bukhara', base_quantity: 5, unit: 'piece', department: 'Pantry' },
      { name: 'mita attar & kewra', base_quantity: 1, unit: 'tsp', department: 'Pantry' },
      { name: 'ginger garlic paste', base_quantity: 2, unit: 'tbsp', department: 'Produce' }
    ],
    steps: [
      { step_number: 1, instruction: 'Marinate chicken in sour yogurt, ginger-garlic paste, coriander powder, and salt for 1 hour.', timer_seconds: null },
      { step_number: 2, instruction: 'Heat ghee in a handi, braise marinated chicken until tender and golden brown, then remove chicken leaving gravy.', timer_seconds: 900 },
      { step_number: 3, instruction: 'In the remaining fragrant gravy, add washed Kalijira rice and roast for 4 minutes.', timer_seconds: 240 },
      { step_number: 4, instruction: 'Pour hot water (ratio 1:2 with rice), add salt and bring to a rapid boil.', timer_seconds: 300 },
      { step_number: 5, instruction: 'Tuck chicken pieces into rice, scatter beresta and alu bukhara, sprinkle kewra water, cover tightly, and steam on low dum.', timer_seconds: 1200 }
    ]
  },
  {
    title: 'Beef Mezbeni Gosht',
    cuisine: 'bangladeshi',
    category: 'meat',
    prep_time: 25,
    cook_time: 80,
    base_servings: 6,
    description: 'Chittagong traditional feast beef braised with mustard oil, fenugreek, dried whole red chilies, and white poppy seeds.',
    thumbnail_url: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800',
    ingredients: [
      { name: 'beef cubes with bone', base_quantity: 1000, unit: 'g', department: 'Meat/Seafood' },
      { name: 'mustard oil', base_quantity: 0.5, unit: 'cup', department: 'Pantry' },
      { name: 'onions chopped', base_quantity: 2, unit: 'cup', department: 'Produce' },
      { name: 'mezbeni spice mix', base_quantity: 3, unit: 'tbsp', department: 'Pantry' },
      { name: 'poppy seed paste posto', base_quantity: 2, unit: 'tbsp', department: 'Pantry' },
      { name: 'dry red chilies', base_quantity: 6, unit: 'piece', department: 'Pantry' }
    ],
    steps: [
      { step_number: 1, instruction: 'Mix beef with mustard oil, mezbeni spice mix, ginger-garlic paste, and posto paste.', timer_seconds: null },
      { step_number: 2, instruction: 'Heat oil in a heavy pot, add whole dried red chilies, then add the spiced beef.', timer_seconds: 300 },
      { step_number: 3, instruction: 'Slow cook covered until meat releases and re-absorbs natural juices.', timer_seconds: 2400 },
      { step_number: 4, instruction: 'Add warm water, simmer until meat is meltingly tender and rich red-brown oil floats on top.', timer_seconds: 1800 }
    ]
  },
  {
    title: 'Old Dhaka Beef Tehari',
    cuisine: 'bangladeshi',
    category: 'rice',
    prep_time: 20,
    cook_time: 50,
    base_servings: 5,
    description: 'Small tender cubes of beef cooked in pure mustard oil, green chilies, and whole spices, then tossed with Chinigura rice.',
    thumbnail_url: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800',
    ingredients: [
      { name: 'beef boneless small cubes', base_quantity: 600, unit: 'g', department: 'Meat/Seafood' },
      { name: 'chinigura rice', base_quantity: 450, unit: 'g', department: 'Pantry' },
      { name: 'pure mustard oil', base_quantity: 0.5, unit: 'cup', department: 'Pantry' },
      { name: 'green chilies', base_quantity: 10, unit: 'piece', department: 'Produce' },
      { name: 'ginger garlic paste', base_quantity: 2, unit: 'tbsp', department: 'Produce' },
      { name: 'tehari garam masala', base_quantity: 1.5, unit: 'tbsp', department: 'Pantry' }
    ],
    steps: [
      { step_number: 1, instruction: 'Cook beef cubes in mustard oil with onions, spices, and green chilies until tender.', timer_seconds: 1800 },
      { step_number: 2, instruction: 'Separate beef from gravy. Roast rice in the remaining spiced oil.', timer_seconds: 300 },
      { step_number: 3, instruction: 'Add boiling water, fold in beef and whole green chilies, seal lid and steam on dum.', timer_seconds: 1200 }
    ]
  },
  {
    title: 'Rui Macher Jhol with Cauliflower & Potatoes',
    cuisine: 'bangladeshi',
    category: 'seafood',
    prep_time: 15,
    cook_time: 25,
    base_servings: 4,
    description: 'Everyday Bengali comfort meal: shallow-fried Rohu carp steaks simmered in light cumin-ginger broth with potatoes and winter cauliflower.',
    thumbnail_url: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=800',
    ingredients: [
      { name: 'rui carp steaks', base_quantity: 4, unit: 'piece', department: 'Meat/Seafood' },
      { name: 'cauliflower florets', base_quantity: 1.5, unit: 'cup', department: 'Produce' },
      { name: 'potatoes wedged', base_quantity: 2, unit: 'piece', department: 'Produce' },
      { name: 'mustard oil', base_quantity: 3, unit: 'tbsp', department: 'Pantry' },
      { name: 'pachan paanch phoron', base_quantity: 1, unit: 'tsp', department: 'Pantry' },
      { name: 'cumin coriander paste', base_quantity: 2, unit: 'tbsp', department: 'Pantry' }
    ],
    steps: [
      { step_number: 1, instruction: 'Lightly fry turmeric-salted fish steaks in mustard oil; set aside.', timer_seconds: 240 },
      { step_number: 2, instruction: 'Sauté cauliflower florets and potatoes until light golden.', timer_seconds: 300 },
      { step_number: 3, instruction: 'Temper oil with paanch phoron, add cumin paste, water, and simmer vegetables until tender.', timer_seconds: 600 },
      { step_number: 4, instruction: 'Add fried fish, simmer for 5 minutes, garnish with fresh cilantro.', timer_seconds: 300 }
    ]
  },
  {
    title: 'Bhuna Khichuri with Fried Eggplant',
    cuisine: 'bangladeshi',
    category: 'rice',
    prep_time: 15,
    cook_time: 35,
    base_servings: 4,
    description: 'Rainy-day Bengali staple made with roasted moong dal, Chinigura rice, ghee, and whole warming spices.',
    thumbnail_url: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800',
    ingredients: [
      { name: 'chinigura rice', base_quantity: 300, unit: 'g', department: 'Pantry' },
      { name: 'roasted yellow moong dal', base_quantity: 200, unit: 'g', department: 'Pantry' },
      { name: 'ghee', base_quantity: 3, unit: 'tbsp', department: 'Dairy' },
      { name: 'mustard oil', base_quantity: 2, unit: 'tbsp', department: 'Pantry' },
      { name: 'eggplant round slices', base_quantity: 1, unit: 'piece', department: 'Produce' },
      { name: 'ginger paste', base_quantity: 1, unit: 'tbsp', department: 'Produce' }
    ],
    steps: [
      { step_number: 1, instruction: 'Dry roast moong dal until nutty and fragrant, then wash together with rice.', timer_seconds: 240 },
      { step_number: 2, instruction: 'Sauté onions, ginger, turmeric, and cumin in ghee and mustard oil.', timer_seconds: 300 },
      { step_number: 3, instruction: 'Add rice and dal, bhuna for 3 minutes, add 4 cups boiling water and cover on low flame.', timer_seconds: 1200 },
      { step_number: 4, instruction: 'Fry turmeric-salted eggplant rounds in mustard oil and serve alongside.', timer_seconds: 360 }
    ]
  },
  {
    title: 'Aloo Bhorta (Spicy Mashed Potatoes with Mustard Oil)',
    cuisine: 'bangladeshi',
    category: 'vegetarian',
    prep_time: 10,
    cook_time: 15,
    base_servings: 4,
    description: 'The quintessential comfort bhorta: boiled potatoes mashed with fried dried red chilies, chopped raw shallots, and pungent mustard oil.',
    thumbnail_url: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=800',
    ingredients: [
      { name: 'potatoes boiled', base_quantity: 4, unit: 'piece', department: 'Produce' },
      { name: 'dry red chilies fried', base_quantity: 4, unit: 'piece', department: 'Pantry' },
      { name: 'pure mustard oil', base_quantity: 2, unit: 'tbsp', department: 'Pantry' },
      { name: 'finely sliced shallots', base_quantity: 0.5, unit: 'cup', department: 'Produce' },
      { name: 'chopped fresh coriander', base_quantity: 2, unit: 'tbsp', department: 'Produce' },
      { name: 'salt', base_quantity: 1, unit: 'tsp', department: 'Pantry' }
    ],
    steps: [
      { step_number: 1, instruction: 'Boil potatoes until fork-tender, peel and mash smoothly while still warm.', timer_seconds: 900 },
      { step_number: 2, instruction: 'Crush fried dry red chilies with salt using fingertips to create spicy chili flakes.', timer_seconds: 60 },
      { step_number: 3, instruction: 'Mix crushed chilies, raw shallots, mustard oil, and coriander leaves thoroughly.', timer_seconds: 120 },
      { step_number: 4, instruction: 'Combine with mashed potatoes into round serving balls. Serve with hot rice and dal.', timer_seconds: 60 }
    ]
  },
  {
    title: 'Begun Bhorta (Smoky Fire-Roasted Eggplant Mash)',
    cuisine: 'bangladeshi',
    category: 'vegetarian',
    prep_time: 10,
    cook_time: 20,
    base_servings: 4,
    description: 'Whole eggplant roasted directly over open flame until charred and smoky, mashed with garlic, green chilies, and raw mustard oil.',
    thumbnail_url: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800',
    ingredients: [
      { name: 'large eggplant', base_quantity: 1, unit: 'piece', department: 'Produce' },
      { name: 'garlic cloves inserted', base_quantity: 4, unit: 'clove', department: 'Produce' },
      { name: 'green chilies roasted', base_quantity: 3, unit: 'piece', department: 'Produce' },
      { name: 'mustard oil', base_quantity: 1.5, unit: 'tbsp', department: 'Pantry' },
      { name: 'chopped red onion', base_quantity: 0.5, unit: 'cup', department: 'Produce' }
    ],
    steps: [
      { step_number: 1, instruction: 'Slit eggplant and insert garlic cloves inside. Brush skin with mustard oil.', timer_seconds: 120 },
      { step_number: 2, instruction: 'Roast over open flame, rotating every 3 minutes until skin is completely blackened and inside is soft.', timer_seconds: 720 },
      { step_number: 3, instruction: 'Peel burnt skin, mash smoky eggplant flesh together with the roasted garlic and green chilies.', timer_seconds: 180 },
      { step_number: 4, instruction: 'Fold in chopped onions, fresh mustard oil, and salt.', timer_seconds: 60 }
    ]
  },
  {
    title: 'Dim Bhuna (Caramelized Onion Spiced Egg Curry)',
    cuisine: 'bangladeshi',
    category: 'breakfast',
    prep_time: 10,
    cook_time: 20,
    base_servings: 4,
    description: 'Hard-boiled eggs prick-scored and fried in turmeric oil, then braised in thick, deeply spiced onion and tomato gravy.',
    thumbnail_url: 'https://images.unsplash.com/photo-1584734638093-ed8869c71f85?w=800',
    ingredients: [
      { name: 'hard boiled eggs', base_quantity: 6, unit: 'piece', department: 'Dairy' },
      { name: 'sliced onions', base_quantity: 1.5, unit: 'cup', department: 'Produce' },
      { name: 'chopped tomatoes', base_quantity: 1, unit: 'cup', department: 'Produce' },
      { name: 'ginger garlic paste', base_quantity: 1, unit: 'tbsp', department: 'Produce' },
      { name: 'mustard oil', base_quantity: 3, unit: 'tbsp', department: 'Pantry' },
      { name: 'roasted cumin powder', base_quantity: 1, unit: 'tsp', department: 'Pantry' }
    ],
    steps: [
      { step_number: 1, instruction: 'Prick boiled eggs with fork, rub with turmeric and salt, fry in mustard oil until blistered and golden.', timer_seconds: 180 },
      { step_number: 2, instruction: 'In the remaining oil, sauté sliced onions until soft and golden brown.', timer_seconds: 360 },
      { step_number: 3, instruction: 'Add ginger-garlic paste, tomatoes, and ground spices, cook until oil separates.', timer_seconds: 300 },
      { step_number: 4, instruction: 'Drop in fried eggs, simmer for 5 minutes in the reduced gravy, finish with roasted cumin powder.', timer_seconds: 300 }
    ]
  },
  {
    title: 'Ilish Macher Paturi',
    cuisine: 'bangladeshi',
    category: 'seafood',
    prep_time: 20,
    cook_time: 20,
    base_servings: 4,
    description: 'Hilsa fish steaks coated with stone-ground mustard, coconut paste, and green chilies, wrapped in fresh banana leaves and pan-steamed.',
    thumbnail_url: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=800',
    ingredients: [
      { name: 'ilish steaks', base_quantity: 4, unit: 'piece', department: 'Meat/Seafood' },
      { name: 'banana leaves', base_quantity: 4, unit: 'piece', department: 'Produce' },
      { name: 'mustard & poppy paste', base_quantity: 4, unit: 'tbsp', department: 'Pantry' },
      { name: 'grated fresh coconut', base_quantity: 3, unit: 'tbsp', department: 'Produce' },
      { name: 'raw mustard oil', base_quantity: 3, unit: 'tbsp', department: 'Pantry' }
    ],
    steps: [
      { step_number: 1, instruction: 'Soften banana leaves over an open flame for 10 seconds so they do not tear.', timer_seconds: 60 },
      { step_number: 2, instruction: 'Mix mustard-poppy paste, coconut, mustard oil, salt, and slit green chilies. Coat fish generously.', timer_seconds: null },
      { step_number: 3, instruction: 'Place each fish steak on a banana leaf, fold tightly into a parcel and tie with kitchen twine.', timer_seconds: 180 },
      { step_number: 4, instruction: 'Pan-steam parcels on a cast iron tawa with cover for 10 minutes per side on low heat.', timer_seconds: 1200 }
    ]
  },
  {
    title: 'Mutton Rezala (Dhaka Mughlai White Curry)',
    cuisine: 'bangladeshi',
    category: 'meat',
    prep_time: 25,
    cook_time: 75,
    base_servings: 5,
    description: 'A delicate royal Mughlai dish: tender mutton simmered in fragrant yogurt, cashew paste, mawa, white pepper, and mita attar.',
    thumbnail_url: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800',
    ingredients: [
      { name: 'mutton pieces with marrow', base_quantity: 900, unit: 'g', department: 'Meat/Seafood' },
      { name: 'sour yogurt whisked', base_quantity: 1, unit: 'cup', department: 'Dairy' },
      { name: 'cashew & poppy seed paste', base_quantity: 3, unit: 'tbsp', department: 'Pantry' },
      { name: 'ghee', base_quantity: 4, unit: 'tbsp', department: 'Dairy' },
      { name: 'whole dried red chilies', base_quantity: 6, unit: 'piece', department: 'Pantry' },
      { name: 'kewra & mita attar', base_quantity: 1, unit: 'tsp', department: 'Pantry' }
    ],
    steps: [
      { step_number: 1, instruction: 'Marinate mutton in yogurt, onion paste, ginger-garlic paste, and white pepper for 2 hours.', timer_seconds: null },
      { step_number: 2, instruction: 'Heat ghee in a pot, temper with cardamom, cloves, and whole dried red chilies.', timer_seconds: 60 },
      { step_number: 3, instruction: 'Add marinated mutton and cook on medium flame until oil begins to separate.', timer_seconds: 900 },
      { step_number: 4, instruction: 'Stir in cashew-poppy paste, add 1.5 cups warm water, cover and cook until meat is fork-tender.', timer_seconds: 3000 },
      { step_number: 5, instruction: 'Add kewra water and drops of mita attar, let rest for 10 minutes before serving with naan.', timer_seconds: 600 }
    ]
  },
  {
    title: 'Chitol Macher Muitha (Fish Dumpling Curry)',
    cuisine: 'bangladeshi',
    category: 'seafood',
    prep_time: 30,
    cook_time: 35,
    base_servings: 4,
    description: 'Feather-light dumplings scraped from fresh clown knifefish, poached in spiced broth, then simmered in rich tomato gravy.',
    thumbnail_url: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=800',
    ingredients: [
      { name: 'chitol fish scraped flesh', base_quantity: 500, unit: 'g', department: 'Meat/Seafood' },
      { name: 'boiled potato mashed', base_quantity: 0.5, unit: 'cup', department: 'Produce' },
      { name: 'ginger garlic paste', base_quantity: 2, unit: 'tbsp', department: 'Produce' },
      { name: 'mustard oil', base_quantity: 3, unit: 'tbsp', department: 'Pantry' },
      { name: 'onion paste', base_quantity: 0.5, unit: 'cup', department: 'Produce' },
      { name: 'garam masala', base_quantity: 1, unit: 'tsp', department: 'Pantry' }
    ],
    steps: [
      { step_number: 1, instruction: 'Knead scraped chitol fish with mashed potato, ginger paste, and salt into smooth oval dumplings (muitha).', timer_seconds: 300 },
      { step_number: 2, instruction: 'Poach dumplings in boiling salted water for 5 minutes, drain and lightly shallow fry in oil.', timer_seconds: 480 },
      { step_number: 3, instruction: 'Sauté onion paste, tomato puree, and spices in mustard oil until aromatic.', timer_seconds: 420 },
      { step_number: 4, instruction: 'Add dumplings into the gravy and simmer for 10 minutes until flavors absorb.', timer_seconds: 600 }
    ]
  },
  {
    title: 'Pabda Macher Tel Jhol',
    cuisine: 'bangladeshi',
    category: 'seafood',
    prep_time: 10,
    cook_time: 15,
    base_servings: 4,
    description: 'Delicate freshwater butterfish gently poached in mustard oil infused with nigella seeds and fresh slit green chilies.',
    thumbnail_url: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=800',
    ingredients: [
      { name: 'pabda fish whole cleaned', base_quantity: 4, unit: 'piece', department: 'Meat/Seafood' },
      { name: 'kalonji nigella seeds', base_quantity: 1, unit: 'tsp', department: 'Pantry' },
      { name: 'green chilies', base_quantity: 6, unit: 'piece', department: 'Produce' },
      { name: 'mustard oil', base_quantity: 3, unit: 'tbsp', department: 'Pantry' },
      { name: 'turmeric & red chili powder', base_quantity: 1, unit: 'tbsp', department: 'Pantry' }
    ],
    steps: [
      { step_number: 1, instruction: 'Lightly fry pabda fish with pinch of salt and turmeric for 90 seconds per side; set aside.', timer_seconds: 180 },
      { step_number: 2, instruction: 'Temper hot mustard oil with kalonji seeds and slit green chilies.', timer_seconds: 45 },
      { step_number: 3, instruction: 'Add spice slurry with 1 cup warm water, bring to boil, slip fish in, and simmer for 6 minutes.', timer_seconds: 360 }
    ]
  },
  {
    title: 'Lau Chingri (Bottle Gourd with Baby Prawns)',
    cuisine: 'bangladeshi',
    category: 'seafood',
    prep_time: 15,
    cook_time: 25,
    base_servings: 4,
    description: 'Sweet, tender matchstick bottle gourd cooked with sweet baby river prawns, turmeric, and fresh cilantro.',
    thumbnail_url: 'https://images.unsplash.com/photo-1559742811-822873691df8?w=800',
    ingredients: [
      { name: 'bottle gourd julienned', base_quantity: 600, unit: 'g', department: 'Produce' },
      { name: 'small river shrimp', base_quantity: 200, unit: 'g', department: 'Meat/Seafood' },
      { name: 'mustard oil', base_quantity: 2, unit: 'tbsp', department: 'Pantry' },
      { name: 'paanch phoron', base_quantity: 0.5, unit: 'tsp', department: 'Pantry' },
      { name: 'fresh coriander chopped', base_quantity: 0.25, unit: 'cup', department: 'Produce' }
    ],
    steps: [
      { step_number: 1, instruction: 'Lightly sear baby shrimp in mustard oil with pinch of turmeric for 2 minutes.', timer_seconds: 120 },
      { step_number: 2, instruction: 'Temper oil with paanch phoron, add julienned bottle gourd, green chilies, and salt.', timer_seconds: 300 },
      { step_number: 3, instruction: 'Cover and let bottle gourd cook in its own sweet juices until tender.', timer_seconds: 900 },
      { step_number: 4, instruction: 'Stir in shrimp, finish with fresh chopped cilantro.', timer_seconds: 180 }
    ]
  },
  {
    title: 'Piyaju (Crispy Red Lentil & Onion Fritters)',
    cuisine: 'bangladeshi',
    category: 'snack',
    prep_time: 15,
    cook_time: 15,
    base_servings: 4,
    description: 'The definitive Iftar snack: coarsely ground masoor dal fritters packed with crunchy sliced onions and green chilies.',
    thumbnail_url: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800',
    ingredients: [
      { name: 'red lentils masoor dal soaked', base_quantity: 1, unit: 'cup', department: 'Pantry' },
      { name: 'sliced onions', base_quantity: 1.5, unit: 'cup', department: 'Produce' },
      { name: 'chopped green chilies', base_quantity: 3, unit: 'piece', department: 'Produce' },
      { name: 'turmeric powder', base_quantity: 0.5, unit: 'tsp', department: 'Pantry' },
      { name: 'oil for frying', base_quantity: 2, unit: 'cup', department: 'Pantry' }
    ],
    steps: [
      { step_number: 1, instruction: 'Coarsely grind soaked red lentils without adding water.', timer_seconds: 120 },
      { step_number: 2, instruction: 'Mix ground lentils with onions, chilies, ginger, turmeric, and salt until onions soften slightly.', timer_seconds: 180 },
      { step_number: 3, instruction: 'Drop flat patties into hot oil and deep fry until deeply golden and extra crispy.', timer_seconds: 360 }
    ]
  },
  {
    title: 'Mishti Doi (Clay Pot Caramelized Sweet Yogurt)',
    cuisine: 'bangladeshi',
    category: 'dessert',
    prep_time: 20,
    cook_time: 40,
    base_servings: 6,
    description: 'Iconic Bengali sweet yogurt set in earthen clay pots, flavored with caramelized palm jaggery and reduced whole milk.',
    thumbnail_url: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800',
    ingredients: [
      { name: 'full cream milk', base_quantity: 1000, unit: 'ml', department: 'Dairy' },
      { name: 'date palm jaggery or sugar', base_quantity: 1, unit: 'cup', department: 'Pantry' },
      { name: 'hung yogurt starter', base_quantity: 2, unit: 'tbsp', department: 'Dairy' },
      { name: 'crushed green cardamom', base_quantity: 3, unit: 'piece', department: 'Pantry' }
    ],
    steps: [
      { step_number: 1, instruction: 'Boil milk with cardamom until reduced to half its original volume.', timer_seconds: 1500 },
      { step_number: 2, instruction: 'Caramelize sugar in a separate pan until golden amber, then pour into the hot reduced milk.', timer_seconds: 300 },
      { step_number: 3, instruction: 'Let milk cool to lukewarm (40°C), whisk in hung yogurt starter thoroughly.', timer_seconds: 180 },
      { step_number: 4, instruction: 'Pour into unglazed earthen clay pots, wrap in blankets or place in warm oven for 8 hours to set.', timer_seconds: null }
    ]
  },
  {
    title: 'Patishapta Pitha',
    cuisine: 'bangladeshi',
    category: 'dessert',
    prep_time: 25,
    cook_time: 25,
    base_servings: 6,
    description: 'Delicate crepes made from rice flour and semolina, rolled around a luscious filling of condensed milk kheer and coconut.',
    thumbnail_url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800',
    ingredients: [
      { name: 'rice flour', base_quantity: 1, unit: 'cup', department: 'Pantry' },
      { name: 'semolina suji', base_quantity: 0.5, unit: 'cup', department: 'Pantry' },
      { name: 'milk kheer or mawa filling', base_quantity: 1.5, unit: 'cup', department: 'Dairy' },
      { name: 'date palm jaggery', base_quantity: 0.5, unit: 'cup', department: 'Pantry' },
      { name: 'ghee for greasing', base_quantity: 2, unit: 'tbsp', department: 'Dairy' }
    ],
    steps: [
      { step_number: 1, instruction: 'Whisk rice flour, semolina, all-purpose flour, milk, and jaggery into a thin crepe batter.', timer_seconds: 300 },
      { step_number: 2, instruction: 'Lightly grease a non-stick pan with ghee and pour a ladle of batter, swirling into a thin circle.', timer_seconds: 60 },
      { step_number: 3, instruction: 'Place a log of sweet kheer filling along the edge, roll tightly into a cylinder.', timer_seconds: 60 },
      { step_number: 4, instruction: 'Cook for another minute until golden, repeat for remaining crepes.', timer_seconds: 300 }
    ]
  }
];

// Generate procedural realistic variations to reach 50 Bangladeshi recipes
const additionalTitles = [
  ['Tel Koi (Climbing Perch in Mustard Gravy)', 'seafood', 15, 25, 4, 'Spicy mustard oil braised climbing perch with green chilies.'],
  ['Rui Posto (Carp in Poppy Seed Paste)', 'seafood', 15, 20, 4, 'Rohu steaks cooked in silky poppy seed paste with green chilies.'],
  ['Shutki Bhuna (Spicy Dried Loitta Fish)', 'seafood', 20, 30, 4, 'Dried fish braised with heavy garlic, onions, and red chilies.'],
  ['Cholar Dal with Coconut', 'vegetarian', 15, 30, 4, 'Split Bengal gram cooked with fried coconut slices and whole spices.'],
  ['Luchi (Bengali Deep-Fried Puffed Bread)', 'breakfast', 20, 15, 4, 'Golden puffed maida flatbreads fried in pure ghee.'],
  ['Beguni (Crispy Eggplant Fritters)', 'snack', 10, 15, 4, 'Eggplant slices dipped in spiced chickpea batter and fried crisp.'],
  ['Khasir Mangshor Jhol (Home Mutton Curry)', 'meat', 20, 60, 5, 'Traditional Sunday mutton curry with big golden potato chunks.'],
  ['Murgir Lal Jhol (Spicy Red Chicken Curry)', 'meat', 15, 40, 4, 'Classic rustic chicken curry with deeply browned onions.'],
  ['Mochar Ghonto (Banana Blossom Curry)', 'vegetarian', 30, 30, 4, 'Finely chopped banana flower braised with coconut and chickpeas.'],
  ['Dhokar Dalna (Lentil Cake Curry)', 'vegetarian', 25, 30, 4, 'Steamed and fried chana dal cakes simmered in ginger-cumin sauce.'],
  ['Chanar Dalna (Cottage Cheese Curry)', 'vegetarian', 20, 25, 4, 'Fresh handmade paneer cubes cooked in tomato and garam masala gravy.'],
  ['Potol Posto (Pointed Gourd with Poppy Seeds)', 'vegetarian', 15, 20, 4, 'Tender pointed gourd simmered in creamy poppy seed paste.'],
  ['Borboti Bhorta (Yardlong Bean Mash)', 'vegetarian', 10, 15, 4, 'Boiled yardlong beans mashed with garlic, dried chilies, and mustard oil.'],
  ['Tomato Bhorta (Charred Tomato Mash)', 'vegetarian', 10, 10, 4, 'Flame-charred tomatoes mashed with raw shallots and mustard oil.'],
  ['Dal Puri (Spiced Lentil Stuffed Bread)', 'breakfast', 25, 20, 4, 'Crispy puffed breads filled with seasoned yellow lentils.'],
  ['Chachchari (Mixed Vegetable Mustard Stir-Fry)', 'vegetarian', 15, 20, 4, 'Seasonal vegetable medley stir-fried with mustard seed paste.'],
  ['Shobji Labra (Traditional Mixed Vegetables)', 'vegetarian', 20, 30, 5, 'Festive vegetable medley slow-simmered with paanch phoron and ghee.'],
  ['Fulkopi Diye Rui Mach (Carp with Winter Cauliflower)', 'seafood', 15, 25, 4, 'Fresh fish and cauliflower simmered in fragrant light broth.'],
  ['Doodh Maach (Fish in Milk Gravy)', 'seafood', 15, 20, 4, 'Barramundi steaks gently cooked in whole milk with green cardamom.'],
  ['Macher Matha Diye Mung Dal (Fish Head Lentils)', 'seafood', 20, 35, 4, 'Roasted moong dal slow cooked with spiced Rohu fish head.'],
  ['Chingri Macher Chop (Bengali Prawn Croquettes)', 'snack', 20, 20, 4, 'Spiced minced prawn and potato croquettes breaded and fried.'],
  ['Shahi Tukra (Old Dhaka Saffron Toast)', 'dessert', 15, 20, 4, 'Ghee-fried toast soaked in rich saffron cardamom rabri.'],
  ['Roshogolla in Cardamom Syrup', 'dessert', 25, 30, 6, 'Spongy chhana cottage cheese balls simmered in sugar syrup.'],
  ['Chomchom (Tangail Style Sweet)', 'dessert', 25, 35, 6, 'Dense caramelized sweet coated in grated dried mawa.'],
  ['Shemai Zorda (Sweet Dry Vermicelli)', 'dessert', 10, 15, 4, 'Roasted fine vermicelli cooked with ghee, raisins, and nuts.'],
  ['Firni (Creamy Rice Pudding in Clay Cup)', 'dessert', 15, 30, 4, 'Ground fragrant rice simmered in whole milk with rosewater.'],
  ['Morog Chaap (Mughlai Braised Chicken)', 'meat', 25, 45, 4, 'Chicken leg quarters slow roasted in poppy-cashew gravy.'],
  ['Beef Shikampuri Kebab', 'meat', 25, 20, 4, 'Spiced minced beef patties stuffed with yogurt and mint.'],
  ['Panta Ilish with Dry Chili', 'seafood', 10, 15, 4, 'Fermented rice served with crispy fried hilsa and onion slices.'],
  ['Kakral Chingri Bhorta', 'seafood', 15, 20, 4, 'Teasel gourd stuffed with spiced prawns and mashed with mustard oil.']
];

for (let i = 0; i < additionalTitles.length; i++) {
  const [title, category, prep, cook, serv, desc] = additionalTitles[i];
  bangladeshiRecipes.push({
    title,
    cuisine: 'bangladeshi',
    category,
    prep_time: prep,
    cook_time: cook,
    base_servings: serv,
    description: desc,
    thumbnail_url: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800',
    ingredients: [
      { name: 'main base ingredient', base_quantity: 500, unit: 'g', department: category === 'seafood' || category === 'meat' ? 'Meat/Seafood' : 'Produce' },
      { name: 'mustard oil', base_quantity: 2, unit: 'tbsp', department: 'Pantry' },
      { name: 'green chilies', base_quantity: 4, unit: 'piece', department: 'Produce' },
      { name: 'turmeric & cumin', base_quantity: 1, unit: 'tbsp', department: 'Pantry' },
      { name: 'chopped onions', base_quantity: 1, unit: 'cup', department: 'Produce' }
    ],
    steps: [
      { step_number: 1, instruction: 'Prep and marinate ingredients with basic turmeric, salt, and mustard oil.', timer_seconds: 300 },
      { step_number: 2, instruction: 'Heat pan, temper aromatics and sauté onions until golden fragrant.', timer_seconds: 360 },
      { step_number: 3, instruction: 'Slow cook the dish covered on medium heat until tender.', timer_seconds: cook * 60 },
      { step_number: 4, instruction: 'Garnish with green chilies and serve warm.', timer_seconds: null }
    ]
  });
}

module.exports = bangladeshiRecipes;
