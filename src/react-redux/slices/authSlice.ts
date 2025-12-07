import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import type { User, UserLoginDTO } from "../../types";
import axiosClient from "../../api/axiosClient";
import type { AppDispatch } from "../store";

export type AuthState = {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

// Thunks
export const registerUser = createAsyncThunk<
  User,
  UserLoginDTO,
  { dispatch: AppDispatch }
>("auth/register", async (credentials: UserLoginDTO, { rejectWithValue }) => {
  try {
    const response = await axiosClient.post("api/auth/register", credentials);
    return response.data;
  } catch {
    return rejectWithValue("Registration failed");
  }
});

export const loginUser = createAsyncThunk<
  User,
  UserLoginDTO,
  { dispatch: AppDispatch }
>("auth/loginUser", async (credentials: UserLoginDTO, { rejectWithValue }) => {
  try {
    await axiosClient.post("api/auth/login", credentials);

    // After login, call /me to retrieve the user
    const me = await axiosClient.get<User>("api/auth/me", {
      withCredentials: true,
    });

    return me.data;
  } catch {
    return rejectWithValue("Login failed");
  }
});

export const fetchCurrentUser = createAsyncThunk<User>(
  "auth/fetchCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const me = await axiosClient.get<User>("api/auth/me", {
        withCredentials: true,
      });
      return me.data;
    } catch {
      return rejectWithValue("Not authenticated");
    }
  }
);

export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  await axiosClient.post("api/auth/logout");
});

// Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      // LOGIN
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload; // we get user from /me
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // FETCH CURRENT USER
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(fetchCurrentUser.rejected, (state) => {
        state.user = null;
      })

      // LOGOUT
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.error = null;
      });
  },
});

export default authSlice.reducer;
