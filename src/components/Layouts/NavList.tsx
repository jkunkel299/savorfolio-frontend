import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Login, Logout } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../react-redux/hooks";
import type { RootState } from "../../react-redux/store";
import { logoutUser } from "../../react-redux/slices/authSlice";
import { resetFilters } from "../../react-redux/slices/recipeFiltersSlice";
import { colors } from "../../themes/colors";

export default function NavList() {
  const user = useAppSelector((state: RootState) => state.auth.user);
  const appDispatch = useAppDispatch();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await appDispatch(logoutUser()).unwrap();
    dispatch(resetFilters());
    navigate("/");
  };

  return (
    <>
      <Button color="inherit" component={Link} to="/search">
        <Typography color={colors.textPrimary} gap={1}>Search</Typography>
      </Button>
      {user ? (
        <>
          <Button color="inherit" component={Link} to="/add-input">
            <Typography color={colors.textPrimary} gap={1}>Add Recipe</Typography>
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
