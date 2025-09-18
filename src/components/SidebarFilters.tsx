import { Box, Typography } from "@mui/material";
import IngredientIncludeFilter from "./IncludeIngredientFilter";
import IngredientExcludeFilter from "./ExcludeIngredientFilter";
import type { IngredientVariantDTO } from "../types";

interface SidebarFiltersProps {
  onIncludeIngredientsChange: (ingredients: IngredientVariantDTO[]) => void;
  onExcludeIngredientsChange: (ingredients: IngredientVariantDTO[]) => void;

}

export default function SidebarFilters({ 
  onIncludeIngredientsChange,
  onExcludeIngredientsChange
}: SidebarFiltersProps) {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6">Filters</Typography>

      <Typography variant="body2" color="text.secondary">
        Search for Ingredients to Include
      </Typography>
      <div style={{padding: "5px"}}>
        <IngredientIncludeFilter onIngredientsChange={onIncludeIngredientsChange}/>
      </div>

      <Typography variant="body2" color="text.secondary">
        Search for Ingredients to Exclude
      </Typography>
      <div style={{padding: "5px"}}>
        <IngredientExcludeFilter onIngredientsChange={onExcludeIngredientsChange}/>
      </div>
    </Box>
  );
}