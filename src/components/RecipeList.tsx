import { useState, useEffect } from "react";
import RecipeCard from "../components/RecipeCard";
import recipeService from "../api/recipeApi";
import type { Recipe } from "../types";

function RecipeList() {
    const [recipeData, setRecipeData] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null | unknown >(null);

    useEffect(() => {
        const fetchAllRecipes = async () => {
            try {
                const response = await recipeService.getAllRecipes();
                setRecipeData(response.data);
            } catch (err: unknown) {
                setError(err || "Error fetching Recipes"); // fix this later
            } finally {
                setLoading(false);
            }
        };
        fetchAllRecipes();
    }, []);

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