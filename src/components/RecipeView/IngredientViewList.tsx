import Stack from "@mui/material/Stack";
import type { FullRecipeDTO } from "../../types";
import IngredientViewRow from "./IngredientViewRow";

export default function IngredientViewList ({ ingredients }: Partial<FullRecipeDTO>) {
    return (
        <Stack>
            {ingredients!.map((ing) => (
                <IngredientViewRow 
                    ingredientName={ing.ingredientName}
                    quantity={ing.quantity}
                    unitName={ing.unitName}
                    qualifier={ing.qualifier}
                />
            ))}
        </Stack>
    )
}