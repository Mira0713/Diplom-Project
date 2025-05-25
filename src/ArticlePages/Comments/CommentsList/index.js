import "./styles.scss";
import UserAvatar from "assets/img/userAvatar.png";

const CommentsList = ({ comments }) => {
  const getCurrentDateTime = (createdAt) => {
    const pastDate = new Date(createdAt);
    const nowDate = new Date();

    const format = (value, sigle, multiple) => {
      if (value === 1) return `${value} ${sigle} ago`;
      return `${value} ${multiple} ago`;
    };

    const difference = nowDate - pastDate;

    const minutes = Math.floor(difference / 1000 / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);

    if (years) return format(years, "year", "years");
    if (months) return format(months, "month", "months");
    if (days) return format(days, "day", "days");
    if (hours) return format(hours, "hour", "hours");
    if (minutes) return format(minutes, "minute", "minutes");

    return "just now";
  };
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
          </div>
          <div className="commentData">
            <strong className="userName">
              {item.user?.name || "Anonymous"}
            </strong>
            <p className="commentDescription">{item.description}</p>
            <p className="commentTime">{getCurrentDateTime(item.createdAt)}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentsList;
