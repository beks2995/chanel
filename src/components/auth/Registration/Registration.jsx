import React, { useState } from 'react';
import { collection, query, addDoc, getDocs } from "firebase/firestore";
import './App.css'
import { db } from '../../../firebase';

const Registration = () => {
    const [name, setName] = useState('');
    const [pass, setPass] = useState('');
    const [email, setEmail] = useState('');
    const [emailExists, setEmailExists] = useState(false);

    const nameSub = (e) => {
        setName(e.target.value);
    };

    const passSub = (e) => {
        setPass(e.target.value);
    };

    const emailSub = (e) => {
        setEmail(e.target.value);
    };

    const sub = async (e) => {
        e.preventDefault();

        const querySnapshot = await getDocs(query(collection(db, "userAuthDate")));
        const userAuthDate = [];
        querySnapshot.forEach((doc) => {
            userAuthDate.push(doc.data());
        });

        const foundEmail = userAuthDate.some((userData) => userData.email === email);
        setEmailExists(foundEmail);

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
                id: 2
            });
        }
    };

    return (
        <div className='registration'>
            <div className="regForm">
                <div className="text">
                    <h2 className='creat'>Create Account</h2>
                    <div className='sing'>Already have an account? <a className='a'>Sign in</a></div>
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

export default Registration;