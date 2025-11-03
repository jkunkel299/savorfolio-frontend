import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useFieldArray, useFormContext, type Control, /* type FieldPath */ } from "react-hook-form";
import { useEffect } from "react";
import type { IngredientEntry, NewRecipeDTO } from "../../types";
import IngredientInputRow from "./IngredientInputRow";

interface IngredientsInputListProps {
    control?: Control<NewRecipeDTO>;
}

export default function IngredientsInputList({ control }: IngredientsInputListProps) {
    const { register } = useFormContext<NewRecipeDTO>();
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
            <Typography gutterBottom>Enter the ingredients in the recipe. Start with the quantity, then search for the unit, then search for the ingredient name, then add any descriptors or qualifiers (e.g., chopped finely, shredded, diced, etc.)</Typography>
            <Stack spacing={2}>
                {fields.map((entry, idx) => (
                    <IngredientInputRow
                        key={entry.id}
                        index={idx}
                        control={control}
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
                            unitNamePlural: "",
                            qualifier: null,
                            sectionName: "",
                        })
                    }>
                    Add an Ingredient
                </Button>
            </Stack>
        </Box>
    )
}