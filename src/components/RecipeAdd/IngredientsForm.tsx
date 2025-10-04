import { Controller, useFormContext } from "react-hook-form";
import type { NewRecipeDTO } from "../../types";
import IngredientsList from "./IngredientsList";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
// import Grid from "@mui/material/Grid";

export default function IngredientsForm() {
    const { control } = useFormContext<NewRecipeDTO>();

    return (
        <Box width="500">
            <Typography variant='h4' gutterBottom>Ingredients List</Typography>
            <Controller 
                name="Ingredients"
                control={control}
                render={({ field }) => (
                    <IngredientsList onIngredientsChange={field.onChange} />
                )}
            />
        </Box>
        
    )
}