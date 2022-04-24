import "./_Footer.scss";
import Imagenes from "../../images/imagenes";

const Footer = () => {
  return (
    <div className="footerContainer">
      <p className="filmaniatics">FilManiatics - 2022 ©</p>
      <div className="tmdbContainer">
        <img src={Imagenes.img13} className="tmdbImage" alt="" />
        <p className="tmdbText">
          This product uses the TMDB API but is not endorsed or certified by
          TMDB.
        </p>
      </div>
    </div>
  );
};

export default Footer;
