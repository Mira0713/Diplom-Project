import "./styles.scss";
import { useEffect, useState } from "react";
import routeMain from "./routes";

import PageTitle from "components/PageTitle";

import MoviesList from "components/MoviesList";

import filmsListMocks from "fixtures/filmsListMocks";
import UserPage from "../UserPage";
import MoviesCarousel from "../../components/MoviesCarousel";
import { fetchMovies } from "../../http/movieApi";

const MainPage = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [popular] = await Promise.all([fetchMovies()]);
        setPopularMovies(popular);
        //setTopRatedMovies(topRated);
      } catch (error) {
        console.error("Error loading movies:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) return <div className="loading">Загрузка...</div>;
  return (
    <div>
      {/* <UserPage /> */}
      <MoviesCarousel movies={popularMovies} title="Популярные фильмы" />
      <section className="mainPage">
        <PageTitle title={<h2>Home/Movies</h2>} />

        {filmsListMocks.length > 0 && (
          <MoviesList list={filmsListMocks.slice(0, 4)} />
        )}
      </section>
    </div>
  );
};

export { routeMain };
export default MainPage;
