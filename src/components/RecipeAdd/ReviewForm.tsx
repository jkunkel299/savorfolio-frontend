import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { useFormContext } from "react-hook-form";
import type { NewRecipeDTO } from "../../types";

export default function ReviewForm(){
    const { getValues } = useFormContext<NewRecipeDTO>();
    const values = getValues();

    if (!values) return <Typography>Loading review...</Typography>;

    return (
        <Box width={1000}>
            <Typography variant="h4" color="primary" gutterBottom>Review Your Recipe</Typography>
            {/* RecipeSummary */}
            <Typography variant="h5">Title: {values.recipeSummary.name} </Typography>

            <Typography variant="h6">Description: {values.recipeSummary.description}</Typography>

            <Typography variant="h6">Servings: {values.recipeSummary.servings}</Typography>

            <Typography variant="h6">Prep Time: {values.recipeSummary.prepTime}</Typography>

            <Typography variant="h6">Cook Time: {values.recipeSummary.cookTime}</Typography>

            {values.recipeSummary.bakeTemp !== null && (
                <Typography variant="h6">
                    Bake Temperature: {values.recipeSummary.bakeTemp} °{values.recipeSummary.temp_unit} 
                </Typography>
            )}

            {/* RecipeTags */}
            <Typography variant="h5">Tags</Typography>
            {values.recipeTags.meal == null && values.recipeTags.recipe_type == null
                && values.recipeTags.cuisine == null && values.recipeTags.dietary?.length == 0 && (
                    <Typography>No tags added</Typography>
                )}
            {values.recipeTags.meal !== null && (
                <Box>
                    <Typography variant="h6">Meal: </Typography>
                    <Typography>{values.recipeTags.meal} </Typography>
                </Box>
            )}
            {values.recipeTags.recipe_type !== null && (
                <Box>
                    <Typography variant="h6">Recipe Type: </Typography>
                    <Typography>{values.recipeTags.recipe_type} </Typography>
                </Box>
            )}
            {values.recipeTags.cuisine !== null && (
                <Box>
                    <Typography variant="h6">Cuisine: </Typography>
                    <Typography>{values.recipeTags.cuisine} </Typography>
                </Box>
            )}
            {values.recipeTags.dietary?.length !== 0 && (
                <Box>
                    <Typography variant="h6">Dietary Considerations: </Typography>
                    <List>
                        {values.recipeTags.dietary?.map((diet, d) => (
                            <ListItem key={d}><ListItemText>{diet}</ListItemText></ListItem>
                        ))} 
                    </List>
                </Box>
            )}

            {/* Ingredients */}
            <Typography variant="h5">Ingredients</Typography>
            <List>
                {Array.isArray(values.ingredients) && values.ingredients.length > 0 ? (
                    values.ingredients.map((ing, i) => (
                    <ListItem key={i}>
                        <ListItemText>{ing.quantity ?? ""} {ing.unitName ?? ""} {ing.ingredientName ?? ""}
                        {ing.qualifier ? ` (${ing.qualifier})` : ""}</ListItemText>
                    </ListItem>
                    ))
                ) : (
                    <ListItem>No ingredients added.</ListItem>
                )}
            </List>

            {/* Instructions */}
            <Typography variant="h5">Instructions</Typography>
            <List>
                {values.instructions?.map((ins, i) => (
                    <ListItem key={i}>
                        <Typography>{ins.stepNumber}. {ins.instructionText}</Typography>
                    </ListItem>
                ))}
            </List>
            
        </Box>
    )
}