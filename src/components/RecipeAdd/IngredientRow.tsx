// import ListItem from "@mui/material/ListItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import type { IngredientEntry, NewRecipeDTO, UnitsDTO } from "../../types";
// import Typography from "@mui/material/Typography";
import UnitSearch from "./UnitSearch";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { useFormContext/* , type FieldArrayWithId */ } from "react-hook-form";
import IngredientsInput from "./IngredientsInput";

interface IngredientRowProps {
    // entry: IngredientEntry;
    // entry: FieldArrayWithId<NewRecipeDTO, "Ingredients", "id">;
    index: number;
    onChange: (index: number, updated: Partial<IngredientEntry>) => void;
    onDelete: (/* index: number */) => void;
}

export default function IngredientRow ({ /* entry, */ index, onChange, onDelete }: IngredientRowProps) {
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
                placeholder="Quantity (e.g., 1/3, 1/2)"
                {...register(`Ingredients.${index}.Quantity` as const, 
                    {maxLength: 10, required: true}
                )}
                sx={{ width: "fit-content", /* flex: "0 0 auto" */ }} 
            />

            {/* Unit */}
            <Box sx={{ width: "fit-content", flex: "0 0 180px", minWidth: 120 }}> 
            <UnitSearch 
                onUnitChange={(unit: UnitsDTO | null) => {
                    onChange(index, {
                        unitId: unit?.id ?? 0,
                        unitName: unit?.name ?? "",
                    })
                }} 
            />
            </Box>
            
            {/* Ingredient Search */}
            <IngredientsInput />

            {/* Qualifier */}
            <OutlinedInput 
                required
                type="text"
                placeholder="Qualifier (e.g., chopped)"
                {...register(`Ingredients.${index}.Qualifier`, {
                    validate: (value) => {
                    // allow empty string or null
                    if (!value) return true; 
                    // but validate if it's filled
                    return value.length <= 20 || "Qualifier must be under 20 chars";
                    },
                })}
                sx={{ width: "fit-content", flex: "0 0 auto" }}
                // inputProps={{
                //     maxLength: 20
                // }}
            />
            
            {/* Delete Button */}
            <IconButton
                aria-label="delete"
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