import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { resetFilters } from "../../react-redux/slices/recipeFiltersSlice";
import { useDispatch } from "react-redux";
import IngredientIncludeFilter from "./IncludeIngredientFilter";
import IngredientExcludeFilter from "./ExcludeIngredientFilter";
import TagFilter from "./TagFilter";

export default function SidebarFilters(){
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
        <IngredientIncludeFilter />
      </div>

      <Typography variant="body2" color="text.secondary">
        Search for Ingredients to Exclude
      </Typography>
      <div style={{ padding: "5px" }}>
        <IngredientExcludeFilter />
      </div>

      <Typography variant="body2">
        Select Categories to Include
      </Typography>
      <div style={{ padding: "5px" }}>
        <TagFilter type="recipe_type" label="Recipe Type"/>
        <TagFilter type="meal" label="Meal"/>
        <TagFilter type="cuisine" label="Cuisine"/>
        <TagFilter type="dietary" label="Dietary Considerations"/>
      </div>
    </Box>
  );
}
