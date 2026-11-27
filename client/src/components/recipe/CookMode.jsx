import { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Play, Pause, RotateCcw } from 'lucide-react';
import { useSwipe } from '../../hooks/useSwipe';
import { useTimer } from '../../hooks/useTimer';
import useLanguageStore from '../../store/languageStore';
import { translations, toBengaliNumber } from '../../i18n/translations';
import { translateInstruction } from '../../i18n/recipeTranslations';

function StepCard({ step, total, onPrev, onNext }) {
  const { language } = useLanguageStore();
  const t = translations[language] || translations.en;
  const timer = useTimer(step.timer_seconds || 0);
  const swipeHandlers = useSwipe(onNext, onPrev);
  const progress = step.timer_seconds ? ((step.timer_seconds - timer.seconds) / step.timer_seconds) * 100 : 0;

  return (
    <div
      {...swipeHandlers}
      className="flex flex-col h-full px-6 sm:px-10 lg:px-14 pt-2 pb-8 select-none justify-between overflow-y-auto"
    >
      <div className="flex justify-between items-center mb-6 flex-shrink-0">
        <span className="text-sm sm:text-base text-gray-500 dark:text-neutral-400 font-medium">
          {t.cookMode.step} {toBengaliNumber(step.step_number, language)} {t.cookMode.of} {toBengaliNumber(total, language)}
        </span>
        <div className="flex gap-1.5 sm:gap-2">
          {Array.from({ length: total }).map((_, i) => (
            <div
              key={i}
              className={`h-1.5 sm:h-2 w-6 sm:w-8 rounded-full transition-colors ${
                i === step.step_number - 1 ? 'bg-terracotta' : 'bg-gray-200 dark:bg-neutral-800'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center my-auto py-4">
        <p className="font-display text-2xl sm:text-3xl md:text-4xl font-semibold text-charcoal dark:text-neutral-100 leading-relaxed max-w-3xl">
          {translateInstruction(step.instruction, language)}
        </p>
      </div>

      {step.timer_seconds ? (
        <div className="my-6 flex-shrink-0 max-w-md w-full mx-auto">
          <div className="bg-softgray/70 dark:bg-[#1C1C1A] rounded-3xl p-6 shadow-inner border border-black/5 dark:border-white/5">
            <div className="relative w-36 h-36 mx-auto mb-4">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" className="text-gray-200 dark:text-neutral-800" strokeWidth="6" />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#E8572A"
                  strokeWidth="6"
                  strokeDasharray={`${2 * Math.PI * 45}`}
                  strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
                  strokeLinecap="round"
                  className="transition-all duration-1000"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-display text-3xl font-bold text-charcoal dark:text-white">
                  {toBengaliNumber(timer.formatted, language)}
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400 dark:text-neutral-500">
                  {t.cookMode.timer}
                </span>
              </div>
            </div>

            <div className="flex justify-center gap-3">
              {!timer.running ? (
                <button
                  onClick={timer.start}
                  className="flex items-center gap-2 bg-terracotta text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-orange-700 transition shadow-md active:scale-95"
                >
                  <Play size={15} /> {t.cookMode.start}
                </button>
              ) : (
                <button
                  onClick={timer.pause}
                  className="flex items-center gap-2 bg-amber-500 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-amber-600 transition shadow-md active:scale-95"
                >
                  <Pause size={15} /> {t.cookMode.pause}
                </button>
              )}
              <button
                onClick={timer.reset}
                className="flex items-center gap-2 border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-5 py-2.5 rounded-full text-sm font-medium text-gray-600 dark:text-neutral-300 hover:bg-gray-50 dark:hover:bg-neutral-700 transition shadow-xs active:scale-95"
              >
                <RotateCcw size={15} /> {t.cookMode.reset}
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <div className="flex justify-between items-center mt-4 pt-4 pb-2 flex-shrink-0">
        <button
          onClick={onPrev}
          disabled={step.step_number === 1}
          className="flex items-center gap-2 px-5 sm:px-7 py-2.5 sm:py-3 rounded-full border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#1C1C1A] text-sm font-semibold text-charcoal dark:text-neutral-200 disabled:opacity-30 hover:bg-gray-50 dark:hover:bg-neutral-800 transition shadow-sm active:scale-95"
        >
          <ChevronLeft size={18} /> {t.cookMode.prev}
        </button>
        <span className="hidden sm:inline-block text-xs text-gray-400 dark:text-neutral-500">
          {language === 'bn' ? 'কীবোর্ড: ← / → নেভিগেট করুন' : 'Keyboard: Use ← / → to navigate'}
        </span>
        <button
          onClick={onNext}
          disabled={step.step_number === total}
          className="flex items-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full bg-terracotta text-white text-sm font-semibold disabled:opacity-30 shadow-md hover:bg-orange-700 transition active:scale-95"
        >
          {t.cookMode.next} <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}

export default function CookMode({ steps, onClose }) {
  const { language } = useLanguageStore();
  const t = translations[language] || translations.en;
  const [currentIndex, setCurrentIndex] = useState(0);

  const goNext = () => setCurrentIndex((i) => Math.min(i + 1, steps.length - 1));
  const goPrev = () => setCurrentIndex((i) => Math.max(i - 1, 0));

  // Keyboard navigation for desktop: Left/Right arrows and Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        goNext();
      } else if (e.key === 'ArrowLeft') {
        goPrev();
      } else if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, steps.length]);

  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-md z-[100] flex items-center justify-center p-0 sm:p-6 lg:p-10 transition-colors animate-fade-in">
      <div className="w-full h-full sm:h-auto sm:max-w-3xl lg:max-w-4xl sm:max-h-[85vh] sm:rounded-3xl bg-cream dark:bg-[#151514] text-charcoal dark:text-neutral-100 flex flex-col overflow-hidden shadow-2xl border-0 sm:border border-black/10 dark:border-white/10 transition-colors">
        <div className="flex justify-between items-center p-4 sm:p-6 pb-2 flex-shrink-0 border-b border-black/5 dark:border-white/5">
          <div className="flex items-center gap-2">
            <span className="text-xl">👨‍🍳</span>
            <span className="font-display font-bold text-base sm:text-lg text-charcoal dark:text-white">
              {t.recipeDetail?.startCookMode || 'Cook Mode'}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 sm:p-2.5 rounded-full bg-white dark:bg-[#1C1C1A] border border-gray-200 dark:border-neutral-800 text-charcoal dark:text-neutral-200 hover:bg-softgray dark:hover:bg-neutral-800 transition shadow-sm hover:scale-105"
            aria-label={t.cookMode?.close || 'Close Cook Mode'}
            title="Esc to close"
          >
            <X size={20} />
          </button>
        </div>
        <div className="flex-1 overflow-hidden min-h-0">
          <StepCard
            step={steps[currentIndex]}
            total={steps.length}
            onNext={goNext}
            onPrev={goPrev}
          />
        </div>
      </div>
    </div>
  );
}
