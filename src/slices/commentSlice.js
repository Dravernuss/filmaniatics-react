import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { comment } from "../api/index";

const { getAllCommentsByMovieId, createComment } = comment;

const initialState = {};

export const getAllCommentsByMovieIdAsync = createAsyncThunk(
  "comment/getAllCommentsByMovieId",
  async (id) => {
    const response = await getAllCommentsByMovieId(id);
    return response.data;
  }
);

export const createCommentAsync = createAsyncThunk(
  "comment/create",
  async (user) => {
    const response = await createComment(user);
    return response;
  }
);

export const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCommentsByMovieIdAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllCommentsByMovieIdAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload;
      })
      .addCase(createCommentAsync.fulfilled, (state) => {
        state.created = true;
      });
  },
});

export default commentSlice.reducer;

export const allComments = (state) => state.comment.comments;
