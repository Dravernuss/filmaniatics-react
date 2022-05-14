import { Avatar } from "@mui/material";
import Imagenes from "../../images/imagenes";
import "./_Comment.scss";

const Comment = ({ photo, comment, date, name }) => {
  return (
    <div className="commentContainer">
      <div className="leftPart">
        {photo === "" ? (
          <Avatar alt="" src="" className="userImage" />
        ) : (
          <Avatar alt="" src={`${photo}`} className="userImage" />
        )}
        <p className="commentText">{comment}</p>
      </div>
      <div className="rigthPart">
        <p className="commentInfo">
          {new Date(date).toLocaleString().split(" ")[0]}
        </p>
        <p className="commentInfo">{name}</p>
      </div>
    </div>
  );
};

export default Comment;
