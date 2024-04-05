import React, {useState, useEffect} from 'react'
import { collection, query,  onSnapshot, addDoc, doc, deleteDoc, updateDoc  } from 'firebase/firestore';
import { db } from "../../firebase";
 import './FormComments.css'



  const FormComments = ({ commentsOf }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "comments"), (querySnapshot) => {
            let arr = [];
            querySnapshot.forEach((doc) => {
                arr.push({ id: doc.id, ...doc.data() });
            });
            setComments(arr);
        });
        return () => {
            unsubscribe();
        };
    }, []);

    const handleChange = (e) => {
        setNewComment(e.target.value);

    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    if (!newComment.trim()) {
        return;
      }
  

        const newDocRef = await addDoc(collection(db, "comments"), {
            username: 'Новый пользователь',
            comment: newComment
        });
        setComments([...comments, { id: newDocRef.id, username: 'Новый пользователь', comment: newComment }]);
        setNewComment('');
    };

    

    return (
        <div className='form-commnntsRoot'>
        <div>
            <ul className='ul-post-commnets'>
                {comments.map(comment => (
                    <li className='li-comments' key={comment.id}>
                        <strong className='coments-w1'>{comment.username}: </strong>
                        {comment.comment}
                    </li>
                ))}
            </ul>
        </div>
        <form onSubmit={handleSubmit}>
        <i class="fa-regular fa-face-smile"></i>
            <input className='input-commnets' type="text" value={newComment} onChange={handleChange} placeholder="Добавте комментарий" />
            <button className='btn-commmnts' type="submit">Опубликовать</button>
        </form>
    </div>
    );
};


export default FormComments