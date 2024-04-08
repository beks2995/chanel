import React, { useState } from 'react';
import './App.css';
import Posts from "./components/Posts/Posts";
import { Route, Routes } from 'react-router-dom';
import PostForm from './components/PostForm/PostForm';

function App() {
    const [showPostForm, setShowPostForm] = useState(false);

    const togglePostForm = () => {
        setShowPostForm(!showPostForm);
    }

    return (
        <div className="App">
            <div className="posts-container">
                <div className='AddFormBtn'>
                    <button onClick={togglePostForm}>
                        {showPostForm ? 'Вернуться назад' : 'Добавить пост'}
                    </button>
                </div>
                <Routes>
                    {showPostForm ? <Route path="/" element={<PostForm />} /> : <Route path="/" element={<Posts postId={1} />} />}
                </Routes>
            </div>
        </div>
    );
}

export default App;
