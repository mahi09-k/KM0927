import { useState } from 'react';
import { Plus, X, Search, Sparkles } from 'lucide-react';
import usePantryStore from '../../store/pantryStore';
import useLanguageStore from '../../store/languageStore';
import { translations, toBengaliNumber } from '../../i18n/translations';

const CUISINE_PANTRY_DATA = {
  all: [
    { key: 'eggs', en: 'Eggs', bn: 'ডিম' },
    { key: 'milk', en: 'Milk', bn: 'দুধ' },
    { key: 'butter', en: 'Butter', bn: 'মাখন' },
    { key: 'garlic', en: 'Garlic', bn: 'রসুন' },
    { key: 'onion', en: 'Onion', bn: 'পেঁয়াজ' },
    { key: 'tomatoes', en: 'Tomatoes', bn: 'টমেটো' },
    { key: 'potatoes', en: 'Potatoes', bn: 'আলু' },
    { key: 'chicken', en: 'Chicken', bn: 'মুরগির মাংস' },
    { key: 'rice', en: 'Rice', bn: 'চাল/ভাত' },
    { key: 'oil', en: 'Cooking Oil', bn: 'তেল' },
    { key: 'salt', en: 'Salt & Pepper', bn: 'লবণ ও গোলমরিচ' },
    { key: 'ginger', en: 'Ginger', bn: 'আদা' },
    { key: 'green chilies', en: 'Green Chilies', bn: 'কাঁচা মরিচ' },
  ],
  bangladeshi: [
    { key: 'mustard oil', en: 'Mustard Oil', bn: 'সরিষার তেল' },
    { key: 'ilish', en: 'Ilish / Hilsa', bn: 'ইলিশ মাছ' },
    { key: 'rui', en: 'Rui / Carp', bn: 'রুই মাছ' },
    { key: 'chingri', en: 'Chingri / Prawns', bn: 'চিংড়ি' },
    { key: 'chinigura rice', en: 'Chinigura Rice', bn: 'চিনিগুঁড়া চাল' },
    { key: 'mustard seeds', en: 'Mustard Seeds / Shorshe', bn: 'সরিষা বাটা' },
    { key: 'yellow moong dal', en: 'Roasted Moong Dal', bn: 'ভাজা মুগ ডাল' },
    { key: 'red lentils', en: 'Masoor Dal', bn: 'মসুর ডাল' },
    { key: 'beef', en: 'Beef Brisket / Shank', bn: 'গরুর মাংস' },
    { key: 'mutton', en: 'Mutton Goat', bn: 'খাসির মাংস' },
    { key: 'eggplant', en: 'Eggplant / Begun', bn: 'বেগুন' },
    { key: 'bottle gourd', en: 'Bottle Gourd / Lau', bn: 'লাউ' },
    { key: 'dry red chilies', en: 'Dry Red Chilies', bn: 'শুকনা মরিচ' },
    { key: 'posto', en: 'Poppy Seeds / Posto', bn: 'পোস্তদানা' },
    { key: 'paanch phoron', en: 'Paanch Phoron', bn: 'পাঁচফোড়ন' },
    { key: 'coconut milk', en: 'Coconut Milk', bn: 'নারকেলের দুধ' },
    { key: 'alu bukhara', en: 'Alu Bukhara Prunes', bn: 'আলু বোখারা' },
    { key: 'ghee', en: 'Pure Ghee', bn: 'খাঁটি ঘি' },
  ],
  indian: [
    { key: 'paneer', en: 'Fresh Paneer', bn: 'পনির' },
    { key: 'basmati rice', en: 'Aged Basmati Rice', bn: 'বাসমতি চাল' },
    { key: 'black urad dal', en: 'Black Urad Dal', bn: 'কালো কলাই ডাল' },
    { key: 'chickpeas', en: 'Chickpeas / Chana', bn: 'ছোলা / কাবুলি চানা' },
    { key: 'kasuri methi', en: 'Kasuri Methi', bn: 'কসুরি মেথি' },
    { key: 'garam masala', en: 'Garam Masala', bn: 'গরম মশলা' },
    { key: 'yogurt', en: 'Thick Yogurt / Curd', bn: 'টক দই' },
    { key: 'spinach', en: 'Fresh Spinach / Palak', bn: 'পালং শাক' },
    { key: 'cashew', en: 'Cashews', bn: 'কাজুবাদাম' },
    { key: 'curry leaves', en: 'Curry Leaves', bn: 'কারিপাতা' },
    { key: 'cumin', en: 'Cumin Seeds / Jeera', bn: 'আস্ত জিরা' },
    { key: 'coriander', en: 'Fresh Coriander', bn: 'ধনেপাতা' },
    { key: 'turmeric', en: 'Turmeric Powder', bn: 'হলুদ গুঁড়া' },
    { key: 'kashmiri chili', en: 'Kashmiri Chili Powder', bn: 'কাশ্মীরি মরিচ গুঁড়া' },
  ],
  western: [
    { key: 'pasta', en: 'Pasta (Penne/Spaghetti)', bn: 'পাস্তা / স্প্যাগেটি' },
    { key: 'parmesan', en: 'Parmesan Reggiano', bn: 'পারমেসান পনির' },
    { key: 'mozzarella', en: 'Fresh Mozzarella', bn: 'মোজারেলা পনির' },
    { key: 'olive oil', en: 'Extra Virgin Olive Oil', bn: 'অলিভ অয়েল' },
    { key: 'heavy cream', en: 'Heavy Cream', bn: 'হেভি ক্রিম' },
    { key: 'butter', en: 'Unsalted Butter', bn: 'বাটার / মাখন' },
    { key: 'salmon', en: 'Salmon Fillets', bn: 'স্যামন মাছ' },
    { key: 'steak', en: 'Beef Steak / Chuck', bn: 'বিফ স্টেক' },
    { key: 'ground beef', en: 'Ground Beef 80/20', bn: 'গরুর কিমা' },
    { key: 'mushrooms', en: 'Cremini / Wild Mushrooms', bn: 'মাশরুম' },
    { key: 'breadcrumbs', en: 'Panko Breadcrumbs', bn: 'ব্রেডক্রাম্ব' },
    { key: 'bacon', en: 'Crispy Bacon', bn: 'বেকন' },
    { key: 'rosemary', en: 'Fresh Rosemary & Thyme', bn: 'রোজমেরি ও থাইম' },
    { key: 'honey', en: 'Pure Honey', bn: 'খাঁটি মধু' },
    { key: 'sun-dried tomatoes', en: 'Sun-Dried Tomatoes', bn: 'সান-ড্রাইড টমেটো' },
    { key: 'sourdough', en: 'Sourdough / Baguette', bn: 'ফ্রেঞ্চ রুটি' },
  ],
};

export default function PantryMode({ onSearch }) {
  const { selectedIngredients, addIngredient, removeIngredient, clearIngredients } = usePantryStore();
  const { language } = useLanguageStore();
  const t = translations[language] || translations.en;

  const [activeTab, setActiveTab] = useState('all');
  const [targetCuisine, setTargetCuisine] = useState('all');
  const [input, setInput] = useState('');

  const handleCustomAdd = () => {
    if (input.trim()) {
      addIngredient(input.trim().toLowerCase());
      setInput('');
    }
  };

  const handleSearchClick = () => {
    onSearch(selectedIngredients, targetCuisine);
  };

  const tabs = [
    { id: 'all', label: t.pantry.pantryTabs.all },
    { id: 'bangladeshi', label: t.pantry.pantryTabs.bangladeshi },
    { id: 'indian', label: t.pantry.pantryTabs.indian },
    { id: 'western', label: t.pantry.pantryTabs.western },
  ];

  const targetCuisineOptions = [
    { id: 'all', label: t.pantry.allCuisines },
    { id: 'bangladeshi', label: t.cuisines.bangladeshi },
    { id: 'indian', label: t.cuisines.indian },
    { id: 'western', label: t.cuisines.western },
  ];

  const currentList = CUISINE_PANTRY_DATA[activeTab] || CUISINE_PANTRY_DATA.all;

  return (
    <div className="px-5 mt-2 pb-10">
      <p className="text-xs sm:text-sm text-gray-500 mb-4 leading-relaxed">
        {t.pantry.instructions}
      </p>

      {/* Custom Input */}
      <div className="flex gap-2 mb-4">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleCustomAdd()}
          placeholder={t.pantry.placeholder}
          className="flex-1 px-4 py-2.5 rounded-2xl border border-gray-200 text-xs sm:text-sm focus:outline-none focus:border-terracotta bg-white shadow-sm"
        />
        <button
          onClick={handleCustomAdd}
          className="p-3 bg-terracotta text-white rounded-2xl shadow hover:bg-orange-700 transition"
        >
          <Plus size={18} />
        </button>
      </div>

      {/* Cuisine Pantry Tabs */}
      <div className="flex gap-1.5 overflow-x-auto scrollbar-hide pb-2 mb-3">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-tight transition-all border ${
              activeTab === tab.id
                ? 'bg-charcoal text-white border-charcoal shadow-sm'
                : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Ingredients Chips for Active Cuisine */}
      <div className="flex flex-wrap gap-2 mb-5 min-h-[120px] p-3.5 bg-white rounded-3xl border border-gray-100 shadow-sm">
        {currentList.map((ing) => {
          const isSelected = selectedIngredients.includes(ing.key);
          const label = language === 'bn' ? ing.bn : ing.en;
          return (
            <button
              key={ing.key}
              onClick={() => (isSelected ? removeIngredient(ing.key) : addIngredient(ing.key))}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                isSelected
                  ? 'bg-terracotta text-white border-terracotta shadow-sm scale-105'
                  : 'bg-softgray border-gray-200 text-charcoal hover:border-terracotta/40'
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Selected Ingredients Drawer */}
      {selectedIngredients.length > 0 && (
        <div className="bg-white border border-gray-100 shadow-sm rounded-3xl p-4 mb-5">
          <div className="flex justify-between items-center mb-2.5">
            <span className="text-xs font-bold text-charcoal flex items-center gap-1.5">
              <Sparkles size={14} className="text-terracotta" />
              {t.pantry.selected} ({toBengaliNumber(selectedIngredients.length, language)})
            </span>
            <button
              onClick={clearIngredients}
              className="text-xs text-terracotta underline font-semibold hover:text-orange-700"
            >
              {t.pantry.clearAll}
            </button>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {selectedIngredients.map((ing) => (
              <span
                key={ing}
                className="flex items-center gap-1.5 bg-softgray text-charcoal text-xs font-semibold px-3 py-1 rounded-full border border-gray-200"
              >
                {ing}
                <button
                  onClick={() => removeIngredient(ing)}
                  className="hover:text-terracotta transition"
                >
                  <X size={12} />
                </button>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Target Cuisine Selector */}
      <div className="mb-5 bg-white p-3.5 rounded-3xl border border-gray-100 shadow-sm">
        <label className="block text-xs font-bold text-charcoal mb-2">
          {t.pantry.targetLabel}
        </label>
        <div className="grid grid-cols-2 gap-2">
          {targetCuisineOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setTargetCuisine(opt.id)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all border text-left flex items-center justify-between ${
                targetCuisine === opt.id
                  ? 'bg-terracotta/10 text-terracotta border-terracotta font-bold'
                  : 'bg-softgray border-gray-200 text-gray-600 hover:border-gray-300'
              }`}
            >
              <span>{opt.label}</span>
              {targetCuisine === opt.id && <span className="w-2 h-2 rounded-full bg-terracotta" />}
            </button>
          ))}
        </div>
      </div>

      {/* Submit Search Button */}
      <button
        onClick={handleSearchClick}
        disabled={selectedIngredients.length === 0}
        className="w-full flex items-center justify-center gap-2 bg-terracotta text-white py-4 rounded-2xl font-bold text-sm sm:text-base disabled:opacity-40 hover:bg-orange-700 transition shadow-lg shadow-terracotta/20 active:scale-[0.98]"
      >
        <Search size={18} /> {t.pantry.findBtn}
      </button>
    </div>
  );
}
