import "./Login.css"
import React, { useState } from 'react';
import { db } from '../../../firebase/index';
import { Link, Navigate, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { collection, query, getDocs } from "firebase/firestore";
import { setPass, setEmail, setEmailExists, setPassExists } from '@store/auth/LoginSlice';

const Login = () => {
  const dispatch = useDispatch();


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

    if (
      email.indexOf(' ') !== -1 ||
      email.length < 4 ||
      email.length > 25 ||
      pass.indexOf(' ') !== -1 ||
      pass.length < 4 ||
      pass.length > 60
    ) {
      alert('Неправильная форма входа!!!');
    } else if (foundEmail || foundPass) {
      <Navigate to="/home" />;
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

export default Login;