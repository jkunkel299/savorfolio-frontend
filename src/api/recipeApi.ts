import axiosClient from "./axiosClient";

// Service to get basic recipe information from backend
const recipeService = {
    getAllRecipes: () => axiosClient.get('/api/recipes'),
    getRecipeSearch: (IncludeIngredients?: number[]) => axiosClient.post(`/api/recipes/search`, { includeIngredients: IncludeIngredients}),
};

export default recipeService;