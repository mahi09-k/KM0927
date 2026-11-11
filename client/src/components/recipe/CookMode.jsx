import { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Play, Pause, RotateCcw } from 'lucide-react';
import { useSwipe } from '../../hooks/useSwipe';
import { useTimer } from '../../hooks/useTimer';
import useLanguageStore from '../../store/languageStore';
import { translations, toBengaliNumber } from '../../i18n/translations';

function StepCard({ step, total, onPrev, onNext }) {
  const { language } = useLanguageStore();
  const t = translations[language] || translations.en;
  const timer = useTimer(step.timer_seconds || 0);
  const swipeHandlers = useSwipe(onNext, onPrev);
  const progress = step.timer_seconds ? ((step.timer_seconds - timer.seconds) / step.timer_seconds) * 100 : 0;

  return (
    <div
      {...swipeHandlers}
      className="flex flex-col h-full px-6 pt-2 pb-8 select-none justify-between overflow-y-auto"
    >
      <div className="flex justify-between items-center mb-6 flex-shrink-0">
        <span className="text-sm text-gray-500 dark:text-neutral-400 font-medium">
          {t.cookMode.step} {toBengaliNumber(step.step_number, language)} {t.cookMode.of} {toBengaliNumber(total, language)}
        </span>
        <div className="flex gap-1.5">
          {Array.from({ length: total }).map((_, i) => (
            <div
              key={i}
              className={`h-1.5 w-6 rounded-full transition-colors ${
                i === step.step_number - 1 ? 'bg-terracotta' : 'bg-gray-200 dark:bg-neutral-800'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center my-auto py-2">
        <p className="font-display text-2xl font-semibold text-charcoal dark:text-neutral-100 leading-relaxed">
          {step.instruction}
        </p>
      </div>

      {step.timer_seconds ? (
        <div className="my-6 flex-shrink-0">
          <div className="bg-softgray dark:bg-[#1C1C1A] rounded-3xl p-5 shadow-inner border border-black/5 dark:border-white/5">
            <div className="relative w-32 h-32 mx-auto mb-4">
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
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-display text-2xl font-bold text-charcoal dark:text-neutral-100">
                  {toBengaliNumber(timer.formatted, language)}
                </span>
              </div>
            </div>
            <div className="flex justify-center gap-3">
              {!timer.isRunning ? (
                <button
                  onClick={timer.start}
                  className="flex items-center gap-2 bg-terracotta text-white px-5 py-2.5 rounded-full text-sm font-semibold shadow hover:bg-orange-700 transition"
                >
                  <Play size={14} /> {t.cookMode.start}
                </button>
              ) : (
                <button
                  onClick={timer.pause}
                  className="flex items-center gap-2 bg-charcoal dark:bg-neutral-700 text-white px-5 py-2.5 rounded-full text-sm font-semibold shadow hover:bg-gray-800 transition"
                >
                  <Pause size={14} /> {t.cookMode.pause}
                </button>
              )}
              <button
                onClick={timer.reset}
                className="flex items-center gap-2 border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-4 py-2.5 rounded-full text-sm font-medium text-gray-600 dark:text-neutral-300 hover:bg-gray-50 dark:hover:bg-neutral-700 transition shadow-xs"
              >
                <RotateCcw size={14} /> {t.cookMode.reset}
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <div className="flex justify-between items-center mt-4 pt-4 pb-2 flex-shrink-0">
        <button
          onClick={onPrev}
          disabled={step.step_number === 1}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#1C1C1A] text-sm font-semibold text-charcoal dark:text-neutral-200 disabled:opacity-30 hover:bg-gray-50 dark:hover:bg-neutral-800 transition shadow-sm"
        >
          <ChevronLeft size={16} /> {t.cookMode.prev}
        </button>
        <button
          onClick={onNext}
          disabled={step.step_number === total}
          className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-terracotta text-white text-sm font-semibold disabled:opacity-30 shadow-md hover:bg-orange-700 transition"
        >
          {t.cookMode.next} <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}

export default function CookMode({ steps, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const goNext = () => setCurrentIndex((i) => Math.min(i + 1, steps.length - 1));
  const goPrev = () => setCurrentIndex((i) => Math.max(i - 1, 0));

  return (
    <div className="fixed inset-0 bg-cream dark:bg-[#121211] z-[100] flex flex-col max-w-shell mx-auto left-1/2 -translate-x-1/2 w-full h-[100dvh] overflow-hidden transition-colors">
      <div className="flex justify-end p-4 flex-shrink-0">
        <button
          onClick={onClose}
          className="p-2.5 rounded-full bg-white dark:bg-[#1C1C1A] border border-gray-200 dark:border-neutral-800 text-charcoal dark:text-neutral-200 hover:bg-softgray dark:hover:bg-neutral-800 transition shadow-sm"
          aria-label="Close Cook Mode"
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
  );
}
