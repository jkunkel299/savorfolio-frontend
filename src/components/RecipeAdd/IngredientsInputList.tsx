import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useFieldArray } from "react-hook-form";
import type { IngredientEntry } from "../../types";
import IngredientInputRow from "./IngredientInputRow";

export default function IngredientsInputList() {
    const { fields, append, remove, update } = useFieldArray({
        name: "ingredients",
        rules: {
            validate: (value) => value.length > 0 || "You must add at least one ingredient",
        },
    });

    const handleRowChange = (index: number, updated: Partial<IngredientEntry>) => {
        update(index, {...fields[index], ...updated});
    }

    return (
        <Box >
            <Typography variant='h4' gutterBottom>Ingredients List</Typography>
            <Typography gutterBottom>
                Enter the ingredients in the recipe. Start with the quantity, then search for the unit, 
                then search for the ingredient name, then add any descriptors or qualifiers 
                (e.g., chopped finely, shredded, diced, etc.)
                </Typography>
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