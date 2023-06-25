import * as React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import {
  Media,
  MediaCategory,
  Pharse,
  Words,
} from "./utils/routes/dynamicRoutes/Dynamic";
import NotFound from "./pages/NotFound/NotFound";
import Login from "./pages/Login";
import Protected from "./utils/ProtectedRoute";
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
      <React.Suspense fallback={""}>
        <Routes>
          <Route
            path="/"
            element={
              <Protected>
                <Media />
              </Protected>
            }
          ></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route
            path="/media-category"
            element={
              <Protected>
                <MediaCategory />
              </Protected>
            }
          ></Route>
          <Route
            path="/phrase"
            element={
              <Protected>
                <Pharse />
              </Protected>
            }
          ></Route>
          <Route
            path="/words"
            element={
              <Protected>
                <Words />
              </Protected>
            }
          ></Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </React.Suspense>
    </>
  );
}
