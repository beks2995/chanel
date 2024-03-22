import React, {useState, useEffect} from 'react'
import myImage from '../Imges/175607-Sepik.jpeg'
import './Posts.css'
import { Link } from 'react-router-dom'

const Posts = ({postId}) => {
    const [imageSrc, setImageSrc] = useState('');
    const [savedLikes, setSavedLikes] = useState(0);
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
  }, [postId]);

  const handleLikeClick = () => {
    const newLiked = !liked;
    setLiked(newLiked);
    const newSavedLikes = newLiked ? savedLikes + 1 : savedLikes - 1;
    setSavedLikes(newSavedLikes);
    localStorage.setItem(`likes_${postId}`, newSavedLikes.toString());
    localStorage.setItem(`likeState_${postId}`, newLiked.toString());
  };


    const handleImageChange = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result);
      }
      reader.readAsDataURL(file);
    };
    const handleSaveClick = () => {
        setSaved(!saved);
      };
    return (
      <div> 
        { <img className='myImage' src={myImage} alt=""/>}
        <i className={`far fa-heart${liked ? ' fas' : ''}`} onClick={handleLikeClick} style={{ color: liked ? 'red' : '#fff', fontSize: liked ? '23px' : '23px', marginLeft: '385px', marginTop: '-5px' }}></i>
        <i className={`fa-regular fa-bookmark${saved ? ' fas' : ''}`} onClick={handleSaveClick} style={{ color: saved ? 'blue' : '#fff', fontSize: saved ? '23px' : '23px', marginLeft: '-375px', marginTop: '-5px' }}></i>
        <span className="comment-count-w1">{savedLikes} отметок "нравится"</span>
        <Link to={'/posts'}>
          <p className='comment-p3'>Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Modi eius totam illo nemo error veniam.
            Lorem ipsum dolor sit ametconsectetur adipisicing elit...
          </p>
          <i className="fa-regular fa-comment"></i>
        </Link>
      </div>
  )
}

export default Posts