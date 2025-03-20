import NewsItem from "./components/NewsItem";
import "./styles.scss";
const NewsList = (props) => (
  <div className="newsList">
    {props.list.map((movies) => (
      <NewsItem key={movies.id} item={movies} />
    ))}
  </div>
);

export default NewsList;
