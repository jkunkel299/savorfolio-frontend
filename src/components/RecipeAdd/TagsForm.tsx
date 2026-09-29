import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TagSelector from "./TagSelector";
import Stack from "@mui/material/Stack";

export default function TagsForm() {
  return (
    <>
      <Typography variant="h4" gutterBottom>
        Tags - Describe the Recipe
      </Typography>
      <Typography gutterBottom>
        Choose the descriptors for your recipe, including its meal, recipe type,
        cuisine, and any dietary considerations it conforms to. These tags will
        be used to filter your recipe later!
      </Typography>
      <Grid container spacing={5} width="75vw" padding={2}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Stack spacing={5}>
            {/* Meal Type Tag */}
            <TagSelector type="meal" label="Meal Type" multiple={false} />

            {/* Recipe Type Tag */}
            <TagSelector
              type="recipe_type"
              label="Recipe Type"
              multiple={false}
            />
          </Stack>
        </Grid>

        {/* Cuisine Tag */}
        <Grid size={{ xs: 12, md: 4 }}>
          <TagSelector type="cuisine" label="Cuisine Type" multiple={false} />
        </Grid>

        {/* Dietary Restrictions Tag */}
        <Grid size={{ xs: 12, md: 4 }}>
          <TagSelector
            type="dietary"
            label="Dietary Considerations"
            multiple={true}
          />
        </Grid>
      </Grid>
    </>
  );
}
