import axiosClient from "./axiosClient";

// Service to get basic ingredient information from backend
const ingredientService = {
    getIngredientByTerm: (term : string) => axiosClient.get(`/api/ingredients/search`, { params: { term } }),
    getUnitsByName: (term: string) => axiosClient.get('/api/units', { params: { term } })
};

export default ingredientService;