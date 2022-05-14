import { Chip } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MovieCard from "../../components/MovieCard/MovieCard";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Imagenes from "../../images/imagenes";
import { fetchGenre, getAllMovies, fetchMovieByGenre } from "../../service/api";
import "./_Movies.scss";

const Movies = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("Todos los Géneros");
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

  /* FILTER */
  const genreList = genres.map((item, index) => {
    return (
      <Chip
        style={{
          color: "black",
          border: "1px solid black",
          margin: "10px 0px 10px 0px",
          cursor: "pointer",
        }}
        label={item.name}
        key={index}
        onClick={(e) => handleChangeByGenre(e, item.id, item.name)}
      />
    );
  });

  const handleChangeByGenre = async (e, id, name) => {
    e.preventDefault();
    setMovies(await fetchMovieByGenre(id));
    setSelectedGenre(name);
  };

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
                  backgroundColor: "rgb(196, 196, 196)",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                <img src={Imagenes.img15} className="lupa" alt="lupa" />
              </button>
            </form>
            <div className="filterContainer">
              <p className="genreTitle">Filtrar Por Género</p>
              <div className="genreList">
                <Chip
                  style={{
                    color: "black",
                    border: "1px solid black",
                    margin: "10px 0px 10px 0px",
                    cursor: "pointer",
                  }}
                  label="Todos los Géneros"
                  onClick={async () => {
                    setMovies(await getAllMovies());
                    setSelectedGenre("Todos los Géneros");
                  }}
                />
                {genreList}
              </div>
            </div>
            <p className="selectedGenre">
              Filtrado por : {selectedGenre.toUpperCase()}{" "}
            </p>
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
        <Footer />
      </div>
    </div>
  );
};

export default Movies;
