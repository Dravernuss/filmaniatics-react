import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PrivateRoute } from "./components/PrivateRoute/PrivateRoute";
import LandingPage from "./pages/LandingPage/LandingPage";
import MovieDetail from "./pages/MovieDetail/MovieDetail";
import Movies from "./pages/Movies/Movies";
import MyList from "./pages/MyList/MyList";
import PrincipalPage from "./pages/PrincipalPage/PrincipalPage";
import Profile from "./pages/Profile/Profile";
import SearchMovie from "./pages/SearchMovie/SearchMovie";
import "./_App.scss";

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/profile"
            element={
              <PrivateRoute routeLogin="/">
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path="/principalpage"
            element={
              <PrivateRoute routeLogin="/">
                <PrincipalPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/movie/:id"
            element={
              <PrivateRoute routeLogin="/">
                <MovieDetail />
              </PrivateRoute>
            }
          />
          <Route
            path="/search/:query"
            element={
              <PrivateRoute routeLogin="/">
                <SearchMovie />
              </PrivateRoute>
            }
          />
          <Route
            path="/movies"
            element={
              <PrivateRoute routeLogin="/">
                <Movies />
              </PrivateRoute>
            }
          />
          <Route
            path="/mylist"
            element={
              <PrivateRoute routeLogin="/">
                <MyList />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<p>404</p>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
