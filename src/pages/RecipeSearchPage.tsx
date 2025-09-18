import { Box } from "@mui/material";
import SidebarFilters from "../components/SidebarFilters";
import RecipeList from "../components/RecipeList";
import { useState } from "react";
import type { IngredientVariantDTO } from "../types";

export default function RecipeSearchPage() {
    const [includeIngredients, setIncludeIngredients] = useState<IngredientVariantDTO[]>([]);
    const [excludeIngredients, setExcludeIngredients] = useState<IngredientVariantDTO[]>([]);
    
    let includeIngredientsIds: number[] = [];
    let excludeIngredientsIds: number[] = [];
    
    includeIngredientsIds = includeIngredients.map(ing => ing.id);
    excludeIngredientsIds = excludeIngredients.map(ing => ing.id);
    
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
                    onIncludeIngredientsChange={setIncludeIngredients}
                    onExcludeIngredientsChange={setExcludeIngredients}    
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