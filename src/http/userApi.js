import { $authHost, $host } from "./index";
import jwt_decode from "jwt-decode";

export const registration = async (name, email, password) => {
  try {
    const { data } = await $host.post("api/user/registration", {
      name,
      email,
      password,
      role: "USER",
    });
    localStorage.setItem("token", data.jwt); // TODO Надо сделать что бы
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const login = async (name, email, password) => {
  try {
    const { data } = await $host.post("api/user/login", {
      name,
      email,
      password,
    });
    console.log("data DWQDQWDWQDQW", data.jwt);
    localStorage.setItem("token", data.jwt);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const checkAuth = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return;

    const response = await $authHost.get("api/user/auth");

    if (!response.data) {
      throw new Error("Empty server response");
    }

    // Проверяем разные возможные варианты ответа
    const jwt = response.data.jwt;
    if (!jwt) {
      throw new Error("Invalid server response: JWT missing");
    }

    localStorage.setItem("token", jwt); // Обновляем токен
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Authentication failed");
  }
};
