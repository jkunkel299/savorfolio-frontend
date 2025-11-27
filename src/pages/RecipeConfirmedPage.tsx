import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function RecipeConfirmedPage() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      width="100%"
      flexDirection="column"
      textAlign="center"
    >
      <Typography variant="h4" component="div">
        Recipe Saved!
      </Typography>
    </Box>
  );
}
