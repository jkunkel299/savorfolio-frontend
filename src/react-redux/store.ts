import { configureStore } from "@reduxjs/toolkit";
import recipeFiltersReducer from "./slices/recipeFiltersSlice";

export const store = configureStore({
    reducer: {
        recipeFiltersReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;