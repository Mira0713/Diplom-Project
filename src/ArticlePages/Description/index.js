import "./styles.scss";
import routeMain from "./routes";

const Description = ({ movie }) => {
  if (!movie) return <p>Информация о фильме отсутствует</p>;
  return <section className="description">{movie.description}</section>;
};

export { routeMain };
export default Description;
