import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router';
import Posts from '../Posts';
import  mockDate  from '../mock/mockDate.json'
import './PostForm.css'
import { Link } from 'react-router-dom';
import FormComments from '../FormComments/FormComments';

const PostForm = ({}) => {
    const { post_id } = useParams();
  const [saved, setSaved] = useState(false);
  const [comments, setComments] = useState([]);
  const [likedPosts, setLikedPosts] = useState(() => {
  const storedLikedPosts = localStorage.getItem('likedPosts');
    return storedLikedPosts ? JSON.parse(storedLikedPosts) : [];
  });
  useEffect(() => {
    localStorage.setItem('likedPosts', JSON.stringify(likedPosts));
  }, [likedPosts]);

  useEffect(() => {
    const post = mockDate.find(post => post.post_id === post_id);
    if (post) {
      setComments(post.comments);
    }
  }, [post_id]);

  const toggleLike = postId => {
    if (likedPosts.includes(postId)) {
      setLikedPosts(likedPosts.filter(id => id !== postId));
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
    <div className='postsForm-black'>
     <Posts/>
     <div className='post-colum-black'>
     {mockDate
                .filter(post => !post_id || post.post_id.toString() === post_id)
                .map(post => (
        <div key={post.post_id} className='post-card-black'>
            <Link to={'/home'}>
            <div className='cross'>
            </div>
            </Link>
              <p className='span-post'>
              {post.caption}
            </p>
            <div className="post-actions-black">
          <div className='incons-post-black'>
          <i className={`fa-heart cnDetileCardLikeIcon ${likedPosts.includes(post.post_id) ? "fas liked" : "far"}`} onClick={() => toggleLike(post.post_id)} />
              <i className="fa-regular fa-comment cnDetileCarCommnet" />
            <i className={`fa-regular fa-bookmark${saved ? ' fas' : '' }`} onClick={handleSaveClick} style={{ color: saved ? '#fff' : '#fff', }}></i>
          </div>
          <span className='likes-post'>{getTotalLikes(post.post_id, post.likes)} отметок "Нравится"</span>
          </div>
           <div className='mock'>
            </div>
        </div>
      ))}
      <FormComments comments={comments} setComments={setComments} />
     </div>
    </div>
  )
}

export default PostForm

