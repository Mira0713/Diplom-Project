import "./styles.scss";
import { useState, useEffect } from "react";
import { createComment } from "../../../http/commentApi"; // Функція запиту
import { useParams } from "react-router-dom"; // Якщо використовуєш /movie/:id
import jwtDecode from "jwt-decode";

const AddComment = ({ onCommentAdded }) => {
  const { id: movieId } = useParams(); // Получаем ID фильма из URL
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [saveData, setSaveData] = useState(false);
  const [error, setError] = useState("");

  // Загружаем сохраненные данные при монтировании
  useEffect(() => {
    const savedData = localStorage.getItem("commentFormData");
    if (savedData) {
      const { name, email } = JSON.parse(savedData);
      setName(name);
      setEmail(email);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!description.trim()) {
      setError("Comment text is required");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("You need to log in to add a comment");
        return;
      }

      const decodedToken = jwtDecode(token);
      console.log("decodedToken", decodedToken);
      if (!decodedToken || !decodedToken.id) {
        throw new Error("Invalid token payload");
      }

      const newComment = {
        description,
        movieId: Number(movieId), // Преобразуем в число
        userId: decodedToken.id,
        authorName: name || decodedToken.email.split("@")[0],
        authorEmail: email || null,
      };

      const response = await createComment(newComment);

      if (onCommentAdded) {
        onCommentAdded(response);
      }

      // Очищаем форму
      setDescription("");
      setError("");

      // Сохраняем данные если пользователь выбрал
      if (saveData) {
        localStorage.setItem(
          "commentFormData",
          JSON.stringify({ name, email })
        );
      }
    } catch (error) {
      console.error("Error adding comment:", error);
      setError(error.message || "Error adding comment");
    }
  };
  return (
    <form className="commentForm" onSubmit={handleSubmit}>
      <div className="commentTitle">Add comment</div>
      <div>
        <div className="commentDescription">
          Your email address will not be published. Required fields are marked *
        </div>
        <div className="usersInputs">
          <input
            type="text"
            id="author"
            placeholder="Name*"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            id="email"
            placeholder="example@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <textarea
          id="comment"
          placeholder="Сomment*"
          name="comment"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
        <div className="saveData">
          <input
            type="checkbox"
            value="yes"
            checked={saveData}
            onChange={(e) => setSaveData(e.target.checked)}
            className="saveDataChekbox"
          />
          <label>
            Save my name, email, and website in this browser for the next time I
            comment.
          </label>
        </div>
      </div>
      <button type="submit">Post Comment</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default AddComment;
