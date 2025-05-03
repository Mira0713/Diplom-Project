import "./styles.scss";
import UserAvatar from "assets/img/userAvatar.png";

const CommentsList = ({ comments }) => {
  return (
    <div className="commentsList">
      {comments.map((item) => (
        <div key={item.id} className="commentItem">
          <div className="userInfo">
            {/* <div className="userAvatar"></div> */}
            <img
              src={item.user?.avatar || UserAvatar}
              alt="Аватар"
              className="userAvatar"
            />
            <strong className="userName">
              {item.user?.name || "Anonymous"}
            </strong>
            <br />
          </div>

          <p className="commentDescription">{item.description}</p>
        </div>
      ))}
    </div>
  );
};

export default CommentsList;
