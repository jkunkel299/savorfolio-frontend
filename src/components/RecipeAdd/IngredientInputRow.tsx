// import ListItem from "@mui/material/ListItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import type { IngredientEntry, NewRecipeDTO } from "../../types";
// import Typography from "@mui/material/Typography";
import UnitSearch from "./UnitSearch";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { useFormContext/* , type FieldArrayWithId */ } from "react-hook-form";
import IngredientsInput from "./IngredientsInput";

interface IngredientRowProps {
    index: number;
    onChange: (index: number, updated: Partial<IngredientEntry>) => void;
    onDelete: () => void;
}

export default function IngredientInputRow ({ index, onDelete }: IngredientRowProps) {
    const { register, formState: { errors } } = useFormContext<NewRecipeDTO>();
    
    return (
        <Box 
            sx={{ display: "flex", 
                gap: 2, 
                alignItems: "center", 
                width: "100%",
                flexWrap: "nowrap", 
            }} 
        >             
            {/* Quantity */}
            <OutlinedInput 
                required
                type="text"
                placeholder="Quantity"
                {...register(`Ingredients.${index}.Quantity` as const, 
                    {maxLength: 10, required: true}
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
            <OutlinedInput 
                type="text"
                placeholder="Qualifier (e.g., chopped)"
                {...register(`Ingredients.${index}.Qualifier`, {
                    validate: (value) => {
                        // allow empty string or null
                        if (!value) return true; 
                        // validate if it's filled
                        return value.length <= 20 || "Qualifier must be under 20 chars";
                    },
                })}
                sx={{ width: "fit-content", flex: "0 0 auto" }}
            />
            
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

            {errors.Ingredients?.[index] && (
                <p>Fill out required fields. </p>
            )}
        </Box>
    )
}