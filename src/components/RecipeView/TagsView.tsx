import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { FullRecipeDTO } from "../../types";

export default function TagsView({ recipeTags }: Partial<FullRecipeDTO>) {
  return (
    <Stack spacing={1}>
      <Typography variant="h5">Recipe Type: </Typography>
      <Typography>{recipeTags!.recipe_type}</Typography>

      {recipeTags!.meal && (
        <>
          <Typography variant="h5">Meal Type: </Typography>
          <Typography>{recipeTags!.meal}</Typography>
        </>
      )}

      {recipeTags!.cuisine && (
        <>
          <Typography variant="h5">Cuisine: </Typography>
          <Typography>{recipeTags!.cuisine}</Typography>
        </>
      )}

      {recipeTags!.dietary.length > 0 && (
        <>
          <Typography variant="h5">Dietary Considerations: </Typography>
          {recipeTags!.dietary.map((item) => (
            <Typography>{item}</Typography>
          ))}
        </>
      )}
    </Stack>
  );
}
