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

const Profile = () => {
  const [openInfo, setOpenInfo] = useState(false);
  const [openEditProfile, setOpenEditProfile] = useState(false);
  const [photoName, setPhotoName] = useState("Foto de Perfil...");

  const handleOpenEditProfile = () => setOpenEditProfile(true);
  const handleCloseEditProfile = () => setOpenEditProfile(false);

  const handleOpenInfo = () => setOpenInfo(true);
  const handleCloseInfo = () => setOpenInfo(false);
  return (
    <div
      className="backgroundProfile"
      style={{
        background: `linear-gradient(180deg,rgba(3, 0, 39, 0.5355) 18.75%,rgba(3, 0, 39, 0.799) 45.31%,rgba(3, 0, 39, 0.85) 100%),url("http://image.tmdb.org/t/p/w1280/iQFcwSGbZXMkeyKrxbPnwnRo5fl.jpg") no-repeat center center / cover`,
      }}
    >
      <div>
        <Navbar />
        <div className="infoUser">
          <img src={Imagenes.img10} className="profileImage" alt=""></img>
          <div className="editProfile">
            <p className="name">Esteban Rodas</p>
            <p className="correo">Correo: esteban@gmail.com</p>
            <Button className="editButton" onClick={handleOpenEditProfile}>
              Editar Perfil
            </Button>
            <Modal
              open={openEditProfile}
              onClose={handleCloseEditProfile}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
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
                    />
                    <TextField
                      id="email"
                      type="email"
                      label="Correo electrónico"
                    />
                    <TextField type="text" id="genre" label="Género Favorito" />
                    <TextField
                      type="text"
                      id="outlined-multiline-static"
                      label="Descripción"
                      multiline
                      rows={4}
                    />
                    <div className="photoContainer">
                      <span className="uploadText">{photoName}</span>
                      <label htmlFor="contained-button-file">
                        <Button
                          variant="contained"
                          className="buttonChoose"
                          component="span"
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
            </Modal>
          </div>
          <div className="descriptionContainer">
            <p className="memberSince">Miembro desde abril del 2022 </p>
            <p className="description">
              DESCRIPCIONDESCRIPC ONDESCRI PCIONDESCRIPCIOND ESCRIPC
              IONDESCRIPCIONDESCR IPCIONDESCRIPCIONDESCRIPC
            </p>
            <p className="generoFav">Género Favorito: COMEDIA </p>
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
              <p className="level">Novato</p>
            </div>
            <p className="statText">Total de Valoraciones Realizadas:</p>
            <div className="openModal">
              <p className="number">8</p>
              <p className="level">Iniciado</p>
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
