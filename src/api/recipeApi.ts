import type { FullRecipeDTO } from "../types";
import axiosClient from "./axiosClient";

// Service to get recipe information from backend
const recipeService = {
    // search for recipes using filters
    getRecipeSearch: (
        IncludeIngredients?: number[],
        ExcludeIngredients?: number[]
    ) => 
        axiosClient.post(`/api/recipes/search`, { 
            includeIngredients: IncludeIngredients,
            excludeIngredients: ExcludeIngredients
        }),
    // add a new recipe
    postRecipeManual: (newRecipe: string) => 
        axiosClient.post(`/api/recipes/add/manual`, newRecipe),
    // get a recipe by its ID
    getRecipeById: (recipeId: number) => 
        axiosClient.get<FullRecipeDTO>(`/api/recipes/view`, { params: { recipeId } }),
    // send a URL to get back the draft recipe from the web scraper
    postScrapedRecipe: (url: string) =>
        axiosClient.post(`/api/recipes/add/scrape`, url),
};

export default recipeService;