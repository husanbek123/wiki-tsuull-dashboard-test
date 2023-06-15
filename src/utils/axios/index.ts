import axios from "axios";

export const zapros = axios.create({
  baseURL: "http://13.50.238.54/", //api
  timeout: Infinity,
});

export const api = "http://13.50.238.54";
