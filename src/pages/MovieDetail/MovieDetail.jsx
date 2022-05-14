import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Navbar from "../../components/navbar/Navbar";
import minutesToHHMM from "../../functions/minutesToHoursMinutes";
import Carousel from "react-multi-carousel";
import ReactPlayer from "react-player/youtube";
import {
  fetchCasts,
  fetchMovieDetail,
  fetchMovieVideos,
} from "../../service/api";
import "./_MovieDetail.scss";
import { Button, Chip, IconButton, Modal } from "@mui/material";
import Footer from "../../components/Footer/Footer";
import Imagenes from "../../images/imagenes";
import Comment from "../../components/Comment/Comment";
import {
  movList,
  favList,
  getFavoriteMovies,
  getMovies,
  getOneMovieListAsync,
  myList,
} from "../../slices/movielistSlice";
import { useDispatch, useSelector } from "react-redux";

const MovieDetail = () => {
  let { id } = useParams();
  let genres = [];
  const [openVideo, setOpenVideo] = useState(false);
  const [detail, setDetail] = useState([]);
  const [video, setVideo] = useState([]);
  const [casts, setCasts] = useState([]);

  const handleOpenVideo = () => {
    setOpenVideo(true);
  };
  const handleCloseVideo = () => {
    setOpenVideo(false);
  };
  useEffect(() => {
    const fetchAPI = async () => {
      setDetail(await fetchMovieDetail(id));
      setVideo(await fetchMovieVideos(id));
      setCasts(await fetchCasts(id));
    };

    fetchAPI();
  }, [id]);

  genres = detail.genres;

  let genresList;
  if (genres) {
    genresList = genres.map((g, i) => {
      return (
        <div key={i}>
          <Chip
            style={{
              color: "white",
              border: "1px solid #d2b864",
              margin: "10px 0px 10px 0px",
            }}
            label={g.name}
            variant="outlined"
          />
        </div>
      );
    });
  }

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

  const castList = casts.slice(0, 10).map((c, i) => {
    return (
      <div className="castCard" key={i}>
        <img className="castImage" src={c.img} alt={c.name}></img>
        <p className="castName">{c.name}</p>
        <p className="castCharacter" style={{ color: "#5a606" }}>
          {c.character}
        </p>
      </div>
    );
  });

  const MoviePlayerModal = (props) => {
    const youtubeUrl = "https://www.youtube.com/watch?v=";
    return (
      <Modal
        {...props}
        open={openVideo}
        onClose={handleCloseVideo}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="boxModal">
          <div className="modalUpperHead">
            <img src={Imagenes.img14} width="100" alt=""></img>
            <p className="modalTitle">{detail.title}</p>
          </div>
          <div className="modalBody">
            <Box
              component="div"
              sx={{
                "& .MuiTextField-root": { m: 2, width: "100%" },
              }}
              noValidate
              autoComplete="off"
              className="modalBodyBox"
              style={{ alignItems: "flex-start" }}
            >
              {video?.key ? (
                <ReactPlayer
                  url={youtubeUrl + video.key}
                  playing
                  width="100%"
                  origin="http"
                ></ReactPlayer>
              ) : (
                <p>No video Available</p>
              )}
            </Box>
          </div>
        </Box>
      </Modal>
    );
  };

  const userID = JSON.parse(localStorage.getItem("infoUser"))._id;
  const movieList = useSelector(myList);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!movieList) dispatch(getOneMovieListAsync(userID));
  }, []);

  const getWatchedMovFavMov = async () => {
    dispatch(getMovies(movieList));
    dispatch(getFavoriteMovies(movieList));
  };

  useEffect(() => {
    if (movieList) {
      getWatchedMovFavMov();
    }
  }, [movieList]);

  const favMovieList = useSelector(favList);
  const moviesWatchedList = useSelector(movList);
  return (
    <div className="backgroundDetail">
      <div>
        <MoviePlayerModal />
        <Navbar />
        <div
          className="detailImageContainer"
          style={{
            background: `linear-gradient(180deg,rgba(3, 0, 39, 0.5355) 18.75%,rgba(3, 0, 39, 0.799) 45.31%,rgba(3, 0, 39, 0.85) 100%) ,url("http://image.tmdb.org/t/p/w1280/${detail?.backdrop_path}") no-repeat center center / cover`,
          }}
        >
          <div className="detailContainer">
            <img
              src={`https://image.tmdb.org/t/p/w300/${detail?.poster_path}`}
              className="movieImage"
              alt="poster"
            />
            <div className="detailInfo">
              <h1 className="movieTitle">
                {detail.title}{" "}
                <span style={{ color: "#A6A6A6" }}>
                  {"(" + detail.release_date?.split("-")[0] + ")"}
                </span>
              </h1>
              <p className="movieReleaseDuration">
                {detail.release_date?.split("-").reverse().join("-")} •{" "}
                {minutesToHHMM(detail.runtime)}
              </p>
              <div style={{ padding: "10px 0px 10px 0px" }}>
                <Box
                  className="usersRating"
                  sx={{ position: "relative", display: "inline-flex" }}
                >
                  <CircularProgress
                    variant="determinate"
                    value={detail.vote_average * 10}
                    color="error"
                    size="50px"
                  />
                  <Box
                    sx={{
                      top: 0,
                      left: 0,
                      bottom: 0,
                      right: 0,
                      position: "absolute",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <p style={{ color: "white", fontFamily: "Rambla-Bold" }}>
                      {detail.vote_average * 10 + "%"}
                    </p>
                  </Box>
                  <p
                    style={{
                      position: "absolute",
                      left: "65px",
                      bottom: "-15px",
                      fontFamily: "Roboto-Bold",
                      width: "50px",
                      fontSize: "0.9rem",
                      color: "rgb(166, 166, 166)",
                    }}
                  >
                    Puntuación de Usuario
                  </p>
                </Box>
              </div>
              <p className="tagline">{detail.tagline}</p>
              <h2 className="resume">Vista General</h2>
              <p className="overview">{detail.overview}</p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  columnGap: "10px",
                }}
              >
                {genresList}
              </div>
              <div className="buttonList">
                {movieList ? (
                  movieList?.movies_watched.includes(Number(id)) ? (
                    <Button
                      className="removeToList"
                      disabled={
                        movieList?.fav_movies.includes(Number(id))
                          ? true
                          : false
                      }
                    >
                      Quitar de Mi Lista
                    </Button>
                  ) : (
                    <Button className="addToList">Agregar a Mi Lista</Button>
                  )
                ) : (
                  <Button className="addToList">...</Button>
                )}
                <div
                  className="addToList"
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "20px",
                    cursor: "pointer",
                  }}
                  onClick={() => handleOpenVideo()}
                >
                  <p style={{ textAlign: "center" }}>▶</p>
                </div>
                {movieList ? (
                  movieList?.fav_movies.includes(Number(id)) ? (
                    <IconButton
                      className="removeToList"
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "20px",
                        cursor: "pointer",
                      }}
                      onClick={() => console.log("QUITAR")}
                    >
                      <p style={{ textAlign: "center" }}>❤</p>
                    </IconButton>
                  ) : (
                    <IconButton
                      className="addToList"
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "20px",
                        cursor: "pointer",
                      }}
                      onClick={() => console.log("AGREGAR")}
                      disabled={
                        movieList?.movies_watched.includes(Number(id))
                          ? false
                          : true
                      }
                    >
                      <p style={{ textAlign: "center" }}>❤</p>
                    </IconButton>
                  )
                ) : (
                  <IconButton
                    className="addToList"
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "20px",
                      cursor: "pointer",
                    }}
                  >
                    <p style={{ textAlign: "center" }}>...</p>
                  </IconButton>
                )}
                <p
                  style={{
                    fontFamily: "Roboto-Regular",
                    color: "white",
                    fontSize: "0.8rem",
                  }}
                >
                  {movieList?.fav_movies.includes(Number(id))
                    ? "Quitar de mis Favoritos"
                    : "Marcar como Favorito"}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="castListContainer">
          <div className="castList">
            <h1
              style={{
                fontFamily: "Rambla-Bold",
                color: "white",
                fontSize: "1.5rem",
              }}
            >
              Reparto Principal
            </h1>
            <Carousel
              responsive={responsive}
              centerMode={true}
              itemClass="carousel-item-padding-20-px"
              className="carousel"
            >
              {castList}
            </Carousel>
          </div>
        </div>
        <div className="castListContainer" style={{ borderBottom: "none" }}>
          <div className="castList">
            <h1
              style={{
                fontFamily: "Rambla-Bold",
                color: "white",
                fontSize: "1.5rem",
                margin: "10px 0px 0px 0px",
              }}
            >
              Comentarios
            </h1>
            <Comment />
            <Comment />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default MovieDetail;
