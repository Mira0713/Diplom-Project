import { $host } from "./index";
import { $authHost } from "./index";

export const fetchGenres = async () => {
  const { data } = await $host.get("api/genre");
  return data;
};

export const createGenre = async (params) => {
  try {
    const { data } = await $authHost.post("api/genre", params);
    return data;
  } catch (error) {
    console.error("Помилка при створенні жанру:", error);
    throw error;
  }
};

export async function getGenres() {
  const response = await fetch("/api/genres"); // змінити URL на свій бекенд
  if (!response.ok) {
    throw new Error("Помилка завантаження жанрів");
  }
  const data = await response.json();
  return data;
}
