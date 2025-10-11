import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <AppBar 
            position="fixed"
            sx={{ width: "100%", left: 0 }}    
        >
            <Toolbar disableGutters>
                <IconButton color='inherit' component={Link} to="/"><HomeIcon /></IconButton>
                <Typography variant="h6" component={"div"} sx={{ flexGrow: 1, pl: 2 }}>
                    Savorfolio
                </Typography>
                <Button color="inherit" component={Link} to="/search">Search</Button>
                <Button color="inherit" component={Link} to="/add">Add Recipe</Button>
            </Toolbar>
        </AppBar>
    );
};