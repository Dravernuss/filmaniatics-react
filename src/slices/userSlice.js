import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { user } from "../api/index";

const { loginUser, updateUser, getOneUser, createUser } = user;

const initialState = {};

export const loginUserAsync = createAsyncThunk("loginUser", async (user) => {
  const response = await loginUser(user);
  return response;
});

export const createUserAsync = createAsyncThunk("user/create", async (user) => {
  const response = await createUser(user);
  return response;
});

export const getOneUserAsync = createAsyncThunk(
  "user/getOneUser",
  async (id) => {
    const response = await getOneUser(id);
    return response.data;
  }
);

export const updateUserAsync = createAsyncThunk("user/update", async (user) => {
  const response = await updateUser(user);
  return response;
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userToEdit: (state, { payload: newUserData }) => {
      state.user = { ...state.user, ...newUserData };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOneUserAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOneUserAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUserAsync.pending, (state, action) => {
        state.alertUser = false;
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.alertUser = true;
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.userInfo = action.payload; // state.userInfo
        state.logguedUser = true;
        localStorage.setItem("infoUser", JSON.stringify(action.payload));
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.created = true;
      });
  },
});

export const { userToEdit } = userSlice.actions;

export const selectUserLoggued = (state) => state.user.logguedUser;
export const alertUser = (state) => state.user.alertUser;
export const toUser = (state) => state.user.user;
export const userCreated = (state) => state.user.created;

export default userSlice.reducer;
