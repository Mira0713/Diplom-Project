import "./styles.scss";
import routeMain from "./routes";

import PageTitle from "components/PageTitle";

import MoviesList from "components/MoviesList";

import filmsListMocks from "fixtures/filmsListMocks";

const MainPage = () => {
  return (
    <section className="mainPage">
      <PageTitle title={<h2>Home/Movies</h2>} />
      {filmsListMocks.length > 0 && (
        <MoviesList list={filmsListMocks.slice(0, 4)} />
      )}
    </section>
  );
};

export { routeMain };
export default MainPage;
