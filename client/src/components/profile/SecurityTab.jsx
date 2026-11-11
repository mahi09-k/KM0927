import { useState } from 'react';
import { Sun, Moon, Lock, Check, AlertCircle, Shield, Globe, Database } from 'lucide-react';
import { useThemeStore } from '../../store/themeStore';
import useLanguageStore from '../../store/languageStore';
import { translations } from '../../i18n/translations';

export default function SecurityTab({ onUpdatePassword, saving }) {
  const { theme, setTheme } = useThemeStore();
  const { language, setLanguage } = useLanguageStore();
  const t = translations[language]?.profile || translations.en.profile;

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (newPassword.length < 6) {
      setErrorMsg(t.security.passwordShort);
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMsg(t.security.passwordMismatch);
      return;
    }

    try {
      await onUpdatePassword({
        current_password: currentPassword,
        new_password: newPassword,
      });
      setSuccessMsg(t.security.passwordSuccess);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (err) {
      setErrorMsg(err.response?.data?.error || 'Failed to update password');
    }
  };

  return (
    <div className="space-y-6">
      {/* Theme Selector */}
      <div className="bg-white dark:bg-[#1C1C1A] rounded-2xl p-5 border border-black/5 dark:border-white/5 shadow-sm space-y-3">
        <div className="flex items-center gap-2">
          <Sun size={16} className="text-amber-500" />
          <h3 className="text-xs font-semibold uppercase tracking-wider text-charcoal dark:text-white">
            {t.security.themeTitle}
          </h3>
        </div>
        <p className="text-xs text-gray-500 dark:text-neutral-400">
          {t.security.themeDesc}
        </p>

        <div className="grid grid-cols-2 gap-3 pt-1">
          {/* Light Mode Option */}
          <button
            type="button"
            onClick={() => setTheme('light')}
            className={`p-4 rounded-xl border flex flex-col items-center gap-2.5 transition-all ${
              theme === 'light'
                ? 'bg-cream border-terracotta ring-2 ring-terracotta/30 text-charcoal shadow-sm'
                : 'bg-softgray/50 dark:bg-neutral-800 border-transparent text-gray-500 hover:border-gray-300'
            }`}
          >
            <div className="w-9 h-9 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shadow-xs">
              <Sun size={19} />
            </div>
            <div className="text-center">
              <span className="text-xs font-bold block">{t.security.themeLight}</span>
            </div>
          </button>

          {/* Dark Mode Option */}
          <button
            type="button"
            onClick={() => setTheme('dark')}
            className={`p-4 rounded-xl border flex flex-col items-center gap-2.5 transition-all ${
              theme === 'dark'
                ? 'bg-[#1C1C1A] border-terracotta ring-2 ring-terracotta/30 text-white shadow-sm'
                : 'bg-softgray/50 dark:bg-neutral-800 border-transparent text-gray-400 hover:border-neutral-700'
            }`}
          >
            <div className="w-9 h-9 rounded-full bg-neutral-800 text-amber-400 flex items-center justify-center shadow-xs">
              <Moon size={19} />
            </div>
            <div className="text-center">
              <span className="text-xs font-bold block">{t.security.themeDark}</span>
            </div>
          </button>
        </div>
      </div>

      {/* Language Quick Toggle */}
      <div className="bg-white dark:bg-[#1C1C1A] rounded-2xl p-5 border border-black/5 dark:border-white/5 shadow-sm space-y-3">
        <div className="flex items-center gap-2">
          <Globe size={16} className="text-terracotta" />
          <h3 className="text-xs font-semibold uppercase tracking-wider text-charcoal dark:text-white">
            Language / ভাষা
          </h3>
        </div>
        <div className="grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={() => setLanguage('en')}
            className={`py-2.5 px-3 rounded-xl text-xs font-semibold transition-all ${
              language === 'en'
                ? 'bg-charcoal text-white dark:bg-white dark:text-charcoal shadow-sm'
                : 'bg-softgray dark:bg-neutral-800 text-gray-600 dark:text-neutral-400'
            }`}
          >
            English (EN)
          </button>
          <button
            type="button"
            onClick={() => setLanguage('bn')}
            className={`py-2.5 px-3 rounded-xl text-xs font-semibold transition-all ${
              language === 'bn'
                ? 'bg-charcoal text-white dark:bg-white dark:text-charcoal shadow-sm'
                : 'bg-softgray dark:bg-neutral-800 text-gray-600 dark:text-neutral-400'
            }`}
          >
            বাংলা (BN)
          </button>
        </div>
      </div>

      {/* Password Update Form */}
      <form onSubmit={handlePasswordSubmit} className="bg-white dark:bg-[#1C1C1A] rounded-2xl p-5 border border-black/5 dark:border-white/5 shadow-sm space-y-4">
        <div className="flex items-center gap-2">
          <Lock size={16} className="text-terracotta" />
          <h3 className="text-xs font-semibold uppercase tracking-wider text-charcoal dark:text-white">
            {t.security.passwordTitle}
          </h3>
        </div>

        {errorMsg && (
          <div className="bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 px-3.5 py-2 rounded-xl text-xs flex items-center gap-2">
            <AlertCircle size={14} />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 px-3.5 py-2 rounded-xl text-xs flex items-center gap-2">
            <Check size={14} />
            <span>{successMsg}</span>
          </div>
        )}

        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-neutral-300 mb-1">
            {t.security.currentPassword}
          </label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full text-sm px-3.5 py-2.5 rounded-xl bg-softgray dark:bg-neutral-800/80 border border-transparent focus:border-terracotta outline-none text-charcoal dark:text-white"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-neutral-300 mb-1">
              {t.security.newPassword}
            </label>
            <input
              type="password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full text-sm px-3.5 py-2.5 rounded-xl bg-softgray dark:bg-neutral-800/80 border border-transparent focus:border-terracotta outline-none text-charcoal dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-neutral-300 mb-1">
              {t.security.confirmPassword}
            </label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full text-sm px-3.5 py-2.5 rounded-xl bg-softgray dark:bg-neutral-800/80 border border-transparent focus:border-terracotta outline-none text-charcoal dark:text-white"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="w-full py-3 bg-charcoal dark:bg-neutral-700 hover:bg-black dark:hover:bg-neutral-600 active:scale-[0.98] text-white font-medium text-xs rounded-xl transition-all shadow-sm flex items-center justify-center gap-2"
        >
          <Shield size={14} />
          <span>{saving ? 'Updating...' : t.security.updateBtn}</span>
        </button>
      </form>

      {/* App & Database Badge */}
      <div className="p-4 rounded-2xl bg-softgray/60 dark:bg-neutral-800/60 border border-black/5 dark:border-white/5 flex items-center justify-between text-xs text-gray-500 dark:text-neutral-400">
        <span className="flex items-center gap-1.5 font-medium">
          <Database size={13} className="text-emerald-500" />
          <span>SizzleSpoon v2.0 (Relational MySQL + Fallback)</span>
        </span>
        <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-semibold">
          Online
        </span>
      </div>
    </div>
  );
}
