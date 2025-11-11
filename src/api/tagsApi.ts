import axiosClient from "./axiosClient";

// Service to get basic recipe information from backend
const tagsService = {
  getMealTags: () => axiosClient.get("/api/enum/meal-type"),
  getRecipeTypeTags: () => axiosClient.get("/api/enum/recipe-type"),
  getCuisineTags: () => axiosClient.get("api/enum/cuisine-type"),
  getDietaryTags: () => axiosClient.get("api/enum/dietary-type"),
};

export default tagsService;
