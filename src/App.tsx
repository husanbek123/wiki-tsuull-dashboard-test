import { Routes, Route } from "react-router-dom";
import "./App.css";
import Media from "./pages/Media";
import MediaCategory from "./pages/MediaCategory";
import Pharse from "./pages/Phrase";
import SinglePharse from "./pages/SinglePharse";
import Words from "./pages/Words";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Media />}></Route>
      <Route path="/media-category" element={<MediaCategory />}></Route>
      <Route path="/pharse" element={<Pharse />}></Route>
      <Route path="/pharse/:id" element={<SinglePharse />}></Route>
      <Route path="/words" element={<Words />}></Route>
    </Routes>
  );
}

export default App;
