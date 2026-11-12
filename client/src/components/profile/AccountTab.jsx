import { useState, useEffect } from 'react';
import { Camera, Check, ShieldCheck, Mail, Calendar, Sparkles, UploadCloud, UserPlus, LogOut, Users, AlertCircle, Trash2 } from 'lucide-react';
import UserAvatar from '../common/UserAvatar';
import useLanguageStore from '../../store/languageStore';
import { useAuthStore } from '../../store/authStore';
import { translations } from '../../i18n/translations';

export default function AccountTab({ user, onUpdate, saving }) {
  const { language } = useLanguageStore();
  const { openAuthModal, savedAccounts, currentUser, switchAccount, logout } = useAuthStore();
  const t = translations[language]?.profile || translations.en.profile;

  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [avatarUrl, setAvatarUrl] = useState(user?.avatar_url || null);
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [customUrlInput, setCustomUrlInput] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setEmail(user.email || '');
      setAvatarUrl(user.avatar_url || null);
    }
  }, [user]);

  const handleSave = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    if (!name.trim()) {
      setErrorMessage('Name cannot be empty');
      return;
    }
    if (!email.trim()) {
      setErrorMessage('Email cannot be empty');
      return;
    }

    try {
      await onUpdate({
        name: name.trim(),
        email: email.trim(),
        avatar_url: avatarUrl,
      });
      setToastMessage(t.account?.savedSuccess || 'Profile updated successfully!');
      setTimeout(() => setToastMessage(''), 3000);
    } catch (err) {
      console.error(err);
      setErrorMessage(err.response?.data?.error || 'Failed to update profile');
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarUrl(reader.result);
        setShowAvatarModal(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleApplyCustomUrl = () => {
    if (customUrlInput.trim()) {
      setAvatarUrl(customUrlInput.trim());
      setCustomUrlInput('');
      setShowAvatarModal(false);
    }
  };

  const handleRemovePhoto = () => {
    setAvatarUrl(null);
    setShowAvatarModal(false);
  };

  const formattedDate = user?.created_at
    ? new Date(user.created_at).toLocaleDateString(language === 'bn' ? 'bn-BD' : 'en-US', {
        year: 'numeric',
        month: 'long',
      })
    : 'March 2024';

  return (
    <div className="space-y-6">
      {toastMessage && (
        <div className="bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 px-4 py-2.5 rounded-xl text-sm flex items-center gap-2 animate-fade-in shadow-sm">
          <Check size={16} className="text-emerald-600 dark:text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {errorMessage && (
        <div className="bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 px-4 py-2.5 rounded-xl text-sm flex items-center gap-2 animate-fade-in shadow-sm">
          <AlertCircle size={16} className="text-rose-600 dark:text-rose-400" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Profile Header Card */}
      <div className="bg-white dark:bg-[#1C1C1A] rounded-2xl p-5 border border-black/5 dark:border-white/5 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="relative">
            <UserAvatar
              user={{ name, avatar_url: avatarUrl }}
              size="xl"
              className="ring-4 ring-terracotta/20 dark:ring-terracotta/40 shadow-md text-2xl"
            />
            <button
              type="button"
              onClick={() => setShowAvatarModal(!showAvatarModal)}
              className="absolute bottom-0 right-0 p-1.5 rounded-full bg-terracotta text-white shadow-md hover:scale-105 active:scale-95 transition-all"
              title={t.account?.changeAvatar || 'Change Photo'}
            >
              <Camera size={14} />
            </button>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold font-display text-charcoal dark:text-white truncate">
                {name || t.account?.guestChef || (language === 'bn' ? 'অতিথি শেফ' : 'Guest Chef')}
              </h2>
            </div>
            <p className="text-xs text-gray-500 dark:text-neutral-400 flex items-center gap-1.5 mt-0.5 truncate">
              <Mail size={12} className="flex-shrink-0" />
              <span>{email || t.account?.noEmail || (language === 'bn' ? 'কোনো ইমেইল যুক্ত করা হয়নি' : 'No email connected')}</span>
            </p>
            <div className="inline-flex items-center gap-1.5 mt-2 px-2.5 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60 text-[11px] font-medium">
              <Sparkles size={11} className="text-amber-600 dark:text-amber-400" />
              <span>{t.account?.badge || 'Home Chef 🍳'}</span>
            </div>
          </div>
        </div>

        {/* Member Since Badge */}
        <div className="mt-4 pt-3.5 border-t border-gray-100 dark:border-neutral-800/70 flex items-center justify-between text-xs text-gray-500 dark:text-neutral-400">
          <span className="flex items-center gap-1.5">
            <Calendar size={13} className="text-terracotta" />
            <span>{t.account?.memberSince || 'Member Since'}: {formattedDate}</span>
          </span>
          <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
            <ShieldCheck size={14} />
            <span>Active</span>
          </span>
        </div>
      </div>

      {/* Avatar Picker Modal / Section */}
      {showAvatarModal && (
        <div className="bg-white dark:bg-[#1C1C1A] rounded-2xl p-4 border border-terracotta/30 dark:border-terracotta/40 shadow-md space-y-3 animate-fade-in">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-semibold text-charcoal dark:text-white uppercase tracking-wider">
              {t.account?.changeAvatar || 'Profile Photo'}
            </h3>
            <button
              onClick={() => setShowAvatarModal(false)}
              className="text-xs text-gray-400 hover:text-charcoal dark:hover:text-white"
            >
              ✕
            </button>
          </div>

          <div>
            <label className="block text-[11px] font-medium text-gray-600 dark:text-neutral-300 mb-1">
              {t.account?.avatarLabel || 'Photo URL (Cloudinary or Image Link)'}
            </label>
            <div className="flex gap-2">
              <input
                type="url"
                value={customUrlInput}
                onChange={(e) => setCustomUrlInput(e.target.value)}
                placeholder="https://res.cloudinary.com/... or image link"
                className="flex-1 text-xs px-3 py-2 rounded-lg bg-softgray dark:bg-neutral-800/80 border border-transparent focus:border-terracotta outline-none text-charcoal dark:text-white"
              />
              <button
                type="button"
                onClick={handleApplyCustomUrl}
                className="px-3 py-1.5 bg-terracotta text-white text-xs font-medium rounded-lg hover:opacity-90 active:scale-95 transition-all"
              >
                Apply
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <label className="flex-1 flex items-center justify-center gap-2 px-3 py-2 border border-dashed border-gray-300 dark:border-neutral-700 rounded-lg text-xs text-gray-600 dark:text-neutral-300 cursor-pointer hover:border-terracotta hover:text-terracotta transition-colors">
              <UploadCloud size={14} />
              <span>Upload photo file</span>
              <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
            </label>

            {avatarUrl && (
              <button
                type="button"
                onClick={handleRemovePhoto}
                className="px-3 py-2 text-xs font-medium text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900/60 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors flex items-center gap-1.5"
              >
                <Trash2 size={13} />
                <span>Remove photo</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Account Info Form */}
      <form onSubmit={handleSave} className="bg-white dark:bg-[#1C1C1A] rounded-2xl p-5 border border-black/5 dark:border-white/5 shadow-sm space-y-4">
        <h3 className="text-sm font-semibold text-charcoal dark:text-white uppercase tracking-wider">
          {t.account?.title || 'Account & Personal Info'}
        </h3>

        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-neutral-300 mb-1.5">
            {t.account?.fullName || 'Full Name'}
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t.account?.namePlaceholder || (language === 'bn' ? 'আপনার পূর্ণ নাম লিখুন' : 'Enter your full name')}
            className="w-full text-sm px-3.5 py-2.5 rounded-xl bg-softgray dark:bg-neutral-800/80 border border-transparent focus:border-terracotta dark:focus:border-terracotta focus:bg-white dark:focus:bg-neutral-900 outline-none text-charcoal dark:text-white transition-all"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-neutral-300 mb-1.5">
            {t.account?.email || 'Email Address'}
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t.account?.emailPlaceholder || (language === 'bn' ? 'আপনার ইমেইল ঠিকানা লিখুন' : 'Enter your email address')}
            className="w-full text-sm px-3.5 py-2.5 rounded-xl bg-softgray dark:bg-neutral-800/80 border border-transparent focus:border-terracotta dark:focus:border-terracotta focus:bg-white dark:focus:bg-neutral-900 outline-none text-charcoal dark:text-white transition-all"
          />
          <p className="text-[10px] text-gray-400 mt-1">
            {language === 'bn' ? 'এখানে আপনার ইমেইল যুক্ত বা পরিবর্তন করতে পারেন।' : 'You can enter or update your email address here.'}
          </p>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={saving}
            className="w-full py-3 bg-terracotta hover:bg-[#D4471C] active:scale-[0.98] text-white font-medium text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {saving ? (
              <span>Saving...</span>
            ) : (
              <>
                <Check size={16} />
                <span>{t.account?.saveBtn || 'Save Changes'}</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* Account Switching & Multi-User Management Card */}
      <div className="bg-white dark:bg-[#1C1C1A] rounded-2xl p-5 border border-black/5 dark:border-white/5 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users size={16} className="text-terracotta" />
            <h3 className="text-xs font-semibold uppercase tracking-wider text-charcoal dark:text-white">
              Account Management
            </h3>
          </div>
          <button
            type="button"
            onClick={() => openAuthModal('login')}
            className="text-xs font-bold text-terracotta hover:underline flex items-center gap-1"
          >
            <UserPlus size={13} />
            <span>Switch / Add Account</span>
          </button>
        </div>

        <p className="text-xs text-gray-500 dark:text-neutral-400">
          Switch between previous accounts or sign in to another kitchen without losing any data.
        </p>

        {/* List of Saved Accounts on Device */}
        <div className="space-y-2">
          {savedAccounts
            .filter((a) => a.name && a.email)
            .map((acc) => {
              const isActive = currentUser?.id === acc.id;
              return (
                <div
                  key={acc.id}
                  className={`p-3 rounded-xl border flex items-center justify-between transition-all ${
                    isActive
                      ? 'bg-terracotta/5 border-terracotta/40 dark:border-terracotta/60'
                      : 'bg-softgray/50 dark:bg-neutral-800/40 border-transparent hover:border-gray-200'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <UserAvatar user={acc} size="sm" />
                    <div className="min-w-0">
                      <span className="text-xs font-bold text-charcoal dark:text-white block truncate">
                        {acc.name}
                      </span>
                      <span className="text-[11px] text-gray-400 block truncate">
                        {acc.email}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    {isActive ? (
                      <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                        Current
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => switchAccount(acc)}
                        className="text-xs font-semibold px-3 py-1 rounded-lg bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 text-charcoal dark:text-neutral-200 hover:text-terracotta hover:border-terracotta transition-colors shadow-2xs"
                      >
                        Switch
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
        </div>

        <div className="pt-2 flex gap-2">
          <button
            type="button"
            onClick={() => openAuthModal('signup')}
            className="flex-1 py-2.5 bg-softgray dark:bg-neutral-800 text-charcoal dark:text-neutral-200 font-semibold text-xs rounded-xl hover:bg-gray-200 dark:hover:bg-neutral-700 transition-colors flex items-center justify-center gap-1.5"
          >
            <UserPlus size={14} />
            <span>Create New Account</span>
          </button>
          <button
            type="button"
            onClick={logout}
            className="px-4 py-2.5 border border-rose-200 dark:border-rose-900 text-rose-600 dark:text-rose-400 font-semibold text-xs rounded-xl hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors flex items-center justify-center gap-1.5"
          >
            <LogOut size={14} />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );
}
