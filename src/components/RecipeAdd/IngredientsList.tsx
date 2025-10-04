import { useState } from "react";
import type { IngredientEntry, IngredientVariantDTO, NewRecipeDTO } from "../../types";
import { Box, Button, Stack } from "@mui/material";
import IngredientsInput from "./IngredientsInput";
import IngredientRow from "./IngredientRow";

export default function IngredientsList({
    onIngredientsChange,
}: {
    onIngredientsChange: (ingredients: NewRecipeDTO["Ingredients"]) => void;
}) {
    const [ingredients, setIngredients] = useState<IngredientEntry[]>([]);
    const [showSearch, setShowSearch] = useState(true);

    const handleAddIngredients = (ingredient: IngredientVariantDTO) => {
        const newList = [
            ...ingredients, 
            {
                variant: ingredient,
                quantity: "",
                unitId: 0,
                unitName: "",
                qualifier: null,
            },
        ];
        setIngredients(newList);
        setShowSearch(false);

        propagateToParent(newList);
    };

    const handleDeleteIngredient = (index: number) => {
        const updated = ingredients.filter((_, i) => i !== index);
        setIngredients(updated);
        propagateToParent(updated); 
    };

    const propagateToParent = (list: IngredientEntry[]) => {
        onIngredientsChange(
            list.map((entry, idx) =>({
                IngredientOrder: idx + 1,
                IngredientId: entry.variant.id,
                IngredientName: entry.variant.name,
                Quantity: entry.quantity,
                UnitId: entry.unitId,
                UnitName: entry.unitName,
                Qualifier: entry.qualifier,
            }))
        );
    }

    const handleRowChange = (index: number, updated: IngredientEntry) => {
        const newList = [...ingredients];
        newList[index] = updated;
        setIngredients(newList);
        propagateToParent(newList);
    }

    return (
        <Box>
            <Stack spacing={2}>
                {ingredients.map((entry, idx) => (
                    <IngredientRow
                        key={idx}
                        entry={entry}
                        index={idx}
                        onChange={handleRowChange}
                        onDelete={handleDeleteIngredient}
                    />
                ))}

                {showSearch ? (
                    <IngredientsInput onSelect={handleAddIngredients} />
                ) : (
                    <Button variant="outlined" onClick={() => setShowSearch(true)}>
                        Add Another Ingredient
                    </Button>
                )}
            </Stack>
        </Box>
    )
}