import React, { useState, useEffect } from 'react';
import { collection, query, onSnapshot, addDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { useParams, Link } from 'react-router-dom';
import './Posts.css';
import mockDate from '../mock/mockDate.json';

const Posts = () => {
  const { post_id } = useParams();
  const [saved, setSaved] = useState(false);
  const [likedPosts, setLikedPosts] = useState(() => {
    const storedLikedPosts = localStorage.getItem('likedPosts');
    return storedLikedPosts ? JSON.parse(storedLikedPosts) : [];
  });

  useEffect(() => {
    const q = query(collection(db, 'posts'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let arr = [];
      querySnapshot.forEach((doc) => {
        arr.push({ ...doc.data(), id: doc.id });
      });
      setLikedPosts(arr);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    mockDate.forEach(async (post) => {
      try {
        await addDoc(collection(db, 'posts'), post);
      } catch (error) {
      }
    });
  }, []);

  const toggleLike = (postId) => {
    if (likedPosts.includes(postId)) {
      setLikedPosts(likedPosts.filter((id) => id !== postId));
    } else {
      setLikedPosts([...likedPosts, postId]);
    }
  };

  const getTotalLikes = (postId, likes) => {
    return likedPosts.includes(postId) ? likes + 1 : likes;
  };

  const handleSaveClick = () => {
    setSaved(!saved);
  };

  return (
    <div>
      {mockDate
        .filter((post) => !post_id || post.post_id.toString() === post_id)
        .map((post) => (
          <div key={post.post_id} className='post-card'>
            <img className='post-img' src={post.image_url} alt='' width={400} height={500} />
            {!post_id && (
              <div className='incons-post'>
                <i
                  className={`fa-heart cnDetileCardLikeIcon ${likedPosts.includes(post.post_id) ? 'fas liked' : 'far'}`}
                  onClick={() => toggleLike(post.post_id)}
                />
                <Link to={`/posts/${post.post_id}`} className='post-link'>
                  <i className='fa-regular fa-comment cnDetileCarCommnet' />
                </Link>
                <i
                  className={`fa-regular fa-bookmark${saved ? ' fas' : ''}`}
                  onClick={handleSaveClick}
                  style={{ color: saved ? '#fff' : '#fff' }}
                ></i>
              </div>
            )}
            {!post_id && (
              <p className='likes-post'>{getTotalLikes(post.post_id, post.likes)} отметок "Нравится"</p>
            )}
            <div className='post-actions'>
              {!post_id && (
                <Link to={`/posts/${post.post_id}`} className='post-action-link'>
                  <span className='span-post'>
                    {post.caption.slice(0, post.caption.indexOf('\n', 100) !== -1 ? post.caption.indexOf('\n', 100) : 100)}
                    {post.caption.length > 100 && '...'}
                  </span>
                </Link>
              )}
            </div>
          </div>
        ))}
    </div>
  );
};

export default Posts;
