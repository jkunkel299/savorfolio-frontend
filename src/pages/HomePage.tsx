import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import useDocumentTitle from "../hooks/useDocumentTitle";

export default function HomePage() {
  useDocumentTitle("Home");
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100%"
      flexDirection="column"
      textAlign="center"
    >
      <Typography variant="h3" component="div">
        Welcome to
      </Typography>
      <Typography variant="h1" component="div">
        Savorfolio
      </Typography>
    </Box>
  );
}
