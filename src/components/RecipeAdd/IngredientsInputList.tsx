import type { IngredientEntry, NewRecipeDTO } from "../../types";
import { Box, Button, Stack, Typography } from "@mui/material";
import IngredientInputRow from "./IngredientInputRow";
import { useFieldArray, useFormContext } from "react-hook-form";
import { useEffect } from "react";

export default function IngredientsInputList() {
    const { register, control } = useFormContext<NewRecipeDTO>();
    const { fields, append, remove, update } = useFieldArray({
        control,
        name: "Ingredients",
        rules: {
            validate: (value) => value.length > 0 || "You must add at least one ingredient",
        },
    });

    useEffect(() => {
        register("Ingredients", {
            validate: (value) =>
            value && value.length > 0 || "You must add at least one ingredient",
        });
    }, [register]);

    const handleRowChange = (index: number, updated: Partial<IngredientEntry>) => {
        update(index, {...fields[index], ...updated});
    }

    return (
        <Box width="100%">
            <Typography variant='h4' gutterBottom>Ingredients List</Typography>
            <Stack spacing={2}>
                {fields.map((entry, idx) => (
                    <IngredientInputRow
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