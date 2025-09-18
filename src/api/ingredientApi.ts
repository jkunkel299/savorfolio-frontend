import axiosClient from "./axiosClient";

// Service to get basic recipe information from backend
const ingredientService = {
    getIngredientByTerm: (term : string) => axiosClient.get(`/api/ingredients/search`, { params: { term } }),
};

export default ingredientService;