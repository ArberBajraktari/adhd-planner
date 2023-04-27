
import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route }
    from "react-router-dom";
import SignUp from "./components/sign_up";
import LogIn from "./components/log_in";
import Main from "./components/main";
  
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main/>}/>
        <Route path="/sign_up" element={<SignUp />}/>
        <Route path="/log_in" element={<LogIn />}/>
      </Routes>
    </Router>
  );
}
  
export default App;