import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import IngredientsInputList from "./IngredientsInputList";

interface IngredientsWPanelProps {
    rawIngredients: string[];
}

export default function IngredientsWPanel({rawIngredients}: IngredientsWPanelProps){
    return (
    <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
        <Box sx={{ flex: 1, overflowY: "auto", p: 2 }}>
            <IngredientsInputList />
        </Box>

        <Box
            sx={{
                width: 360,
                overflowY: "auto",
                bgcolor: "background.paper",
                borderLeft: "1px solid",
                borderColor: "divider",
                p: 2,
            }}
        >
            <Typography variant="h5" gutterBottom>Extracted Ingredients</Typography>
            <List dense>
            {rawIngredients.map((ing, i) => (
                <ListItem key={i}>
                <ListItemText primary={ing} />
                </ListItem>
            ))}
            </List>
        </Box>
    </Box>
    )
}