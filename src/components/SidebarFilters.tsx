import { Box, Typography } from "@mui/material";
import IngredientIncludeFilter from "./IncludeIngredientFilter";
import type { IngredientVariantDTO } from "../types";

interface SidebarFiltersProps {
  onSelectedIngredientsChange: (ingredients: IngredientVariantDTO[]) => void;
}

export default function SidebarFilters({ onSelectedIngredientsChange }: SidebarFiltersProps) {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6">Filters</Typography>
      <Typography variant="body2" color="text.secondary">
        Search for Ingredients to Include
      </Typography>
      <div style={{padding: "5px"}}>
        <IngredientIncludeFilter onIngredientsChange={onSelectedIngredientsChange}/>
      </div>
    </Box>
  );
}