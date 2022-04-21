import "./_LandingPage.scss";
import { Button } from "@mui/material";
import Imagenes from "../../images/imagenes";
import LandingPageCard from "../../components/landingPageCards/LandingPageCard";

const LandingPage = () => {
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
            <Button href="/" variant="contained" className="botonHome">
              Iniciar Sesión
            </Button>
            <Button variant="contained" className="botonHome">
              Regístrate
            </Button>
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
      <footer className="footerHome">
        <div className="footerImages">
          <p>Síguenos</p>
          <img src={Imagenes.img2} className="redesSociales" alt=""></img>
          <img src={Imagenes.img3} className="redesSocialesIG" alt=""></img>
          <img src={Imagenes.img4} className="redesSociales" alt=""></img>
        </div>
        <p className="footerEnd">WalkingPet - 2022 ©</p>
      </footer>
    </div>
  );
};

export default LandingPage;
