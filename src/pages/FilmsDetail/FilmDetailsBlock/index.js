import "../../../components/MoviesList/components/MoviesItem/styles.scss";
import "./styles.scss";

const FilmDetailsBlock = ({ movie }) => {
  if (!movie) return <p>Movie not found</p>;

  const getGenres = () => {
    if (!movie) return "No genres";

    // Проверяем разные возможные форматы данных
    if (Array.isArray(movie.genres)) {
      return movie.genres.map((g) => g?.name || "Unknown").join(", ");
    }
    if (Array.isArray(movie.genre)) {
      return movie.genre.join(", ");
    }
    if (typeof movie.genre === "string") {
      return movie.genre;
    }
    return "No genres specified";
  };
  const getActors = () => {
    if (Array.isArray(movie.actors)) {
      return movie.actors.join(", ");
    }
    if (typeof movie.actors === "string") {
      return movie.actors;
    }
    return "No actors information";
  };
  const getPosterUrl = (posterPath) => {
    // Если нет постера или путь пустой
    if (!posterPath || posterPath.trim() === "") {
      return "/default-poster.jpg";
    }

    // Если URL уже абсолютный (http/https) или data URL
    if (/^(https?:|\/\/|data:image)/.test(posterPath)) {
      return posterPath;
    }

    // Обработка относительных путей
    const baseUrl = process.env.REACT_APP_API_URL || "";

    // Удаляем лишние слэши при конкатенации URL
    return `${baseUrl.replace(/\/+$/, "")}/${posterPath.replace(/^\/+/, "")}`;
  };
  const getTrailer = () => {
    if (!movie.trailer) return null;

    // Если trailer это YouTube URL
    if (
      movie.trailer.includes("youtube.com") ||
      movie.trailer.includes("youtu.be")
    ) {
      const videoId = movie.trailer.match(
        /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&\n?#]+)/
      )?.[1];
      return (
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube trailer"
          allowFullScreen
        />
      );
    }

    // Если это прямой видеофайл
    return (
      <video controls>
        <source src={movie.trailer} type="video/mp4" />
        Простите, но ваш браузер не поддерживает встроенные видео.
      </video>
    );
  };

  return (
    <div className="filmDetailsBlock">
      <div className="moviesItem">
        <img
          src={getPosterUrl(movie.poster)}
          alt={movie.title}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/default-poster.jpg";
          }}
        />

        <div className="moviesItemContent">
          <div className="title">{movie.title}</div>
          <div className="quality">
            <div className="rating">
              <div className="star">★</div>
              {movie.rating}
            </div>
            <span>HD</span>
          </div>

          <div className="moviesItemDetails">
            <p>
              Year: <span>{movie.year}</span>
            </p>
            <p>
              Country: <span>{movie.country}</span>
            </p>
            <p>
              Genres: <span> {getGenres()}</span> {/* movie.genre.join(", ") */}
            </p>
            <p>
              Running time:
              <span> {movie.duration ? `${movie.duration} h` : "N/A"}</span>
            </p>
            <p>
              Premiere: <span> {movie.premiere}</span>
            </p>
            <p>
              Director: <span> {movie.director}</span>
            </p>
            <p>
              Actors: <span>{getActors()}</span> {/* movie.actors.join(", ") */}
            </p>
          </div>
        </div>
      </div>
      {/* <video controls src={movie.trailer}>
        Простите, но ваш браузер не поддерживает встроенные видео.
      </video> */}
      {getTrailer()}
    </div>
  );
};

export default FilmDetailsBlock;
