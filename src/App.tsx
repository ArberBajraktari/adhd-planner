
import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route }
    from "react-router-dom";
import SignUp from "./components/sign_up";
import Main from "./components/main";
  
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main/>}/>
        <Route path="/sign_up" element={<SignUp />}/>
      </Routes>
    </Router>
  );
}
  
export default App;