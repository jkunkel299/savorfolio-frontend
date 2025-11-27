import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IngredientVariantDTO, SelectorType } from "../../types";

interface RecipeFiltersState {
  includeIngredients: IngredientVariantDTO[];
  excludeIngredients: IngredientVariantDTO[];
  tags: Record<SelectorType, string[]>;
  recipeName: string;
  userId: number | null;
}

const initialState: RecipeFiltersState = {
  includeIngredients: [],
  excludeIngredients: [],
  tags: {
    recipe_type: [],
    meal: [],
    cuisine: [],
    dietary: []
  },
  recipeName: "",
  userId: null,
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
    setRecipeName(
      state,
      action: PayloadAction<string>
    ){
      state.recipeName = action.payload;
    },
    setUserId(
      state,
      action: PayloadAction<number | null>
    ) {
      state.userId = action.payload;
    },
    resetFilters() {
      return initialState;
    },
  },
});

export const { setIncludeIngredients, setExcludeIngredients, setTags, setRecipeName, setUserId, resetFilters } =
  recipeFiltersSlice.actions;

export default recipeFiltersSlice.reducer;
