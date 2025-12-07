import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormGroup from "@mui/material/FormGroup";
import OutlinedInput from "@mui/material/OutlinedInput";
import Typography from "@mui/material/Typography";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../react-redux/store";
import { registerUser } from "../react-redux/slices/authSlice";
import { clearError } from "../react-redux/slices/authSlice";
import { useAppDispatch, useAppSelector } from "../react-redux/hooks";
import type { UserLoginDTO } from "../types";
import useDocumentTitle from "../hooks/useDocumentTitle";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { useDispatch } from "react-redux";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const appDispatch = useAppDispatch();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useDocumentTitle("Register");

  const { loading, error } = useAppSelector((state: RootState) => state.auth);

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const userLogin: UserLoginDTO = {
      email: email,
      password: password,
    };
    try {
      await appDispatch(registerUser(userLogin)).unwrap();
      console.log("Registration successful");
      navigate("/auth/login");
    } catch (err: unknown) {
      console.error("Registration failed:", err);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="50vh"
      width="100%"
      flexDirection="column"
      sx={{ gap: 2 }}
    >
      <Box display="flex" flexDirection="column" gap={3} minWidth="20vw">
        <Typography variant="h4" textAlign="center" gutterBottom>
          Register
        </Typography>

        {/* email */}
        <FormGroup>
          <Typography>Email</Typography>
          <OutlinedInput
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormGroup>

        {/* password */}
        <FormGroup>
          <Typography>Password</Typography>
          <OutlinedInput
            placeholder="Password"
            value={password}
            type={showPassword ? "text" : "password"}
            onChange={(e) => setPassword(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormGroup>

        <Button type="submit" disabled={loading} variant="contained">
          {loading ? "Loading..." : "Register"}
        </Button>

        {error && <Typography>{error}</Typography>}
      </Box>
    </Box>
  );
}
