import "./_Profile.scss";
import Imagenes from "../../images/imagenes";
import Navbar from "../../components/navbar/Navbar";
import { Button, Modal, Box, TextField } from "@mui/material";

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
          <img src={Imagenes.img10} className="logoName" alt=""></img>
          <div className="editProfile">
            <p className="name">Esteban Rodas</p>
            <p className="correo">Correo: esteban@gmail.com</p>
            <Button>Editar Perfil</Button>
          </div>
          <div className="descriptionContainer">
            <p className="memberSince">Miembro desde abril del 2022 </p>
            <p className="description">
              DESCRIPCIONDESCRIPCIONDESCRIPCIONDESCRIPCIONDESCRIPCIONDESCRIPCIONDESCRIPCIONDESCRIPCIONDESCRIPC
            </p>
            <p className="generoFav">Género Favorito: COMEDIA </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
