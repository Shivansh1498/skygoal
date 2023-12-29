import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosApi from "../../utils/axiosAPI";

const initialState = {
  loading: false,
  userInfo: null,
  error: null,
};

export const registerUserAsync = createAsyncThunk(
  "auth/register",
  async (userInfo, { rejectWithValue }) => {
    try {
      const response = await axiosApi.post(
        "/user/register",
        {
          username: userInfo.username,
          email: userInfo.email,
          password: userInfo.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      localStorage.setItem("token", response.data?.userInfo?.token);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const loginUserAsync = createAsyncThunk(
  "auth/login",
  async (userInfo, { rejectWithValue }) => {
    try {
      const response = await axiosApi.post(
        "/user/login",
        {
          email: userInfo.email,
          password: userInfo.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      localStorage.setItem("token", response.data?.userInfo?.token);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteUserAsync = createAsyncThunk(
  "auth/deleteUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosApi.delete("/user/deleteUser", {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: () => {
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUserAsync.pending, (state) => {
        state.loading = true;
        state.userInfo = null;
        state.error = null;
      })
      .addCase(registerUserAsync.rejected, (state, action) => {
        state.loading = false;
        state.userInfo = null;
        if (action.payload) {
          state.error = action.payload.errorMessage;
        } else {
          state.error = action.error.message;
        }
      })
      .addCase(registerUserAsync.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.userInfo = payload;
        state.error = null;
      })
      .addCase(loginUserAsync.pending, (state) => {
        state.loading = true;
        state.userInfo = null;
        state.error = null;
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.loading = false;
        state.userInfo = null;
        if (action.payload) {
          state.error = action.payload.errorMessage;
        } else {
          state.error = action.error.message;
        }
      })
      .addCase(loginUserAsync.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.userInfo = payload;
        state.error = null;
      })
      .addCase(deleteUserAsync.fulfilled, (state) => {
        state.loading = false;
        state.userInfo = null;
        state.error = null;
        localStorage.removeItem("token");
      })
      .addCase(deleteUserAsync.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error;
      })
      .addCase(deleteUserAsync.pending, (state) => {
        state.loading = true;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
