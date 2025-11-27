import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useFormContext } from "react-hook-form";
import type { NewRecipeDTO } from "../../types";
import RecipeSummaryView from "../RecipeView/RecipeSummaryView";
import IngredientViewList from "../RecipeView/IngredientViewList";
import InstructionViewList from "../RecipeView/InstructionViewList";
import TagsView from "../RecipeView/TagsView";
import RecipeSectionView from "../RecipeView/RecipeSectionView";

export default function ReviewForm() {
  const { getValues } = useFormContext<NewRecipeDTO>();
  const values = getValues();

  if (!values) return <Typography>Loading review...</Typography>;

  return (
    <Stack spacing={2}>
      <Typography variant="h4" color="primary" gutterBottom>
        Review Your Recipe
      </Typography>
      <RecipeSummaryView recipeSummary={values.recipeSummary} />

      {values.recipeSections!.length > 0 ? (
        <RecipeSectionView
          recipeSections={values.recipeSections}
          ingredients={values.ingredients}
          instructions={values.instructions}
        />
      ) : (
        <>
          <Typography variant="h4">Ingredients</Typography>
          <IngredientViewList ingredients={values.ingredients} />

          <Typography variant="h4">Instructions</Typography>
          <InstructionViewList instructions={values.instructions} />
        </>
      )}

      <Divider />
      <Typography variant="h4">Recipe Tags</Typography>
      <TagsView recipeTags={values.recipeTags} />
    </Stack>
  );
}
