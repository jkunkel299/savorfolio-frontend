import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useFieldArray, useFormContext } from "react-hook-form";
import { useEffect } from "react";
import type { IngredientEntry, NewRecipeDTO } from "../../types";
import IngredientInputRow from "./IngredientInputRow";

export default function IngredientsInputList() {
    const { register, control } = useFormContext<NewRecipeDTO>();
    const { fields, append, remove, update } = useFieldArray({
        control,
        name: "ingredients",
        rules: {
            validate: (value) => value.length > 0 || "You must add at least one ingredient",
        },
    });

    useEffect(() => {
        register("ingredients", {
            validate: (value) =>
            value && value.length > 0 || "You must add at least one ingredient",
        });
    }, [register]);

    const handleRowChange = (index: number, updated: Partial<IngredientEntry>) => {
        update(index, {...fields[index], ...updated});
    }

    return (
        <Box >
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
                            ingredientOrder: fields.length + 1,
                            ingredientId: 0,
                            ingredientName: "",
                            ingNamePlural: "",
                            quantity: "",
                            unitId: 0,
                            unitName: "",
                            unitPlural: "",
                            qualifier: null,
                        })
                    }>
                    Add an Ingredient
                </Button>
            </Stack>
        </Box>
    )
}