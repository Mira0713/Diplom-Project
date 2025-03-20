import "./styles.scss";
import routeMain from "./routes";

import PageTitle from "components/PageTitle";

import NewsList from "components/NewsList";

import filmsListMocks from "fixtures/filmsListMocks";

const FilmsListPage = () => {
  return (
    <section className="mainPage">
      <PageTitle title={<h2>Бургер</h2>} />
      {filmsListMocks.length > 0 && <NewsList list={filmsListMocks} />}
    </section>
  );
};

export { routeMain };
export default FilmsListPage;
