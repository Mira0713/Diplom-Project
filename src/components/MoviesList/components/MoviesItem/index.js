import "./styles.scss";
import { NavLink } from "react-router-dom";

import { routeMain as routeFilmsDetail } from "pages/FilmsDetail";

const MoviesItem = ({ item }) => {
  // Функция для получения корректного URL изображения
  const getPosterUrl = () => {
    if (!item.poster) return "/default-poster.jpg";

    // Если URL уже абсолютный
    if (item.poster.startsWith("http")) return item.poster;

    // Если путь относительный
    return `${process.env.REACT_APP_API_URL || ""}${item.poster}`;
  };
  const renderGenres = () => {
    // Проверяем разные возможные варианты структуры данных
    if (Array.isArray(item.genres)) {
      return item.genres.map((g) => g.name).join(", ");
    }
    if (Array.isArray(item.genre)) {
      return item.genre.join(", ");
    }
    if (typeof item.genre === "string") {
      return item.genre;
    }
    return "No genres specified";
  };
  return (
    <NavLink to={routeFilmsDetail(item.id)} className="moviesItem">
      <img
        src={getPosterUrl()}
        alt={item.title}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "/default-poster.jpg";
        }}
      />
      <div className="moviesItemContent">
        <div className="title">{item.title}</div>
        <div className="quality">
          <span>HD</span>
        </div>

        <div className="moviesItemDetails">
          <p>
            Year: <span>{item.year || "N/A"}</span>
          </p>
          <p>
            Country: <span>{item.country}</span>
          </p>
          <p>
            Genres:{" "}
            <span>{/*props.item.genre.join(", ")*/ renderGenres()}</span>
          </p>
          <p>
            Director: <span>{item.director}</span>
          </p>
          <p>
            Rating: <span>{item.rating}</span>
          </p>
          <p>
            Duration:{" "}
            <span>{item.duration ? `${item.duration} h` : "N/A"}</span>
          </p>
        </div>
        <div className="moviesItemDescription">
          <p>{item.description}</p>
        </div>
      </div>
    </NavLink>
  );
};

export default MoviesItem;
