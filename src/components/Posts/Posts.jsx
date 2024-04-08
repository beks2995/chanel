import React, { useState, useEffect } from 'react';
import myImage from '../Images/images.jpg';
import './Posts.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as farHeart, faBookmark as farBookmark, faComment as farComment } from '@fortawesome/free-regular-svg-icons';
import { faHeart as fasHeart, faBookmark as fasBookmark } from '@fortawesome/free-solid-svg-icons';

const Posts = ({ postId, description }) => {
  const [imageSrc] = useState(myImage);
  const [savedLikes, setSavedLikes] = useState(() => {
    const savedLikes = localStorage.getItem(`likes_${postId}`);
    return savedLikes ? parseInt(savedLikes, 10) : 0;
  });
  const [savedComments, setSavedComments] = useState(() => {
    const savedComments = localStorage.getItem(`comments_${postId}`);
    return savedComments ? JSON.parse(savedComments) : [];
  });
  const [saved, setSaved] = useState(false);
  const [liked, setLiked] = useState(() => {
    const savedLikeState = localStorage.getItem(`likeState_${postId}`);
    return savedLikeState === 'true';
  });

  useEffect(() => {
    const savedLikes = localStorage.getItem(`likes_${postId}`);
    if (savedLikes) {
      setSavedLikes(parseInt(savedLikes, 10));
    }
    const savedComments = localStorage.getItem(`comments_${postId}`);
    if (savedComments) {
      setSavedComments(JSON.parse(savedComments));
    }
  }, [postId]);

  const handleLikeClick = () => {
    const newLiked = !liked;
    setLiked(newLiked);
    const newSavedLikes = newLiked ? savedLikes + 1 : savedLikes - 1;
    setSavedLikes(newSavedLikes);
    localStorage.setItem(`likes_${postId}`, newSavedLikes.toString());
    localStorage.setItem(`likeState_${postId}`, newLiked.toString());
  };

  const handleCommentSubmit = (comment) => {
    const updatedComments = [...savedComments, comment];
    setSavedComments(updatedComments);
    localStorage.setItem(`comments_${postId}`, JSON.stringify(updatedComments));
  };

  const handleCommentDelete = (index) => {
    const updatedComments = [...savedComments];
    updatedComments.splice(index, 1);
    setSavedComments(updatedComments);
    localStorage.setItem(`comments_${postId}`, JSON.stringify(updatedComments));
  };

  return (
    <div className='post-card'>
      <img className='myImage' src={imageSrc} alt='' />
      <FontAwesomeIcon
      className='likeIcon'
        icon={liked ? fasHeart : farHeart}
        onClick={handleLikeClick}
        style={{ color: liked ? 'red' : '#fff'}}
      />
      <span className='comment-count-w1'>{savedLikes} отметок "Нравится"</span>
      <p className='post-description'>{description}</p>
      <div className='post-details'>
        <ul>
          {savedComments.map((comment, index) => (
            <li key={index}>
              {comment}
              <button onClick={() => handleCommentDelete(index)}>Удалить</button>
            </li>
          ))}
        </ul>
        <CommentForm onSubmit={handleCommentSubmit} />
      </div>
      <Link to={'/Posts'}>
        <i className='far fa-comment'></i>
      </Link>
    </div>
  );
};

const CommentForm = ({ onSubmit }) => {
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(comment);
    setComment('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        className='commentsInputForm'
        type='text'
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder='Добавить комментарий...'
      />
      <button className='submitInputBtn' type='submit'>Отправить</button>
    </form>
  );
};

export default Posts;


