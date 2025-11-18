import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import { colors } from "../../themes/colors";
import { useAppDispatch, useAppSelector } from "../../react-redux/hooks";
import type { RootState } from "../../react-redux/store";
import { logoutUser } from "../../react-redux/slices/authSlice";
import { Login, Logout } from "@mui/icons-material";

export default function NavList() {
  const token = useAppSelector((state: RootState) => state.auth.token);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch(logoutUser()).unwrap();
    navigate("/");
  };
  
  return (
    <>
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
    </>
  );
}
