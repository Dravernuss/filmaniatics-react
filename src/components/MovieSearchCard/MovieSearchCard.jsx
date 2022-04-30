import "./_MovieSearchCard.scss";
import Imagenes from "../../images/imagenes";
import { useNavigate } from "react-router-dom";
import { Rating } from "@mui/material";

const MovieSearchCard = ({ imgsrc, title, release, id, rating, overview }) => {
  const navigate = useNavigate();
  return (
    <div className="cardSearchContainer">
      {imgsrc ? (
        <img
          src={`${imgsrc}`}
          className="movieSearchImage"
          alt=""
          onClick={() => navigate(`/movie/${id}`)}
        />
      ) : (
        <img src={Imagenes.img16} className="movieSearchImage" alt="" />
      )}
      <div className="infoContainer">
        <h1 className="titleMovie" onClick={() => navigate(`/movie/${id}`)}>
          {title ? title : "No Data"}
        </h1>
        <p className="releaseMovie">
          Fecha de Estreno: {release ? release : "No Data"}
        </p>
        <p className="overviewMovie">
          Sinopsis: {overview ? overview : "No Info Available"}
        </p>

        <p className="ratingMovie">Valoracion: {rating ? rating : "No Data"}</p>
        <Rating
          name="customized-10"
          className="stars"
          value={rating ? rating : 0}
          max={10}
          precision={0.5}
          readOnly
        />
      </div>
    </div>
  );
};

export default MovieSearchCard;
