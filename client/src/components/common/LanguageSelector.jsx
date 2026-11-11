import { Globe } from 'lucide-react';
import useLanguageStore from '../../store/languageStore';

export default function LanguageSelector() {
  const { language, setLanguage } = useLanguageStore();

  return (
    <div className="inline-flex items-center bg-white/90 backdrop-blur border border-gray-200 rounded-full p-1 shadow-sm">
      <div className="flex items-center gap-1 pl-2 pr-1 text-gray-400">
        <Globe size={14} />
      </div>
      <button
        onClick={() => setLanguage('en')}
        className={`px-2.5 py-1 rounded-full text-xs font-semibold transition-all duration-200 ${
          language === 'en'
            ? 'bg-terracotta text-white shadow-sm'
            : 'text-gray-600 hover:text-charcoal'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => setLanguage('bn')}
        className={`px-2.5 py-1 rounded-full text-xs font-semibold transition-all duration-200 ${
          language === 'bn'
            ? 'bg-terracotta text-white shadow-sm'
            : 'text-gray-600 hover:text-charcoal'
        }`}
      >
        বাং
      </button>
    </div>
  );
}
