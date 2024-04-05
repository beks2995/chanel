import "./Login.css"
import React, { useState } from 'react';
import { db } from '@fireb/index';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { collection, query, getDocs } from "firebase/firestore";
import { setPass, setEmail, setEmailExists, setPassExists } from '@store/auth/LoginSlice';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const passSub = (e) => {
    dispatch(setPass(e.target.value));
  };

  const emailSub = (e) => {
    dispatch(setEmail(e.target.value));
  };

  const pass = useSelector((s) => s.login.pass);
  const email = useSelector((s) => s.login.email);

  const sub = async (e) => {
    e.preventDefault();

    const querySnapshot = await getDocs(query(collection(db, "userAuthDate")));
    const userAuthDate = [];
    querySnapshot.forEach((doc) => {
      userAuthDate.push(doc.data());
    });

    const foundEmail = userAuthDate.some((userData) => userData.email === email);
    const foundPass = userAuthDate.some((userData) => userData.password === pass);

    dispatch(setEmailExists(foundEmail));
    dispatch(setPassExists(foundPass));

    console.log(foundEmail);
    console.log(foundPass);

    
if (pass.indexOf(' ') !== -1 ) {
  alert('Неправильная форма пароля!!!')
} else if (pass.length < 8 ) {
  alert('Слишком короткий пароль!!!')
} else if (pass.length > 60 ) {
  alert('Слишком длинный пароль!!!')
} else if (email.indexOf(' ') !== -1 ) {
  alert('Неправильная форма email!!!')
} else if (foundEmail && foundPass) {
  localStorage.setItem('loggedInUser', email);
  navigate("/home")
} else {
  alert('Не правильный логин или пароль')
}
  };

  return (
    <div className='Container'>
      <div className="welcomeForm">
        <h2 className='login'>Login to account</h2>

        <form className='form' onSubmit={sub}>
          <input type="email" placeholder='Email' className='Username' value={email} onChange={emailSub} />
          <input type="password" placeholder='Password' className='Password' value={pass} onChange={passSub} />
          <button type='submit' className='button'> Login </button>
        </form>
        
      </div>
    </div>
  );
};

export default React.memo(Login);
