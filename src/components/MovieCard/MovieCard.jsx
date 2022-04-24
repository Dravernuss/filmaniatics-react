import "./_MovieCard.scss";
import Imagenes from "../../images/imagenes";
import { Button } from "@mui/material";
const MovieCard = () => {
  return (
    <div className="cardContainer">
      <img src={Imagenes.img11} className="movieImage" alt="" />
      <div className="movieDetail">
        <div className="movieTitleContainer">
          <p className="movieTitle">SpiderMan: No way Home</p>
          <Button className="favorite">❤</Button>
        </div>

        <p className="movieDate">Fecha de Estreno: 21/02/2022</p>
      </div>
    </div>
  );
};

export default MovieCard;
