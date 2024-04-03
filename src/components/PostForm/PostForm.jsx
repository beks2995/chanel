import React, {useState, useEffect} from 'react'
import './PostForm.css'
import myImge from '../Imges/175607-Sepik.jpeg'
import AddForm from '../AddForm';
import { Link } from 'react-router-dom';


const PostForm = ({postId, commentCount}) => {
    const [saved, setSaved] = useState(false);
    const [savedLikes, setSavedLikes] = useState(0);
    const [liked, setLiked] = useState(() => {
    const savedLikeState = localStorage.getItem(`likeState_${postId}`);
    return savedLikeState === 'true';
  });

  useEffect(() => {
    const savedLikes = localStorage.getItem(`likes_${postId}`);
    if (savedLikes) {
      setSavedLikes(parseInt(savedLikes));
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

  const handleSaveClick = () => {
    setSaved(!saved);
  };
  return (
    <>
    <div>
        <img className='myImage-w1' src={myImge} alt="" />
    </div>
    <div className='posts-fon'>
    <div>
       <Link to={'/'}>
       <div className='cross'></div>
       </Link>
      <p className='hr-p1'></p>
      <p className='comment-p1'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi eius totam illo nemo error veniam. Lorem ipsum dolor sit ametconsectetur adipisicing elit Lorem ipsum dolor sit elit Lorem ipsum dolor sit ametconsectetur adipisicin
      </p>

      <div className="comment-p1">
  {typeof commentCount === 'string' ? commentCount.split('\n').slice(0, 3).join('\n') : ''}
  {typeof commentCount === 'string' && commentCount.split('\n').length > 3 && '...'}
</div>

      <div className="post-icons">
        <i className={`far fa-heart${liked ? ' fas' : ''}`} onClick={handleLikeClick} style={{ color: liked ? 'red' : 'black', fontSize: liked ? '23px' : '23px' }}></i>
        <i className={`fa-regular fa-bookmark${saved ? ' fas' : ''}`} onClick={handleSaveClick} style={{ color: saved ? 'blue' : 'black', fontSize: saved ? '23px' : '23px' }}></i>
        <span className="comment-count">{savedLikes} отметок "нравится"</span>
        <i className="far fa-comment"></i>
      </div>
      <AddForm/>
    </div>

    </div>
    </>
    
  )
}

export default PostForm