import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

import { useFormContext, Controller, useWatch } from 'react-hook-form';
import type { NewRecipeDTO } from '../../types';
import { useEffect } from 'react';
// import { useEffect } from 'react';


const FormGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

export default function RecipeForm(/* { onValidityChange }: { onValidityChange: (valid: boolean) => void} */) {
    const { control } = useFormContext<NewRecipeDTO>();
    const { register } = useFormContext<NewRecipeDTO>();

    // watch Name
    // const recipeName = useWatch({
    //     control,
    //     name: "RecipeSummary.Name", 
    // })

    // watch BakeTemp
    const bakeTemp = useWatch({
        control,
        name: "RecipeSummary.BakeTemp",
    });

    // watch Temp_unit
    // let tempUnit = useWatch({
    //     control,
    //     name: "RecipeSummary.Temp_unit",
    // });

    // useEffect(() => {
    //     if (recipeName !== null){
    //         let valid = false;
    //         if (bakeTemp == null && tempUnit !== null){
    //             tempUnit = null;
    //         // } else if (bakeTemp !== null && tempUnit == null) {
    //         //     valid = false;
    //         } else {
    //             valid = true;
    //         }
    //         onValidityChange?.(valid);
    //     }
    // }, [recipeName, bakeTemp, tempUnit, onValidityChange]);

    useEffect(() => {
        register("RecipeSummary.Name",{
            validate: (value) => value !== null || "The recipe must have a title",
        });
    }, [register]);

    return (
        <>
        <Typography variant='h4' gutterBottom>The Basics</Typography>
        <Grid container spacing={3} width="100%">
            
            {/* Recipe Title */}
            <FormGrid size={{ xs: 12 }}>
                <FormLabel htmlFor="recipe-title" required>Recipe Title</FormLabel>
                <Controller 
                    {...register("RecipeSummary.Name", { required: "Recipe title is required" })}
                    // name="RecipeSummary.Name"
                    control={control}
                    // rules={{ required: "Recipe title is required" }}
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