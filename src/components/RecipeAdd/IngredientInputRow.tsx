import Box from "@mui/material/Box";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useFormContext, useWatch, type Control, /* type FieldPath */ } from "react-hook-form";
import type { IngredientEntry, NewRecipeDTO } from "../../types";
import UnitSearch from "./UnitSearch";
import IngredientsInput from "./IngredientsInput";
import { SectionSelect } from "./SectionSelect";

interface IngredientRowProps {
    index: number;
    control: Control<NewRecipeDTO>;
    onChange: (index: number, updated: Partial<IngredientEntry>) => void;
    onDelete: () => void;
}

export default function IngredientInputRow ({ index, control, onDelete }: IngredientRowProps) {
    const { register, formState: { errors } } = useFormContext<NewRecipeDTO>();
    const recipeSections = useWatch({
        control,
        name: "recipeSections",
    });

    return (
        <Box 
            sx={{ display: "flex", 
                gap: 2, 
                alignItems: "center", 
                width: "100%",
                flexWrap: "wrap", 
            }} 
        >             
            {/* Quantity */}
            <OutlinedInput 
                type="text"
                placeholder="Quantity"
                {...register(`ingredients.${index}.quantity` as const, 
                    {maxLength: 10}
                )}
                sx={{ width: "fit-content", flex: "0 0 auto", maxWidth: 120}} 
            />

            {/* Unit */}
            <Box sx={{ width: "fit-content", flex: "0 0 180px"}}> 
                <UnitSearch index={index} />
            
            </Box>
            
            {/* Ingredient Search */}
            <IngredientsInput index={index}/>


            {/* Qualifier */}
            <TextField 
                type="text"
                multiline
                placeholder="Qualifier (e.g., chopped)"
                {...register(`ingredients.${index}.qualifier`, {
                    validate: (value) => {
                        // allow empty string or null
                        if (!value) return true; 
                    },
                })}
                sx={{ width: "fit-content", flex: "0 0 auto" }}
            />

            {/* Sections (conditionally rendered) */}
            {recipeSections && recipeSections.length > 0 && (
                <SectionSelect
                    control={control}
                    {...register(`ingredients.${index}.sectionName` as const, 
                    {required: "Section name is required"})}
                />
            )}
            
            {/* Delete Button */}
            <IconButton
                aria-label="delete"
                type="button"
                onClick={onDelete}
                color="error"
                size="small"
            >
                <DeleteIcon fontSize="small" />
            </IconButton>

            {errors.ingredients?.[index] && (
                <Typography>Fill out required fields. </Typography>
            )}
        </Box>
    )
}