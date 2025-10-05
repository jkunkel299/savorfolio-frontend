import Box from "@mui/material/Box";
import type { InstructionEntry } from "../../types";
import OutlinedInput from "@mui/material/OutlinedInput";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

interface InstructionRowProps {
    entry: InstructionEntry;
    index: number;
    onChange: (index: number, updated: InstructionEntry) => void;
    onDelete: (index: number) => void;
}

export default function InstructionRow ({ entry, index, onChange, onDelete }: InstructionRowProps) {
    entry.stepNumber = index + 1;
    
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
            <Typography>{index + 1}.</Typography>

            {/* Instruction Text */}
            <OutlinedInput 
                type="text"
                placeholder="Instruction text"
                value={entry.instructionText}
                onChange={(e) => {
                    onChange(index, {...entry, instructionText: e.target.value})
                }}
                sx={{ width: "300"}} 
            />

            {/* Delete Button */}
            <IconButton
                aria-label="delete"
                onClick={() => onDelete(index)}
                color="error"
                size="small"
            >
                <DeleteIcon fontSize="small" />
            </IconButton>
            
        </Box>
    )
}