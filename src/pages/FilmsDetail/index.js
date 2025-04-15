import { useParams } from "react-router-dom";
import "./styles.scss";
import routeMain from "./routes";
import FilmDetailsBlock from "./FilmDetailsBlock";
import filmsListMocks from "fixtures/filmsListMocks";
import ArticleFooter from "../../../src/ArticleFooter";
import ArticleNavigation from "../../../src/ArticleNavigation";

const FilmsDetail = (props) => {
  const { id } = useParams(); // Получаем id из URL
  const movie = filmsListMocks.find((film) => film.id === Number(id));

  return (
    <div className="filmsDetailPage">
      <h1>{movie.title}</h1>
      {movie ? <FilmDetailsBlock movie={movie} /> : <></>}
      <ArticleNavigation movie={movie} />
      <ArticleFooter />
    </div>
  );
};

export { routeMain };
export default FilmsDetail;
