import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';

interface RecipeCardProps {
    recipeTitle: string;
    servings: number | null;
    cookTime: string | null;
    prepTime: string | null; 
}

export default function RecipeCard(
    {recipeTitle,
    servings,
    cookTime,
    prepTime,
} : RecipeCardProps) {
    return (
    <Card sx={{ 
        width: {
            xs: 100, // width 100px for extra small screens and up
            sm: 200, // width 200px for small screens and up
            md: 300, // width 300px for medium screens and up
        }, 
        padding: "5px" 
    }}>
        <CardActionArea>
            {/* <CardMedia
            component="img"
            height="140"
            image="/static/images/cards/contemplative-reptile.jpg"
            alt="green iguana"
            /> */}
            <CardContent>
            <Typography gutterBottom variant="h5" component="div">
                {recipeTitle}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {servings && <p>Servings: {servings}</p>}
                {cookTime && <p>Cook Time: {cookTime}</p>}
                {prepTime && <p>Prep Time: {prepTime}</p>}
            </Typography>
            </CardContent>
        </CardActionArea>
    </Card>
  );
}
