import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";
import MovieDetail from "./pages/MovieDetail/MovieDetail";
import Movies from "./pages/Movies/Movies";
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
          <Route path="/profile" element={<Profile />} />
          <Route path="/principalpage" element={<PrincipalPage />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
          <Route path="/search/:query" element={<SearchMovie />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="*" element={<p>404</p>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
