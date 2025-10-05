import type { IngredientEntry, NewRecipeDTO } from "../../types";
import { Box, Button, Stack, Typography } from "@mui/material";
import IngredientRow from "./IngredientRow";
import { useFieldArray, useFormContext } from "react-hook-form";

export default function IngredientsList() {
    const { control } = useFormContext<NewRecipeDTO>();
    const { fields, append, remove, update } = useFieldArray({
        control,
        name: "Ingredients",
        rules: {
            validate: (value) => value.length > 0 || "You must add at least one ingredient",
        },
    });

    // const handleAddIngredients = () => {
    //     append({
    //         IngredientOrder: fields.length + 1,
    //         IngredientId: ingredient.id,
    //         IngredientName: ingredient.name,
    //         Quantity: "",
    //         UnitId: 0,
    //         UnitName: "",
    //         Qualifier: null,
    //     });
    // };

    const handleRowChange = (index: number, updated: Partial<IngredientEntry>) => {
        update(index, {...fields[index], ...updated});
    }

    return (
        <Box width="100%">
            <Typography variant='h4' gutterBottom>Ingredients List</Typography>
            <Stack spacing={2}>
                {fields.map((entry, idx) => (
                    <IngredientRow
                        key={entry.id}
                        index={idx}
                        onChange={handleRowChange}
                        onDelete={() => remove(idx)}
                    />
                ))}

                <Button variant="outlined" onClick={() =>
                        append({
                        IngredientOrder: fields.length + 1,
                        IngredientId: 0,
                        IngredientName: "",
                        Quantity: "",
                        UnitId: 0,
                        UnitName: "",
                        Qualifier: null,
                        })
                    }>
                    Add an Ingredient
                </Button>
            </Stack>
        </Box>
    )
}