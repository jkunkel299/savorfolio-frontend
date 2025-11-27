import { configureStore } from "@reduxjs/toolkit";
import recipeFiltersReducer from "./slices/recipeFiltersSlice";
import draftRecipeReducer from "./slices/draftRecipeSlice";
import authReducer from "./slices/authSlice";

export const store = configureStore({
  reducer: {
    recipeFilters: recipeFiltersReducer,
    draftRecipe: draftRecipeReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
