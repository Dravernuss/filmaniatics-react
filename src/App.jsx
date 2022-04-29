import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";
import MovieDetail from "./pages/MovieDetail/MovieDetail";
import PrincipalPage from "./pages/PrincipalPage/PrincipalPage";
import Profile from "./pages/Profile/Profile";
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
          <Route path="*" element={<p>404</p>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
