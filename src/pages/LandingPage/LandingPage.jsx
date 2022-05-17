import "./_LandingPage.scss";
import { Button, Modal, Box, TextField } from "@mui/material";

import Imagenes from "../../images/imagenes";
import LandingPageCard from "../../components/landingPageCards/LandingPageCard";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  loginUserAsync,
  selectUserLoggued,
  alertUser,
  createUserAsync,
  userCreated,
} from "../../slices/userSlice";
import { cloudinary_constant } from "../../functions/cloudinaryWidget";
import Notifications from "../../components/notifications/Notifications";
import NotificationRegistration from "../../components/notifications/NotificationRegistration";

const LandingPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [photoUserUrl, setPhotoUserUrl] = useState();
  const [photoName, setPhotoName] = useState("Foto de Perfil...");
  const [registerSuccess, setRegisterSuccess] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    const { elements } = e.target;

    const user = {
      email: elements[0].value,
      password: elements[2].value,
    };
    dispatch(loginUserAsync(user));
  };

  //------LOGIN USER-------------------------------------------
  const stateLoggedUser = JSON.parse(localStorage.getItem("infoUser"))?.token;
  const logguedUser = useSelector(selectUserLoggued);
  const alertOnUser = useSelector(alertUser) ?? false;

  useEffect(() => {
    if (stateLoggedUser) {
      navigate("/principalpage");
    }
  }, [stateLoggedUser]);

  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);

  const handleOpenLogin = () => setOpenLogin(true);
  const handleCloseLogin = () => setOpenLogin(false);
  const handleOpenRegister = () => setOpenRegister(true);
  const handleCloseRegister = () => setOpenRegister(false);

  const handleChangeRegisterToLogin = () => {
    handleCloseRegister();
    handleOpenLogin();
  };
  const handleChangeLoginToRegister = () => {
    handleCloseLogin();
    handleOpenRegister();
  };

  //-----REGISTER LOGIN----------------------------
  const userStateCreated = useSelector(userCreated);

  const handleRegister = async (e) => {
    e.preventDefault();
    const { elements } = e.target;
    const dataUser = {
      name: elements[0].value,
      email: elements[2].value,
      password: elements[4].value,
      photo_url: photoUserUrl, //CLOUDINARY
    };
    await dispatch(createUserAsync(dataUser));
    handleCloseRegister();
  };

  useEffect(() => {
    if (userStateCreated) setRegisterSuccess(true);
  }, [userStateCreated]);

  //-----CLOUDINARY--------------------
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
    <div>
      <section className="section__One">
        <img src={Imagenes.img1} className="logoName" alt=""></img>
        <div className="sectionContainer">
          <p className="question">Quieres Saber que tan FilManiatico eres?</p>

          <h2 className="answer">
            DESCUBRE CUÁNTAS PELICULAS HAS VISTO Y REGÍSTRALAS AQUÍ
          </h2>
          <div className="buttonGroup">
            <Button
              onClick={handleOpenLogin}
              variant="contained"
              className="botonHome"
              data-test-id="enter-login"
            >
              Iniciar Sesión
            </Button>
            <Modal
              open={openLogin}
              onClose={handleCloseLogin}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <form onSubmit={handleLogin}>
                <Box className="boxModal">
                  <div className="modalUpperHead">
                    <img src={Imagenes.img9} className="logoBlack" alt=""></img>
                    <p className="modalTitle">Bienvenido a FilManiatics</p>
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
                    >
                      <TextField
                        required
                        id="email"
                        type="email"
                        label="Correo electrónico"
                        data-test-id="login-email"
                      />
                      <TextField
                        type="password"
                        required
                        id="password"
                        label="Contraseña"
                        data-test-id="login-password"
                      />
                    </Box>
                    <Button
                      variant="contained"
                      className="botonLogin"
                      type="submit"
                      data-test-id="login-success"
                    >
                      Iniciar Sesión
                    </Button>
                    <div
                      style={{
                        width: "62%",
                        border: "1px solid #020118",
                      }}
                    ></div>
                  </div>
                  <div className="modalLower">
                    <p className="modalLowerText">
                      ¿No tienes una cuenta?{" "}
                      <Button
                        className="linkTo"
                        onClick={handleChangeLoginToRegister}
                      >
                        Regístrate Aquí
                      </Button>
                    </p>
                  </div>
                </Box>
              </form>
            </Modal>
            <Button
              onClick={handleOpenRegister}
              variant="contained"
              className="botonHome"
              data-test-id="enter-register"
            >
              Regístrate
            </Button>
            <Modal
              open={openRegister}
              onClose={handleCloseRegister}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <form onSubmit={handleRegister}>
                <Box className="boxModal">
                  <div className="modalUpperHead">
                    <img src={Imagenes.img9} className="logoBlack" alt=""></img>
                    <p className="modalTitle">Regístrate</p>
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
                        required
                        id="name"
                        label="Nombres y Apellidos"
                        data-test-id="name-register"
                      />
                      <TextField
                        required
                        id="email"
                        type="email"
                        label="Correo electrónico"
                        data-test-id="email-register"
                      />
                      <TextField
                        type="password"
                        required
                        id="password"
                        label="Contraseña"
                        data-test-id="password-register"
                      />
                      <div className="photoContainer">
                        <span className="uploadText">{photoName}</span>
                        <label htmlFor="contained-button-file">
                          <Button
                            variant="contained"
                            className="buttonChoose"
                            component="span"
                            onClick={showWidgetPhotoUser}
                            data-test-id="choose-file"
                          >
                            Choose File
                          </Button>
                        </label>
                      </div>
                    </Box>
                    <Button
                      variant="contained"
                      className="botonLogin"
                      type="submit"
                      data-test-id="end-register"
                    >
                      Registrarse
                    </Button>
                    <div
                      style={{
                        width: "62%",
                        border: "1px solid #020118",
                      }}
                    ></div>
                  </div>
                  <div className="modalLower">
                    <p className="modalLowerText">
                      ¿Ya tienes una cuenta?{" "}
                      <Button
                        className="linkTo"
                        onClick={handleChangeRegisterToLogin}
                      >
                        Inicia Sesión
                      </Button>
                    </p>
                  </div>
                </Box>
              </form>
            </Modal>
          </div>
        </div>
      </section>
      <section className="section__Two">
        <div className="whatIs">
          <div className="textContainer">
            <p>
              Busca, agrega o comenta tus películas favoritas y descubre que tan
              fanático del cine eres.
            </p>
          </div>
        </div>
      </section>
      <section className="section__Three">
        <LandingPageCard
          info="INICIA SESIÓN EN LA APLICACIÓN"
          img={Imagenes.img5}
        />
        <LandingPageCard
          info="BUSCA PELICULAS QUE HAYAS VISTO"
          img={Imagenes.img6}
        />
        <LandingPageCard
          info="AGRÉGALAS A TU LISTA DE PELICULAS YA VISTAS"
          img={Imagenes.img7}
        />
        <LandingPageCard
          info="PUEDES DEJAR TU OPINION SOBRE LA PELICULA QUE YA HAYAS VISTO "
          img={Imagenes.img8}
        />
      </section>
      <Notifications
        alertOnUser={alertOnUser}
        message="Correo o Contraseña Incorrectos"
      />
      <NotificationRegistration
        alertOnRegistration={registerSuccess}
        message="Usuario Creado Correctamente!!"
      />
      <footer className="footerHome">
        <div className="footerImages">
          <p>Síguenos</p>
          <img src={Imagenes.img2} className="redesSociales" alt=""></img>
          <img src={Imagenes.img3} className="redesSocialesIG" alt=""></img>
          <img src={Imagenes.img4} className="redesSociales" alt=""></img>
        </div>
        <p className="footerEnd">Filmaniatics - 2022 ©</p>
      </footer>
    </div>
  );
};

export default LandingPage;
