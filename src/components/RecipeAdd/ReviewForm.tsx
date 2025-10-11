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
            <Typography variant="h5">Title: {values.RecipeSummary.Name} </Typography>

            <Typography variant="h6">Servings: {values.RecipeSummary.Servings}</Typography>

            <Typography variant="h6">Prep Time: {values.RecipeSummary.PrepTime}</Typography>

            <Typography variant="h6">Cook Time: {values.RecipeSummary.CookTime}</Typography>

            {values.RecipeSummary.BakeTemp !== null && (
                <Typography variant="h6">
                    Bake Temperature: {values.RecipeSummary.BakeTemp} °{values.RecipeSummary.Temp_unit} 
                </Typography>
            )}

            {/* RecipeTags */}
            <Typography variant="h5">Tags</Typography>
            {values.RecipeTags.Meal == null && values.RecipeTags.Recipe_type == null
                && values.RecipeTags.Cuisine == null && values.RecipeTags.Dietary?.length == 0 && (
                    <Typography>No tags added</Typography>
                )}
            {values.RecipeTags.Meal !== null && (
                <Box>
                    <Typography variant="h6">Meal: </Typography>
                    <Typography>{values.RecipeTags.Meal} </Typography>
                </Box>
            )}
            {values.RecipeTags.Recipe_type !== null && (
                <Box>
                    <Typography variant="h6">Recipe Type: </Typography>
                    <Typography>{values.RecipeTags.Recipe_type} </Typography>
                </Box>
            )}
            {values.RecipeTags.Cuisine !== null && (
                <Box>
                    <Typography variant="h6">Cuisine: </Typography>
                    <Typography>{values.RecipeTags.Cuisine} </Typography>
                </Box>
            )}
            {values.RecipeTags.Dietary?.length !== 0 && (
                <Box>
                    <Typography variant="h6">Dietary Considerations: </Typography>
                    <List>
                        {values.RecipeTags.Dietary?.map((diet, d) => (
                            <ListItem key={d}><ListItemText>{diet}</ListItemText></ListItem>
                        ))} 
                    </List>
                </Box>
            )}

            {/* Ingredients */}
            <Typography variant="h5">Ingredients</Typography>
            <List>
                {Array.isArray(values.Ingredients) && values.Ingredients.length > 0 ? (
                    values.Ingredients.map((ing, i) => (
                    <ListItem key={i}>
                        <ListItemText>{ing.Quantity ?? ""} {ing.UnitName ?? ""} {ing.IngredientName ?? ""}
                        {ing.Qualifier ? ` (${ing.Qualifier})` : ""}</ListItemText>
                    </ListItem>
                    ))
                ) : (
                    <ListItem>No ingredients added.</ListItem>
                )}
            </List>

            {/* Instructions */}
            <Typography variant="h5">Instructions</Typography>
            <List>
                {values.Instructions?.map((ins, i) => (
                    <ListItem key={i}>
                        <Typography>{ins.StepNumber}. {ins.InstructionText}</Typography>
                    </ListItem>
                ))}
            </List>
            
        </Box>
    )
}