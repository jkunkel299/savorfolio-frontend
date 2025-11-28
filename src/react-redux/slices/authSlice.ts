import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { AuthReponse, User, UserLoginDTO } from "../../types";
import axiosClient /* , { setAuthToken } */ from "../../api/axiosClient";
import type { AppDispatch } from "../store";
import { jwtDecode } from "jwt-decode";

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

interface DecodedToken {
  id: string;
  email: string;
  exp: number;
  iss?: string;
  aud?: string;
}

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem("token"),
  loading: false,
  error: null,
};

// Thunks
export const registerUser = createAsyncThunk<
  AuthReponse,
  UserLoginDTO,
  { dispatch: AppDispatch }
>("auth/register", async (credentials: UserLoginDTO, { rejectWithValue }) => {
  try {
    const response = await axiosClient.post<AuthReponse>(
      "api/auth/register",
      credentials
    );
    return response.data;
  } catch {
    return rejectWithValue("Registration failed");
  }
});

export const loginUser = createAsyncThunk<
  AuthReponse,
  UserLoginDTO,
  { dispatch: AppDispatch }
>("auth/loginUser", async (credentials: UserLoginDTO, { rejectWithValue }) => {
  try {
    const response = await axiosClient.post<AuthReponse>(
      "api/auth/login",
      credentials
    );
    return response.data;
  } catch {
    return rejectWithValue("Login failed");
  }
});

export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  await axiosClient.post("api/auth/logout");
});

// Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    hydrateFromLocalStorage(state) {
      const token = localStorage.getItem("token");

      if (token) {
        state.token = token;

        try {
          const decoded = jwtDecode<DecodedToken>(token);
          state.user = {
            id: +decoded.id,
            email: decoded.email,
          };
        } catch {
          console.error("Invalid token in storage");
          localStorage.removeItem("token");
        }
      }
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        loginUser.fulfilled,
        (state, action: PayloadAction<AuthReponse>) => {
          const token = action.payload.token;
          state.loading = false;
          const decoded = jwtDecode<DecodedToken>(token);
          state.user = {
            id: +decoded.id,
            email: decoded.email,
          };
          state.token = token;
        }
      )
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.error = null;
      });
  },
});

export const { hydrateFromLocalStorage } = authSlice.actions;
export default authSlice.reducer;
