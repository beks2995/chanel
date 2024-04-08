import React, { useState } from 'react';
import './PostForm.css';

function PostForm({ onAddPost }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [postDescription, setPostDescription] = useState('');

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setSelectedImage(imageUrl);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (selectedImage && postDescription) {
      const newPost = { image: selectedImage, description: postDescription };
      onAddPost(newPost);
      setSelectedImage(null);
      setPostDescription('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="formImg">
        <label htmlFor="imageUpload" className="formLabel">
          Загрузить изображение:
        </label>
        <input
          type="file"
          id="imageUpload"
          name="imageUpload"
          onChange={handleImageChange}
          className="formInput"
        />
      </div>
      {selectedImage && (
        <div className="imagePreview">
          <img src={selectedImage} alt="Выбранное изображение" className="imageSrc" />
        </div>
      )}
      <div className="formPost">
        <label htmlFor="postDescription" className="post">
          Описание поста:
        </label>
        <textarea
          id="postDescription"
          name="postDescription"
          value={postDescription}
          onChange={(e) => setPostDescription(e.target.value)}
          className="textPost"
        />
      </div>
      <button type="submit" className="formButton">
        Отправить
      </button>
    </form>
  );
}

export default PostForm;