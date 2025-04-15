import "./styles.scss";
import routeMain from "./routes";

import PageTitle from "components/PageTitle";

import MoviesList from "components/MoviesList";

import filmsListMocks from "fixtures/filmsListMocks";

const FilmsListPage = () => {
  return (
    <section className="mainPage">
      <PageTitle title={<h2>Бургер</h2>} />
      {filmsListMocks.length > 0 && <MoviesList list={filmsListMocks} />}
    </section>
  );
};

export { routeMain };
export default FilmsListPage;
