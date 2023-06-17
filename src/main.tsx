import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.scss";
import Layout from "./layout/Layout.tsx";
// Translation functions start
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import uz from "./locales/uz/uz.json";
import en from "./locales/en/en.json";
import TanstackQueryProvider from "./query/tanstack.tsx";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
i18n
  .use(LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      en: {
        translation: en,
      },
      uz: {
        translation: uz,
      },
    },
    lng: "en",
    debug: true,
  });
// Translation functions end
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <TanstackQueryProvider>
      <BrowserRouter>
        <Layout>
          <App />
        </Layout>
        <ReactQueryDevtools></ReactQueryDevtools>
      </BrowserRouter>
    </TanstackQueryProvider>
  </React.StrictMode>
);
