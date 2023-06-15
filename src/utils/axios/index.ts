import axios, { AxiosInstance } from "axios";
export const zapros: AxiosInstance = axios.create({
  baseURL: "http://13.50.238.54/", //api
  timeout: Infinity,
});

export const api = "http://13.50.238.54";
