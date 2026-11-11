import { useState } from 'react';
import { Flame, Users, Check, AlertTriangle, Heart, Shield } from 'lucide-react';
import useLanguageStore from '../../store/languageStore';
import { translations, toBengaliNumber } from '../../i18n/translations';

const DIETARY_OPTIONS = [
  { id: 'Halal', en: 'Halal', bn: 'হালাল' },
  { id: 'Vegetarian', en: 'Vegetarian', bn: 'নিরামিষ' },
  { id: 'Vegan', en: 'Vegan', bn: 'ভেগান' },
  { id: 'Gluten-Free', en: 'Gluten-Free', bn: 'গ্লুটেন-মুক্ত' },
  { id: 'Low-Carb', en: 'Low-Carb', bn: 'লো-কার্ব' },
  { id: 'Keto', en: 'Keto', bn: 'কিটো' },
  { id: 'Dairy-Free', en: 'Dairy-Free', bn: 'দুগ্ধজাত-মুক্ত' },
  { id: 'Kosher', en: 'Kosher', bn: 'কোশার' },
  { id: 'Pescatarian', en: 'Pescatarian', bn: 'মৎস্যভোজী' },
];

const ALLERGY_OPTIONS = [
  { id: 'Peanuts', en: 'Peanuts', bn: 'চীনাবাদাম' },
  { id: 'Tree Nuts', en: 'Tree Nuts', bn: 'কাঠবাদাম/কাজু' },
  { id: 'Shellfish', en: 'Shellfish (Shrimp/Crab)', bn: 'চিংড়ি ও কাঁকড়া' },
  { id: 'Eggs', en: 'Eggs', bn: 'ডিম' },
  { id: 'Dairy', en: 'Dairy / Lactose', bn: 'দুধ/ল্যাকটোজ' },
  { id: 'Soy', en: 'Soybeans', bn: 'সয়াবিন' },
  { id: 'Wheat', en: 'Wheat / Gluten', bn: 'গম / আটা' },
  { id: 'Fish', en: 'Finfish', bn: 'মাছ' },
  { id: 'Sesame', en: 'Sesame Seeds', bn: 'তিল' },
];

const SPICE_LEVELS = [
  { id: 'Mild', label: 'Mild', bnLabel: 'হালকা', icon: '🌶️', desc: 'Gentle warmth, family friendly' },
  { id: 'Medium', label: 'Medium', bnLabel: 'মাঝারি', icon: '🌶️🌶️', desc: 'Balanced heat & fragrant spices' },
  { id: 'Hot', label: 'Hot', bnLabel: 'ঝাল', icon: '🌶️🌶️🌶️', desc: 'Fiery & authentic kick' },
  { id: 'Extra Hot', label: 'Extra Hot', bnLabel: 'তীব্র ঝাল', icon: '🔥', desc: 'Extreme Naga / Ghost Pepper heat' },
];

const PORTION_OPTIONS = [1, 2, 4, 6, 8];

const CUISINE_OPTIONS = [
  { id: 'Bangladeshi', label: '🇧🇩 Bangladeshi', bnLabel: '🇧🇩 বাংলাদেশি' },
  { id: 'Indian', label: '🇮🇳 Indian', bnLabel: '🇮🇳 ভারতীয়' },
  { id: 'Western', label: '🍳 Western', bnLabel: '🍳 পশ্চিমা' },
];

export default function PreferencesTab({ preferences, defaultServings = 4, onSave, saving }) {
  const { language } = useLanguageStore();
  const t = translations[language]?.profile || translations.en.profile;

  const [dietary, setDietary] = useState(preferences?.dietary_restrictions || ['Halal', 'Low-Carb']);
  const [allergies, setAllergies] = useState(preferences?.allergies || ['Peanuts', 'Shellfish']);
  const [spiceLevel, setSpiceLevel] = useState(preferences?.spice_level || 'Medium');
  const [servings, setServings] = useState(defaultServings);
  const [cuisines, setCuisines] = useState(preferences?.preferred_cuisines || ['Bangladeshi', 'Indian', 'Western']);
  const [toastMessage, setToastMessage] = useState('');

  const toggleItem = (list, setList, item) => {
    if (list.includes(item)) {
      setList(list.filter((x) => x !== item));
    } else {
      setList([...list, item]);
    }
  };

  const handleSavePreferences = async () => {
    try {
      await onSave({
        preferences: {
          dietary_restrictions: dietary,
          allergies,
          spice_level: spiceLevel,
          preferred_cuisines: cuisines,
        },
        defaultServings: servings,
      });
      setToastMessage(t.preferences.savedSuccess);
      setTimeout(() => setToastMessage(''), 3000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      {toastMessage && (
        <div className="bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 px-4 py-2.5 rounded-xl text-sm flex items-center gap-2 animate-fade-in shadow-sm">
          <Check size={16} className="text-emerald-600 dark:text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Info */}
      <div className="bg-white dark:bg-[#1C1C1A] rounded-2xl p-5 border border-black/5 dark:border-white/5 shadow-sm">
        <h3 className="text-base font-bold text-charcoal dark:text-white font-display">
          {t.preferences.title}
        </h3>
        <p className="text-xs text-gray-500 dark:text-neutral-400 mt-1 leading-relaxed">
          {t.preferences.subtitle}
        </p>
      </div>

      {/* Default Portion Scaling Selector */}
      <div className="bg-white dark:bg-[#1C1C1A] rounded-2xl p-5 border border-black/5 dark:border-white/5 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users size={16} className="text-terracotta" />
            <h4 className="text-xs font-semibold uppercase tracking-wider text-charcoal dark:text-white">
              {t.preferences.servingsLabel}
            </h4>
          </div>
          <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-terracotta/10 text-terracotta">
            {toBengaliNumber(servings, language)} {language === 'bn' ? 'জন' : 'servings'}
          </span>
        </div>
        <p className="text-[11px] text-gray-500 dark:text-neutral-400">
          {t.preferences.servingsHelp}
        </p>
        <div className="grid grid-cols-5 gap-2 pt-1">
          {PORTION_OPTIONS.map((num) => {
            const isSelected = servings === num;
            return (
              <button
                key={num}
                type="button"
                onClick={() => setServings(num)}
                className={`py-2.5 rounded-xl text-xs font-semibold flex flex-col items-center justify-center gap-0.5 transition-all ${
                  isSelected
                    ? 'bg-terracotta text-white shadow-md scale-102 ring-2 ring-terracotta/30'
                    : 'bg-softgray dark:bg-neutral-800 text-charcoal dark:text-neutral-300 hover:bg-gray-200 dark:hover:bg-neutral-700'
                }`}
              >
                <span className="text-sm font-bold">{toBengaliNumber(num, language)}</span>
                <span className="text-[9px] opacity-80">{language === 'bn' ? 'পরিবেশন' : 'servings'}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Dietary Restrictions Pills */}
      <div className="bg-white dark:bg-[#1C1C1A] rounded-2xl p-5 border border-black/5 dark:border-white/5 shadow-sm space-y-3">
        <div className="flex items-center gap-2">
          <Shield size={16} className="text-emerald-600 dark:text-emerald-400" />
          <h4 className="text-xs font-semibold uppercase tracking-wider text-charcoal dark:text-white">
            {t.preferences.dietaryLabel}
          </h4>
        </div>
        <div className="flex flex-wrap gap-2 pt-1">
          {DIETARY_OPTIONS.map((item) => {
            const isSelected = dietary.includes(item.id);
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => toggleItem(dietary, setDietary, item.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-emerald-600 text-white shadow-sm ring-1 ring-emerald-500'
                    : 'bg-softgray dark:bg-neutral-800 text-charcoal dark:text-neutral-300 hover:bg-gray-200 dark:hover:bg-neutral-700'
                }`}
              >
                {isSelected && <Check size={12} />}
                <span>{language === 'bn' ? item.bn : item.en}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Allergies & Intolerances */}
      <div className="bg-white dark:bg-[#1C1C1A] rounded-2xl p-5 border border-black/5 dark:border-white/5 shadow-sm space-y-3">
        <div className="flex items-center gap-2">
          <AlertTriangle size={16} className="text-amber-500" />
          <h4 className="text-xs font-semibold uppercase tracking-wider text-charcoal dark:text-white">
            {t.preferences.allergiesLabel}
          </h4>
        </div>
        <div className="flex flex-wrap gap-2 pt-1">
          {ALLERGY_OPTIONS.map((item) => {
            const isSelected = allergies.includes(item.id);
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => toggleItem(allergies, setAllergies, item.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-rose-500 text-white shadow-sm ring-1 ring-rose-400'
                    : 'bg-softgray dark:bg-neutral-800 text-charcoal dark:text-neutral-300 hover:bg-gray-200 dark:hover:bg-neutral-700'
                }`}
              >
                {isSelected ? <AlertTriangle size={11} /> : null}
                <span>{language === 'bn' ? item.bn : item.en}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Preferred Spice Level */}
      <div className="bg-white dark:bg-[#1C1C1A] rounded-2xl p-5 border border-black/5 dark:border-white/5 shadow-sm space-y-3">
        <div className="flex items-center gap-2">
          <Flame size={16} className="text-terracotta" />
          <h4 className="text-xs font-semibold uppercase tracking-wider text-charcoal dark:text-white">
            {t.preferences.spiceLabel}
          </h4>
        </div>
        <div className="grid grid-cols-2 gap-2.5 pt-1">
          {SPICE_LEVELS.map((level) => {
            const isSelected = spiceLevel === level.id;
            return (
              <button
                key={level.id}
                type="button"
                onClick={() => setSpiceLevel(level.id)}
                className={`p-3 rounded-xl text-left transition-all border ${
                  isSelected
                    ? 'bg-terracotta/10 border-terracotta ring-1 ring-terracotta/40'
                    : 'bg-softgray dark:bg-neutral-800 border-transparent hover:border-gray-300 dark:hover:border-neutral-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-charcoal dark:text-white">
                    {language === 'bn' ? level.bnLabel : level.label}
                  </span>
                  <span className="text-base">{level.icon}</span>
                </div>
                <p className="text-[10px] text-gray-500 dark:text-neutral-400 mt-1 line-clamp-1">
                  {level.desc}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Favorite Cuisines */}
      <div className="bg-white dark:bg-[#1C1C1A] rounded-2xl p-5 border border-black/5 dark:border-white/5 shadow-sm space-y-3">
        <div className="flex items-center gap-2">
          <Heart size={16} className="text-terracotta" />
          <h4 className="text-xs font-semibold uppercase tracking-wider text-charcoal dark:text-white">
            {t.preferences.cuisinesLabel}
          </h4>
        </div>
        <div className="grid grid-cols-3 gap-2 pt-1">
          {CUISINE_OPTIONS.map((c) => {
            const isSelected = cuisines.includes(c.id);
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => toggleItem(cuisines, setCuisines, c.id)}
                className={`py-2 px-2 rounded-xl text-xs font-medium text-center transition-all ${
                  isSelected
                    ? 'bg-charcoal text-white dark:bg-white dark:text-charcoal shadow-sm'
                    : 'bg-softgray dark:bg-neutral-800 text-charcoal dark:text-neutral-300 hover:bg-gray-200 dark:hover:bg-neutral-700'
                }`}
              >
                {language === 'bn' ? c.bnLabel : c.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Save Button */}
      <div className="pt-2">
        <button
          type="button"
          onClick={handleSavePreferences}
          disabled={saving}
          className="w-full py-3.5 bg-terracotta hover:bg-[#D4471C] active:scale-[0.98] text-white font-medium text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-70"
        >
          {saving ? (
            <span>Saving...</span>
          ) : (
            <>
              <Check size={16} />
              <span>{t.preferences.saveBtn}</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
