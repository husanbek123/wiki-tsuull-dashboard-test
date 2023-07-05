import axios, { AxiosInstance } from "axios";
export const zapros: AxiosInstance = axios.create({
  baseURL: "https://wikidashboard.uz",
  timeout: Infinity,
});
export const api = "https://wikidashboard.uz";