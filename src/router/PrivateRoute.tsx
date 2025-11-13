import { useSelector } from "react-redux";
import type { RootState } from "../react-redux/store";
import { Navigate } from "react-router-dom";
import type { JSX } from "react";

export const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const token = useSelector((state: RootState) => state.auth.token);
  return token ? children : <Navigate to="/auth/login" />;
};
