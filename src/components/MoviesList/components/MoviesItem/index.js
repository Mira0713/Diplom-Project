import "./styles.scss";
import { NavLink } from "react-router-dom";

import { routeMain as routeFilmsDetail } from "pages/FilmsDetail";

const MoviesItem = (props) => (
  <NavLink to={routeFilmsDetail(props.item.id)} className="moviesItem">
    <img src={props.item.poster} alt={props.item.title} />
    <div className="moviesItemContent">
      <div className="title">{props.item.title}</div>
      <div className="quality">
        <span>HD</span>
      </div>

      <div className="moviesItemDetails">
        <p>
          Year: <span>{props.item.year}</span>
        </p>
        <p>
          Country: <span>{props.item.country}</span>
        </p>
        <p>
          Genres: <span>{props.item.genre.join(", ")}</span>
        </p>
        <p>
          Director: <span>{props.item.director}</span>
        </p>
        <p>
          Rating: <span>{props.item.rating}</span>
        </p>
        <p>
          Duration: <span>{props.item.duration}</span>
        </p>
      </div>
      <div className="moviesItemDescription">
        <p>{props.item.description}</p>
      </div>
    </div>
  </NavLink>
);

export default MoviesItem;
