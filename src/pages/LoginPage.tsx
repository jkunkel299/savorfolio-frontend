import { useState } from "react";
import type { RootState } from "../react-redux/store";
import { loginUser } from "../react-redux/slices/authSlice";
import type { UserLoginDTO } from "../types";
import { useAppDispatch, useAppSelector } from "../react-redux/hooks";
import FormGroup from "@mui/material/FormGroup";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { loading, error } = useAppSelector((state: RootState) => state.auth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const userLogin: UserLoginDTO = {
      username: username,
      email: email,
      password: password,
    };
    try {
      await dispatch(loginUser(userLogin)).unwrap();
      console.log("Login successful");
      navigate("/");
    } catch (err: unknown) {
      console.error("Login failed:", err);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      width="100%"
      flexDirection="column"
      sx={{ gap: 2 }}
    >
      <Typography variant="h4" textAlign="center" gutterBottom>
        Log In
      </Typography>
      {/* username */}
      <FormGroup>
        <Typography>Username</Typography>
        <OutlinedInput
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </FormGroup>

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

      <Button type="submit" disabled={loading} variant="contained">
        {loading ? "Logging in..." : "Log In"}
      </Button>

      {error && <Typography>{error}</Typography>}
    </Box>
  );
}
