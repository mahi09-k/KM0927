import { create } from 'zustand';

const usePantryStore = create((set) => ({
  selectedIngredients: [],
  addIngredient: (name) =>
    set((state) => ({
      selectedIngredients: state.selectedIngredients.includes(name)
        ? state.selectedIngredients
        : [...state.selectedIngredients, name],
    })),
  removeIngredient: (name) =>
    set((state) => ({
      selectedIngredients: state.selectedIngredients.filter((i) => i !== name),
    })),
  clearIngredients: () => set({ selectedIngredients: [] }),
}));

export default usePantryStore;
