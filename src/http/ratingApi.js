import { $authHost, $host } from "./index";

// Создание или обновление оценки
export const setRating = async (movieId, rating) => {
  const { data } = await $authHost.post("api/rating", { movieId, rating });
  return data;
};

// export const createRating = async (commentData) => {
//   console.log("create component", commentData);
//   const { data } = await $authHost.post("api/rating", commentData);
//   return data;
// };

export const getUserRating = async (movieId) => {
  const { data } = await $authHost.get("api/rating/user", {
    params: { movieId },
  });
  return data?.rating || null;
};

// Получение средней оценки фильма
export const getAverageRating = async (movieId) => {
  const { data } = await $host.get("api/rating/average", {
    params: { movieId },
  });
  return {
    average: parseFloat(data.average) || 0,
    count: data.count || 0,
  };
};

// Удаление оценки пользователя
export const deleteRating = async (movieId) => {
  const { data } = await $authHost.delete("api/rating", {
    data: { movieId },
  });
  return data;
};

// Получение всех оценок (для админки)
export const getAllRatings = async (params = {}) => {
  const { data } = await $authHost.get("api/rating", { params });
  return data;
};
