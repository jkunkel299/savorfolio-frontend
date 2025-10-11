import Stack from "@mui/material/Stack";
import type { FullRecipeDTO } from "../../types";
import InstructionViewRow from "./InstructionViewRow";

export default function InstructionViewList ({ instructions }: Partial<FullRecipeDTO>) {
    return (
        <Stack spacing={0.5}>
            {instructions!.map((ins) => (
                <InstructionViewRow 
                    stepNumber={ins.stepNumber}
                    instructionText={ins.instructionText}
                />
            ))}
        </Stack>
    )
}