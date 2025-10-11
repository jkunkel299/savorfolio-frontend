import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import type { FullRecipeDTO } from "../../types";

export default function RecipeSummaryView ({
    recipeSummary
}: Partial<FullRecipeDTO>) {
    return (
        <Grid container spacing={2}>
            {/* recipe title */}
            <Grid size={12}>
                <Typography variant="h3" key={recipeSummary?.id}>{recipeSummary?.name}</Typography>
            </Grid>

            {/* servings */}
            <Grid size={3}>
                <Stack>
                    <Typography>Servings:</Typography>
                    <Typography>{recipeSummary?.servings}</Typography>
                </Stack>
            </Grid>

            {/* Prep time */}
            <Grid size={3}>
                <Stack>
                    <Typography>Prep Time:</Typography>
                    <Typography>{recipeSummary?.prepTime}</Typography>
                </Stack>
            </Grid>

            {/* Cook time */}                
            <Grid size={3}>
                <Stack>
                    <Typography>Cook Time:</Typography>
                    <Typography>{recipeSummary?.cookTime}</Typography>
                </Stack>
            </Grid>

            {/* Bake temp, displayed only if not null */}
            <Grid size={3}>
                {recipeSummary?.bakeTemp && (
                    <Stack>
                        <Typography>Bake Temperature:</Typography>
                        <Typography>{recipeSummary?.bakeTemp} °{recipeSummary?.temp_unit}</Typography>
                    </Stack>
                )}
            </Grid>
        </Grid>
    )
}