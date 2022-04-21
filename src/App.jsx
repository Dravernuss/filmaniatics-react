import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";
import "./_App.scss";

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<LandingPage />} />

          <Route path="*" element={<p>404</p>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
