import { useParams } from "react-router-dom";
import "./styles.scss";
import routeMain from "./routes";
import FilmDetailsBlock from "./FilmDetailsBlock";
import filmsListMocks from "fixtures/filmsListMocks";

const FilmsDetail = (props) => {
  const { id } = useParams(); // Получаем id из URL
  const movie = filmsListMocks.find((film) => film.id === Number(id));

  return (
    <div className="filmsDetailPage">
      {movie ? <FilmDetailsBlock movie={movie} /> : <></>}
    </div>
  );
};

export { routeMain };
export default FilmsDetail;
