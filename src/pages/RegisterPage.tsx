import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormGroup from "@mui/material/FormGroup";
import OutlinedInput from "@mui/material/OutlinedInput";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../react-redux/store";
import { registerUser } from "../react-redux/slices/authSlice";
import { useAppDispatch, useAppSelector } from "../react-redux/hooks";
import type { UserLoginDTO } from "../types";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { loading, error } = useAppSelector((state: RootState) => state.auth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const userLogin: UserLoginDTO = {
      email: email,
      password: password,
    };
    try {
      await dispatch(registerUser(userLogin)).unwrap();
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
        <Box display="flex" flexDirection="column" gap={3}>
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
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormGroup>

          <Button
            type="submit"
            disabled={loading}
            variant="contained"
          >
            {loading ? "Loading..." : "Register"}
          </Button>

          {error && <Typography>{error}</Typography>}
        </Box>
      </Box>
  );
}
