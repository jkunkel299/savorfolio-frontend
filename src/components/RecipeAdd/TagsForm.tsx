import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TagSelector from "./TagSelector";

export default function TagsForm() {    
    return (
        <>
        <Typography variant='h4' gutterBottom>Tags - Describe the Recipe</Typography>
        <Grid container spacing={10} width="75vw">
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            {/* Meal Type Tag */}
            <TagSelector type="meal" label="Meal Type" multiple={false} />
            
            {/* Recipe Type Tag */}
            <TagSelector type="recipe_type" label="Recipe Type" multiple={false} />
            </Grid>            

            {/* Cuisine Tag */}
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <TagSelector type="cuisine" label="Cuisine Type" multiple={false} />
            </Grid>

            {/* Dietary Restrictions Tag */}
            <Grid size={{ xs: 12, sm: 6, md: 4}}>
                <TagSelector type="dietary" label="Dietary Considerations" multiple={true} />
            </Grid>
        </Grid>
        </>
    )
}