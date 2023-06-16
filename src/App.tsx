import * as React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Media,
  MediaCategory,
  Pharse,
  SinglePharse,
  Words,
} from "./utils/routes/dynamicRoutes/Dynamic";
import Loading from "./components/Loading/Loading";
import NotFound from "./pages/NotFound/NotFound";
import Login from "./pages/Login";
export default function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <React.Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Media />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/media-category" element={<MediaCategory />}></Route>
          <Route path="/pharse" element={<Pharse />}></Route>
          <Route path="/pharse/:id" element={<SinglePharse />}></Route>
          <Route path="/words" element={<Words />}></Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </React.Suspense>
    </>
  );
}
