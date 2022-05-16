import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MovieSearchCard from "../../components/MovieSearchCard/MovieSearchCard";
import Navbar from "../../components/navbar/Navbar";
import Imagenes from "../../images/imagenes";
import { fetchSearchMovie } from "../../service/api";
import "./_SearchMovie.scss";

const SearchMovie = () => {
  let { query } = useParams();
  const [searchTerm, setSearchTerm] = useState(query);
  const [movies, setMovies] = useState([]);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (searchTerm) {
      setMovies(await fetchSearchMovie(searchTerm));
      setSearchTerm("");
    }
  };

  const handleOnChange = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    const fetchAPI = async () => {
      setSearchTerm(query);
      setMovies(await fetchSearchMovie(searchTerm));
    };
    fetchAPI();
  }, []);

  return (
    <div className="backgroundSearch">
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
          </div>
          <div className="moviesRigth">
            {movies?.length ? (
              movies?.map((item, index) => {
                return (
                  <MovieSearchCard
                    key={index}
                    release={item?.release?.split("-").reverse().join("-")}
                    title={item?.title}
                    imgsrc={item?.poster}
                    rating={item?.rating}
                    overview={item?.overview}
                    id={item?.id}
                  />
                );
              })
            ) : (
              <div>
                <h1 style={{ fontFamily: "Rambla-Bold", color: "white" }}>
                  NO MOVIES FOUNDED
                </h1>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchMovie;
