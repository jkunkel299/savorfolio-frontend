import { useForm, FormProvider, type FieldPath } from "react-hook-form";
import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import type { NewRecipeDTO } from "../types";
import RecipeSummaryForm from "../components/RecipeAdd/RecipeSummaryForm";
import TagsForm from "../components/RecipeAdd/TagsForm";
import IngredientsForm from "../components/RecipeAdd/IngredientsForm";
import recipeService from "../api/recipeApi";
import { Paper, Typography } from "@mui/material";
import InstructionsForm from "../components/RecipeAdd/InstructionsForm";


export function AddRecipePage() {
    const [currentStep, setCurrentStep] = useState(0);
    const [, setIsPageValid] = useState(false);
    const steps = ["RecipeSummary", "RecipeTags", "Ingredients", "Instructions"]; // add notes, review page
    
    const methods = useForm<NewRecipeDTO>({
        mode: "onChange",
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

    const { formState } = methods;
    
    const handleNext = async () => {
        const isValid = handlePageValid();
        // const isValid = await methods.trigger();
        if (await isValid) {
            setCurrentStep((prev) => prev = prev + 1);            
        }
    };

    const handleBack = () => {
        setCurrentStep((prev) => prev = prev-1);
    };

    const handleSubmit = async (data: NewRecipeDTO) => {
        const isValid = handlePageValid();
        if (await isValid) {
            const sendData = JSON.stringify(data);
            try {
                const response = await recipeService.postRecipeManual(sendData);
                const savedRecipe = response.data;
                console.log("Recipe saved: ", savedRecipe)
            } catch (err) {
                console.error(err)
            }
        }
        
    }

    const handlePageValid = async () => {
        let fieldsToValidate: FieldPath<NewRecipeDTO>[] = [];
        
        switch (currentStep) {
            case 0:
                fieldsToValidate = ["RecipeSummary.Name"];
                break;
            case 1:
                fieldsToValidate = ["RecipeTags.Meal", "RecipeTags.Recipe_type", "RecipeTags.Cuisine"];
                break;
            case 2:
                fieldsToValidate = ["Ingredients"];
                break;
            case 3:
                fieldsToValidate = ["Instructions"];
            break;
        }

        const isValid = methods.trigger(fieldsToValidate);
        if (await isValid) {
            setIsPageValid(true)
        }
        return isValid;
    }

    // Lazy-load current page component
    const renderCurrentPage = () => {
        switch (currentStep) {
        case 0:
            return <RecipeSummaryForm /* onValidityChange={(isValid) => handlePageValid(0, isValid)}  *//>;
        case 1:
            return <TagsForm />;
        case 2:
            return <IngredientsForm />;
        case 3:
            return <InstructionsForm />;
        default:
            return 0;
        }
    };

    
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
                        {renderCurrentPage()}

                        <Box display="flex" justifyContent="flex-end" sx={{ width: '100%', paddingTop: 2 }}>
                            {currentStep > 0 && (                        
                                <Button id="back-button" type="button" onClick={handleBack} variant="outlined" >Back</Button>                        
                            )}
                            {currentStep < steps.length - 1 ? (
                                <Button id="next-button" type="button" disabled={!formState.isValid} onClick={handleNext} variant="contained" sx={{ marginLeft: 'auto' }}>Next</Button>
                            ) : (
                                <Button id="submit-button" type="submit" disabled={!formState.isValid} variant="contained" sx={{ marginLeft: 'auto' }}>Submit Recipe</Button>
                            )}
                        </Box>
                    </Box>
                </Paper>
            </Box>
        </FormProvider>      
        </Box>
    )
}