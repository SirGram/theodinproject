
import Home from "./pages/Home/Home";

import { Navigate, Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup/Signup";
import { useUserData } from "./utils/useUserData";

function App() {
  useUserData()
 
  return (
    <Routes>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/" element={<Home/>}/>
      
    </Routes>
  );
}

export default App;
