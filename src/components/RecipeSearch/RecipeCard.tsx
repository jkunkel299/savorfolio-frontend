import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
// import CardMedia from '@mui/material/CardMedia';
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";

interface RecipeCardProps {
  recipeId: number;
  recipeTitle: string;
  servings: number | null | undefined;
  cookTime: string | null | undefined;
  prepTime: string | null | undefined;
}

export default function RecipeCard({
  recipeId,
  recipeTitle,
  servings,
  cookTime,
  prepTime,
}: RecipeCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/view?recipeId=${recipeId}`);
  };
  return (
    <Card
      sx={{
        width: {
          xs: "100%", // width 100px for extra small screens and up
          sm: 200, // width 200px for small screens and up
          md: 300, // width 300px for medium screens and up
        },
        padding: 1,
      }}
    >
      <CardActionArea onClick={handleClick}>
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
          <Box sx={{variant: "body2", color: "text.secondary" }}>
            {servings && <Typography>Servings: {servings}</Typography>}
            {prepTime && <Typography>Prep Time: {prepTime}</Typography>}
            {cookTime && <Typography>Cook Time: {cookTime}</Typography>}
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
