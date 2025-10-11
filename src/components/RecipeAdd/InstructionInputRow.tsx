import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { useFormContext } from "react-hook-form";
import type { InstructionEntry, NewRecipeDTO } from "../../types";

interface InstructionRowProps {
    index: number;
    onChange: (index: number, updated: Partial<InstructionEntry>) => void;
    onDelete: () => void;
}

export default function InstructionInputRow ({ index, onDelete }: InstructionRowProps) {
    const { register, formState: { errors } } = useFormContext<NewRecipeDTO>();
    
    return (
        <Box 
            sx={{ display: "flex", 
                gap: 2, 
                alignItems: "center", 
                width: "100%",
                flexWrap: "wrap", 
            }} 
        >  
            {/* Show Step Number */}
            <Typography
                {...register(`Instructions.${index}.StepNumber`)}
            >{index + 1}.</Typography>

            {/* Instruction Text */}
            <OutlinedInput 
                required
                type="text"
                placeholder="Instruction text"
                {...register(`Instructions.${index}.InstructionText`)}
                sx={{ width: 1000}} 
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
            
            {errors.Instructions?.[index] && (
                <p>Fill out required fields. </p>
            )}
        </Box>
    )
}