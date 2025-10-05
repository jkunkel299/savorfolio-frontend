import { Box, Stack, Button } from "@mui/material";
import { useState } from "react";
import type { InstructionEntry, NewRecipeDTO } from "../../types";
import InstructionRow from "./InstructionRow";

export default function InstructionsList({
    onInstructionsChange,
}: {
    onInstructionsChange: (instructions: NewRecipeDTO["Instructions"]) => void;
}) {
    const [instructions, setInstructions] = useState<InstructionEntry[]>([]);
    const [showNewLine, setShowNewLine] = useState(true);

    const handleAddInstructions = () => {
        const newList = [
            ...instructions, 
            {
                stepNumber: 0,
                instructionText: ""
            },
        ];
        setInstructions(newList);
        setShowNewLine(false);

        propagateToParent(newList);
    };

    const handleDeleteInstruction = (index: number) => {
        const updated = instructions.filter((_, i) => i !== index);
        setInstructions(updated);
        propagateToParent(updated); 
    };

    const propagateToParent = (list: InstructionEntry[]) => {
        onInstructionsChange(
            list.map((entry, idx) =>({
                StepNumber: idx + 1,
                InstructionText: entry.instructionText,
            }))
        );
    }

    const handleRowChange = (index: number, updated: InstructionEntry) => {
        const newList = [...instructions];
        newList[index] = updated;
        setInstructions(newList);
        propagateToParent(newList);
    }

    return (
        <Box>
            <Stack spacing={2}>
                {instructions.map((entry, idx) => (
                    <InstructionRow
                        key={idx}
                        entry={entry}
                        index={idx}
                        onChange={handleRowChange}
                        onDelete={handleDeleteInstruction}
                    />
                ))}

                {showNewLine ? (
                    // fix this
                    <Button variant="outlined" onClick={handleAddInstructions}>Add an Instruction</Button>
                ) : (
                    <Button variant="outlined" onClick={() => setShowNewLine(true)}>
                        Add Another Instruction
                    </Button>
                )}
            </Stack>
        </Box>
    )
}