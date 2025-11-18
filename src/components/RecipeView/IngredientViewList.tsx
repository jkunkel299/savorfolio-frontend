import Stack from "@mui/material/Stack";
import type { FullRecipeDTO } from "../../types";
import IngredientViewRow from "./IngredientViewRow";

export default function IngredientViewList({
  ingredients,
}: Partial<FullRecipeDTO>) {
  return (
    <Stack>
      {ingredients!.map((ing) => (
        <IngredientViewRow
          key={ing.ingredientOrder}
          ingredientName={ing.ingredientName}
          ingPluralName={ing.ingNamePlural}
          quantity={ing.quantity}
          unitName={ing.unitName}
          unitPluralName={ing.unitNamePlural}
          qualifier={ing.qualifier}
        />
      ))}
    </Stack>
  );
}
