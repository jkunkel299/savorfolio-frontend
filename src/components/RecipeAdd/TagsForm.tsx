import TagSelector from "./TagSelector";
import { Grid, Typography } from "@mui/material";


export default function TagsForm() {    
    return (
        <>
        <Typography variant='h4' gutterBottom>Tags - Describe the Recipe</Typography>
        <Grid container spacing={10} width="75vw">
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            {/* Meal Type Tag */}
            <TagSelector type="Meal" label="Meal Type" multiple={false} />
            
            {/* Recipe Type Tag */}
            <TagSelector type="Recipe_type" label="Recipe Type" multiple={false} />
            </Grid>            

            {/* Cuisine Tag */}
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <TagSelector type="Cuisine" label="Cuisine Type" multiple={false} />
            </Grid>

            {/* Dietary Restrictions Tag */}
            <Grid size={{ xs: 12, sm: 6, md: 4}}>
                <TagSelector type="Dietary" label="Dietary Considerations" multiple={true} />
            </Grid>
        </Grid>
        </>
    )
}