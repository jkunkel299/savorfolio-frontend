import { useState, useEffect } from "react";
import RecipeCard from "./RecipeCard";
import recipeService from "../../api/recipeApi";
import type { Recipe } from "../../types";

interface RecipeListProps {
  includeIngredientIds: number[]; // | undefined
  excludeIngredientIds: number[];
}

function RecipeList({ 
    includeIngredientIds = [],
    excludeIngredientIds = [], 
}: RecipeListProps) {
    const [recipeData, setRecipeData] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null | unknown >(null);

    useEffect(() => {
        const fetchRecipes = async () => {
            setLoading(true);
            try {
                const response = await recipeService.getRecipeSearch(
                    includeIngredientIds,
                    excludeIngredientIds
                );
                setRecipeData(response.data);
            } catch (err: unknown) {
                setError(err || "Error fetching Recipes"); // fix this later
            } finally {
                setLoading(false);
            }
        };
        fetchRecipes();
    }, [includeIngredientIds, excludeIngredientIds]); 
    if (loading) return <p>Loading recipes...</p>;
    if (error) return <p>Error</p>; // fix this later

    return (
        <div style={{ display: "flex", flexWrap: "wrap", padding: "10px" }}>
            {recipeData.map((recipe) => (
                <div style={{ padding: "10px"}}>
                    <RecipeCard 
                        key = {recipe.id}
                        recipeTitle = {recipe.name}
                        servings = {recipe.servings}
                        cookTime = {recipe.cookTime}
                        prepTime = {recipe.prepTime}
                    />
                </div>
            ))}
        </div>
    );
}

export default RecipeList;