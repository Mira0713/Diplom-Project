import "./styles.scss";
import routeMain from "./routes";

import PageTitle from "components/PageTitle";

import NewsList from "components/NewsList";

import filmsListMocks from "fixtures/filmsListMocks";

const MainPage = () => {
  return (
    <section className="mainPage">
      <PageTitle
        title={
          <h2>
            Всегда <br /> Пук <span>Среньк</span>
          </h2>
        }
      />
      {filmsListMocks.length > 0 && (
        <NewsList list={filmsListMocks.slice(0, 4)} />
      )}
    </section>
  );
};

export { routeMain };
export default MainPage;
