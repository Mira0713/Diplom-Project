import MoviesItem from "./components/MoviesItem";
import "./styles.scss";
const MoviesList = (props) => (
  <div className="moviesList">
    {props.list.map((movies) => (
      <MoviesItem key={movies.id} item={movies} />
    ))}
  </div>
);

export default MoviesList;
