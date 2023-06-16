import * as React from "react";
import { Routes, Route } from "react-router-dom";
import {
  Media,
  MediaCategory,
  Pharse,
  SinglePharse,
  Words,
} from "./utils/routes/dynamicRoutes/Dynamic";
import Loading from "./components/Loading/Loading";
export default function App() {
  return (
    <>
      <React.Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Media />}></Route>
          <Route path="/media-category" element={<MediaCategory />}></Route>
          <Route path="/pharse" element={<Pharse />}></Route>
          <Route path="/pharse/:id" element={<SinglePharse />}></Route>
          <Route path="/words" element={<Words />}></Route>
        </Routes>
      </React.Suspense>
    </>
  );
}
