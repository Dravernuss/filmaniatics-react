import API_SERVER from "./api.server.js";

const ENDPOINTS = {
  GET_ONE_MOVIELIST: "/api/movielist", //id User
  CREATE: "/api/movielist/create", // id User
  ADD_MOVIE_TO_LIST: "/api/movielist/addMovieToList", // id List param, id Movie Body
  REMOVE_MOVIE_TO_LIST: "/api/movielist/removeMovieToList", //id List and id Movie in params
  ADD_FAVORITE_MOVIE_TO_LIST: "/api/movielist/addFavoriteMovieToList", // id List param, id Movie Body
  REMOVE_FAV_MOVIE_TO_LIST: "/api/movielist/removeFavoriteMovieToList", //id List and id Movie in params
};

export const getOneMovieList = (id) => {
  const token = JSON.parse(localStorage.getItem("infoUser")).token;
  const path = `${API_SERVER}${ENDPOINTS.GET_ONE_MOVIELIST}/${id}`;
  return new Promise((resolve, reject) => {
    fetch(path, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        resolve({ data });
      })
      .catch((err) => {
        reject({ error: err });
      });
  });
};

export const createMovieList = (userId) => {
  const path = `${API_SERVER}${ENDPOINTS.CREATE}/${userId}`;

  return new Promise((resolve, reject) => {
    fetch(path, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        resolve(true);
      })
      .catch((err) => {
        reject({ error: err });
      });
  });
};

export const addMovieToList = ({ id, ...movieId }) => {
  const token = JSON.parse(localStorage.getItem("infoUser")).token;
  const path = `${API_SERVER}${ENDPOINTS.ADD_MOVIE_TO_LIST}/${id}`;
  return new Promise((resolve, reject) => {
    fetch(path, {
      method: "PUT",
      body: JSON.stringify(movieId),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        resolve(true);
      })
      .catch((err) => {
        reject({ error: err });
      });
  });
};

export const removeMovieToList = ({ id, movieId }) => {
  const token = JSON.parse(localStorage.getItem("infoUser")).token;
  const path = `${API_SERVER}${ENDPOINTS.REMOVE_MOVIE_TO_LIST}/${id}/${movieId}`;
  return new Promise((resolve, reject) => {
    fetch(path, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        resolve(true);
      })
      .catch((err) => {
        reject({ error: err });
      });
  });
};

export const addFavoriteMovieToList = ({ id, ...movieId }) => {
  const token = JSON.parse(localStorage.getItem("infoUser")).token;
  const path = `${API_SERVER}${ENDPOINTS.ADD_FAVORITE_MOVIE_TO_LIST}/${id}`;
  return new Promise((resolve, reject) => {
    fetch(path, {
      method: "PUT",
      body: JSON.stringify(movieId),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        resolve(true);
      })
      .catch((err) => {
        reject({ error: err });
      });
  });
};

export const removeFavoriteMovieToList = ({ id, movieId }) => {
  const token = JSON.parse(localStorage.getItem("infoUser")).token;
  const path = `${API_SERVER}${ENDPOINTS.REMOVE_FAV_MOVIE_TO_LIST}/${id}/${movieId}`;
  return new Promise((resolve, reject) => {
    fetch(path, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        resolve(true);
      })
      .catch((err) => {
        reject({ error: err });
      });
  });
};
