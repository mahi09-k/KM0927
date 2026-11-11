import { useState, useEffect } from 'react';
import { User, Sliders, BookmarkCheck, ShieldCheck, Loader2, AlertCircle, RefreshCw, LogIn } from 'lucide-react';
import Header from '../components/layout/Header';
import AccountTab from '../components/profile/AccountTab';
import PreferencesTab from '../components/profile/PreferencesTab';
import ActivityTab from '../components/profile/ActivityTab';
import SecurityTab from '../components/profile/SecurityTab';
import AuthModal from '../components/auth/AuthModal';
import {
  fetchUserProfile,
  updateUserProfile,
  updateUserPreferences,
  updateUserPassword,
  toggleSaveRecipe,
} from '../api';
import useLanguageStore from '../store/languageStore';
import { useAuthStore } from '../store/authStore';
import { translations } from '../i18n/translations';

export default function ProfilePage() {
  const { language } = useLanguageStore();
  const { currentUser, updateCurrentUser, openAuthModal } = useAuthStore();
  const t = translations[language] || translations.en;

  const [activeTab, setActiveTab] = useState('account');
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const loadProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetchUserProfile();
      setProfileData(res.data);
    } catch (err) {
      console.error('Failed to load user profile:', err);
      setError('Unable to load profile. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, [currentUser?.id]);

  const handleUpdateProfile = async (userData) => {
    setSaving(true);
    try {
      const res = await updateUserProfile(userData);
      if (res.data?.user) {
        setProfileData((prev) => ({
          ...prev,
          user: { ...prev.user, ...res.data.user },
        }));
        updateCurrentUser(res.data.user);
      }
      return res.data;
    } finally {
      setSaving(false);
    }
  };

  const handleSavePreferences = async ({ preferences, defaultServings }) => {
    setSaving(true);
    try {
      const prefRes = await updateUserPreferences(preferences);
      if (defaultServings !== undefined) {
        await updateUserProfile({ default_servings: defaultServings });
        updateCurrentUser({ default_servings: defaultServings });
      }
      setProfileData((prev) => ({
        ...prev,
        preferences: prefRes.data.preferences || preferences,
        user: { ...prev.user, default_servings: defaultServings },
      }));
    } finally {
      setSaving(false);
    }
  };

  const handleUpdatePassword = async (passData) => {
    setSaving(true);
    try {
      return await updateUserPassword(passData);
    } finally {
      setSaving(false);
    }
  };

  const handleUnsaveRecipe = async (recipeId) => {
    try {
      await toggleSaveRecipe(recipeId);
      setProfileData((prev) => ({
        ...prev,
        savedRecipes: prev.savedRecipes.filter((r) => r.id !== recipeId),
        stats: {
          ...prev.stats,
          savedCount: Math.max(0, (prev.stats?.savedCount || 1) - 1),
        },
      }));
    } catch (err) {
      console.error('Failed to unsave recipe:', err);
    }
  };

  const tabs = [
    { id: 'account', label: t.profile?.tabs?.account || 'Account', icon: User },
    { id: 'preferences', label: t.profile?.tabs?.preferences || 'Preferences', icon: Sliders },
    { id: 'activity', label: t.profile?.tabs?.activity || 'Activity & Shortcuts', icon: BookmarkCheck },
    { id: 'security', label: t.profile?.tabs?.security || 'Settings & Security', icon: ShieldCheck },
  ];

  return (
    <div className="flex-1 flex flex-col">
      <Header
        title={t.header?.profileTitle || 'Chef Profile'}
        subtitle={t.header?.profileSubtitle || 'Manage your culinary identity & preferences'}
        showLang={true}
      />

      <div className="px-5 pb-8 space-y-4">
        {/* Navigation Tabs Bar */}
        <div className="bg-white/80 dark:bg-[#1C1C1A]/80 backdrop-blur p-1 rounded-2xl border border-black/5 dark:border-white/5 flex gap-1 shadow-sm sticky top-2 z-20">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isCurrent = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-2.5 px-2 rounded-xl text-xs font-semibold flex flex-col items-center justify-center gap-1 transition-all ${
                  isCurrent
                    ? 'bg-terracotta text-white shadow-md shadow-terracotta/20 scale-[1.02]'
                    : 'text-gray-500 dark:text-neutral-400 hover:text-charcoal dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'
                }`}
              >
                <Icon size={16} />
                <span className="text-[11px] leading-none line-clamp-1">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="py-20 flex flex-col items-center justify-center gap-3">
            <Loader2 size={32} className="animate-spin text-terracotta" />
            <p className="text-xs text-gray-400 font-medium tracking-wide">
              Loading your culinary profile...
            </p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="p-6 bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900 rounded-2xl text-center space-y-3">
            <AlertCircle size={28} className="mx-auto text-rose-500" />
            <p className="text-xs text-rose-700 dark:text-rose-300 font-medium">{error}</p>
            <button
              onClick={loadProfile}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-rose-600 text-white rounded-xl text-xs font-semibold hover:bg-rose-700 transition-colors"
            >
              <RefreshCw size={12} />
              <span>Retry</span>
            </button>
          </div>
        )}

        {/* Tab Content */}
        {!loading && profileData && (
          <div className="pt-2">
            {activeTab === 'account' && (
              <AccountTab
                user={profileData.user}
                onUpdate={handleUpdateProfile}
                saving={saving}
              />
            )}

            {activeTab === 'preferences' && (
              <PreferencesTab
                preferences={profileData.preferences}
                defaultServings={profileData.user?.default_servings || 4}
                onSave={handleSavePreferences}
                saving={saving}
              />
            )}

            {activeTab === 'activity' && (
              <ActivityTab
                stats={profileData.stats}
                savedRecipes={profileData.savedRecipes}
                createdRecipes={profileData.createdRecipes}
                recentMealPlans={profileData.recentMealPlans}
                onUnsaveRecipe={handleUnsaveRecipe}
              />
            )}

            {activeTab === 'security' && (
              <SecurityTab
                onUpdatePassword={handleUpdatePassword}
                saving={saving}
              />
            )}
          </div>
        )}
      </div>

      {/* Global Auth Modal for Login & Signup */}
      <AuthModal onAuthSuccess={() => loadProfile()} />
    </div>
  );
}
