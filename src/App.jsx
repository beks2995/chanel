import {Routes, Route } from "react-router";
import Posts from "./components/Posts/Posts";
import '@fortawesome/fontawesome-free/css/all.min.css';
import './App.css'
import PostForm from "./components/PostForm/PostForm";
function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Posts/>}/>
        <Route path="/posts" element={<PostForm/>}/>

      </Routes>
    </div>
  );
}

export default App;