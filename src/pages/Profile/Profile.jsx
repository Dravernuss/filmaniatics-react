import "./_Profile.scss";
import Imagenes from "../../images/imagenes";
import Navbar from "../../components/navbar/Navbar";
import { Button, Modal, Box, TextField } from "@mui/material";
import Carousel from "../../components/Carousel/Carousel";
import Footer from "../../components/Footer/Footer";

const Profile = () => {
  return (
    <div
      className="backgroundProfile"
      style={{
        background: `linear-gradient(180deg,rgba(3, 0, 39, 0.5355) 18.75%,rgba(3, 0, 39, 0.799) 45.31%,rgba(3, 0, 39, 0.85) 100%),url("http://image.tmdb.org/t/p/w1280/iQFcwSGbZXMkeyKrxbPnwnRo5fl.jpg") `,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        position: "relative",
      }}
    >
      <div>
        <Navbar />
        <div className="infoUser">
          <img src={Imagenes.img10} className="profileImage" alt=""></img>
          <div className="editProfile">
            <p className="name">Esteban Rodas</p>
            <p className="correo">Correo: esteban@gmail.com</p>
            <Button className="editButton">Editar Perfil</Button>
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
              <Button>
                <img src={Imagenes.img12} className="movieImage" alt="" />
              </Button>
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
        <Footer />
      </div>
    </div>
  );
};

export default Profile;
