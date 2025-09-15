import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function Header() {
    return (
        <AppBar 
            position="fixed"
            sx={{ width: "100%", left: 0 }}    
        >
            <Toolbar disableGutters>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1, pl: 2 }}>
                    Savorfolio
                </Typography>
                <Button color="inherit">Search</Button>
                <Button color="inherit">Add Recipe</Button>
            </Toolbar>
        </AppBar>
    );
};