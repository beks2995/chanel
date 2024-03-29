import React, { useState } from 'react';
import { collection, query, getDocs } from "firebase/firestore";
import { db } from '../firebase/index';

const Login = () => {
  const [username, setusername] = useState('');
  const [pass, setPass] = useState('');

  const nameSub = (e) => {
    setusername(e.target.value);
  };

  const passSub = (e) => {
    setPass(e.target.value);
  };


  const sub = async (e) => {
    e.preventDefault();

    const querySnapshot = await getDocs(query(collection(db, "userAuth-Date")));
    const userAuthDate = [];
    querySnapshot.forEach((doc) => {
      userAuthDate.push(doc.data());
    });

    if (
      username.indexOf(' ') !== -1 ||
      username.length < 4 ||
      username.length > 16 ||
      pass.indexOf(' ') !== -1||
      pass.length < 4 ||
      pass.length > 32
    ) {
      alert('Неправильная форма входа !!!');
    } 
  };

  return (
    <div className='Container'>
      <div className="welcomeForm">
        <h2 className='login'>Login to account</h2>

        <form className='form' onSubmit={sub}>
          <input type="text" placeholder='Username' className='Username' value={username} onChange={nameSub} />
          <input type="password" placeholder='Password' className='Password' value={pass} onChange={passSub} />
          <button type='submit' className='button'> Login </button>
        </form>
      </div>
    </div>
  );
};

export default Login;