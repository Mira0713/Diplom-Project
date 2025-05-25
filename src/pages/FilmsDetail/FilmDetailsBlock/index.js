import { useState, useEffect } from "react";
import { getAverageRating } from "../../../http/ratingApi";
import "../../../components/MoviesList/components/MoviesItem/styles.scss";
import "./styles.scss";

const FilmDetailsBlock = ({ movie }) => {
  // const [averageRating, setAverageRating] = useState(0);
  // const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   const fetchRatingData = async () => {
  //     try {
  //       // setIsLoading(true);

  //       const [averageData] = await Promise.all([getAverageRating(movie.id)]);

  //       setAverageRating(averageData.average);
  //     } catch (error) {
  //       console.error("Ошибка загрузки рейтингов:", error);
  //     } finally {
  //       //setIsLoading(false);
  //     }
  //   };

  //   fetchRatingData();
  // }, [movie.id]);

  if (!movie) return <p>Movie not found</p>;
  const getGenres = () => {
    if (!movie) return "No genres";

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
    if (!posterPath || posterPath.trim() === "") {
      return "/default-poster.jpg";
    }

    if (/^(https?:|\/\/|data:image)/.test(posterPath)) {
      return posterPath;
    }

    const baseUrl = process.env.REACT_APP_API_URL || "";

    return `${baseUrl.replace(/\/+$/, "")}/${posterPath.replace(/^\/+/, "")}`;
  };
  const getTrailer = () => {
    if (!movie.trailer) return null;

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

    return (
      <video controls>
        <source src={movie.trailer} type="video/mp4" />
        Sorry, but your browser does not support embedded videos.
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
            <div className="ratingSmall">
              <div className="star">★</div>
              {movie.average_rating.toFixed(1)}
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
              Genres: <span> {getGenres()}</span>
            </p>
            <p>
              Running time:
              <span> {movie.duration ? `${movie.duration} min` : "N/A"}</span>
            </p>
            <p>
              Premiere: <span> {movie.premiere}</span>
            </p>
            <p>
              Director: <span> {movie.director}</span>
            </p>
            <p>
              Actors: <span>{getActors()}</span>
            </p>
          </div>
        </div>
      </div>
      <div className="moviesTrailer">{getTrailer()}</div>
    </div>
  );
};

export default FilmDetailsBlock;
