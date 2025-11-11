import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IngredientVariantDTO, SelectorType } from "../../types";

interface RecipeFiltersState {
  includeIngredients: IngredientVariantDTO[];
  excludeIngredients: IngredientVariantDTO[];
  tags: Record<SelectorType, string[]>;
}

const initialState: RecipeFiltersState = {
  includeIngredients: [],
  excludeIngredients: [],
  tags: {
    recipe_type: [],
    meal: [],
    cuisine: [],
    dietary: []
  }
};

interface SetTagsPayload {
  type: SelectorType;
  tags: string[];
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
    setTags(state, action: PayloadAction<SetTagsPayload>) {
      const { type, tags } = action.payload;
      state.tags[type] = tags;
    },
    resetFilters() {
      return initialState;
    },
  },
});

export const { setIncludeIngredients, setExcludeIngredients, setTags, resetFilters } =
  recipeFiltersSlice.actions;

export default recipeFiltersSlice.reducer;
