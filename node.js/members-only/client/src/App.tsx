import Footer from "./components/Footer";
import Nav from "./components/Nav";
import Home from "./pages/Home/Home";

import { Navigate, Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup/Signup";

function App() {
  return (
    <Routes>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/" element={<Home/>}/>
      
    </Routes>
  );
}

export default App;
