import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useDispatch } from "react-redux";
import { resetFilters } from "../../react-redux/slices/recipeFiltersSlice";
import { useAppSelector } from "../../react-redux/hooks";
import type { RootState } from "../../react-redux/store";
import IngredientIncludeFilter from "./IncludeIngredientFilter";
import IngredientExcludeFilter from "./ExcludeIngredientFilter";
import TagFilter from "./TagFilter";
import UserIdFilter from "./UserIdFilter";
import RecipeNameFilter from "./RecipeNameFilter";


export default function SidebarFilters() {
  const dispatch = useDispatch();
  const user = useAppSelector((state: RootState) => state.auth.user);

  return (
    <Stack spacing={1}>
      <Typography variant="h4">Filters</Typography>
      <Button
        variant="text"
        onClick={() => dispatch(resetFilters())}
      >
        Reset Filters
      </Button>

      {/* switch to include only the logged-in user's recipes, rendered conditionally */}
      {user && (
        <Box style={{ padding: "5px" }}>
          <UserIdFilter />
        </Box>
      )}

      {/* Search for recipe by name */}
      <Box style={{ padding: "5px" }}>
        <Typography variant="body2" color="text.secondary">
          Search by Recipe Name
        </Typography>
        
        <RecipeNameFilter />
      </Box>

      {/* Include Ingredients */}
      <Box style={{ padding: "5px" }}>
        <Typography variant="body2" color="text.secondary">
          Search for Ingredients to Include
        </Typography>

        <IngredientIncludeFilter />
      </Box>

      {/* Exclude Ingredients */}
      <Box style={{ padding: "5px" }}>
        <Typography variant="body2" color="text.secondary">
          Search for Ingredients to Exclude
        </Typography>

        <IngredientExcludeFilter />
      </Box>

      {/* Category Filtering */}
      <Box style={{ padding: "5px" }}>
        <Typography variant="body2" color="text.secondary">
          Select Categories to Include
        </Typography>

        <TagFilter type="recipe_type" label="Recipe Type" />
        <TagFilter type="meal" label="Meal" />
        <TagFilter type="cuisine" label="Cuisine" />
        <TagFilter type="dietary" label="Dietary Considerations" />
      </Box>
    </Stack>
  );
}
