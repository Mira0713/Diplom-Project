import { useEffect, useState } from "react";
import { fetchMovies } from "../../http/movieApi";
import MoviesItem from "./components/MoviesItem";
import MoviesCarousel from "../MoviesCarousel";

import "./styles.scss";
const MoviesList = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        setLoading(true);
        const data = await fetchMovies();
        setMovies(data);
      } catch (err) {
        setError(err.message);
        console.error("Failed to load movies:", err);
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, []);
  if (loading) return <div className="loading">Loading movies...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!movies.length) return <div className="no-movies">No movies found</div>;

  return (
    <div className="moviesList">
      {movies.map((movie) => (
        <MoviesItem key={movie.id} item={movie} />
      ))}
    </div>
  );
};

export default MoviesList;
