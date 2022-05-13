import API_SERVER from "./api.server.js";

const ENDPOINTS = {
  GET_ONE_USER: "/api/users",
  CREATE: "/api/users/create",
  UPDATE: "/api/users/update",
  LOGIN: "/api/users/login",
};

export const loginUser = (user) => {
  const path = `${API_SERVER}${ENDPOINTS.LOGIN}`;
  return new Promise((resolve, reject) => {
    fetch(path, {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        resolve({ token: data.token, _id: data._id });
      })
      .catch((err) => {
        reject({ error: err, alert: true });
      });
  });
};

export const getOneUser = (id) => {
  const token = JSON.parse(localStorage.getItem("infoUser")).token;
  const path = `${API_SERVER}${ENDPOINTS.GET_ONE_USER}/${id}`;
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

export const updateUser = ({ id, ...user }) => {
  const token = JSON.parse(localStorage.getItem("infoUser")).token;
  const path = `${API_SERVER}${ENDPOINTS.UPDATE}/${id}`;
  return new Promise((resolve, reject) => {
    fetch(path, {
      method: "PUT",
      body: JSON.stringify(user),
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

export const createUser = (user) => {
  const path = `${API_SERVER}${ENDPOINTS.CREATE}`;

  return new Promise((resolve, reject) => {
    fetch(path, {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        resolve({ _id: data._id });
      })
      .catch((err) => {
        reject({ error: err });
      });
  });
};
