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
    console.log(data);
    localStorage.setItem("token", data.jwt);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const check = async () => {
  const { data } = await $authHost.get("api/user/auth");
  localStorage.setItem("token", data.jwt);
  return jwt_decode(data.token);
};
