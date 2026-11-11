import { useState } from 'react';
import { X, Mail, Lock, User, AlertCircle, ArrowRight, LogIn, UserPlus } from 'lucide-react';
import UserAvatar from '../common/UserAvatar';
import { useAuthStore } from '../../store/authStore';
import useLanguageStore from '../../store/languageStore';
import { translations } from '../../i18n/translations';

export default function AuthModal({ onAuthSuccess }) {
  const {
    isAuthModalOpen,
    closeAuthModal,
    authModalMode,
    setAuthModalMode,
    login,
    signup,
    savedAccounts,
    currentUser,
    switchAccount,
  } = useAuthStore();

  const { language } = useLanguageStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [defaultServings, setDefaultServings] = useState(4);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      if (authModalMode === 'login') {
        const user = await login(email, password);
        if (onAuthSuccess) onAuthSuccess(user);
      } else {
        if (!name.trim()) {
          setErrorMsg('Please enter your full name');
          setLoading(false);
          return;
        }
        const user = await signup({
          name: name.trim(),
          email,
          password,
          default_servings: defaultServings,
        });
        if (onAuthSuccess) onAuthSuccess(user);
      }
    } catch (err) {
      console.error(err);
      setErrorMsg(err.response?.data?.error || 'Authentication failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleSwitch = (acc) => {
    switchAccount(acc);
    if (onAuthSuccess) onAuthSuccess(acc);
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div
        className="w-full max-w-sm bg-white dark:bg-[#1C1C1A] text-charcoal dark:text-neutral-100 rounded-3xl p-6 shadow-2xl border border-black/10 dark:border-white/10 relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          className="absolute top-4 right-4 p-1.5 rounded-full bg-softgray dark:bg-neutral-800 text-gray-500 hover:text-charcoal dark:hover:text-white transition-colors"
        >
          <X size={16} />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-5">
          <div className="w-12 h-12 rounded-2xl bg-terracotta/10 text-terracotta mx-auto flex items-center justify-center mb-2">
            {authModalMode === 'login' ? <LogIn size={24} /> : <UserPlus size={24} />}
          </div>
          <h3 className="text-xl font-bold font-display text-charcoal dark:text-white">
            {authModalMode === 'login' ? 'Sign In to SizzleSpoon' : 'Create Chef Account'}
          </h3>
          <p className="text-xs text-gray-500 dark:text-neutral-400 mt-0.5">
            {authModalMode === 'login'
              ? 'Access your saved recipes, customized spice levels & meal plans'
              : 'Join thousands of home cooks & save your personalized kitchen'}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="bg-softgray dark:bg-neutral-800 p-1 rounded-xl flex gap-1 mb-4">
          <button
            type="button"
            onClick={() => {
              setAuthModalMode('login');
              setErrorMsg('');
            }}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              authModalMode === 'login'
                ? 'bg-white dark:bg-[#1C1C1A] text-charcoal dark:text-white shadow-xs'
                : 'text-gray-500 dark:text-neutral-400 hover:text-charcoal'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setAuthModalMode('signup');
              setErrorMsg('');
            }}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              authModalMode === 'signup'
                ? 'bg-white dark:bg-[#1C1C1A] text-charcoal dark:text-white shadow-xs'
                : 'text-gray-500 dark:text-neutral-400 hover:text-charcoal'
            }`}
          >
            Create Account
          </button>
        </div>

        {errorMsg && (
          <div className="mb-4 bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 px-3.5 py-2 rounded-xl text-xs flex items-center gap-2">
            <AlertCircle size={14} className="flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          {authModalMode === 'signup' && (
            <div>
              <label className="block text-[11px] font-semibold text-gray-600 dark:text-neutral-300 mb-1">
                Full Name
              </label>
              <div className="relative">
                <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full Name"
                  className="w-full text-xs pl-9 pr-3.5 py-2.5 rounded-xl bg-softgray dark:bg-neutral-800/80 border border-transparent focus:border-terracotta outline-none text-charcoal dark:text-white"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-[11px] font-semibold text-gray-600 dark:text-neutral-300 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                className="w-full text-xs pl-9 pr-3.5 py-2.5 rounded-xl bg-softgray dark:bg-neutral-800/80 border border-transparent focus:border-terracotta outline-none text-charcoal dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-gray-600 dark:text-neutral-300 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full text-xs pl-9 pr-3.5 py-2.5 rounded-xl bg-softgray dark:bg-neutral-800/80 border border-transparent focus:border-terracotta outline-none text-charcoal dark:text-white"
              />
            </div>
          </div>

          {authModalMode === 'signup' && (
            <div>
              <label className="block text-[11px] font-semibold text-gray-600 dark:text-neutral-300 mb-1">
                Default Portions
              </label>
              <div className="grid grid-cols-4 gap-1.5">
                {[1, 2, 4, 6].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setDefaultServings(num)}
                    className={`py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      defaultServings === num
                        ? 'bg-terracotta text-white shadow-xs'
                        : 'bg-softgray dark:bg-neutral-800 text-charcoal dark:text-neutral-300'
                    }`}
                  >
                    {num} serves
                  </button>
                ))}
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3 bg-terracotta hover:bg-[#D4471C] active:scale-[0.98] text-white font-semibold text-xs rounded-xl transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {loading ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <span>{authModalMode === 'login' ? 'Sign In' : 'Create Account'}</span>
                <ArrowRight size={14} />
              </>
            )}
          </button>
        </form>

        {/* Saved Accounts On This Device */}
        {savedAccounts.length > 0 && (
          <div className="mt-4 pt-3.5 border-t border-gray-100 dark:border-neutral-800">
            <h4 className="text-[10px] uppercase font-bold tracking-wider text-gray-400 dark:text-neutral-500 mb-2">
              Saved Accounts On This Device
            </h4>
            <div className="space-y-1.5 max-h-32 overflow-y-auto scrollbar-hide">
              {savedAccounts.map((acc) => {
                const isActive = currentUser?.id === acc.id;
                return (
                  <button
                    key={acc.id}
                    type="button"
                    onClick={() => handleSwitch(acc)}
                    className={`w-full p-2 rounded-xl text-left flex items-center justify-between transition-all border ${
                      isActive
                        ? 'bg-terracotta/10 border-terracotta text-terracotta'
                        : 'bg-softgray/50 dark:bg-neutral-800/50 border-transparent hover:border-gray-200 dark:hover:border-neutral-700'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <UserAvatar user={acc} size="sm" />
                      <div className="min-w-0 text-left">
                        <span className="text-xs font-bold text-charcoal dark:text-white block truncate">
                          {acc.name}
                        </span>
                        <span className="text-[10px] text-gray-400 block truncate">
                          {acc.email}
                        </span>
                      </div>
                    </div>
                    {isActive ? (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-terracotta text-white flex-shrink-0">
                        Active
                      </span>
                    ) : (
                      <span className="text-[10px] text-gray-400 hover:text-terracotta font-medium flex-shrink-0">
                        Switch
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
