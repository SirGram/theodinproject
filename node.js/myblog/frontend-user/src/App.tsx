import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import BlogEntry from "./pages/BlogEntry/BlogEntry";

function App() {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/entry/:id" element={<BlogEntry />} />
    </Routes>
  );
}

export default App;
