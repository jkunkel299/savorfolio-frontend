import Box from "@mui/material/Box";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../react-redux/store";
import {
    setIncludeIngredients,
    setExcludeIngredients,
} from "../react-redux/slices/recipeFiltersSlice";
import SidebarFilters from "../components/RecipeSearch/SidebarFilters";
import RecipeList from "../components/RecipeSearch/RecipeList";

export default function RecipeSearchPage() {
    const dispatch = useDispatch();
    const includeIngredients = useSelector(
        (state: RootState) => state.recipeFiltersReducer.includeIngredients
    );
    const excludeIngredients = useSelector(
        (state: RootState) => state.recipeFiltersReducer.excludeIngredients
    );
    
    const includeIngredientsIds = includeIngredients.map(ing => ing.id);
    const excludeIngredientsIds = excludeIngredients.map(ing => ing.id);
    
    return (
        <>
            {/* Sidebar */}
            <Box
                sx={{
                    width: 250,
                    flexShrink: 0,
                    bgcolor: "background.paper",
                    borderRight: "1px solid",
                    borderColor: "divider",
                }}
            >
                <SidebarFilters 
                    includeIngredients={includeIngredients}
                    excludeIngredients={excludeIngredients}
                    onIncludeIngredientsChange={(ings) =>
                        dispatch(setIncludeIngredients(ings))
                    }
                    onExcludeIngredientsChange={(ings) =>
                        dispatch(setExcludeIngredients(ings))
                    }    
                />
            </Box>
            
            {/* Main content */}
            <Box
                sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    overflow: "auto",
                    p: 2,
                }}
            >
                <RecipeList 
                    includeIngredientIds={includeIngredientsIds}
                    excludeIngredientIds={excludeIngredientsIds}
                />
            </Box>
        </>
    );
}