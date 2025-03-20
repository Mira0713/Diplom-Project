const FilmDetailsBlock = ({ movie }) => {
  if (!movie) return <p>Movie not found</p>;

  return (
    <div className="moviesItem">
      <img src={movie.poster} alt={movie.title} />
      <div className="moviesItemContent">
        <div className="title">{movie.title}</div>
        <p>
          Rating:
          {movie.rating}
        </p>
        <div className="quality">HD</div>

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
            Running time:<span>{movie.duration}</span>
          </p>
          <p>
            Premiere: <span>{movie.premiere}</span>
          </p>
          <p>
            Director:<span>{movie.director}</span>
          </p>
          <p>
            Actors: <span>{movie.actors.join(", ")}</span>
          </p>
        </div>
        <div className="moviesItemDescription">
          <p>{movie.description}</p>
        </div>
      </div>
    </div>
  );
};

export default FilmDetailsBlock;
