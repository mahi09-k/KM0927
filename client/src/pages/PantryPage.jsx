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
      <PantryMode onSearch={handleSearch} />
      {loading && (
        <div className="flex justify-center mt-8">
          <div className="w-8 h-8 border-4 border-terracotta border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      {results && !loading && <MatchResults results={results} />}
    </div>
  );
}
