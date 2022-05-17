import "./_Profile.scss";
import Imagenes from "../../images/imagenes";
import Navbar from "../../components/navbar/Navbar";
import {
  Button,
  Modal,
  Box,
  IconButton,
  Avatar,
  TextField,
} from "@mui/material";
import Carousel from "react-multi-carousel";
import Footer from "../../components/Footer/Footer";
import { useEffect, useState } from "react";
import getLevel from "../../functions/getLevel";
import MESES from "../../constants/month";
import { useDispatch, useSelector } from "react-redux";
import { toUser, updateUserAsync, userToEdit } from "../../slices/userSlice";
import { cloudinary_constant } from "../../functions/cloudinaryWidget";
import {
  favList,
  getOneMovieListAsync,
  getFavoriteMovies,
  myList,
} from "../../slices/movielistSlice";
import MovieCard from "../../components/MovieCard/MovieCard";
import * as _ from "lodash";

const Profile = () => {
  const [openInfo, setOpenInfo] = useState(false);
  const [openEditProfile, setOpenEditProfile] = useState(false);
  const [photoName, setPhotoName] = useState("Foto de Perfil...");
  const [photoUserUrl, setPhotoUserUrl] = useState();

  const movieList = useSelector(myList);
  const favMovieList = useSelector(favList);

  const handleCloseEditProfile = () => setOpenEditProfile(false);

  const handleOpenInfo = () => setOpenInfo(true);
  const handleCloseInfo = () => setOpenInfo(false);

  const user = useSelector(toUser);
  const userID = JSON.parse(localStorage.getItem("infoUser"))._id;
  const dispatch = useDispatch();

  const handleOpenEditProfile = async () => {
    setPhotoName("Foto de Perfil..."); // cloudinary state
    await dispatch(userToEdit(user));
    setPhotoUserUrl(user.photo_url); // chose file.... change state
    setOpenEditProfile(true);
  };

  const handleEditProfile = async (e) => {
    e.preventDefault();
    const { elements } = e.target;
    const dataUser = {
      name: elements[0].value,
      email: elements[2].value,
      fav_genre: elements[4].value,
      description: elements[6].value,
      photo_url: photoUserUrl, //CLOUDINARY
    };

    dispatch(userToEdit(dataUser));
    await dispatch(updateUserAsync({ id: userID, ...dataUser }));
    handleCloseEditProfile();
  };

  useEffect(() => {
    if (!movieList) dispatch(getOneMovieListAsync(userID));
  }, []);

  //----------------------CLOUDINARY------------------------------------------------
  const showWidgetPhotoUser = () => {
    window.cloudinary.openUploadWidget(
      cloudinary_constant("filmaniatics"),
      (err, result) => {
        if (!err && result?.event === "success") {
          const { secure_url, original_filename, format } = result.info;
          setPhotoUserUrl(secure_url);
          setPhotoName(`${original_filename}.${format}`);
        }
      }
    );
  };

  // Favorite Movies -------------------------------------
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

  const fetchAPI = async () => {
    dispatch(getFavoriteMovies(movieList));
  };

  useEffect(() => {
    if (movieList) {
      fetchAPI();
    }
  }, [movieList]);

  // -----------------------------------------------------

  const empty = _.isEmpty(favMovieList);

  return (
    <div className="backgroundProfile">
      <div
        style={{
          background: `linear-gradient(180deg,rgba(3, 0, 39, 0.5355) 18.75%,rgba(3, 0, 39, 0.799) 45.31%,rgba(3, 0, 39, 0.85) 100%),url(${
            !empty
              ? favMovieList[Math.floor(Math.random() * favMovieList.length)]
                  .backPoster
              : "https://wallpaperaccess.com/full/2063931.jpg"
          }) no-repeat center center / cover`,
        }}
      >
        <Navbar />
        <div className="infoUser">
          <img
            src={user?.photo_url ? user?.photo_url : Imagenes.img17}
            className="profileImage"
            alt=""
          ></img>
          <div className="editProfile">
            <p className="name" data-test-id="name-profile">
              {user?.name}
            </p>
            <p className="correo">Correo: {user?.email}</p>
            <Button
              className="editButton"
              onClick={handleOpenEditProfile}
              data-test-id="edit-profile"
            >
              Editar Perfil
            </Button>
            <Modal
              open={openEditProfile}
              onClose={handleCloseEditProfile}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <form onSubmit={handleEditProfile}>
                <Box className="boxModal">
                  <div className="modalUpperHead">
                    <img src={Imagenes.img9} className="logoBlack" alt=""></img>
                    <p className="modalTitle">Editar Perfil</p>
                  </div>
                  <div className="modalBody">
                    <Box
                      component="div"
                      sx={{
                        "& .MuiTextField-root": { m: 1, width: "100%" },
                      }}
                      noValidate
                      autoComplete="off"
                      className="modalBodyBox"
                    >
                      <TextField
                        type="text"
                        id="name"
                        label="Nombres y Apellidos"
                        defaultValue={user?.name}
                        data-test-id="edit-name"
                      />
                      <TextField
                        id="email"
                        type="email"
                        label="Correo electrónico"
                        defaultValue={user?.email}
                        data-test-id="edit-email"
                      />
                      <TextField
                        type="text"
                        id="genre"
                        label="Género Favorito"
                        defaultValue={user?.fav_genre}
                        data-test-id="edit-genre"
                      />
                      <TextField
                        type="text"
                        id="outlined-multiline-static"
                        label="Descripción"
                        multiline
                        rows={4}
                        defaultValue={user?.description}
                        data-test-id="edit-description"
                      />
                      <div className="photoContainer">
                        <span className="uploadText">{photoName}</span>
                        <label htmlFor="contained-button-file">
                          <Button
                            variant="contained"
                            className="buttonChoose"
                            component="span"
                            onClick={showWidgetPhotoUser}
                          >
                            Choose File
                          </Button>
                        </label>
                      </div>
                    </Box>
                    <Button
                      variant="contained"
                      className="botonLogin"
                      style={{ marginBottom: "0px" }}
                      type="submit"
                      data-test-id="edit-finished"
                    >
                      Editar Perfil
                    </Button>
                    <Button
                      variant="contained"
                      className="botonLogin"
                      onClick={handleCloseEditProfile}
                    >
                      Cancelar
                    </Button>
                  </div>
                </Box>
              </form>
            </Modal>
          </div>
          <div className="descriptionContainer">
            <p className="memberSince">
              Miembro desde{" "}
              {
                MESES[
                  new Date(user?.created_at)
                    .toLocaleString()
                    .split(" ")[0]
                    .split("/")[1]
                ]
              }{" "}
              del{" "}
              {
                new Date(user?.created_at)
                  .toLocaleString()
                  .split(" ")[0]
                  .split("/")[2]
              }
            </p>
            <p className="description" data-test-id="description-profile">
              {user?.description}
            </p>
            <p className="generoFav" data-test-id="genre-profile">
              Género Favorito: {user?.fav_genre}{" "}
            </p>
          </div>
        </div>
        <div className="dataUser">
          <div className="favoriteMovies">
            <p className="favoriteText">PELICULAS FAVORITAS:</p>
            {!empty ? (
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
            ) : (
              <div className="noFavsMovies">
                <img src={Imagenes.img18} className="noFavsImage" alt=""></img>
                <p className="noFavsText">NO TIENES PELICULAS FAVORITAS</p>
              </div>
            )}
          </div>
          <div className="dataStats">
            <div className="openModalTop">
              <p className="estadisticas">ESTADÍSTICAS:</p>
              <IconButton onClick={handleOpenInfo} className="iconButton">
                <Avatar alt="" src={Imagenes.img12} className="movieImage" />
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
                        • <span style={{ color: "#217D00" }}>Novato</span>{" "}
                        (21-40 Peliculas Vistas o Valoradas)
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
            <p className="statText">Total de Peliculas Vistas:</p>
            <div className="openModal">
              <p className="number">{movieList?.total_movies}</p>
              <p className="level">{getLevel(movieList?.total_movies)}</p>
            </div>
            <p className="statText">Total de Valoraciones Realizadas:</p>
            <div className="openModal">
              <p className="number">{user?.total_comments}</p>
              <p className="level">{getLevel(user?.total_comments)}</p>
            </div>
          </div>
        </div>
        <div style={{ height: "30px", background: "#091637" }}></div>
        <Footer />
      </div>
    </div>
  );
};

export default Profile;
