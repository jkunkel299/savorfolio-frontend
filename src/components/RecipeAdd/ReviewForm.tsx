import Box from "@mui/material/Box";
// import List from "@mui/material/List";
// import ListItem from "@mui/material/ListItem";
// import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { useFormContext } from "react-hook-form";
import type { NewRecipeDTO } from "../../types";
import Stack from "@mui/material/Stack";
import RecipeSummaryView from "../RecipeView/RecipeSummaryView";
import IngredientViewList from "../RecipeView/IngredientViewList";
import InstructionViewList from "../RecipeView/InstructionViewList";
import Divider from "@mui/material/Divider";
import TagsView from "../RecipeView/TagsView";

export default function ReviewForm(){
    const { getValues } = useFormContext<NewRecipeDTO>();
    const values = getValues();

    if (!values) return <Typography>Loading review...</Typography>;

    return (
        <Box 
            sx={{
                display: 'flex',
                justifyContent: 'center', // Centers horizontally
                minHeight: '100vh',       // Ensures the container takes full viewport height
                width: '100%',            // Ensures the container takes full viewport width
            }}
        >
            <Stack spacing={2}>
                <Typography variant="h4" color="primary" gutterBottom>Review Your Recipe</Typography>
                <RecipeSummaryView recipeSummary={values.recipeSummary}/>

                <Typography variant="h4">Ingredients</Typography>
                <IngredientViewList ingredients={values.ingredients} />

                <Typography variant="h4">Instructions</Typography>
                <InstructionViewList instructions={values.instructions} />

                <Divider />
                <Typography variant="h4">Recipe Tags</Typography>
                <TagsView recipeTags={values.recipeTags} />
            </Stack>
        </Box>
    )
}