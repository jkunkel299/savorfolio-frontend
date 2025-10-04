import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';
import RadioGroup from '@mui/material/RadioGroup';
import { Radio, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import { useFormContext, Controller, useWatch } from 'react-hook-form';
import type { NewRecipeDTO } from '../../types';


const FormGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

export default function RecipeForm() {
    const { control } = useFormContext<NewRecipeDTO>();

    // watch BakeTemp
    const bakeTemp = useWatch({
        control,
        name: "RecipeSummary.BakeTemp",
    });

    return (
        <>
        <Typography variant='h4' gutterBottom>The Basics</Typography>
        <Grid container spacing={3} width="100%">
            
            {/* Recipe Title */}
            <FormGrid size={{ xs: 12 }}>
                <FormLabel htmlFor="recipe-title" required>Recipe Title</FormLabel>
                <Controller 
                    name="RecipeSummary.Name"
                    control={control}
                    rules={{ required: "Recipe title is required"}}
                    render={({ field, fieldState }) => <>
                        <OutlinedInput
                            id="recipe-title"
                            type="text"
                            placeholder="Grandma's Chocolate Chip Cookies"
                            size="small"
                            {...field}
                        />
                        {fieldState.error && (
                            <span style={{ color: "red", fontSize: "0.8em" }}>
                                {fieldState.error.message}
                            </span>
                        )}
                    </>}
                />
            </FormGrid>

            {/* Servings */}
            <FormGrid size={{ xs: 12 }}>
                <FormLabel htmlFor="servings" required>Servings</FormLabel>
                <Controller 
                    name="RecipeSummary.Servings"
                    control={control}
                    render={({ field }) => <>
                        <OutlinedInput
                            id="servings"
                            type="text"
                            placeholder="24"
                            size="small"
                            {...field}
                        />
                    </>}
                />
            </FormGrid>

            {/* Prep Time */}
            <FormGrid size={{ xs: 6 }}>
                <FormLabel htmlFor="prep-time">Prep Time</FormLabel>
                <Controller 
                    name="RecipeSummary.PrepTime"
                    control={control}
                    render={({ field }) => <>
                        <OutlinedInput
                            id="prep-time"
                            type="text"
                            placeholder="20 minutes"
                            size="small"
                            inputProps={{
                                maxLength: 20
                            }}
                            {...field}
                        />
                    </>}
                />
            </FormGrid>
            
            {/* Cook Time */}
            <FormGrid size={{ xs: 6 }}>
                <FormLabel htmlFor="cook-time">Cook Time</FormLabel>
                <Controller 
                    name="RecipeSummary.CookTime"
                    control={control}
                    render={({ field }) => <>
                        <OutlinedInput
                            id="cook-time"
                            type="text"
                            placeholder="8 minutes"
                            size="small"
                            inputProps={{
                                maxLength: 20
                            }}
                            {...field}
                        />
                    </>}
                />
            </FormGrid>

            {/* Bake Temperature */}
            <FormGrid size={{ xs: 6 }}>
                <FormLabel htmlFor="bakeTemp">Bake Temperature</FormLabel>
                <Controller
                    name="RecipeSummary.BakeTemp"
                    control={control}
                    render={({ field }) => 
                        <OutlinedInput
                            id="bake-temp"
                            type="number"
                            {...field}
                            value={field.value ?? null}
                            onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value, 10) : "")}
                            size="small" 
                            inputProps={{ min: 175, max: 500 }}
                        />}
                />
            </FormGrid>

            {/* Temperature Unit -- should only be visible if BakeTemp is populated */}
            {bakeTemp !== null && (
                <FormGrid size={{ xs: 6 }}>
                    <FormControl>
                        <FormLabel id="temp-unit">Unit</FormLabel>
                        <Controller 
                            name="RecipeSummary.Temp_unit"
                            control={control}
                            render={({field}) => <RadioGroup row {...field}>
                                <FormControlLabel value="F" control={<Radio />} label="F" />
                                <FormControlLabel value="C" control={<Radio />} label="C" />
                            </RadioGroup>}
                        />
                    </FormControl>
                </FormGrid>
            )}
        </Grid>
        </>
    )
}