import { Controller, useFormContext } from "react-hook-form";
import TagSelector from "./TagSelector";
import type { NewRecipeDTO } from "../../types";
import { Grid, Typography } from "@mui/material";


export default function TagsForm() {
    const { control } = useFormContext<NewRecipeDTO>();
    
    return (
        <>
        <Typography variant='h4' gutterBottom>Tags - Describe the Recipe</Typography>
        <Grid container spacing={10} width="100%">
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            {/* Meal Type Tag */}
                <Controller 
                    name="RecipeTags.Meal"
                    control={control}
                    render={({ field }) => (
                        <TagSelector 
                            type="meal"
                            label="Meal Type"
                            multiple={false}
                            selectedValues={field.value ? [field.value] : []}
                            onChange={(val) => field.onChange(val[0])}
                        />
                    )}
                />
            
            {/* Recipe Type Tag */}
                <Controller 
                    name="RecipeTags.Recipe_type"
                    control={control}
                    render={({ field }) => (
                        <TagSelector 
                            type="recipeType"
                            label="Recipe Type"
                            multiple={false}
                            selectedValues={field.value ? [field.value] : []}
                            onChange={(val) => field.onChange(val[0])}
                        />
                    )}
                />
            </Grid>            

            {/* Cuisine Tag */}
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <Controller 
                    name="RecipeTags.Cuisine"
                    control={control}
                    render={({ field }) => (
                        <TagSelector 
                            type="cuisine"
                            label="Cuisine"
                            multiple={false}
                            selectedValues={field.value ? [field.value] : []}
                            onChange={(val) => field.onChange(val[0])}
                        />
                    )}
                />
            </Grid>

            {/* Dietary Restrictions Tag */}
            <Grid size={{ xs: 12, sm: 6, md: 4}}>
                <Controller 
                    name="RecipeTags.Dietary"
                    control={control}
                    render={({ field }) => (
                        <TagSelector 
                            type="dietary"
                            label="Dietary Restrictions"
                            multiple={true}
                            selectedValues={field.value ?? []}
                            onChange={field.onChange}
                        />
                    )}
                />
            </Grid>
        </Grid>
        </>
    )
}