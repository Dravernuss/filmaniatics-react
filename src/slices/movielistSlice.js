import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { movieList } from "../api/index";

const { getOneMovieList } = movieList;

const initialState = {};

export const getOneMovieListAsync = createAsyncThunk(
  "movielist/getOneMovieList",
  async (id) => {
    const response = await getOneMovieList(id);
    return response.data;
  }
);

export const movielistSlice = createSlice({
  name: "movielist",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOneMovieListAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOneMovieListAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.movielist = action.payload;
      });
  },
});

export default movielistSlice.reducer;

export const myList = (state) => state.movielist.movielist;
export const favList = (state) => state.movielist.movielist?.fav_movies || {};
