import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
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
                {...register(`instructions.${index}.stepNumber`)}
            >{index + 1}.</Typography>

            {/* Instruction Text */}
            <TextField 
                type="text"
                multiline
                placeholder="Instruction text"
                {...register(`instructions.${index}.instructionText` as const, 
                    {required: "Instruction text is required"})}
                sx={{ width:"90%", maxWidth: 1000}} 
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
            
            {/* Error message */}
            {errors.instructions?.[index] && (
                <Typography color="error">Fill out required fields. </Typography>
            )}
        </Box>
    )
}