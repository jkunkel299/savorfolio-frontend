import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";
import RecipeCard from "./RecipeCard";
import recipeService from "../../api/recipeApi";
import type { Recipe, RecipeFilterDTO } from "../../types";

interface RecipeListProps {
  includeIngredientIds: number[];
  excludeIngredientIds: number[];
  tags: {
    recipe_type: string[];
    meal: string[];
    cuisine: string[];
    dietary: string[];
  };
  recipeName: string;
  userId: number | null;
}

export default function RecipeList({
  includeIngredientIds = [],
  excludeIngredientIds = [],
  tags,
  recipeName,
  userId,
}: RecipeListProps) {
  const [recipeData, setRecipeData] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null | unknown>(null);

  let recipeMessage = "";
  if (recipeData.length == 0) {
    recipeMessage = "No recipes found. Try other filters!";
  } else if (recipeData.length == 1) {
    recipeMessage = `Found ${recipeData.length} recipe:`;
  } else {
    recipeMessage = `Found ${recipeData.length} recipes:`;
  }

  /* Get recipes */
  useEffect(() => {
    let isActive = true; // mount flag inside effect to prevent stale state updates

    const filter: RecipeFilterDTO = {
      includeIngredientsIds: includeIngredientIds,
      excludeIngredientsIds: excludeIngredientIds,
      Recipe_typeString: tags.recipe_type[0],
      MealString: tags.meal[0],
      CuisineString: tags.cuisine[0],
      Dietary: tags.dietary,
      RecipeName: recipeName,
      UserId: userId!,
    };

    const fetchRecipes = async () => {
      setLoading(true);
      try {
        const response = await recipeService.getRecipeSearch(filter);
        setRecipeData(response.data);
      } catch {
        setError(true); // fix this later
      } finally {
        setLoading(false);
      }
    };

    const handler = setTimeout(() => {
      if (!isActive) return;

      if (filter) {
        fetchRecipes();
      } else {
        setRecipeData([]);
      }
    }, 500);

    return () => {
      isActive = false; // stops any async updates after unmount
      clearTimeout(handler); // clears pending timeout
    };
  }, [
    includeIngredientIds,
    excludeIngredientIds,
    tags.recipe_type,
    tags.meal,
    tags.cuisine,
    tags.dietary,
    recipeName,
    userId,
  ]);
  if (loading) return <Typography>Loading recipes...</Typography>;
  if (error) return <Typography>Error loading recipes.</Typography>; // fix this later

  return (
    <Stack sx={{padding: "10px"}}>
      <Typography>{recipeMessage}</Typography>

      <Box style={{ display: "flex", flexWrap: "wrap"}}>
        {recipeData.map((recipe) => (
          <Box style={{ padding: "10px" }} key={recipe.id}>
            <RecipeCard
              recipeId={recipe.id}
              recipeTitle={recipe.name}
              servings={recipe.servings}
              cookTime={recipe.cookTime}
              prepTime={recipe.prepTime}
            />
          </Box>
        ))}
      </Box>
    </Stack>
  );
}
