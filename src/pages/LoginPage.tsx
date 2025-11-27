// import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
// import FormGroup from "@mui/material/FormGroup";
// import OutlinedInput from "@mui/material/OutlinedInput";
// import Typography from "@mui/material/Typography";
// import { useState } from "react";
// import type { RootState } from "../react-redux/store";
// import { Link, useNavigate } from "react-router-dom";
// // import { loginUser } from "../react-redux/slices/authSlice";
// import { useAppDispatch, useAppSelector } from "../react-redux/hooks";
// import { colors } from "../themes/colors";
// import type { UserLoginDTO } from "../types";

// export default function LoginPage() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const dispatch = useAppDispatch();
//   const navigate = useNavigate();

//   const { loading, error } = useAppSelector((state: RootState) => state.auth);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const userLogin: UserLoginDTO = {
//       email: email,
//       password: password,
//     };
//     try {
//       await dispatch(loginUser(userLogin)).unwrap();
//       console.log("Login successful");
//       navigate("/");
//     } catch (err: unknown) {
//       console.error("Login failed:", err);
//     }
//   };

//   return (
//     <Box
//       component="form"
//       onSubmit={handleSubmit}
//       display="flex"
//       justifyContent="center"
//       alignItems="center"
//       width="100%"
//       flexDirection="column"
//       sx={{ gap: 2 }}
//     >
//       <Box display="flex" flexDirection="column" gap={3}>
//         <Typography variant="h4" textAlign="center" gutterBottom>
//           Log In
//         </Typography>

//         {/* email */}
//         <FormGroup>
//           <Typography>Email</Typography>
//           <OutlinedInput
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//         </FormGroup>

//         {/* password */}
//         <FormGroup>
//           <Typography>Password</Typography>
//           <OutlinedInput
//             placeholder="Password"
//             value={password}
//             type="password"
//             onChange={(e) => setPassword(e.target.value)}
//           />
//         </FormGroup>

//         <Button type="submit" disabled={loading} variant="contained">
//           {loading ? "Logging in..." : "Log In"}
//         </Button>

//         {error && <Typography>{error}</Typography>}

//         <Button color="inherit" component={Link} to="/auth/register">
//           <Typography color={colors.textPrimary}>
//             New user? Register here!
//           </Typography>
//         </Button>
//       </Box>
//     </Box>
//   );
// }
