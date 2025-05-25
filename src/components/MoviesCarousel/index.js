import { NavLink } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { routeMain as routeFilmsDetail } from "pages/FilmsDetail";
import PlayButton from "assets/img/playButton.png";
import "./styles.scss";

const MoviesCarousel = ({ movies, title }) => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      slidesToSlide: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };
  const getPosterUrl = (movie) => {
    if (!movie.poster) return "/default-poster.jpg";

    // Если URL уже абсолютный
    if (movie.poster.startsWith("http")) return movie.poster;

    // Если путь относительный
    return `${process.env.REACT_APP_API_URL || ""}${movie.poster}`;
  };

  const renderGenres = (movie) => {
    // Проверяем разные возможные варианты структуры данных
    if (Array.isArray(movie.genres)) {
      return movie.genres.map((g) => g.name).join(", ");
    }
    if (Array.isArray(movie.genre)) {
      return movie.genre.join(", ");
    }
    if (typeof movie.genre === "string") {
      return movie.genre;
    }
    return "No genres specified";
  };

  return (
    <section className="movies-carousel-section">
      {title && <h2 className="carousel-title">{title}</h2>}
      <Carousel
        responsive={responsive}
        infinite
        autoPlay
        autoPlaySpeed={5000}
        keyBoardControl
        transitionDuration={500}
      >
        {movies.map((movie) => (
          <NavLink
            key={movie.id}
            to={routeFilmsDetail(movie.id)}
            className="movie-card"
          >
            <div className="movie-poster">
              <img
                src={getPosterUrl(movie)}
                alt={movie.title}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/default-poster.jpg";
                }}
              />
              <img src={PlayButton} className="playIcon" />
              <div className="movie-badge">HD</div>
            </div>
            <div className="movie-info">
              <h3 className="movie-title">{movie.title}</h3>
              <div className="movie-meta">
                <span className="movie-rating">★ {movie.average_rating}</span>
                <span className="movie-genre">
                  {renderGenres(movie) || "Жанр не указан"}
                </span>
              </div>
            </div>
          </NavLink>
        ))}
      </Carousel>
    </section>
  );
};

export default MoviesCarousel;
