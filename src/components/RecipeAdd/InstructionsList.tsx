import { Box, Stack, Button, Typography } from "@mui/material";
import { useEffect } from "react";
import type { InstructionEntry, NewRecipeDTO } from "../../types";
import InstructionRow from "./InstructionRow";
import { useFormContext, useFieldArray } from "react-hook-form";

export default function InstructionsList() {
    const { register, control } = useFormContext<NewRecipeDTO>();
    const { fields, append, remove, update } = useFieldArray({
        control,
        name: "Instructions",
        rules: {
            validate: (value) => value.length > 0 || "You must add at least one instruction",
        },
    });

    useEffect(() => {
        register("Instructions", {
            validate: (value) =>
            value && value.length > 0 || "You must add at least one instruction",
        });
    }, [register]);

    const handleRowChange = (index: number, updated: Partial<InstructionEntry>) => {
        update(index, {...fields[index], ...updated});
    }

    return (
        <Box >
            
            <Stack spacing={2}>
                <Typography variant='h4' gutterBottom>Instructions List</Typography>
                {fields.map((entry, idx) => (
                    <InstructionRow
                        key={entry.id}
                        // entry={entry}
                        index={idx}
                        onChange={handleRowChange}
                        onDelete={() => remove(idx)}
                    />
                ))}

                <Button variant="outlined" onClick={() =>
                        append({
                            StepNumber: fields.length + 1,
                            InstructionText: ""
                        })
                    }>
                    Add an Instruction
                </Button>
            </Stack>
        </Box>
    )
}