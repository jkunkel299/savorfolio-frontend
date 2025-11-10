import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useFieldArray } from "react-hook-form";
import type { InstructionEntry } from "../../types";
import InstructionInputRow from "./InstructionInputRow";

export default function InstructionsInputList() {
  const { fields, append, remove, update } = useFieldArray({
    name: "instructions",
    rules: {
      validate: (value) =>
        value.length > 0 || "You must add at least one instruction",
    },
  });

  const handleRowChange = (
    index: number,
    updated: Partial<InstructionEntry>
  ) => {
    update(index, { ...fields[index], ...updated });
  };

  return (
    <Box>
      <Stack spacing={2}>
        <Typography variant="h4" gutterBottom>
          Instructions List
        </Typography>
        {fields.map((entry, idx) => (
          <InstructionInputRow
            key={entry.id}
            index={idx}
            onChange={handleRowChange}
            onDelete={() => remove(idx)}
          />
        ))}

        <Button
          variant="outlined"
          onClick={() =>
            append({
              stepNumber: fields.length + 1,
              instructionText: "",
              sectionName: "",
            })
          }
        >
          Add an Instruction
        </Button>
      </Stack>
    </Box>
  );
}
