import {Routes, Route } from "react-router";

import Login from './login/Login'
import './App.css';
import SignIn from "./Sign";

function App() {
  return (
    <div className="App">
      <Routes>
      <Route path="/login" element={<Login/>}/>
        <Route path="/" element={<SignIn/>}/>
      </Routes>
    </div>
  );
}

export default App;
