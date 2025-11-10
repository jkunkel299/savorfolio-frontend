import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useFormContext, useFieldArray } from "react-hook-form";
import type { NewRecipeDTO } from "../../types";
import RecipeSectionsRow from "./RecipeSectionsRow";

export default function RecipeSectionsForm() {
    const { control } = useFormContext<NewRecipeDTO>();
    const { fields, append, remove, update } = useFieldArray({
        control,
        name: "recipeSections",
        rules: {
            validate: (value) => value.length > 0 || "You must add at least one section",
        },
    });

    const handleRowChange = (index: number, updated: Partial<NewRecipeDTO>) => {
        update(index, {...fields[index], ...updated});
    }

    return (
        <Box >
            
            <Stack spacing={2}>
                <Typography variant='h4' gutterBottom>Recipe Sections</Typography>
                {fields.map((entry, idx) => (
                    <RecipeSectionsRow
                        key={entry.id}
                        // entry={entry}
                        index={idx}
                        onChange={handleRowChange}
                        onDelete={() => remove(idx)}
                    />
                ))}

                <Button variant="outlined" onClick={() =>
                        append({
                            sortOrder: fields.length + 1,
                            sectionName: "",
                        })
                    }>
                    Add a Section
                </Button>
            </Stack>
        </Box>
    )
}