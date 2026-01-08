import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchMovieById } from "../../http/movieApi";
import { NavLink } from "react-router-dom";
import "./styles.scss";
import routeMain from "./routes";
import FilmDetailsBlock from "./FilmDetailsBlock";
import { routeMain as routeMainPage } from "pages/MainPage";
import ArticleFooter from "../../../src/ArticleFooter";
import ArticleNavigation from "../../../src/ArticleNavigation";

const FilmsDetail = () => {
  const { id } = useParams(); // Получаем id из URL
  //const movie = filmsListMocks.find((film) => film.id === Number(id));

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadMovie = async () => {
    try {
      setLoading(true);
      console.log(`Trying to fetch movie ID: ${id}`);
      const data = await fetchMovieById(id);
      console.log("Received data:", data);
      setMovie(data);
    } catch (err) {
      setError(err.message);
      console.error("Failed to load movies:", err);
    } finally {
      setLoading(false);
    }
  };

  const updateRating = (average) => {
    console.log("updateRating !!!", average);
    setMovie({ ...movie, average_rating: average });
  };

  useEffect(() => {
    loadMovie();
  }, [id]);

  console.log("Current movie state:", {
    loading,
    error,
    movie,
    hasData: !!movie,
  });

  if (loading) return <div className="loading">Loading movie...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!movie) return <div className="no-movie">Movie not found</div>;

  return (
    <div className="filmsDetailPage">
      {/* <h1>{movie.title}</h1> */}
      {/* {movie ? <FilmDetailsBlock movie={movie} /> : <></>} */}
      {/* <ArticleNavigation movie={movie} /> */}
      {movie && ( // Проверка на наличие данных
        <>
          <h1>
            {" "}
            <NavLink to={routeMainPage()} end className="movieTitle">
              Home /{" "}
            </NavLink>
            {movie.title}
          </h1>
          <FilmDetailsBlock movie={movie} />
          <ArticleNavigation movie={movie} loadMovie={updateRating} />
        </>
      )}
      <ArticleFooter />
    </div>
  );
};

export { routeMain };
export default FilmsDetail;
