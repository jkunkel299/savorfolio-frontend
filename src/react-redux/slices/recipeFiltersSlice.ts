import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IngredientVariantDTO } from "../../types";

interface RecipeFiltersState {
  includeIngredients: IngredientVariantDTO[];
  excludeIngredients: IngredientVariantDTO[];
}

const initialState: RecipeFiltersState = {
  includeIngredients: [],
  excludeIngredients: [],
};

const recipeFiltersSlice = createSlice({
  name: "recipeFilters",
  initialState,
  reducers: {
    setIncludeIngredients(
      state,
      action: PayloadAction<IngredientVariantDTO[]>
    ) {
      state.includeIngredients = action.payload;
    },
    setExcludeIngredients(
      state,
      action: PayloadAction<IngredientVariantDTO[]>
    ) {
      state.excludeIngredients = action.payload;
    },
    resetFilters(state) {
      state.includeIngredients = [];
      state.excludeIngredients = [];
    },
  },
});

export const { setIncludeIngredients, setExcludeIngredients, resetFilters } =
  recipeFiltersSlice.actions;

export default recipeFiltersSlice.reducer;
