import { Box } from "@mui/material";
import SidebarFilters from "../components/SidebarFilters";
import RecipeList from "../components/RecipeList";
import { useState } from "react";
import type { IngredientVariantDTO } from "../types";

export default function RecipeSearchPage() {
    const [selectedIngredients, setSelectedIngredients] = useState<IngredientVariantDTO[]>([]);
    let selectedIngredientIds: number[] = [];
    
    selectedIngredientIds = selectedIngredients.map(ing => ing.id)
    
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
                <SidebarFilters onSelectedIngredientsChange={setSelectedIngredients}/>
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
                <RecipeList ingredientIds={selectedIngredientIds}/>
            </Box>
        </>
    );
}