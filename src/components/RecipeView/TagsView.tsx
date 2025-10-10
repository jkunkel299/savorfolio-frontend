import Box from "@mui/material/Box";
import type { FullRecipeDTO } from "../../types";
import Typography from "@mui/material/Typography";

export default function TagsView ({ recipeTags }: Partial<FullRecipeDTO>) {
    return (
        <Box>
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
        </Box>
    )
}