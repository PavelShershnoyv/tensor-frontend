import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import RequestAPI from "../../API/requests";
import initialStateUser from "../initialState";

export const postLogin = createAsyncThunk(
  "auth/login",
  async (formData, { rejectWithValue }) => {
    const res = await RequestAPI.login(formData)
      .then((res) => res.data)
      .catch((err) => rejectWithValue(err.message));
    return res;
  }
);

export const postForgot = createAsyncThunk(
  "auth/forgot",
  async (email, { rejectWithValue }) => {
    const res = await RequestAPI.forgotPassword(email)
      .then((res) => res.data)
      .catch((err) => rejectWithValue(err.message));
    return res;
  }
);

export const postLogout = createAsyncThunk(
  "auth/logout",
  async (formData, { rejectWithValue }) => {
    const res = await RequestAPI.logout()
      .then((res) => res.data)
      .catch((err) => rejectWithValue(err.message));
    return res;
  }
);

export const postRegister = createAsyncThunk(
  "auth/register",
  async (formData, { rejectWithValue }) => {
    const res = await RequestAPI.register(formData)
      .then((res) => res.data)
      .catch((err) => rejectWithValue(err.message));
    return res;
  }
);

// Получние информации о текущем пользователе - удалить 
export const postVerify = createAsyncThunk(
  "auth/verify",
  async (token, { rejectWithValue }) => {
    const res = await RequestAPI.verify(token)
      .then((res) => res.data)
      .catch((err) => rejectWithValue(err.message));
    return res;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: initialStateUser,
  reducers: {
    logout(state) {
      RequestAPI.logout();
      state.token = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postLogin.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(postLogin.fulfilled, (state, action) => {
        state.token = action.payload.access_token;
        state.loader = false;
      })
      .addCase(postLogin.rejected, (state, action) => {
        state.loader = false;
        state.resultLogin.error = action.payload;
      });
    builder
      .addCase(postForgot.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(postForgot.fulfilled, (state, action) => {
        state.loader = false;
      })
      .addCase(postForgot.rejected, (state, action) => {
        state.loader = false;
        state.resultForgot.error = action.payload;
      });
    builder
      .addCase(postVerify.fulfilled, (state, action) => {
        console.log(action);
      })
      .addCase(postVerify.rejected, (state, action) => {
        console.log(action);
        // state.token = "";
      });
    builder
      .addCase(postLogout.fulfilled, (state, action) => {
        state.token = "";
      })
      .addCase(postLogout.rejected, (state, action) => {
        console.log(action);
      });
    builder
      .addCase(postRegister.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(postRegister.fulfilled, (state, action) => {
        state.loader = false;
      })
      .addCase(postRegister.rejected, (state, action) => {
        state.loader = false;
        state.resultReg.error = action.payload;
      });
  },
});

export default userSlice.reducer;
export const { logout } = userSlice.actions;
