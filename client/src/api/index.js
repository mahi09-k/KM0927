import axios from 'axios';
import { useAuthStore } from '../store/authStore';

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

// Auth
export const loginUser = (email, password) => api.post('/users/login', { email, password });
export const signupUser = (data) => api.post('/users/signup', data);
export const fetchAccounts = () => api.get('/users/accounts');

// Recipes
export const fetchRecipes = (params) => api.get('/recipes', { params });
export const fetchRecipeById = (id) => api.get(`/recipes/${id}`);
export const pantryMatch = (ingredients, cuisine) =>
  api.post('/recipes/pantry-match', { ingredients, cuisine });

// Meal Plans
export const fetchMealPlan = (week) => api.get('/meal-plans', { params: { week } });
export const addMealPlan = (data) => api.post('/meal-plans', data);
export const removeMealPlan = (id) => api.delete(`/meal-plans/${id}`);

// Grocery
export const fetchGroceryList = (week) => api.get('/grocery', { params: { week } });
export const toggleGroceryCheck = (item_key, is_checked) =>
  api.post('/grocery/check', { item_key, is_checked });

// User Profile & Preferences
export const fetchUserProfile = () => api.get('/users/profile');
export const updateUserProfile = (data) => api.put('/users/profile', data);
export const updateUserPreferences = (data) => api.put('/users/preferences', data);
export const updateUserPassword = (data) => api.put('/users/password', data);
export const toggleSaveRecipe = (recipeId) => api.post(`/users/saved-recipes/${recipeId}`);
export const fetchSavedRecipes = () => api.get('/users/saved-recipes');
