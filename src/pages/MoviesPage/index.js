import "./styles.scss";
import routeMain from "./routes";

import PageTitle from "components/PageTitle";

import MoviesList from "components/MoviesList";

import filmsListMocks from "fixtures/filmsListMocks";
import FilterPanel from "components/FilterPanel";

const MoviesPage = () => {
  return (
    <div>
      <section className="mainPage">
        <PageTitle title={<h2>Movies</h2>} />
        <FilterPanel />
        {filmsListMocks.length > 0 && (
          <MoviesList list={filmsListMocks.slice(0, 4)} />
        )}
      </section>
    </div>
  );
};

export { routeMain };
export default MoviesPage;
