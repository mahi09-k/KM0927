import Header from '../components/layout/Header';
import GroceryList from '../components/grocery/GroceryList';
import useLanguageStore from '../store/languageStore';
import { translations } from '../i18n/translations';

export default function GroceryPage() {
  const { language } = useLanguageStore();
  const t = translations[language] || translations.en;

  return (
    <div>
      <Header
        title={t.header.groceryTitle}
        subtitle={t.header.grocerySubtitle}
      />
      <GroceryList />
    </div>
  );
}
