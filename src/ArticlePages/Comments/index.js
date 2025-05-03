import "./styles.scss";
import { useState, useEffect } from "react";
import routeMain from "./routes";
import { createComment, fetchComments } from "../../http/commentApi";
import AddComment from "./AddComment";
import CommentsList from "./CommentsList";
import { useParams } from "react-router-dom";

const Comments = () => {
  const [comments, setComments] = useState([]);
  const { id: movieId } = useParams();

  const handleCommentAdded = (newComment) => {
    setComments((prev) => [...prev, newComment]);
  };
  const loadComment = async () => {
    const response = await fetchComments(movieId);
    setComments(response);
    console.log("responseArbuz", response);
    console.log("comments arbuznie schastie", comments);
  };

  useEffect(() => {
    loadComment();
  }, []);

  return (
    <section>
      {/* {comments.map((item) => (
        <div key={item.id}>
          {item.user.name}
          <br />
          {item.description}
        </div>
      ))} */}
      <CommentsList comments={comments} />

      <AddComment onCommentAdded={handleCommentAdded} />
    </section>
  );
};

export { routeMain };
export default Comments;
