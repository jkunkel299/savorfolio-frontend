import type { JSX } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../react-redux/store";

export const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const user = useSelector((state: RootState) => state.auth.user);
  return user ? children : <Navigate to="/auth/login" />;
};
