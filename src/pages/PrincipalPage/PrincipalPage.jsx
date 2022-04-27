import "./_PrincipalPage.scss";
import Navbar from "../../components/navbar/Navbar";
import Carousel from "../../components/Carousel/Carousel";
import Footer from "../../components/Footer/Footer";

const PrincipalPage = () => {
  return (
    <div className="background">
      <div>
        <Navbar />
        <div className="ppContainer">
          <div className="welcome">
            <h1 className="welcomeName">Bienvenido Esteban Rodas.</h1>
            <p className="welcomeText">
              Millones de películas, referencias y calificaciones por descubrir.
              Explora ahora.
            </p>
          </div>
          <div className="popular">
            <h2 className="popularTitle">Lo Más Popular</h2>
            <Carousel />
          </div>
          <div className="popular">
            <h2 className="popularTitle">Tendencias</h2>
            <Carousel />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default PrincipalPage;
