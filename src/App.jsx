import { Routes, Route } from "react-router";
import Posts from "./components/Posts";
import './App.css'
import PostForm from "./components/PostForm/PostForm";
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/home" element={<Posts/>}/>
        <Route path="/posts/:post_id" element={<PostForm/>}/>
      </Routes>
    </div>
  );
}

export default App;
