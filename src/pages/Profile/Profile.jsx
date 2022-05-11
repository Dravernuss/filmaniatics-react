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
import Carousel from "../../components/Carousel/Carousel";
import Footer from "../../components/Footer/Footer";
import { useState } from "react";
import getLevel from "../../functions/getLevel";
import MESES from "../../constants/month";
import { useDispatch, useSelector } from "react-redux";
import { toUser, updateUserAsync, userToEdit } from "../../slices/userSlice";
import { cloudinary_constant } from "../../functions/cloudinaryWidget";

const Profile = () => {
  const [openInfo, setOpenInfo] = useState(false);
  const [openEditProfile, setOpenEditProfile] = useState(false);
  const [photoName, setPhotoName] = useState("Foto de Perfil...");
  const [photoUserUrl, setPhotoUserUrl] = useState();

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

  return (
    <div className="backgroundProfile">
      <div
        style={{
          background: `linear-gradient(180deg,rgba(3, 0, 39, 0.5355) 18.75%,rgba(3, 0, 39, 0.799) 45.31%,rgba(3, 0, 39, 0.85) 100%),url("http://image.tmdb.org/t/p/w1280/iQFcwSGbZXMkeyKrxbPnwnRo5fl.jpg") no-repeat center center / cover`,
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
            <p className="name">{user?.name}</p>
            <p className="correo">Correo: {user?.email}</p>
            <Button className="editButton" onClick={handleOpenEditProfile}>
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
                      />
                      <TextField
                        id="email"
                        type="email"
                        label="Correo electrónico"
                        defaultValue={user?.email}
                      />
                      <TextField
                        type="text"
                        id="genre"
                        label="Género Favorito"
                        defaultValue={user?.fav_genre}
                      />
                      <TextField
                        type="text"
                        id="outlined-multiline-static"
                        label="Descripción"
                        multiline
                        rows={4}
                        defaultValue={user?.description}
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
            <p className="description">{user?.description}</p>
            <p className="generoFav">Género Favorito: {user?.fav_genre} </p>
          </div>
        </div>
        <div className="dataUser">
          <div className="favoriteMovies">
            <p className="favoriteText">PELICULAS FAVORITAS:</p>
            <Carousel />
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
              <p className="number">22</p>
              <p className="level">{getLevel(user?.total_comments)}</p>
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
