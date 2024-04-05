import React from "react";
import AdminPage from "./pages/AdminPage";
import AdminLog from "./pages/AdminLog";
import {Routes, Route } from "react-router";
import Posts from "./components/Posts/Posts";
import '@fortawesome/fontawesome-free/css/all.min.css';
import './App.css'
import PostForm from "./components/PostForm/PostForm";
import Registration from "./components/auth/Registration";


function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/admin" element={<AdminLog/>}/>
        <Route path="/adminPage" element={<AdminPage/>} />
        <Route path="/home" element={<Posts/>}/>
        <Route path="/posts" element={<PostForm/>}/>
        <Route path="/" element={<Registration/>}/>
      </Routes>
    </div>
  );
}

export default App;