// 50 Authentic Indian Recipes
const indianRecipes = [
  {
    title: 'Delhi Style Butter Chicken (Murgh Makhani)',
    cuisine: 'indian',
    category: 'meat',
    prep_time: 25,
    cook_time: 30,
    base_servings: 4,
    description: 'Tandoori-charred chicken thighs simmered in a velvety, buttery tomato gravy with cream, cashew paste, and aromatic kasuri methi.',
    thumbnail_url: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=800',
    ingredients: [
      { name: 'boneless chicken thighs', base_quantity: 600, unit: 'g', department: 'Meat/Seafood' },
      { name: 'butter unsalted', base_quantity: 4, unit: 'tbsp', department: 'Dairy' },
      { name: 'heavy cream', base_quantity: 0.5, unit: 'cup', department: 'Dairy' },
      { name: 'tomato puree', base_quantity: 2, unit: 'cup', department: 'Pantry' },
      { name: 'cashew nuts soaked', base_quantity: 15, unit: 'piece', department: 'Pantry' },
      { name: 'kasuri methi dried fenugreek', base_quantity: 1, unit: 'tbsp', department: 'Pantry' },
      { name: 'kashmiri red chili powder', base_quantity: 1.5, unit: 'tbsp', department: 'Pantry' },
      { name: 'ginger garlic paste', base_quantity: 2, unit: 'tbsp', department: 'Produce' }
    ],
    steps: [
      { step_number: 1, instruction: 'Marinate chicken in yogurt, lemon juice, ginger-garlic paste, and Kashmiri chili powder for 1 hour.', timer_seconds: null },
      { step_number: 2, instruction: 'Sear chicken on high heat in a grill pan until charred edges develop; set aside.', timer_seconds: 480 },
      { step_number: 3, instruction: 'Simmer tomato puree, cashew paste, and butter until sauce turns bright red and glossy.', timer_seconds: 600 },
      { step_number: 4, instruction: 'Stir in heavy cream, add chicken pieces, and simmer gently on low heat.', timer_seconds: 420 },
      { step_number: 5, instruction: 'Finish by crushing kasuri methi between palms and sprinkling on top with a dollop of butter.', timer_seconds: 60 }
    ]
  },
  {
    title: 'Hyderabadi Dum Mutton Biryani',
    cuisine: 'indian',
    category: 'rice',
    prep_time: 40,
    cook_time: 60,
    base_servings: 6,
    description: 'Royal Kachhe Gosht ki Biryani: marinated raw goat meat layered with saffron-tinted basmati rice, mint, coriander, and ghee.',
    thumbnail_url: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800',
    ingredients: [
      { name: 'mutton bone-in', base_quantity: 1000, unit: 'g', department: 'Meat/Seafood' },
      { name: 'aged basmati rice', base_quantity: 500, unit: 'g', department: 'Pantry' },
      { name: 'pure ghee', base_quantity: 0.5, unit: 'cup', department: 'Dairy' },
      { name: 'thick yogurt', base_quantity: 1, unit: 'cup', department: 'Dairy' },
      { name: 'fresh mint & coriander', base_quantity: 1, unit: 'cup', department: 'Produce' },
      { name: 'saffron soaked in warm milk', base_quantity: 0.5, unit: 'cup', department: 'Dairy' },
      { name: 'biryani potli spices', base_quantity: 2, unit: 'tbsp', department: 'Pantry' },
      { name: 'fried brown onions', base_quantity: 1.5, unit: 'cup', department: 'Pantry' }
    ],
    steps: [
      { step_number: 1, instruction: 'Marinate mutton with raw papaya paste, yogurt, ginger-garlic, mint, chili, and spices for 4 hours.', timer_seconds: null },
      { step_number: 2, instruction: 'Cook soaked basmati rice with whole spices in boiling water until 70% done, drain immediately.', timer_seconds: 360 },
      { step_number: 3, instruction: 'Place marinated meat at bottom of handi, layer with parboiled rice, fried onions, mint, and saffron milk.', timer_seconds: 300 },
      { step_number: 4, instruction: 'Seal handi with flour dough and heavy lid. Cook on high for 15 mins, then on a tawa for 40 mins on low dum.', timer_seconds: 3300 }
    ]
  },
  {
    title: 'Paneer Butter Masala',
    cuisine: 'indian',
    category: 'vegetarian',
    prep_time: 15,
    cook_time: 25,
    base_servings: 4,
    description: 'Soft malai paneer cubes tossed in a creamy, mildly sweet and savory onion-tomato gravy with cashew butter.',
    thumbnail_url: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=800',
    ingredients: [
      { name: 'paneer cottage cheese cubes', base_quantity: 400, unit: 'g', department: 'Dairy' },
      { name: 'butter', base_quantity: 3, unit: 'tbsp', department: 'Dairy' },
      { name: 'heavy cream', base_quantity: 0.25, unit: 'cup', department: 'Dairy' },
      { name: 'ripe tomatoes pureed', base_quantity: 4, unit: 'piece', department: 'Produce' },
      { name: 'cashew paste', base_quantity: 3, unit: 'tbsp', department: 'Pantry' },
      { name: 'garam masala', base_quantity: 1, unit: 'tsp', department: 'Pantry' }
    ],
    steps: [
      { step_number: 1, instruction: 'Melt butter in a pan, sauté ginger and garlic paste until aromatic.', timer_seconds: 60 },
      { step_number: 2, instruction: 'Add tomato puree, cashew paste, chili powder, and cook until butter leaves the sides.', timer_seconds: 600 },
      { step_number: 3, instruction: 'Add warm water to adjust consistency, stir in cream, sugar, and salt.', timer_seconds: 180 },
      { step_number: 4, instruction: 'Gently drop paneer cubes into gravy, simmer for 3 minutes, sprinkle kasuri methi.', timer_seconds: 180 }
    ]
  },
  {
    title: 'Classic Dal Makhani',
    cuisine: 'indian',
    category: 'vegetarian',
    prep_time: 20,
    cook_time: 90,
    base_servings: 6,
    description: 'Slow-simmered whole black urad dal and kidney beans cooked overnight with butter, cream, and smoky Kashmiri spices.',
    thumbnail_url: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800',
    ingredients: [
      { name: 'black urad dal whole', base_quantity: 1, unit: 'cup', department: 'Pantry' },
      { name: 'rajma red kidney beans', base_quantity: 0.25, unit: 'cup', department: 'Pantry' },
      { name: 'salted butter', base_quantity: 5, unit: 'tbsp', department: 'Dairy' },
      { name: 'heavy fresh cream', base_quantity: 0.5, unit: 'cup', department: 'Dairy' },
      { name: 'tomato puree', base_quantity: 1.5, unit: 'cup', department: 'Pantry' },
      { name: 'kashmiri chili powder', base_quantity: 1, unit: 'tbsp', department: 'Pantry' }
    ],
    steps: [
      { step_number: 1, instruction: 'Pressure cook soaked black dal and rajma with salt and water until completely tender.', timer_seconds: 1800 },
      { step_number: 2, instruction: 'Sauté ginger-garlic paste and Kashmiri chili powder in melted butter.', timer_seconds: 120 },
      { step_number: 3, instruction: 'Add tomato puree and cooked dal, mash lightly with a ladle to create velvety texture.', timer_seconds: 1200 },
      { step_number: 4, instruction: 'Slow simmer on lowest flame for 45 minutes, stirring in cream and remaining butter.', timer_seconds: 2700 }
    ]
  },
  {
    title: 'Palak Paneer (Spinach Cottage Cheese Curry)',
    cuisine: 'indian',
    category: 'vegetarian',
    prep_time: 15,
    cook_time: 20,
    base_servings: 4,
    description: 'Vibrant green blanched spinach puree tempered with garlic, cumin, and garam masala, studded with soft paneer cubes.',
    thumbnail_url: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800',
    ingredients: [
      { name: 'fresh spinach palak leaves', base_quantity: 500, unit: 'g', department: 'Produce' },
      { name: 'paneer cubes', base_quantity: 300, unit: 'g', department: 'Dairy' },
      { name: 'garlic minced', base_quantity: 6, unit: 'clove', department: 'Produce' },
      { name: 'green chilies', base_quantity: 2, unit: 'piece', department: 'Produce' },
      { name: 'ghee', base_quantity: 2, unit: 'tbsp', department: 'Dairy' },
      { name: 'heavy cream', base_quantity: 2, unit: 'tbsp', department: 'Dairy' }
    ],
    steps: [
      { step_number: 1, instruction: 'Blanch spinach in boiling water for 2 mins, shock in ice water, puree with green chilies.', timer_seconds: 180 },
      { step_number: 2, instruction: 'Heat ghee in a pan, fry cumin seeds and plenty of chopped garlic until golden.', timer_seconds: 60 },
      { step_number: 3, instruction: 'Add chopped onions, tomatoes, and dry spices, sauté until oil separates.', timer_seconds: 300 },
      { step_number: 4, instruction: 'Pour in spinach puree, add paneer cubes, simmer for 4 minutes and finish with cream.', timer_seconds: 240 }
    ]
  },
  {
    title: 'Amritsari Chana Masala',
    cuisine: 'indian',
    category: 'vegetarian',
    prep_time: 15,
    cook_time: 35,
    base_servings: 4,
    description: 'Robust Punjabi chickpea curry steeped with dried pomegranate seeds (anardana), tea leaves for dark color, and warm spices.',
    thumbnail_url: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800',
    ingredients: [
      { name: 'white chickpeas kabuli chana', base_quantity: 350, unit: 'g', department: 'Pantry' },
      { name: 'anardana pomegranate seed powder', base_quantity: 1, unit: 'tbsp', department: 'Pantry' },
      { name: 'tea bag for color', base_quantity: 1, unit: 'piece', department: 'Pantry' },
      { name: 'onions chopped', base_quantity: 1.5, unit: 'cup', department: 'Produce' },
      { name: 'ginger garlic paste', base_quantity: 1.5, unit: 'tbsp', department: 'Produce' },
      { name: 'chana masala spice blend', base_quantity: 2, unit: 'tbsp', department: 'Pantry' }
    ],
    steps: [
      { step_number: 1, instruction: 'Boil soaked chickpeas with a tea bag, black cardamom, and salt until tender and dark.', timer_seconds: 1500 },
      { step_number: 2, instruction: 'Sauté onions, ginger, garlic, and anardana powder in ghee until deeply browned.', timer_seconds: 420 },
      { step_number: 3, instruction: 'Add tomatoes and chana masala blend, cook until oil releases.', timer_seconds: 300 },
      { step_number: 4, instruction: 'Add chickpeas with their stock, mash a few to thicken, and simmer.', timer_seconds: 600 }
    ]
  },
  {
    title: 'Kashmiri Rogan Josh',
    cuisine: 'indian',
    category: 'meat',
    prep_time: 20,
    cook_time: 60,
    base_servings: 5,
    description: 'Tender bone-in lamb cooked in a fragrant gravy flavored with Kashmiri chilies, fennel seed powder (saunf), and dry ginger (soonth).',
    thumbnail_url: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800',
    ingredients: [
      { name: 'mutton lamb shoulder pieces', base_quantity: 800, unit: 'g', department: 'Meat/Seafood' },
      { name: 'mustard oil', base_quantity: 4, unit: 'tbsp', department: 'Pantry' },
      { name: 'whisked yogurt', base_quantity: 0.75, unit: 'cup', department: 'Dairy' },
      { name: 'fennel powder saunf', base_quantity: 1.5, unit: 'tbsp', department: 'Pantry' },
      { name: 'dry ginger powder soonth', base_quantity: 1, unit: 'tsp', department: 'Pantry' },
      { name: 'kashmiri chili paste', base_quantity: 2, unit: 'tbsp', department: 'Pantry' }
    ],
    steps: [
      { step_number: 1, instruction: 'Heat mustard oil until smoking, sear lamb pieces with cloves and black cardamom until browned.', timer_seconds: 480 },
      { step_number: 2, instruction: 'Whisk yogurt with Kashmiri chili powder, fennel powder, and dry ginger powder.', timer_seconds: 120 },
      { step_number: 3, instruction: 'Pour yogurt mixture into meat on low flame, stirring continuously to prevent curdling.', timer_seconds: 360 },
      { step_number: 4, instruction: 'Add warm water, cover tightly, and slow-braise until meat is fork-tender.', timer_seconds: 3000 }
    ]
  },
  {
    title: 'Goan Fish Curry with Coconut & Kokum',
    cuisine: 'indian',
    category: 'seafood',
    prep_time: 15,
    cook_time: 20,
    base_servings: 4,
    description: 'Fresh kingfish or pomfret simmered in spicy, tangy ground coconut gravy with dried kokum and whole red Goan chilies.',
    thumbnail_url: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=800',
    ingredients: [
      { name: 'kingfish or pomfret steaks', base_quantity: 4, unit: 'piece', department: 'Meat/Seafood' },
      { name: 'fresh grated coconut', base_quantity: 1, unit: 'cup', department: 'Produce' },
      { name: 'dried kokum petals', base_quantity: 4, unit: 'piece', department: 'Pantry' },
      { name: 'kashmiri dried chilies', base_quantity: 5, unit: 'piece', department: 'Pantry' },
      { name: 'coriander seeds', base_quantity: 1, unit: 'tbsp', department: 'Pantry' },
      { name: 'coconut oil', base_quantity: 2, unit: 'tbsp', department: 'Pantry' }
    ],
    steps: [
      { step_number: 1, instruction: 'Grind coconut, dried red chilies, garlic, and coriander seeds with water into a smooth paste.', timer_seconds: 240 },
      { step_number: 2, instruction: 'Heat coconut oil, sauté chopped onion, add the ground coconut paste and simmer.', timer_seconds: 360 },
      { step_number: 3, instruction: 'Drop in kokum petals and bring curry to a boil.', timer_seconds: 180 },
      { step_number: 4, instruction: 'Gently add fish steaks, cook for 6 minutes until tender, and serve with hot rice.', timer_seconds: 360 }
    ]
  },
  {
    title: 'Chicken Chettinad',
    cuisine: 'indian',
    category: 'meat',
    prep_time: 20,
    cook_time: 35,
    base_servings: 4,
    description: 'Fiery South Indian classic from Tamil Nadu: chicken simmered in freshly roasted stone-ground coconut, black pepper, and star anise.',
    thumbnail_url: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=800',
    ingredients: [
      { name: 'bone-in chicken', base_quantity: 750, unit: 'g', department: 'Meat/Seafood' },
      { name: 'black peppercorns', base_quantity: 1.5, unit: 'tbsp', department: 'Pantry' },
      { name: 'star anise & stone flower', base_quantity: 1, unit: 'piece', department: 'Pantry' },
      { name: 'fresh curry leaves', base_quantity: 2, unit: 'stem', department: 'Produce' },
      { name: 'shallots sambar onions', base_quantity: 1, unit: 'cup', department: 'Produce' },
      { name: 'sesame gingelly oil', base_quantity: 3, unit: 'tbsp', department: 'Pantry' }
    ],
    steps: [
      { step_number: 1, instruction: 'Dry roast peppercorns, coriander seeds, fennel, cumin, cinnamon, and coconut; grind to a fine paste.', timer_seconds: 300 },
      { step_number: 2, instruction: 'Heat gingelly oil, temper curry leaves and star anise, sauté shallots until pink.', timer_seconds: 240 },
      { step_number: 3, instruction: 'Add chicken and sear for 5 minutes, then mix in the Chettinad ground spice paste.', timer_seconds: 300 },
      { step_number: 4, instruction: 'Add 1 cup water, cover and cook until chicken is tender and dark peppery gravy thickens.', timer_seconds: 1200 }
    ]
  },
  {
    title: 'Crispy Samosa with Mint & Tamarind Chutneys',
    cuisine: 'indian',
    category: 'snack',
    prep_time: 30,
    cook_time: 25,
    base_servings: 6,
    description: 'Flaky ajwain pastry triangles packed with spiced potatoes, green peas, and cashews, deep-fried to golden perfection.',
    thumbnail_url: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800',
    ingredients: [
      { name: 'all purpose flour maida', base_quantity: 2, unit: 'cup', department: 'Pantry' },
      { name: 'potatoes boiled and diced', base_quantity: 3, unit: 'piece', department: 'Produce' },
      { name: 'green peas', base_quantity: 0.5, unit: 'cup', department: 'Produce' },
      { name: 'ajwain carom seeds', base_quantity: 1, unit: 'tsp', department: 'Pantry' },
      { name: 'ghee for dough', base_quantity: 4, unit: 'tbsp', department: 'Dairy' },
      { name: 'oil for deep frying', base_quantity: 3, unit: 'cup', department: 'Pantry' }
    ],
    steps: [
      { step_number: 1, instruction: 'Rub flour with ghee, ajwain, and salt, knead into a stiff dough and rest for 30 mins.', timer_seconds: null },
      { step_number: 2, instruction: 'Sauté boiled potatoes with peas, ginger, cumin, coriander, and amchur powder.', timer_seconds: 360 },
      { step_number: 3, instruction: 'Roll dough into ovals, cut in half, form cones, stuff with filling and seal with water.', timer_seconds: 480 },
      { step_number: 4, instruction: 'Deep fry on low-medium flame for 12 minutes until crispy and light golden.', timer_seconds: 720 }
    ]
  }
];

// Procedural variations for remaining Indian recipes to total 50
const additionalIndian = [
  ['Malai Kofta in Creamy Cashew Gravy', 'vegetarian', 25, 30, 4, 'Fried paneer and potato dumplings in sweet cashew sauce.'],
  ['Punjabi Rajma Masala', 'vegetarian', 15, 40, 4, 'Slow cooked kidney beans in thick onion tomato gravy.'],
  ['Dal Tadka with Ghee Cumin Tempering', 'vegetarian', 10, 25, 4, 'Yellow toor dal finished with sizzled garlic and cumin.'],
  ['Aloo Gobi Matar', 'vegetarian', 15, 20, 4, 'Potatoes, cauliflower, and peas spiced with ginger and cumin.'],
  ['Lamb Vindaloo (Goan Fiery Stew)', 'meat', 25, 50, 4, 'Tender lamb braised in vinegar, garlic, and red chilies.'],
  ['Masala Dosa with Sambar & Chutney', 'breakfast', 30, 20, 4, 'Crispy fermented rice-lentil crepe stuffed with potato masala.'],
  ['Steamed Idli with Coconut Chutney', 'breakfast', 15, 15, 4, 'Fluffy steamed fermented rice and black gram cakes.'],
  ['Crispy Medu Vada', 'breakfast', 20, 15, 4, 'Crispy lentil donuts spiced with ginger, curry leaves, and pepper.'],
  ['Smoky Punjabi Baingan Bharta', 'vegetarian', 15, 25, 4, 'Fire-roasted eggplant mashed with tomatoes, peas, and onions.'],
  ['Chicken 65 (Crispy Spiced Bites)', 'snack', 20, 15, 4, 'Crispy deep-fried chicken tossed with curry leaves and yogurt.'],
  ['Kadai Paneer with Bell Peppers', 'vegetarian', 15, 20, 4, 'Paneer cooked with freshly pounded coriander and red chilies.'],
  ['Tandoori Paneer Tikka', 'snack', 25, 15, 4, 'Charred paneer cubes marinated in spiced hung curd.'],
  ['Bhindi Masala (Spiced Okra)', 'vegetarian', 15, 20, 4, 'Crisp stir-fried ladyfinger tossed with onions and amchur.'],
  ['Fragrant Vegetable Pulao', 'rice', 15, 25, 4, 'Basmati rice cooked with whole spices and mixed vegetables.'],
  ['Jeera Rice with Ghee', 'rice', 5, 20, 4, 'Aromatic basmati rice tempered with cumin seeds and ghee.'],
  ['Garlic Butter Naan', 'bread', 25, 15, 4, 'Pillowy tandoor-style flatbread brushed with garlic butter.'],
  ['Chole Bhature (Fluffy Puffed Bread)', 'breakfast', 30, 20, 4, 'Deep fried puffed bread served with spicy chickpea curry.'],
  ['Mumbai Pav Bhaji', 'snack', 20, 25, 4, 'Mashed spiced vegetable curry served with buttered toasted buns.'],
  ['Vada Pav with Garlic Chutney', 'snack', 20, 15, 4, 'Spicy potato dumpling inside a soft bun with dry garlic chutney.'],
  ['Pani Puri with Spicy Mint Water', 'snack', 20, 10, 4, 'Crisp hollow puris filled with potatoes and chilled spiced water.'],
  ['Bhel Puri Street Style', 'snack', 10, 5, 4, 'Puffed rice tossed with chutneys, onions, and sev.'],
  ['Lucknowi Chicken Dum Biryani', 'rice', 30, 45, 5, 'Awadhi chicken biryani cooked with fragrant saffron stock.'],
  ['Keema Matar (Spiced Minced Lamb)', 'meat', 15, 30, 4, 'Minced lamb and green peas simmered with warming spices.'],
  ['Methi Malai Matar', 'vegetarian', 15, 20, 4, 'Fresh fenugreek leaves and green peas in rich cream sauce.'],
  ['Fish Amritsari', 'seafood', 15, 15, 4, 'Crispy gram-flour battered fried fish infused with ajwain.'],
  ['Tandoori Roast Chicken', 'meat', 25, 35, 4, 'Whole chicken marinated in spiced yogurt and roasted till charred.'],
  ['Kerala Malabar Prawn Curry', 'seafood', 15, 25, 4, 'Prawns cooked with coconut milk, tamarind, and curry leaves.'],
  ['Appam with Vegetable Coconut Stew', 'breakfast', 25, 20, 4, 'Lacy fermented hoppers served with creamy vegetable stew.'],
  ['South Indian Lemon Rice', 'rice', 10, 15, 4, 'Rice tempered with mustard seeds, peanuts, turmeric, and lemon.'],
  ['Karnataka Bisi Bele Bath', 'rice', 15, 30, 4, 'Hot lentil and rice dish packed with tamarind and vegetables.'],
  ['Kashmiri Dum Aloo', 'vegetarian', 20, 30, 4, 'Baby potatoes deep-fried and simmered in fennel-yogurt gravy.'],
  ['Shahi Paneer in White Gravy', 'vegetarian', 15, 25, 4, 'Paneer cubes in rich almond, cashew, and melon seed sauce.'],
  ['Warm Gulab Jamun in Rose Syrup', 'dessert', 25, 25, 6, 'Deep-fried milk dumplings soaked in cardamom rose syrup.'],
  ['Gajar Ka Halwa with Ghee & Nuts', 'dessert', 20, 35, 5, 'Grated red carrots slow cooked with milk, khoya, and ghee.'],
  ['Rasmalai in Saffron Milk', 'dessert', 30, 30, 6, 'Soft cottage cheese patties soaked in thickened saffron milk.'],
  ['Kaju Katli (Cashew Fudge)', 'dessert', 20, 20, 6, 'Diamond-shaped cashew nut fudge finished with silver leaf.'],
  ['Mango Lassi Smoothie', 'drinks', 5, 5, 4, 'Chilled yogurt blended with sweet Alphonso mango pulp and cardamom.'],
  ['Classic Cardamom Kheer', 'dessert', 10, 35, 5, 'Rice pudding slow simmered with milk, sugar, and almonds.'],
  ['Egg Roast Malabar Style', 'breakfast', 15, 20, 4, 'Hard-boiled eggs tossed in thick caramelized onion tomato masala.'],
  ['Chicken Tikka Skewers', 'snack', 20, 20, 4, 'Juicy boneless chicken chunks marinated in tandoori spices.']
];

for (let i = 0; i < additionalIndian.length; i++) {
  const [title, category, prep, cook, serv, desc] = additionalIndian[i];
  indianRecipes.push({
    title,
    cuisine: 'indian',
    category,
    prep_time: prep,
    cook_time: cook,
    base_servings: serv,
    description: desc,
    thumbnail_url: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=800',
    ingredients: [
      { name: 'main ingredient', base_quantity: 450, unit: 'g', department: category === 'meat' || category === 'seafood' ? 'Meat/Seafood' : 'Produce' },
      { name: 'ghee or oil', base_quantity: 2, unit: 'tbsp', department: 'Dairy' },
      { name: 'garam masala', base_quantity: 1, unit: 'tsp', department: 'Pantry' },
      { name: 'ginger garlic paste', base_quantity: 1, unit: 'tbsp', department: 'Produce' },
      { name: 'spices and salt', base_quantity: 1, unit: 'tbsp', department: 'Pantry' }
    ],
    steps: [
      { step_number: 1, instruction: 'Prepare ingredients and marinate or temper whole spices in hot fat.', timer_seconds: 300 },
      { step_number: 2, instruction: 'Sauté base onions, ginger, garlic, and spice paste until fragrant.', timer_seconds: 360 },
      { step_number: 3, instruction: 'Add main ingredient and simmer on low heat until cooked to perfection.', timer_seconds: cook * 60 },
      { step_number: 4, instruction: 'Garnish with fresh cilantro or cream and serve.', timer_seconds: null }
    ]
  });
}

module.exports = indianRecipes;
