import axiosClient from "./axiosClient";


// Service to get basic recipe information from backend
const recipeService = {
    getAllRecipes: () => axiosClient.get('/api/recipes'),
    getRecipeSearch: (
        IncludeIngredients?: number[],
        ExcludeIngredients?: number[]) => axiosClient.post(`/api/recipes/search`, { 
            includeIngredients: IncludeIngredients,
            excludeIngredients: ExcludeIngredients
        }),
    postRecipeManual: (
        newRecipe: string
    ) => axiosClient.post(`/api/recipes/add/manual`, newRecipe),
};

export default recipeService;