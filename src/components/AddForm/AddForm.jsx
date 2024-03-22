import React, {useState} from 'react'
import EmojiPicker from 'emoji-picker-react';
import './AddForm.css'

const AddForm = () => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const toggleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const onEmojiClick = () => {
    toggleEmojiPicker(); 
  };
  return (
    <form>
 <i class="fa-regular fa-face-smile" onClick={toggleEmojiPicker}></i>
      {showEmojiPicker && (
        <div className='icons-Emo'>
          <EmojiPicker onEmojiClick={onEmojiClick} />
        </div>
      )}
        <input className='input-post' type="text" placeholder='Добавьте комментарий'/>
        <button className='btn-post' type='submit'>Опубликовать</button>

    </form>
  )
}

export default AddForm