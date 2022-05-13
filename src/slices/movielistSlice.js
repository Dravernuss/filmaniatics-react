import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { movieList } from "../api/index";
import { fetchMovieDetail } from "../service/api";

const { getOneMovieList } = movieList;

const initialState = {};

export const getOneMovieListAsync = createAsyncThunk(
  "movielist/getOneMovieList",
  async (id) => {
    const response = await getOneMovieList(id);
    return response.data;
  }
);

export const getFavoriteMovies = createAsyncThunk(
  "movielist/getFavoriteMovies",
  async (movieList) => {
    const posterUrl = "https://image.tmdb.org/t/p/original/";

    const getData = async () => {
      const list = await await Promise.all(
        movieList?.fav_movies.map(async (i) => {
          const details = await fetchMovieDetail(i);
          const {
            original_title,
            id,
            poster_path,
            release_date,
            vote_average,
            backdrop_path,
          } = details;

          return {
            id: id,
            title: original_title,
            poster: posterUrl + poster_path,
            release: release_date,
            rating: vote_average,
            backPoster: posterUrl + backdrop_path,
          };
        })
      );
      return list;
    };

    const result = await getData();
    return result;
  }
);

export const getMovies = createAsyncThunk(
  "movielist/getMovies",
  async (movieList) => {
    const posterUrl = "https://image.tmdb.org/t/p/original/";

    const getData = async () => {
      const list = await await Promise.all(
        movieList?.movies_watched.map(async (i) => {
          const details = await fetchMovieDetail(i);
          const {
            original_title,
            id,
            poster_path,
            release_date,
            vote_average,
            backdrop_path,
          } = details;

          return {
            id: id,
            title: original_title,
            poster: posterUrl + poster_path,
            release: release_date,
            rating: vote_average,
            backPoster: posterUrl + backdrop_path,
          };
        })
      );
      return list;
    };

    const result = await getData();
    return result;
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
      })
      .addCase(getFavoriteMovies.fulfilled, (state, action) => {
        state.favoriteMovies = action.payload;
      })
      .addCase(getMovies.fulfilled, (state, action) => {
        state.moviesWatched = action.payload;
      });
  },
});

export default movielistSlice.reducer;

export const myList = (state) => state.movielist.movielist;
export const favList = (state) => state.movielist.favoriteMovies;
export const movList = (state) => state.movielist.moviesWatched;
