import axios from "axios";

export const PrivateAxios = axios.create({ baseURL: "http://localhost:3000" });
