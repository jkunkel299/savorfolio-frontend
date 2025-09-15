import axiosClient from "./axiosClient";

// Service to get basic recipe information from backend
const recipeService = {
    getAllRecipes: () => axiosClient.get('/api/recipes'),
    getRecipeIncludeIngredient: (ingredientId: number) => axiosClient.get(`/api/recipes/includeIngredient?${ingredientId}`),
};

export default recipeService;