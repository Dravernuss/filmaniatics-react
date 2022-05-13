import "./_MovieCard.scss";
import Imagenes from "../../images/imagenes";
import { useNavigate } from "react-router-dom";

const MovieCard = ({ imgsrc, title, text, id, rating }) => {
  const navigate = useNavigate();
  return (
    <div className="cardContainer">
      {imgsrc ? (
        <img
          src={`${imgsrc}`}
          className="movieImage"
          alt=""
          onClick={() => navigate(`/movie/${id}`)}
        />
      ) : (
        <img src={Imagenes.img16} className="movieImage" alt="" />
      )}
      <div className="movieDetail">
        <div className="movieTitleContainer">
          <p className="movieTitle" onClick={() => navigate(`/movie/${id}`)}>
            {title ? title : "No Data"}
          </p>
        </div>
        <p className="movieDate">
          {text ? `Fecha de Estreno: ${text}` : `Fecha de Estreno: No Data`}
        </p>
        <p className="movieDate">
          {rating ? `Puntuación: ${rating * 10}%` : `Puntuación: No Data`}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;
