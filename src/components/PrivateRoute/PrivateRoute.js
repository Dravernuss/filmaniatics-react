import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children, routeLogin }) => {
  const userInfo = JSON.parse(localStorage.getItem("infoUser"));
  if (userInfo) {
    return children;
  } else {
    return <Navigate to={routeLogin} />;
  }
};
