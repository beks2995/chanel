import React from 'react';
import { collection, query, addDoc, getDocs } from "firebase/firestore";
import './App.css'
import { db } from '../../../firebase';
import { Link, Navigate } from 'react-router-dom';
import { setName, setPass, setEmail, setEmailExists, setRegistrationSuccess } from '@store/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';

const Registration = () => {
    const dispatch = useDispatch();
    const name = useSelector((s) => s.auth.name);
    const pass = useSelector((s) => s.auth.pass);
    const email = useSelector((s) => s.auth.email);
    const registrationSuccess = useSelector(s => s.auth.registrationSuccess);

    const nameSub = (e) => {
        dispatch(setName(e.target.value));
    };

    const passSub = (e) => {
        dispatch(setPass(e.target.value));
    };

    const emailSub = (e) => {
       dispatch( setEmail(e.target.value));
    };

    const sub = async (e) => {
        e.preventDefault();

        const querySnapshot = await getDocs(query(collection(db, "userAuthDate")));
        const userAuthDate = [];
        querySnapshot.forEach((doc) => {
            userAuthDate.push(doc.data());
        });

        const foundEmail = userAuthDate.some((userData) => userData.email === email);
        dispatch(setEmailExists(foundEmail));

        if (
            name.indexOf(' ') !== -1 ||
            name.length < 4 || 
            name.length > 16 || 
            pass.indexOf(' ') !== -1 ||
            pass.length < 4 || 
            pass.length > 32 || 
            email.indexOf(' ') !== -1 ||
            foundEmail
        ) {
            alert('Неправильная форма регистрации!!!');
        } else {
            addDoc(collection(db, "userAuthDate"), {
                name: name,
                password: pass,
                email: email,
                isAdmin: false,
            }).then(() => {
                dispatch(setRegistrationSuccess(true));
            }).catch((error) => {
                console.error("ошибка: ", error);
            });
        }
    };

    if (registrationSuccess) {
        return <Navigate to="/home" />;
    }

    return (
        <div className='registration'>
            <div className="regForm">
                <div className="text">
                    <h2 className='creat'>Create Account</h2>
                    <div className='sing'>Already have an account? <Link className='a' >Sign in</Link></div>
                </div>
                <form className='form' onSubmit={sub}>
                    <input type="text" placeholder='Username(min-4)' className='date' value={name} onChange={nameSub} />
                    <input type="password" placeholder='Password(min-8)' className='date' value={pass} onChange={passSub} />
                    <input type="email" placeholder='Email' className='date' value={email} onChange={emailSub} />
                    <button type='submit' className='btn'>Sign up <div className='arr'> <img src="https://www.freeiconspng.com/uploads/white-arrow-icon-5.png" className='arrow' /> </div> </button>
                </form>
            </div>
        </div>
    );
};

export default React.memo(Registration);
