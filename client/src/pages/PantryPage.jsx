import { useState } from 'react';
import Header from '../components/layout/Header';
import PantryMode from '../components/pantry/PantryMode';
import MatchResults from '../components/pantry/MatchResults';
import { pantryMatch } from '../api';
import useLanguageStore from '../store/languageStore';
import { translations } from '../i18n/translations';

export default function PantryPage() {
  const { language } = useLanguageStore();
  const t = translations[language] || translations.en;
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (ingredients, cuisine) => {
    setLoading(true);
    try {
      const res = await pantryMatch(ingredients, cuisine);
      setResults(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header
        title={t.header.pantryTitle}
        subtitle={t.header.pantrySubtitle}
      />
      <div className="px-4 sm:px-6 lg:px-8 mt-2 lg:grid lg:grid-cols-12 lg:gap-8 items-start">
        {/* Left Column: Ingredient Selection & Filters */}
        <div className="lg:col-span-5">
          <PantryMode onSearch={handleSearch} />
        </div>

        {/* Right Column: Search Results */}
        <div className="lg:col-span-7 mt-6 lg:mt-0">
          {loading && (
            <div className="flex flex-col items-center justify-center p-16 bg-white dark:bg-[#1C1C1A] rounded-3xl border border-black/5 dark:border-white/5 shadow-xs">
              <div className="w-10 h-10 border-4 border-terracotta border-t-transparent rounded-full animate-spin mb-3" />
              <p className="text-xs text-gray-500 dark:text-neutral-400 font-semibold">
                {language === 'bn' ? 'রেসিপি মিলানো হচ্ছে...' : 'Finding matching recipes...'}
              </p>
            </div>
          )}

          {results && !loading ? (
            <MatchResults results={results} />
          ) : !loading && (
            <div className="hidden lg:flex flex-col items-center justify-center p-16 text-center bg-white/50 dark:bg-[#1C1C1A]/50 rounded-3xl border border-dashed border-gray-300 dark:border-neutral-800 text-gray-400 dark:text-neutral-500">
              <span className="text-5xl mb-3">✨</span>
              <p className="font-display font-bold text-lg text-charcoal dark:text-neutral-200">
                {language === 'bn' ? 'উপকরণ বেছে নিন' : 'Select ingredients to match'}
              </p>
              <p className="text-xs text-gray-500 dark:text-neutral-400 mt-1 max-w-sm leading-relaxed">
                {language === 'bn'
                  ? 'আপনার কাছে থাকা উপকরণগুলো বাম পাশের তালিকা থেকে নির্বাচন করে "রেসিপি খুঁজুন" চাপুন।'
                  : 'Choose what you have in your kitchen from the left panel, and our algorithm will rank recipes with exact ingredient match percentages!'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
