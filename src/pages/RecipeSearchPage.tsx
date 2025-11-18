import Box from "@mui/material/Box";
import { useSelector } from "react-redux";
import type { RootState } from "../react-redux/store";
import SidebarFilters from "../components/RecipeSearch/SidebarFilters";
import RecipeList from "../components/RecipeSearch/RecipeList";
import { useState } from "react";
import Drawer from "@mui/material/Drawer";
import Fab from "@mui/material/Fab";

export default function RecipeSearchPage() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const toggleMobileSidebar = () => setMobileOpen((prev) => !prev);

  const includeIngredients = useSelector(
    (state: RootState) => state.recipeFilters.includeIngredients
  );
  const excludeIngredients = useSelector(
    (state: RootState) => state.recipeFilters.excludeIngredients
  );
  const tags = useSelector((state: RootState) => state.recipeFilters.tags);
  const recipeName = useSelector(
    (state: RootState) => state.recipeFilters.recipeName
  );
  const userId = useSelector((state: RootState) => state.recipeFilters.userId);

  const includeIngredientsIds = includeIngredients.map((ing) => ing.id);
  const excludeIngredientsIds = excludeIngredients.map((ing) => ing.id);

  return (
    <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      {/* Sidebar */}
      <Box
        sx={{
          display: { xs: "none", md: "block" },
          width: "20vw",
          maxWidth: 300,
          overflowY: "auto",
          bgcolor: "background.paper",
          borderRight: "1px solid",
          borderColor: "divider",
          p: 2,
        }}
      >
        <SidebarFilters />
      </Box>

      {/* Mobile Sidebar Drawer */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={toggleMobileSidebar}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            width: "80vw",
            p: 2,
          },
        }}
      >
        <SidebarFilters />
      </Drawer>

      {/* Main content */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          p: 2,
          overflowY: "auto",
        }}
      >
        {/* Mobile toggle button */}
        <Fab
          variant="extended"
          color="primary"
          sx={{
            display: { xs: "block", md: "none" },
            position: "fixed",
            bottom: 16,
            right: 16,
          }}
          onClick={toggleMobileSidebar}
        >
          Filters
        </Fab>
        <RecipeList
          includeIngredientIds={includeIngredientsIds}
          excludeIngredientIds={excludeIngredientsIds}
          tags={tags}
          recipeName={recipeName}
          userId={userId}
        />
      </Box>
    </Box>
  );
}
