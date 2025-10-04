import { useForm, FormProvider } from "react-hook-form";
import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import type { NewRecipeDTO } from "../types";
import RecipeSummaryForm from "../components/RecipeAdd/RecipeSummaryForm";
import TagsForm from "../components/RecipeAdd/TagsForm";
import IngredientsForm from "../components/RecipeAdd/IngredientsForm";
import recipeService from "../api/recipeApi";
import { Paper, Typography } from "@mui/material";

export function AddRecipePage() {
    const steps = ["RecipeSummary", "RecipeTags", "Ingredients"]; // add instructions, notes, review page
    const pages = [
        <RecipeSummaryForm key={0} />,
        <TagsForm key={1} />,
        <IngredientsForm key={2} />
    ]

    const methods = useForm<NewRecipeDTO>({
        defaultValues: {
            RecipeSummary: {
                Name: "",
                Servings: 0,
                CookTime: null,
                PrepTime: null,
                BakeTemp: null,
                Temp_unit: null,
            },
            Ingredients: [],
            Instructions: [],
            RecipeTags: { 
                Meal: null,
                Recipe_type: null,
                Cuisine: null,
                Dietary: [] },
        }
    });

    const [currentStep, setCurrentStep] = useState(0);
    
    const handleNext = async () => {
        const isValid = await methods.trigger();
        if (isValid) {
            setCurrentStep((prev) => prev = prev + 1);
        }
    };

    const handleBack = () => {
        setCurrentStep((prev) => prev = prev-1);
    };

    const handleSubmit = async (data: NewRecipeDTO) => {
        const sendData = JSON.stringify(data);
        try {
            const response = await recipeService.postRecipeManual(sendData);
            const savedRecipe = response.data;
            console.log("Recipe saved: ", savedRecipe)
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <Box 
            sx={{
                display: 'flex',
                justifyContent: 'center', // Centers horizontally
                minHeight: '100vh',       // Ensures the container takes full viewport height
                width: '100%',            // Ensures the container takes full viewport width
            }}
        >
        <FormProvider {...methods}>
            <Box display="flex" flexDirection="column" gap={3}>
                <Typography variant="h4">Add Recipe</Typography>
                <Paper elevation={3} sx={{ p: 3 }}>
                    <Box component="form" onSubmit={methods.handleSubmit(handleSubmit)}>
                        {pages[currentStep]}

                        <Box display="flex" justifyContent="flex-end" sx={{ width: '100%', paddingTop: 2 }}>
                            {currentStep > 0 && (                        
                                <Button type="button" onClick={handleBack} variant="outlined" >Back</Button>                        
                            )}
                            {currentStep < steps.length - 1 ? (
                                <Button type="button" onClick={handleNext} variant="contained" sx={{ marginLeft: 'auto' }}>Next</Button>
                            ) : (
                                <Button type="submit" variant="contained" sx={{ marginLeft: 'auto' }}>Submit Recipe</Button>
                            )}
                        </Box>
                    </Box>
                </Paper>
            </Box>
        </FormProvider>      
        </Box>
    )
}