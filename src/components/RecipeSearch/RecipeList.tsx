import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";
import RecipeCard from "./RecipeCard";
import recipeService from "../../api/recipeApi";
import type { Recipe, RecipeFilterDTO } from "../../types";

interface RecipeListProps {
  includeIngredientIds: number[]; // | undefined
  excludeIngredientIds: number[];
  tags: {
    recipe_type: string[];
    meal: string[];
    cuisine: string[];
    dietary: string[];
  };
}

export default function RecipeList({
  includeIngredientIds = [],
  excludeIngredientIds = [],
  tags,
}: RecipeListProps) {
  const [recipeData, setRecipeData] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null | unknown>(null);

  /* Get all recipes */
  useEffect(() => {
    let isActive = true; // mount flag inside effect to prevent stale state updates

    const filter: RecipeFilterDTO = {
      includeIngredientsIds: includeIngredientIds,
      excludeIngredientsIds: excludeIngredientIds,
      Recipe_typeString: tags.recipe_type[0],
      MealString: tags.meal[0],
      CuisineString: tags.cuisine[0],
      Dietary: tags.dietary,
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
  ]);
  if (loading) return <Typography>Loading recipes...</Typography>;
  if (error) return <Typography>Error loading recipes.</Typography>; // fix this later

  return (
    <div style={{ display: "flex", flexWrap: "wrap", padding: "10px" }}>
      {recipeData.map((recipe) => (
        <div style={{ padding: "10px" }} key={recipe.id}>
          <RecipeCard
            recipeId={recipe.id}
            recipeTitle={recipe.name}
            servings={recipe.servings}
            cookTime={recipe.cookTime}
            prepTime={recipe.prepTime}
          />
        </div>
      ))}

      {recipeData.length == 0 && (
        <Typography>No recipes found. Try other filters!</Typography>
      )}
    </div>
  );
}
