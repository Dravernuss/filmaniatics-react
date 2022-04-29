import { Avatar } from "@mui/material";
import Imagenes from "../../images/imagenes";
import "./_Comment.scss";

const Comment = () => {
  return (
    <div className="commentContainer">
      <div className="leftPart">
        <Avatar alt="" src={Imagenes.img10} className="userImage" />

        <p className="commentText">
          Comentario Comentario Comentario ComentarioComentario Comentario
          Comentario ComentariComentario Comentario Comentario Comentario
          ComentarioComentario Comentario
        </p>
      </div>
      <div className="rigthPart">
        <p className="commentInfo">Fecha de Creacion de Comentario</p>
        <p className="commentInfo">Nombre del Comentador</p>
      </div>
    </div>
  );
};

export default Comment;
