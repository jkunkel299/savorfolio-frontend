import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Divider from '@mui/material/Divider';
import IconButton from "@mui/material/IconButton";
import { ArrowBack } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import RecipeSummaryView from "../components/RecipeView/RecipeSummaryView";
import IngredientViewList from "../components/RecipeView/IngredientViewList";
import InstructionViewList from "../components/RecipeView/InstructionViewList";
import RecipeSectionView from "../components/RecipeView/RecipeSectionView";
import TagsView from "../components/RecipeView/TagsView";
import type { FullRecipeDTO } from "../types";
import recipeService from "../api/recipeApi";

export function ViewRecipePage() {
    const [recipeData, setRecipeData] = useState<FullRecipeDTO>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null | unknown >(null);

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const recipeId = Number(queryParams.get('recipeId'));

    const navigate = useNavigate();

    /* Get recipe by ID */
    useEffect(() => {
        const fetchRecipeById = async (id: number) => {
            setLoading(true);
            try {
                const response = await recipeService.getRecipeById(id);
                const viewRecipe = response.data;
                setRecipeData(viewRecipe);
            } catch (err: unknown) {
                setError(err || "Error fetching recipe");
            } finally {
                setLoading(false);
            }
        };
        fetchRecipeById(recipeId);
    }, [recipeId]);
    if (loading) return <Typography>Loading recipe...</Typography>
    if (error) return <Typography>Error</Typography>; // fix this later

    const hasSections = recipeData?.recipeSections?.length ?? 0 > 0;

    return (
        <Box 
            sx={{
                display: 'flex',
                justifyContent: 'center', // Centers horizontally
                minHeight: '100vh',       // Ensures the container takes full viewport height
                width: '100%',            // Ensures the container takes full viewport width
            }}
        >
            <Stack>
                {/* Back button */}
                <Box sx={{ justifyContent:'flex-start' }}>
                    <IconButton
                        onClick={() => {navigate(-1);}}
                    >
                        <ArrowBack sx={{ fontSize: 16 }} />
                        <Typography>Back to Search</Typography>
                    </IconButton>
                </Box>
                
                {/* Recipe content */}
                <Paper elevation={3} sx={{ 
                    p: 3, 
                    width: '80vw'
                }}>
                    <Stack spacing={2}>
                        <RecipeSummaryView recipeSummary={recipeData!.recipeSummary}/>

                        {hasSections ? (
                            <RecipeSectionView
                                recipeSections={recipeData!.recipeSections}
                                ingredients={recipeData!.ingredients}
                                instructions={recipeData!.instructions}
                            />
                        ) : (
                        <>
                            <Typography variant="h4">Ingredients</Typography>
                            <IngredientViewList ingredients={recipeData!.ingredients} />

                            <Typography variant="h4">Instructions</Typography>
                            <InstructionViewList instructions={recipeData!.instructions} />
                        </>)}

                        <Divider />
                        <Typography variant="h4">Recipe Tags</Typography>
                        <TagsView recipeTags={recipeData!.recipeTags} />
                    </Stack>
                </Paper>
            </Stack>
        </Box>
    )
}