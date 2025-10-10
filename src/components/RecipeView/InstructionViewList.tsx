import Box from "@mui/material/Box";
import type { FullRecipeDTO } from "../../types";
import InstructionViewRow from "./InstructionViewRow";

export default function InstructionViewList ({ instructions }: Partial<FullRecipeDTO>) {
    return (
        <Box>
            {instructions!.map((ins) => (
                <InstructionViewRow 
                    stepNumber={ins.stepNumber}
                    instructionText={ins.instructionText}
                />
            ))}
        </Box>
    )
}