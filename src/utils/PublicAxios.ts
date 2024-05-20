import axios from "axios";

export const PublicAxios = axios.create({
  baseURL: "https://amazon-clone-api-8bme.onrender.com",
});
