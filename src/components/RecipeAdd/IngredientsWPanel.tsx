import IngredientsInputList from "./IngredientsInputList";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

interface IngredientsWPanelProps {
    rawIngredients: string[];
}

export default function IngredientsWPanel({rawIngredients}: IngredientsWPanelProps){
    return <Grid container>
        <Grid size={{xs: 8}}
            sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                overflow: "auto",
                p: 2,
            }}
        >
            <IngredientsInputList/>
        </Grid>
        
        <Grid size={{xs: 4}}
            sx={{
                display: "flex",
                flexShrink: 0,
                bgcolor: "background.paper",
                borderLeft: "1px solid",
                borderColor: "divider",
                p:2
            }}
        >
            <List>
                {rawIngredients.map((ing, i) => (
                <ListItem key={i}><ListItemText>{ing}</ListItemText></ListItem>
            ))}
            </List>
            
        </Grid>
    </Grid>
}