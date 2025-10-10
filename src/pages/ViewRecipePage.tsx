import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

export function ViewRecipePage() {
    
    return (
        <Box 
            sx={{
                display: 'flex',
                justifyContent: 'center', // Centers horizontally
                minHeight: '100vh',       // Ensures the container takes full viewport height
                width: '100%',            // Ensures the container takes full viewport width
            }}
        >
            <Paper elevation={3} sx={{ p: 3 }}></Paper>
            <Typography variant="h4">Recipe Title</Typography>
        </Box>
    )
}