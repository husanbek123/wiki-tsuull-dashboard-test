import axios, { AxiosInstance } from "axios";
export const zapros: AxiosInstance = axios.create({
  baseURL: "http://xodjakov.uz/", //api
  timeout: Infinity,
});

export const api = "http://xodjakov.uz";
