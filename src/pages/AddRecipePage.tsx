import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useForm, FormProvider, type FieldPath } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { NewRecipeDTO } from "../types";
import RecipeSummaryForm from "../components/RecipeAdd/RecipeSummaryForm";
import TagsForm from "../components/RecipeAdd/TagsForm";
import recipeService from "../api/recipeApi";
import InstructionsList from "../components/RecipeAdd/InstructionsInputList";
import IngredientsList from "../components/RecipeAdd/IngredientsInputList";
import ReviewForm from "../components/RecipeAdd/ReviewForm";


export function AddRecipePage() {
    const [currentStep, setCurrentStep] = useState(0);
    const steps = ["RecipeSummary", "RecipeTags", "Ingredients", "Instructions", "Review"]; // add notes page
    const navigate = useNavigate();

    const methods = useForm<NewRecipeDTO>({
        mode: "all",
        shouldUnregister: false,
        defaultValues: {
            RecipeSummary: {
                Name: "",
                Servings: null,
                CookTime: null,
                PrepTime: null,
                BakeTemp: null,
                Temp_unit: null,
            },
            Ingredients: [],
            Instructions: [],
            RecipeTags: { 
                Meal: null,
                Recipe_type: "Main",
                Cuisine: null,
                Dietary: [] },
        }
    });

    const { formState } = methods;
    
    const handleNext = async () => {
        const isValid = await handlePageValid();
        if (isValid) {
            setCurrentStep((prev) => prev = prev + 1);       
        }
    };

    const handleBack = () => {
        setCurrentStep((prev) => prev = prev-1);
    };

    const handleSubmitForm = async (data: NewRecipeDTO) => {
        const isValid = await handlePageValid();
        if (isValid && currentStep == steps.length-1) {
            const sendData = JSON.stringify(data);
            try {
                const response = await recipeService.postRecipeManual(sendData);
                const savedRecipe = response.data;
                console.log("Recipe saved: ", savedRecipe)
            } catch (err) {
                console.error(err)
            }
            console.log("submit")
            navigate("/confirmed")
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
            default:
                return true;
        }

        const isValid = await methods.trigger(fieldsToValidate);
        return isValid;
    }

    // Lazy-load current page component
    const renderCurrentPage = () => {
        switch (currentStep) {
        case 0:
            return <RecipeSummaryForm />;
        case 1:
            return <TagsForm />;
        case 2:
            return <IngredientsList />;
        case 3:
            return <InstructionsList />;
        case 4:
            return <ReviewForm />;
        default:
            return <Typography>Unknown Step</Typography>
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
                <Paper elevation={3} sx={{ 
                    p: 3,
                    width: '80vw'
                }}>
                    <Box /* onSubmit={methods.handleSubmit(handleSubmit)} */>
                        {renderCurrentPage()}

                        <Box display="flex" justifyContent="flex-end" sx={{ width: '100%', paddingTop: 2 }}>
                            {currentStep > 0 && (                        
                                <Button id="back-button" type="button" onClick={handleBack} variant="outlined" >Back</Button>                        
                            )}
                            {currentStep < steps.length - 1 ? (
                                <Button id="next-button" type="button" disabled={!formState.isValid} onClick={handleNext} variant="contained" sx={{ marginLeft: 'auto' }}>Next</Button>
                            ) : (
                                <Button id="submit-button" type="submit" /* disabled={!formState.isValid} */ onClick={methods.handleSubmit(handleSubmitForm)} variant="contained" sx={{ marginLeft: 'auto' }}>Submit Recipe</Button>
                            )}
                        </Box>
                    </Box>
                </Paper>
            </Box>
        </FormProvider>      
        </Box>
    )
}