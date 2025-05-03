import { $authHost, $host } from "./index";

export const createComment = async (commentData) => {
  console.log("create component", commentData);
  const { data } = await $authHost.post("api/comment", commentData);
  return data;
};

export const fetchComments = async (movieId) => {
  const { data } = await $host.get("api/comment", {
    params: { movieId },
  });
  return data;
};
