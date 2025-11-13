import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import HomeIcon from "@mui/icons-material/Home";
import { Link, useNavigate } from "react-router-dom";
import { colors } from "../../themes/colors";
import { useAppDispatch, useAppSelector } from "../../react-redux/hooks";
import type { RootState } from "../../react-redux/store";
import { logoutUser } from "../../react-redux/slices/authSlice";
import { Login, Logout } from "@mui/icons-material";

export default function Header() {
  const token = useAppSelector((state: RootState) => state.auth.token);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch(logoutUser()).unwrap();
    navigate("/");
  };

  return (
    <AppBar position="fixed" sx={{ width: "100%", left: 0 }}>
      <Toolbar disableGutters>
        <IconButton color="secondary" component={Link} to="/">
          <HomeIcon />
        </IconButton>
        <Typography
          variant="h2"
          color={colors.textPrimary}
          component={"div"}
          sx={{ flexGrow: 1, pl: 2 }}
        >
          Savorfolio
        </Typography>
        <Button color="inherit" component={Link} to="/search">
          <Typography color={colors.textPrimary}>Search</Typography>
        </Button>
        {token ? (
          <>
            <Button color="inherit" component={Link} to="/add-input">
              <Typography color={colors.textPrimary}>Add Recipe</Typography>
            </Button>
            <Button color="inherit" onClick={handleLogout}>
              <Typography
                color={colors.textPrimary}
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
              >
                Log Out
                <Logout />
              </Typography>
            </Button>
          </>
        ) : (
          <Button color="inherit" component={Link} to="/auth/login">
            <Typography
              color={colors.textPrimary}
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              Log In
              <Login />
            </Typography>
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}
