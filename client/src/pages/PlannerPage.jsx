import Header from '../components/layout/Header';
import MealPlanner from '../components/planner/MealPlanner';
import useLanguageStore from '../store/languageStore';
import { translations } from '../i18n/translations';

export default function PlannerPage() {
  const { language } = useLanguageStore();
  const t = translations[language] || translations.en;

  return (
    <div>
      <Header
        title={t.header.plannerTitle}
        subtitle={t.header.plannerSubtitle}
      />
      <MealPlanner />
    </div>
  );
}
