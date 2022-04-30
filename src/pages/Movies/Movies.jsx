import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MovieCard from "../../components/MovieCard/MovieCard";
import Navbar from "../../components/navbar/Navbar";
import Imagenes from "../../images/imagenes";
import { fetchGenre, getAllMovies } from "../../service/api";
import "./_Movies.scss";

const Movies = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const navigate = useNavigate();

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (searchTerm) {
      navigate(`/search/${searchTerm}`);
    }
  };

  const handleOnChange = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    const fetchAPI = async () => {
      setMovies(await getAllMovies());
      setGenres(await fetchGenre());
    };
    fetchAPI();
  }, []);

  return (
    <div className="backgroundMovies">
      <div>
        <Navbar />
        <div className="moviesContainer">
          <div className="moviesLeft">
            <form onSubmit={handleOnSubmit} className="searchContainer">
              <input
                className="search"
                type="search"
                placeholder="Buscar Películas"
                value={searchTerm}
                onChange={handleOnChange}
              />
              <button
                type="submit"
                style={{
                  backgroundColor: "#d2b864",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                <img src={Imagenes.img15} className="lupa" alt="lupa" />
              </button>
            </form>
          </div>
          <div className="moviesRigth">
            {movies ? (
              movies.map((item, index) => {
                return (
                  <MovieCard
                    key={index}
                    text={item.release.split("-").reverse().join("-")}
                    title={item.title}
                    imgsrc={item.poster}
                    rating={item.rating}
                    id={item.id}
                  />
                );
              })
            ) : (
              <h1>No Movies Found</h1>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Movies;
