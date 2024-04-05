import React from "react";
import { Routes, Route, Navigate } from "react-router";
import '@fortawesome/fontawesome-free/css/all.min.css';
import Posts from "./components/Posts";
import './App.css'
import PostForm from "./components/PostForm/PostForm";
import Registration from "./components/auth/Registration";
import Login from "./components/auth/Login/Login";

const prov = () => {
  return false
}

function App() {
  
  return (
    <div className="App">
      <Routes>
        <Route path="/home" element={prov ? <Posts/> : <Navigate to='/Login' />}/>
        <Route path="/posts/:post_id" element={<PostForm/>}/>
        <Route path="/Login" element={<Login/>}/>
        <Route path="/" element={<Registration/>}/>
      </Routes>
    </div>
  );
}

export default App;
