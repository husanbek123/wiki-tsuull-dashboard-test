import axios, { AxiosInstance } from "axios";
export const zapros: AxiosInstance = axios.create({
  baseURL: "https://xodjakov.uz/", //api
  timeout: Infinity,
});

export const api = "https://xodjakov.uz";
