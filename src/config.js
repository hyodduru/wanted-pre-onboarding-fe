export const BASE_URL =
  "https://5co7shqbsf.execute-api.ap-northeast-2.amazonaws.com/production/";

export const setToken = (token) => {
  localStorage.setItem("token", token);
};

export const getToken = () => {
  const token = localStorage.getItem("token");
  return token;
};
