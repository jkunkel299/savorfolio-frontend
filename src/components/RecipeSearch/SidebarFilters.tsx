import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { resetFilters } from "../../react-redux/slices/recipeFiltersSlice";
import { useDispatch } from "react-redux";
import IngredientIncludeFilter from "./IncludeIngredientFilter";
import IngredientExcludeFilter from "./ExcludeIngredientFilter";
import type { IngredientVariantDTO } from "../../types";

interface SidebarFiltersProps {
  includeIngredients: IngredientVariantDTO[];
  excludeIngredients: IngredientVariantDTO[];
  onIncludeIngredientsChange: (ingredients: IngredientVariantDTO[]) => void;
  onExcludeIngredientsChange: (ingredients: IngredientVariantDTO[]) => void;
}

export default function SidebarFilters({
  includeIngredients,
  excludeIngredients,
  onIncludeIngredientsChange,
  onExcludeIngredientsChange,
}: SidebarFiltersProps) {
  const dispatch = useDispatch();

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6">Filters</Typography>
      <Button
        variant="text"
        size="small"
        onClick={() => dispatch(resetFilters())}
      >
        Reset Filters
      </Button>

      <Typography variant="body2" color="text.secondary">
        Search for Ingredients to Include
      </Typography>
      <div style={{ padding: "5px" }}>
        <IngredientIncludeFilter
          value={includeIngredients}
          onIngredientsChange={onIncludeIngredientsChange}
        />
      </div>

      <Typography variant="body2" color="text.secondary">
        Search for Ingredients to Exclude
      </Typography>
      <div style={{ padding: "5px" }}>
        <IngredientExcludeFilter
          value={excludeIngredients}
          onIngredientsChange={onExcludeIngredientsChange}
        />
      </div>
    </Box>
  );
}
