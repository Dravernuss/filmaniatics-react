import { Avatar, IconButton, Modal } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Imagenes from "../../images/imagenes";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./_MyList.scss";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import {
  movList,
  favList,
  getOneMovieListAsync,
  getFavoriteMovies,
  getMovies,
  myList,
} from "../../slices/movielistSlice";
import { useDispatch, useSelector } from "react-redux";
import getLevel from "../../functions/getLevel";
import MovieCard from "../../components/MovieCard/MovieCard";

const MyList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [openInfo, setOpenInfo] = useState(false);
  const handleOpenInfo = () => setOpenInfo(true);
  const handleCloseInfo = () => setOpenInfo(false);
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (searchTerm) {
      //   navigate(`/search/${searchTerm}`);
    }
  };
  const handleOnChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const userID = JSON.parse(localStorage.getItem("infoUser"))._id;
  const movieList = useSelector(myList);
  const favMovieList = useSelector(favList);
  const moviesWatchedList = useSelector(movList);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!movieList) dispatch(getOneMovieListAsync(userID));
  }, []);

  const fetchAPI = async () => {
    dispatch(getMovies(movieList));
    dispatch(getFavoriteMovies(movieList));
  };

  useEffect(() => {
    if (movieList) {
      fetchAPI();
    }
  }, [movieList]);

  const responsive = {
    desktop: {
      breakpoint: { max: 2000, min: 1700 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1700, min: 1200 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 1200, min: 0 },
      items: 1,
      centerMode: false,
    },
  };

  return (
    <div className="backgroundList">
      <div>
        <Navbar />
        <div className="listHeader">
          <h1 className="myList">Mi Lista</h1>
          <form onSubmit={handleOnSubmit} className="searchInList">
            <input
              className="searchInputList"
              type="search"
              placeholder="Buscar Películas"
              value={searchTerm}
              onChange={handleOnChange}
            />
            <button type="submit" className="searchButtonList">
              <img src={Imagenes.img15} className="lupaList" alt="lupa" />
            </button>
          </form>
          <div className="totalMovies">
            <p className="totalWord">Total</p>
            <p className="amountMovies">{movieList?.total_movies}</p>
            <p className="levelUser">{getLevel(movieList?.total_movies)}</p>
            <IconButton onClick={handleOpenInfo} className="iconButtonList">
              <Avatar alt="" src={Imagenes.img12} className="movieImageList" />
            </IconButton>
            <Modal
              open={openInfo}
              onClose={handleCloseInfo}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box className="boxModal">
                <div className="modalUpperHead">
                  <img src={Imagenes.img14} width="100" alt=""></img>
                  <p className="modalTitle">Niveles de FilManiatics</p>
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
                    <p className="levelText">
                      • <span>Iniciado</span> (0-20 Peliculas Vistas o
                      Valoradas)
                    </p>
                    <p className="levelText">
                      • <span style={{ color: "#217D00" }}>Novato</span> (21-40
                      Peliculas Vistas o Valoradas)
                    </p>
                    <p className="levelText">
                      • <span style={{ color: "#0E0062" }}>Conocedor</span>{" "}
                      (41-60 Peliculas Vistas o Valoradas)
                    </p>
                    <p className="levelText">
                      • <span style={{ color: "#584B28" }}>Experto</span>{" "}
                      (61-100 Peliculas Vistas o Valoradas)
                    </p>
                    <p className="levelText">
                      • <span style={{ color: "#C39500" }}>FilManiatico</span>{" "}
                      (+100 Peliculas Vistas o Valoradas)
                    </p>
                  </Box>
                </div>
              </Box>
            </Modal>
          </div>
        </div>
        <div className="listBody">
          <Accordion defaultExpanded className="accordion">
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <p className="accordionTitle">Favoritos</p>
            </AccordionSummary>
            <div style={{ marginLeft: "5%", paddingBottom: "20px" }}>
              <Carousel
                responsive={responsive}
                centerMode={true}
                itemClass="carousel-item-padding-20-px"
                className="carousel"
              >
                {favMovieList ? (
                  favMovieList.map((item, index) => (
                    <MovieCard
                      key={index}
                      text={item?.release.split("-").reverse().join("-")}
                      title={item?.title}
                      imgsrc={item?.poster}
                      rating={item?.rating}
                      id={item?.id}
                    />
                  ))
                ) : (
                  <h1>Loading favorites... </h1>
                )}
              </Carousel>
            </div>
          </Accordion>
          <Accordion className="accordion">
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <p className="accordionTitle">Agregados Recientemente</p>
            </AccordionSummary>
            <div style={{ marginLeft: "5%", paddingBottom: "20px" }}>
              <Carousel
                responsive={responsive}
                centerMode={true}
                itemClass="carousel-item-padding-20-px"
                className="carousel"
              >
                {moviesWatchedList ? (
                  moviesWatchedList
                    .slice(moviesWatchedList.length - 5)
                    .map((item, index) => (
                      <MovieCard
                        key={index}
                        text={item?.release.split("-").reverse().join("-")}
                        title={item?.title}
                        imgsrc={item?.poster}
                        rating={item?.rating}
                        id={item?.id}
                      />
                    ))
                ) : (
                  <h1>Loading movies... </h1>
                )}
              </Carousel>
            </div>
          </Accordion>
          <Accordion className="accordion">
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <p className="accordionTitle">Peliculas Vistas</p>
            </AccordionSummary>
            <div style={{ marginLeft: "5%", paddingBottom: "20px" }}>
              <Carousel
                responsive={responsive}
                centerMode={true}
                itemClass="carousel-item-padding-20-px"
                className="carousel"
              >
                {moviesWatchedList ? (
                  moviesWatchedList.map((item, index) => (
                    <MovieCard
                      key={index}
                      text={item?.release.split("-").reverse().join("-")}
                      title={item?.title}
                      imgsrc={item?.poster}
                      rating={item?.rating}
                      id={item?.id}
                    />
                  ))
                ) : (
                  <h1>Loading movies... </h1>
                )}
              </Carousel>
            </div>
          </Accordion>
        </div>
      </div>
    </div>
  );
};
export default MyList;
