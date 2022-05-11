import "./_PrincipalPage.scss";
import Navbar from "../../components/navbar/Navbar";
import Carousel from "react-multi-carousel";
import Footer from "../../components/Footer/Footer";
import MovieCard from "../../components/MovieCard/MovieCard";
import { useEffect, useState } from "react";
import {
  fetchPopularMovies,
  fetchTopratedMovie,
  fetchUpcomingMovies,
} from "../../service/api";
import { useSelector } from "react-redux";
import { toUser } from "../../slices/userSlice";

const PrincipalPage = () => {
  const responsive = {
    desktop: {
      breakpoint: { max: 2000, min: 1470 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1470, min: 890 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 890, min: 0 },
      items: 1,
      centerMode: false,
    },
  };

  const user = useSelector(toUser);

  const [popularMovies, setPopularMovies] = useState([]);
  const [upcomingMovies, setUpcomingrMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      setPopularMovies(await fetchPopularMovies());
      setUpcomingrMovies(await fetchUpcomingMovies());
      setTopRatedMovies(await fetchTopratedMovie());
    };
    fetchAPI();
  }, []);

  const popularMov = popularMovies.slice(0, 20).map((item, index) => {
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
  });

  const upcomingMov = upcomingMovies.slice(0, 20).map((item, index) => {
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
  });

  const topRatedMov = topRatedMovies.slice(0, 20).map((item, index) => {
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
  });
  return (
    <div className="background">
      <div>
        <Navbar />
        <div className="ppContainer">
          <div className="welcome">
            <h1 className="welcomeName">Bienvenido {user?.name}.</h1>
            <p className="welcomeText">
              Millones de películas, referencias y calificaciones por descubrir.
              Explora ahora.
            </p>
          </div>
          <div className="popular">
            <h2 className="popularTitle">Lo Más Popular</h2>
            <Carousel
              responsive={responsive}
              centerMode={true}
              itemClass="carousel-item-padding-20-px"
              className="carousel"
            >
              {popularMov}
            </Carousel>
          </div>
          <div className="popular">
            <h2 className="popularTitle">Próximos Estrenos</h2>
            <Carousel
              responsive={responsive}
              centerMode={true}
              itemClass="carousel-item-padding-50-px"
              className="carousel"
            >
              {upcomingMov}
            </Carousel>
          </div>
          <div className="popular">
            <h2 className="popularTitle">Películas Mejor Valoradas</h2>
            <Carousel
              responsive={responsive}
              centerMode={true}
              itemClass="carousel-item-padding-50-px"
              className="carousel"
            >
              {topRatedMov}
            </Carousel>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default PrincipalPage;
