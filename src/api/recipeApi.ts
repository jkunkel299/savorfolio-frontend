import type { FullRecipeDTO } from "../types";
import axiosClient from "./axiosClient";

// Service to get basic recipe information from backend
const recipeService = {
    getRecipeSearch: (
        IncludeIngredients?: number[],
        ExcludeIngredients?: number[]
    ) => 
        axiosClient.post(`/api/recipes/search`, { 
            includeIngredients: IncludeIngredients,
            excludeIngredients: ExcludeIngredients
        }),
    postRecipeManual: (newRecipe: string) => 
        axiosClient.post(`/api/recipes/add/manual`, newRecipe),
    getRecipeById: (recipeId: number) => 
        axiosClient.get<FullRecipeDTO>(`/api/recipes/view`, { params: { recipeId } }),
};

export default recipeService;