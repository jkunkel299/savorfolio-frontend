import Box from "@mui/material/Box";
import { useSelector } from "react-redux";
import type { RootState } from "../react-redux/store";
import SidebarFilters from "../components/RecipeSearch/SidebarFilters";
import RecipeList from "../components/RecipeSearch/RecipeList";

export default function RecipeSearchPage() {
  // const dispatch = useDispatch();
  const includeIngredients = useSelector(
    (state: RootState) => state.recipeFilters.includeIngredients
  );
  const excludeIngredients = useSelector(
    (state: RootState) => state.recipeFilters.excludeIngredients
  );
  const tags = useSelector((state: RootState) => state.recipeFilters.tags)

  const includeIngredientsIds = includeIngredients.map((ing) => ing.id);
  const excludeIngredientsIds = excludeIngredients.map((ing) => ing.id);

  return (
    <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      {/* Sidebar */}
      <Box
        sx={{
          width: "10%vw",
          // flexShrink: 0,
          overflowY: "auto",
          bgcolor: "background.paper",
          borderRight: "1px solid",
          borderColor: "divider",
          p: 2,
        }}
      >
        <SidebarFilters />
      </Box>

      {/* Main content */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          // overflow: "auto",
          p: 2,
          overflowY: "auto"
        }}
      >
        <RecipeList
          includeIngredientIds={includeIngredientsIds}
          excludeIngredientIds={excludeIngredientsIds}
          tags={tags}
        />
      </Box>
    </Box>
  );
}
