import Header from '../components/layout/Header';
import VideoFeed from '../components/feed/VideoFeed';
import useLanguageStore from '../store/languageStore';
import { translations } from '../i18n/translations';

export default function HomePage() {
  const { language } = useLanguageStore();
  const t = translations[language] || translations.en;

  return (
    <div className="relative">
      <Header
        title={t.header.homeTitle}
        subtitle={t.header.homeSubtitle}
      />
      <VideoFeed />
    </div>
  );
}
