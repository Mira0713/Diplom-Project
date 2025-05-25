import "./styles.scss";
import routeMain from "./routes";
import React, { useState, useEffect } from "react";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import { createGenre, getGenres } from "../../http/genreApi"; // Цю функцію треба створити

import { fetchGenres } from "../../http/genreApi";
import { createMovie } from "../../http/movieApi";
import { fetchMovies, getMovies, deleteMovie } from "../../http/movieApi"; // додати імпорт, функцію я нижче дам

const AdminPanelPage = () => {
  const [movie, setMovie] = useState({
    title: "",
    year: "",
    country: "",
    genreIds: [],
    director: "",
    rating: "",
    duration: "",
    premiere: "",
    actors: "",
    poster: null, // файл
    trailer: "",
    description: "",
  });

  const handleGenreChange = (selectedOptions) => {
    const selectedGenreIds = selectedOptions.map((option) => option.value);
    setMovie((prev) => ({ ...prev, genreIds: selectedGenreIds }));
  };

  // Создание нового жанра
  const handleCreateGenre = async (inputValue) => {
    try {
      const newGenre = await createGenre(inputValue);
      setGenres((prev) => [...prev, newGenre]);
      return { value: newGenre.id, label: newGenre.name };
    } catch (error) {
      console.error("Помилка при створенні жанру:", error);
      return null;
    }
  };

  const [previewPoster, setPreviewPoster] = useState(null);
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Удалите дублирующие useEffect
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [moviesData, genresData] = await Promise.all([
          fetchMovies(),
          fetchGenres(),
        ]);

        setMovies(
          Array.isArray(moviesData) ? moviesData : moviesData?.rows || []
        );
        setGenres(
          Array.isArray(genresData) ? genresData : genresData?.rows || []
        );
      } catch (err) {
        setError(err.message);
        console.error("Error loading data:", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);
  // useEffect(() => {
  //   fetchGenres().then((data) => setGenres(data)); ////////////////
  // }, []);

  const loadGenres = async () => {
    try {
      const data = await fetchGenres();
      setGenres(data);
    } catch (error) {
      console.error("❌ Помилка при завантаженні жанрів:", error);
    }
  };

  const loadMovies = async () => {
    try {
      const data = await fetchMovies();
      setMovies(data);
    } catch (error) {
      console.error("❌ Помилка при завантаженні фільмів:", error);
    }
  };

  const handleDeleteMovie = async (movieId) => {
    if (window.confirm("Вы точно хотите удалить этот фильм?")) {
      try {
        await deleteMovie(movieId);
        setMovies((prevMovies) =>
          prevMovies.filter((movie) => movie.id !== movieId)
        );
        alert("Фильм успешно удален");
        // Обновляем список фильмов:
        fetchMovies();
      } catch (error) {
        console.error("Ошибка при удалении фильма:", error);
        alert("Не удалось удалить фильм");
      }
    }
  };

  const handleChange = (e) => {
    const { name, value, files, options } = e.target;

    if (name === "poster" && files.length > 0) {
      setMovie((prev) => ({ ...prev, poster: files[0] }));
      setPreviewPoster(URL.createObjectURL(files[0]));
    } else if (name === "genre") {
      // Обробка multiple select
      const selectedGenres = Array.from(options)
        .filter((option) => option.selected)
        .map((option) => option.value);
      setMovie((prev) => ({ ...prev, genre: selectedGenres }));
    } else {
      setMovie((prev) => ({ ...prev, [name]: value }));
    }
  };

  const addMovie = async () => {
    try {
      const formMovie = {
        ...movie,
        year: parseInt(movie.year),
        rating: parseFloat(movie.rating),
        actors: movie.actors.split(",").map((a) => a.trim()),
        genreIds: movie.genreIds, // !!! важливо: перекладаємо genre -> genres
      };

      // await createMovie(formMovie);
      //await loadMovies(); // оновлюємо список після додавання
      const newMovie = await createMovie(formMovie);
      setMovies((prevMovies) => [...prevMovies, newMovie]);
      // Очищення форми
      setMovie({
        title: "",
        year: "",
        country: "",
        genreIds: [],
        director: "",
        rating: "",
        duration: "",
        premiere: "",
        actors: "",
        poster: null,
        trailer: "",
        description: "",
      });
      setPreviewPoster(null);
    } catch (error) {
      console.error("❌ Помилка при створенні фільму:", error);
    }
  };

  useEffect(() => {
    loadGenres();
    loadMovies();
  }, []);

  return (
    <div style={{ padding: "20px" }} className="admin">
      <h1>Admin Panel - Add Movie</h1>
      <div className="adminPanel">
        {[
          "title",
          "year",
          "country",
          "director",
          // "rating",
          "duration",
          "premiere",
          "actors",
          "trailer",
        ].map((field) => (
          <input
            key={field}
            name={field}
            value={movie[field]}
            onChange={handleChange}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
          />
        ))}

        <CreatableSelect
          isMulti
          name="genreIds"
          options={genres.map((g) => ({ value: g.id, label: g.name }))}
          value={movie.genreIds
            .map((id) => {
              const genre = genres.find((g) => g.id === id);
              return genre ? { value: genre.id, label: genre.name } : null;
            })
            .filter(Boolean)}
          onChange={(selectedOptions) => {
            const selectedIds = selectedOptions.map((option) => option.value);
            setMovie((prev) => ({ ...prev, genreIds: selectedIds }));
          }}
          onCreateOption={async (inputValue) => {
            try {
              console.log("Creating genre:", inputValue);
              const { genre: newGenre } = await createGenre({
                name: inputValue,
              });
              console.log("Created genre:", newGenre);
              setGenres((prev) => [...prev, newGenre]);
              setMovie((prev) => ({
                ...prev,
                genreIds: [...prev.genreIds, newGenre.id],
              }));
              return { value: newGenre.id, label: newGenre.name };
            } catch (error) {
              console.error("Full error:", error); // Логируем полную ошибку
              console.error("Error response:", error.response); // Логи ответа сервера
              console.error("Помилка при створенні жанру:", error);

              return null;
            }
          }}
          className="basic-multi-select"
          classNamePrefix="select"
          placeholder="Виберіть або додайте жанри..."
          noOptionsMessage={() => "Введіть назву нового жанру"}
          formatCreateLabel={(inputValue) => `Створити "${inputValue}"`}
        />
        <input
          type="file"
          name="poster"
          accept="image/*"
          onChange={handleChange}
        />
        <textarea
          name="description"
          value={movie.description}
          onChange={handleChange}
          placeholder="Description"
        />
        <button onClick={addMovie}>Add Movie</button>
      </div>

      {previewPoster && (
        <div style={{ marginTop: "10px" }}>
          <p>Preview poster:</p>
          <img
            src={previewPoster}
            alt="Preview"
            style={{ width: "150px", height: "auto" }}
          />
        </div>
      )}

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      <div style={{ marginTop: "40px" }}>
        <h2>Movies List</h2>

        {!loading && Array.isArray(movies) && movies.length === 0 && (
          <p>No movies found</p>
        )}

        {Array.isArray(movies)
          ? movies.map((m) => {
              console.log("Movie data:", m);
              return (
                <div
                  key={m.id}
                  style={{
                    border: "1px solid #ccc",
                    padding: "10px",
                    marginBottom: "10px",
                  }}
                >
                  <h3>
                    {m.title} ({m.year})
                  </h3>
                  <p>
                    <strong>Genre:</strong>{" "}
                    {m.genres?.length > 0
                      ? m.genres.map((g) => g.name).join(", ")
                      : "No genres specified"}
                  </p>
                  <p>
                    <strong>Director:</strong> {m.director}
                  </p>
                  <p>
                    <strong>Actors:</strong>{" "}
                    {typeof m.actors === "string"
                      ? m.actors
                      : Array.isArray(m.actors)
                      ? m.actors.join(", ")
                      : "No actors"}
                  </p>
                  <p>
                    <strong>Description:</strong> {m.description}
                  </p>
                  {m.poster && (
                    <img
                      src={process.env.REACT_APP_API_URL + m.poster}
                      alt={m.title}
                      style={{ width: "150px", height: "auto" }}
                    />
                  )}
                  <p>
                    <a
                      href={m.trailer}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Watch Trailer
                    </a>
                  </p>
                  <button
                    onClick={() => handleDeleteMovie(m.id)}
                    className="delete-button"
                  >
                    Delete
                  </button>
                </div>
              );
            })
          : !loading && <p>Failed to load movies data</p>}
      </div>
    </div>
  );
};

export { routeMain };
export default AdminPanelPage;
