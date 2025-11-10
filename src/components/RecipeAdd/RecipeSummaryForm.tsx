import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

import { useFormContext, Controller, useWatch } from 'react-hook-form';
import type { NewRecipeDTO } from '../../types';
// import { useEffect } from 'react';


const FormGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

interface RecipeSummaryFormProps {
  hasSections: boolean;
  setHasSections: (value: boolean) => void;
}

export default function RecipeForm({ hasSections, setHasSections } : RecipeSummaryFormProps) {
    const { control } = useFormContext<NewRecipeDTO>();
    const { register } = useFormContext<NewRecipeDTO>();

    // watch BakeTemp
    const bakeTemp = useWatch({
        control,
        name: "recipeSummary.bakeTemp",
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value === "True";
        setHasSections(value);
    };

    return (
        <>
        <Typography variant='h4' gutterBottom>The Basics</Typography>
        <Grid container spacing={3} width="100%">
            
            {/* Recipe Title */}
            <FormGrid size={{ xs: 12 }}>
                <FormLabel htmlFor="recipe-title" required>Recipe Title</FormLabel>
                <Controller 
                    {...register("recipeSummary.name", { required: "Recipe title is required" })}
                    control={control}
                    render={({ field, fieldState }) => <>
                        <OutlinedInput
                            id="recipe-title"
                            type="text"
                            placeholder="The recipe's title"
                            size="small"
                            {...field}
                        />
                        {fieldState.error && (
                            <Typography style={{ color: "red", fontSize: "0.8em" }}>
                                {fieldState.error.message}
                            </Typography>
                        )}
                    </>}
                />
            </FormGrid>

            {/* Recipe Description */}
            <FormGrid size={{ xs: 12 }}>
                <FormLabel htmlFor="recipe-description" required>Recipe Description</FormLabel>
                <Controller 
                    name="recipeSummary.description"
                    control={control}
                    render={({ field }) => <>
                        <TextField
                            id="recipe-title"
                            type="text"
                            multiline
                            placeholder="Add a description here"
                            size="small"
                            {...field}
                        />
                    </>}
                />
            </FormGrid>

            {/* Servings */}
            <FormGrid size={{ xs: 12 }}>
                <FormLabel htmlFor="servings" required>Servings</FormLabel>
                <Controller 
                    name="recipeSummary.servings"
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
                    name="recipeSummary.prepTime"
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
                    name="recipeSummary.cookTime"
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
                    name="recipeSummary.bakeTemp"
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
                            name="recipeSummary.temp_unit"
                            control={control}
                            render={({field}) => <RadioGroup row {...field}>
                                <FormControlLabel value="F" control={<Radio />} label="F" />
                                <FormControlLabel value="C" control={<Radio />} label="C" />
                            </RadioGroup>}
                        />
                    </FormControl>
                </FormGrid>
            )}

            <FormGrid size={{ xs: 12 }}>
                <FormControl>
                        <FormLabel id="hasSections">Does the recipe have sections?</FormLabel>
                        <RadioGroup
                            row
                            value={hasSections ? "True" : "False"}
                            onChange={handleChange}
                        >
                            <FormControlLabel value="True" control={<Radio />} label="Yes" />
                            <FormControlLabel value="False" control={<Radio />} label="No" />
                        </RadioGroup>
                    </FormControl>
            </FormGrid>
        </Grid>
        </>
    )
}