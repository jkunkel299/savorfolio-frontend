import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { useForm, FormProvider, type FieldPath } from "react-hook-form";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../react-redux/store";

import type { NewRecipeDTO } from "../types";
import recipeService from "../api/recipeApi";
import { clearDraftRecipe } from "../react-redux/slices/draftRecipeSlice";
import RecipeSummaryForm from "../components/RecipeAdd/RecipeSummaryForm";
import TagsForm from "../components/RecipeAdd/TagsForm";
import RecipeSectionsForm from "../components/RecipeAdd/RecipeSectionsForm";
import InstructionsList from "../components/RecipeAdd/InstructionsInputList";
import IngredientsList from "../components/RecipeAdd/IngredientsInputList";
import ReviewForm from "../components/RecipeAdd/ReviewForm";
import IngredientsWPanel from "../components/RecipeAdd/IngredientsWPanel";
import Loading from "../components/Loading";

interface Step {
  component: React.ReactNode;
  fields: FieldPath<NewRecipeDTO>[];
}

export function AddRecipePage() {
    const [currentStep, setCurrentStep] = useState(0);
    const [showSectionsPage, setShowSectionsPage] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const draftRecipe = useSelector((state: RootState) => state.draftRecipe.data);
    const [ingredientPrefill, setIngredientPrefill] = useState<string[] | null>(null);

    const methods = useForm<NewRecipeDTO>({
        mode: "all",
        shouldUnregister: false,
        defaultValues: {
            recipeSummary: {
                name: draftRecipe?.recipeSummary.name || "",
                servings: draftRecipe?.recipeSummary.servings || null,
                description: draftRecipe?.recipeSummary.description || null,
                cookTime: draftRecipe?.recipeSummary.cookTime || null,
                prepTime: draftRecipe?.recipeSummary.prepTime || null,
                bakeTemp: draftRecipe?.recipeSummary.bakeTemp || null,
                temp_unit: draftRecipe?.recipeSummary.temp_unit || null,
            },
            recipeSections: [],
            ingredients: [],
            instructions: draftRecipe?.instructions || [],
            recipeTags: { 
                meal: draftRecipe?.recipeTags.meal || null,
                recipe_type: draftRecipe?.recipeTags.recipe_type || "Main",
                cuisine: draftRecipe?.recipeTags.cuisine || null,
                dietary: draftRecipe?.recipeTags.dietary || [] },
        }
    });

    const steps: Step[] = [
        {
            component: (
                <RecipeSummaryForm 
                    hasSections={showSectionsPage}
                    setHasSections={setShowSectionsPage}
                />
            ),
            fields: ["recipeSummary.name"] satisfies FieldPath<NewRecipeDTO>[],
        },
        {
            component: <TagsForm />,
            fields: ["recipeTags.recipe_type"] satisfies FieldPath<NewRecipeDTO>[],
        },
        ...(showSectionsPage 
            ? [
                {
                    component: <RecipeSectionsForm />,
                    fields: ["recipeSections"] satisfies FieldPath<NewRecipeDTO>[],
                },
            ] : []),
        {
            component: ingredientPrefill ? (
                <IngredientsWPanel rawIngredients={ingredientPrefill} />
            ) : (
                <IngredientsList />
            ),
            fields: ["ingredients"] satisfies FieldPath<NewRecipeDTO>[],
        },
        {
            component: <InstructionsList />,
            fields: ["instructions"] satisfies FieldPath<NewRecipeDTO>[],
        },
        {
            component: loading ? (<Loading />):(<ReviewForm />),
            fields: [] satisfies FieldPath<NewRecipeDTO>[],
        },
    ]; // add notes page   

    useEffect(() => {
        if (draftRecipe) {
            const ingredientPrefillList: string[] = [];
            draftRecipe?.ingredientsString.forEach(element => {
                if (element.includes("\n")){
                    const elements = element.split("\n")
                    elements.forEach(element => {
                        ingredientPrefillList.push(element);
                    });
                } else {
                    ingredientPrefillList?.push(element)
                }
            });
            setIngredientPrefill(ingredientPrefillList);
        }
    }, [draftRecipe]);
    
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
                // set page to loading
                setLoading(true);
                const response = await recipeService.postRecipeManual(sendData);
                const savedRecipe = response.data;
                console.log("Recipe saved: ", savedRecipe)
            } catch (err) {
                console.error(err)
            }
            console.log("submit")
            if (draftRecipe) dispatch(clearDraftRecipe());
            navigate("/confirmed")
        } 

        setTimeout(() => { setLoading(false); }, 2000);
    }

    const handleCancelForm = () => {
        if (draftRecipe) dispatch(clearDraftRecipe());
        navigate("/add-input");
    }

    const handlePageValid = async () => {
        let fieldsToValidate: FieldPath<NewRecipeDTO>[] = [];
        fieldsToValidate = steps[currentStep]?.fields;
        if (!fieldsToValidate?.length) return true;

        const isValid = await methods.trigger(fieldsToValidate);
        return isValid;
    }

    // Lazy-load current page component
    const renderCurrentPage = () => steps[currentStep].component ?? <Typography>Unknown Step</Typography>;

    const { formState } = methods;
    
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
                    <Box>
                        {renderCurrentPage()}                       
                        <Stack spacing={4} direction="row" sx={{ paddingTop: 2 }}>
                            <Button id="cancel-button" type="button" onClick={handleCancelForm} variant="outlined" color="error">Cancel</Button>

                            <Box display="flex" justifyContent="flex-end" sx={{ width: '100%' }}>
                                {currentStep > 0 && (                        
                                <Button id="back-button" type="button" onClick={handleBack} variant="outlined" >Back</Button>                        
                            )}
                            {currentStep < steps.length - 1 ? (
                                <Button id="next-button" type="button" disabled={!formState.isValid} onClick={handleNext} variant="contained" sx={{ marginLeft: 'auto' }}>Next</Button>
                            ) : (
                                <Button id="submit-button" type="submit" onClick={methods.handleSubmit(handleSubmitForm)} variant="contained" sx={{ marginLeft: 'auto' }}>Submit Recipe</Button>
                            )}
                            </Box>
                        </Stack>
                    </Box>
                </Paper>
            </Box>
        </FormProvider>      
        </Box>
    )
}