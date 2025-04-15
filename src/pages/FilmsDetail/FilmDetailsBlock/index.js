import "../../../components/MoviesList/components/MoviesItem/styles.scss";
import "./styles.scss";

const FilmDetailsBlock = ({ movie }) => {
  if (!movie) return <p>Movie not found</p>;

  return (
    <div className="filmDetailsBlock">
      <div className="moviesItem">
        <img src={movie.poster} alt={movie.title} />
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
              Genres: <span>{movie.genre.join(", ")}</span>
            </p>
            <p>
              Running time: <span>{movie.duration}</span>
            </p>
            <p>
              Premiere: <span>{movie.premiere}</span>
            </p>
            <p>
              Director: <span>{movie.director}</span>
            </p>
            <p>
              Actors: <span>{movie.actors.join(", ")}</span>
            </p>
          </div>
        </div>
      </div>
      <video controls src={movie.trailer}>
        Простите, но ваш браузер не поддерживает встроенные видео.
      </video>
    </div>
  );
};

export default FilmDetailsBlock;
