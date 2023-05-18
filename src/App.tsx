
import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route }
    from "react-router-dom";
import SignUp from "./components/update/sign_up";
import LogIn from "./components/update/log_in";
import Main from "./components/main";
import Home from "./components/home";
  
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main/>}/>
        <Route path="/home" element={<Home />}/>
      </Routes>
    </Router>
  );
}
  
export default App;