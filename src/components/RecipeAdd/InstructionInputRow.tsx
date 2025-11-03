import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { useFormContext, useWatch, type Control } from "react-hook-form";
import type { InstructionEntry, NewRecipeDTO } from "../../types";
import { SectionSelect } from "./SectionSelect";

interface InstructionRowProps {
    index: number;
    control: Control<NewRecipeDTO>;
    onChange: (index: number, updated: Partial<InstructionEntry>) => void;
    onDelete: () => void;
}

export default function InstructionInputRow ({ index, control, onDelete }: InstructionRowProps) {
    const { register, formState: { errors } } = useFormContext<NewRecipeDTO>();
    const recipeSections = useWatch({
        control,
        name: "recipeSections",
    });
    
    return (
        <Box 
            sx={{ 
                display: "flex", 
                gap: 2, 
                alignItems: "flex-start", 
                width: "100%",
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
                    sx={{ minWidth: "50vw"}} 
                />

            {/* Sections (conditionally rendered) */}
            {recipeSections && recipeSections.length > 0 && (
                <SectionSelect
                    control={control}
                    name={`instructions.${index}.sectionName`}
                />
            )}

            {/* Delete Button */}
            <IconButton
                aria-label="delete"
                type="button"
                onClick={onDelete}
                color="primary"
                size="small"
                sx={{ flexShrink: 0 }}
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