
// const CommentForm = ({ onSubmit }) => {
//   const [comment, setComment] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(comment);
//     setComment('');
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         type='text'
//         value={comment}
//         onChange={(e) => setComment(e.target.value)}
//         placeholder='Добавьте комментарий'
//         className='input-post'
//       />
//       <button type='submit' className='btn-post'>Отправить</button>
//     </form>
//   );
// };

// export default Posts;