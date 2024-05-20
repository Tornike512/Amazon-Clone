import axios from "axios";

export const PrivateAxios = axios.create({
  baseURL: "https://amazon-clone-api-8bme.onrender.com",
});

export const setPrivateAccessToken = (token: string) => {
  PrivateAxios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};
