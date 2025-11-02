import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from 'react-router-dom';
import { colors } from '../../themes/colors';

export default function Header() {
    return (
        <AppBar 
            position="fixed"
            sx={{ width: "100%", left: 0 }}    
        >
            <Toolbar disableGutters>
                <IconButton color="secondary" component={Link} to="/"><HomeIcon /></IconButton>
                <Typography variant="h6" color={colors.textPrimary} component={"div"} sx={{ flexGrow: 1, pl: 2 }}>
                    Savorfolio
                </Typography>
                <Button color="inherit" component={Link} to="/search"><Typography color={colors.textPrimary}>Search</Typography></Button>
                <Button color="inherit" component={Link} to="/add-input"><Typography color={colors.textPrimary}>Add Recipe</Typography></Button>
            </Toolbar>
        </AppBar>
    );
};