import axios from 'axios';
import { useAuthStore } from '../store/authStore';
import {
  mockGetRecipes,
  mockGetRecipeById,
  mockPantryMatch,
  mockGetMealPlan,
  mockAddMealPlan,
  mockRemoveMealPlan,
  mockGetGroceryList,
  mockToggleGroceryCheck,
  mockGetUserProfile,
  mockUpdateUserProfile,
  mockToggleSaveRecipe,
  mockGetSavedRecipes,
} from './clientMockStore';

const api = axios.create({ baseURL: '/api' });

// Request interceptor to attach active user id and auth token
api.interceptors.request.use((config) => {
  try {
    const authState = useAuthStore.getState();
    const userId = authState.currentUser?.id || 1;
    const token = authState.token;

    config.headers['x-user-id'] = String(userId);
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
  } catch (err) {
    config.headers['x-user-id'] = '1';
  }
  return config;
});

// Helper wrapper for graceful fallback on static / offline deployments
const withFallback = async (apiCall, fallbackFn) => {
  try {
    const res = await apiCall();
    if (res && res.data) return res;
    return fallbackFn();
  } catch (err) {
    // If backend is offline, 404, or network error, gracefully use client-side store
    return fallbackFn();
  }
};

// Auth
export const loginUser = (email, password) =>
  withFallback(() => api.post('/users/login', { email, password }), () => ({
    data: { user: { id: 1, name: email.split('@')[0], email }, token: 'mock-jwt-token' },
  }));

export const signupUser = (data) =>
  withFallback(() => api.post('/users/signup', data), () => ({
    data: { user: { id: 1, name: data.name, email: data.email }, token: 'mock-jwt-token' },
  }));

export const fetchAccounts = () =>
  withFallback(() => api.get('/users/accounts'), () => ({ data: [] }));

// Recipes
export const fetchRecipes = (params) =>
  withFallback(() => api.get('/recipes', { params }), () => mockGetRecipes(params));

export const fetchRecipeById = (id) =>
  withFallback(() => api.get(`/recipes/${id}`), () => mockGetRecipeById(id));

export const pantryMatch = (ingredients, cuisine) =>
  withFallback(
    () => api.post('/recipes/pantry-match', { ingredients, cuisine }),
    () => mockPantryMatch(ingredients, cuisine)
  );

// Meal Plans
export const fetchMealPlan = (week) =>
  withFallback(() => api.get('/meal-plans', { params: { week } }), () => mockGetMealPlan(week));

export const addMealPlan = (data) =>
  withFallback(() => api.post('/meal-plans', data), () => mockAddMealPlan(data));

export const removeMealPlan = (id) =>
  withFallback(() => api.delete(`/meal-plans/${id}`), () => mockRemoveMealPlan(id));

// Grocery
export const fetchGroceryList = (week) =>
  withFallback(() => api.get('/grocery', { params: { week } }), () => mockGetGroceryList(week));

export const toggleGroceryCheck = (item_key, is_checked) =>
  withFallback(
    () => api.post('/grocery/check', { item_key, is_checked }),
    () => mockToggleGroceryCheck(item_key, is_checked)
  );

// User Profile & Preferences
export const fetchUserProfile = () =>
  withFallback(() => api.get('/users/profile'), () => mockGetUserProfile());

export const updateUserProfile = (data) =>
  withFallback(() => api.put('/users/profile', data), () => mockUpdateUserProfile(data));

export const updateUserPreferences = (data) =>
  withFallback(() => api.put('/users/preferences', data), () => ({ data: { success: true } }));

export const updateUserPassword = (data) =>
  withFallback(() => api.put('/users/password', data), () => ({ data: { success: true } }));

export const toggleSaveRecipe = (recipeId) =>
  withFallback(() => api.post(`/users/saved-recipes/${recipeId}`), () => mockToggleSaveRecipe(recipeId));

export const fetchSavedRecipes = () =>
  withFallback(() => api.get('/users/saved-recipes'), () => mockGetSavedRecipes());
