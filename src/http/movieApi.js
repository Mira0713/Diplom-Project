import { $authHost } from "./index";

// export const createMovie = async (movieData) => {
//   try {
//     const formData = new FormData();
//     Object.entries(movieData).forEach(([key, value]) => {
//       if (key === "genres" && Array.isArray(value)) {
//         formData.append(key, JSON.stringify(value)); // масив жанрів як JSON
//       } else {
//         formData.append(key, value);
//       }
//     });

//     const { data } = await $authHost.post("api/movie", formData, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     });

//     return data;
//   } catch (error) {
//     console.error(
//       "Помилка при створенні фільму:",
//       error.response?.data || error.message
//     );
//     throw error;
//   }
// };

export const createMovie = async (movieData) => {
  try {
    const formData = new FormData();

    // Основные поля
    formData.append("title", movieData.title);
    formData.append("year", movieData.year);
    formData.append("country", movieData.country);
    formData.append("director", movieData.director);
    formData.append("duration", movieData.duration);
    formData.append("premier", movieData.premiere); // Обратите внимание на premier без "e"
    formData.append("trailer", movieData.trailer);
    formData.append("description", movieData.description);

    // Жанры - отправляем как JSON строку
    formData.append("genres", JSON.stringify(movieData.genreIds));

    // Актеры - отправляем как строку, разделенную запятыми
    formData.append("actors", movieData.actors);

    // Постер
    if (movieData.poster) {
      formData.append("poster", movieData.poster);
    }

    const { data } = await $authHost.post("api/movie", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return data;
  } catch (error) {
    console.error(
      "Помилка при створенні фільму:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// export const fetchMovies = async () => {
//   const { data } = await $authHost.get("api/movie");
//   return data;
// };
export const fetchMovies = async () => {
  try {
    const { data } = await $authHost.get("api/movie"); // или "api/movies"
    return data.rows || data; // в зависимости от структуры ответа сервера
  } catch (error) {
    console.error("Error fetching movies:", error);
    return []; // Возвращаем пустой массив при ошибке
  }
};

// export const fetchMovieById = async (id) => {
//   try {
//     const { data } = await $authHost.get(`/api/movie/${id}`, {
//       params: { includeGenres: true },
//       validateStatus: (status) => status < 500, // Не считать 404 ошибкой
//     });

//     if (!data) throw new Error(`Movie ${id} not found`);
//     return data;
//   } catch (error) {
//     console.error("Error details:", {
//       url: error.config?.url,
//       status: error.response?.status,
//       data: error.response?.data,
//     });
//     throw error;
//   }
// };
export const fetchMovieById = async (id) => {
  try {
    const { data } = await $authHost.get(`/api/movie/${id}`, {
      params: { includeGenres: true },
    });

    if (!data) {
      throw new Error("Empty response from server");
    }

    console.log("API response for movie", id, ":", data);
    return data;
  } catch (error) {
    console.error(`Error fetching movie ${id}:`, {
      status: error.response?.status,
      data: error.response?.data,
      config: error.config,
    });
    throw error;
  }
};
export async function getMovies() {
  const response = await fetch("api/movie"); // змінити URL на свій бекенд
  if (!response.ok) {
    throw new Error("Помилка завантаження фільмів");
  }
  const data = await response.json();
  return data;
}
