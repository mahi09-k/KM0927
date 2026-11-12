import { create } from 'zustand';
import axios from 'axios';

const DEFAULT_USER = {
  id: 1,
  name: '',
  email: '',
  avatar_url: null,
  default_servings: 4,
  created_at: new Date().toISOString(),
};

const sanitizeUser = (user) => {
  if (!user) return user;
  if (user.name === 'Ayesha Rahman') user.name = '';
  if (user.email === 'ayesha@sizzlespoon.com') user.email = '';
  if (user.avatar_url && user.avatar_url.includes('photo-1534528741775')) {
    return { ...user, avatar_url: null };
  }
  return user;
};

const getStoredUser = () => {
  try {
    const raw = localStorage.getItem('sizzlespoon_current_user');
    return raw ? sanitizeUser(JSON.parse(raw)) : DEFAULT_USER;
  } catch {
    return DEFAULT_USER;
  }
};

const getStoredAccounts = () => {
  try {
    const raw = localStorage.getItem('sizzlespoon_saved_accounts');
    const accs = raw ? JSON.parse(raw).map(sanitizeUser) : [DEFAULT_USER];
    if (!accs.find((a) => a.id === DEFAULT_USER.id)) {
      accs.unshift(DEFAULT_USER);
    }
    return accs;
  } catch {
    return [DEFAULT_USER];
  }
};

export const useAuthStore = create((set, get) => ({
  currentUser: getStoredUser(),
  token: localStorage.getItem('sizzlespoon_token') || 'jwt_mock_token_user_1',
  savedAccounts: getStoredAccounts(),
  isAuthModalOpen: false,
  authModalMode: 'login', // 'login' | 'signup'

  openAuthModal: (mode = 'login') => {
    set({ isAuthModalOpen: true, authModalMode: mode });
  },

  closeAuthModal: () => {
    set({ isAuthModalOpen: false });
  },

  setAuthModalMode: (mode) => {
    set({ authModalMode: mode });
  },

  login: async (email, password) => {
    const res = await axios.post('/api/users/login', { email, password });
    const { user, token } = res.data;

    // Add to saved accounts if not present
    const accounts = get().savedAccounts;
    const exists = accounts.find((a) => a.id === user.id || a.email.toLowerCase() === user.email.toLowerCase());
    let nextAccounts = accounts;
    if (!exists) {
      nextAccounts = [user, ...accounts];
    } else {
      nextAccounts = accounts.map((a) => (a.id === user.id ? { ...a, ...user } : a));
    }

    localStorage.setItem('sizzlespoon_current_user', JSON.stringify(user));
    localStorage.setItem('sizzlespoon_token', token);
    localStorage.setItem('sizzlespoon_saved_accounts', JSON.stringify(nextAccounts));

    set({
      currentUser: user,
      token,
      savedAccounts: nextAccounts,
      isAuthModalOpen: false,
    });

    return user;
  },

  signup: async (signupData) => {
    const res = await axios.post('/api/users/signup', signupData);
    const { user, token } = res.data;

    const accounts = get().savedAccounts;
    const nextAccounts = [user, ...accounts.filter((a) => a.id !== user.id)];

    localStorage.setItem('sizzlespoon_current_user', JSON.stringify(user));
    localStorage.setItem('sizzlespoon_token', token);
    localStorage.setItem('sizzlespoon_saved_accounts', JSON.stringify(nextAccounts));

    set({
      currentUser: user,
      token,
      savedAccounts: nextAccounts,
      isAuthModalOpen: false,
    });

    return user;
  },

  switchAccount: (targetUser) => {
    const token = 'jwt_mock_token_user_' + targetUser.id;
    localStorage.setItem('sizzlespoon_current_user', JSON.stringify(targetUser));
    localStorage.setItem('sizzlespoon_token', token);

    set({
      currentUser: targetUser,
      token,
      isAuthModalOpen: false,
    });
  },

  updateCurrentUser: (updates) => {
    const current = get().currentUser;
    const updated = { ...current, ...updates };
    const accounts = get().savedAccounts.map((a) => (a.id === current.id ? updated : a));

    localStorage.setItem('sizzlespoon_current_user', JSON.stringify(updated));
    localStorage.setItem('sizzlespoon_saved_accounts', JSON.stringify(accounts));

    set({
      currentUser: updated,
      savedAccounts: accounts,
    });
  },

  logout: () => {
    // Switch to first remaining account or default user
    const remaining = get().savedAccounts.filter((a) => a.id !== get().currentUser.id);
    const nextUser = remaining[0] || DEFAULT_USER;
    const nextAccounts = remaining.length > 0 ? remaining : [DEFAULT_USER];

    localStorage.setItem('sizzlespoon_current_user', JSON.stringify(nextUser));
    localStorage.setItem('sizzlespoon_saved_accounts', JSON.stringify(nextAccounts));

    set({
      currentUser: nextUser,
      savedAccounts: nextAccounts,
      token: 'jwt_mock_token_user_' + nextUser.id,
    });
  },
}));
