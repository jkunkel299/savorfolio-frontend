import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { AuthReponse, User, UserLoginDTO } from "../../types";
import axiosClient, { setAuthToken } from "../../api/axiosClient";
import type { AppDispatch } from "../store";

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem("token"),
  loading: false,
  error: null,
};

// Thunks
export const registerUser = createAsyncThunk(
  "auth/register",
  async (credentials: {
    username: string;
    email: string;
    password: string;
  }) => {
    await axiosClient.post("api/auth/register", credentials);
  }
);

export const loginUser = createAsyncThunk<
  AuthReponse,
  UserLoginDTO,
  { dispatch: AppDispatch }
>("auth/loginUser", async (credentials: UserLoginDTO, { rejectWithValue }) => {
  try {
    const response = axiosClient.post<AuthReponse>(
      "api/auth/login",
      credentials
    );
    return (await response).data;
  } catch {
    return rejectWithValue("Login failed");
  }
});

export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  localStorage.removeItem("token");
  setAuthToken(null);
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
        setAuthToken(token);
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
          state.user = action.payload.user;
          state.token = token;

          localStorage.setItem("token", token);
          setAuthToken(token);
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

        setAuthToken(null);
      });
  },
});

export const { hydrateFromLocalStorage } = authSlice.actions;
export default authSlice.reducer;
