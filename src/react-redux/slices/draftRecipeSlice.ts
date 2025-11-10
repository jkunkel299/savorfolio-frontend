import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { DraftRecipeDTO } from "../../types";

interface DraftRecipeState {
    data: DraftRecipeDTO | null;
}

const initialState: DraftRecipeState = {
    data: null,
};

export const draftRecipeSlice = createSlice({
    name: "draftRecipe",
    initialState,
    reducers: {
        setDraftRecipe: (state, action: PayloadAction<DraftRecipeDTO>) => {
            state.data = action.payload;
        },
        clearDraftRecipe: (state) => {
            state.data = null;
        }
    }
});

export const { setDraftRecipe, clearDraftRecipe } = draftRecipeSlice.actions;
export default draftRecipeSlice.reducer;