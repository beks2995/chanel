import React, { useState } from 'react';
import { collection, query, addDoc, getDocs } from "firebase/firestore";
import { Link } from 'react-router-dom';

const SignIn = () => {
    
    const [name, setName] = useState('');
    const [pass, setPass] = useState('');
    const [email, setEmail] = useState('');
    const [emailExists, setEmailExists] = useState(false);
    const [sign, setSign] = useState('')
    

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

        const querySnapshot = await getDocs(query(collection("userAuthDate")));
        const userAuthDate = [];
        querySnapshot.forEach((doc) => {
            userAuthDate.push(doc.data());
        });

        const foundEmail = userAuthDate.some((userData) => userData.email === email);
        setEmailExists(foundEmail);

        if(
            name.indexOf(' ') !== -1 || 
            name.length < 4  ||
            name.length > 16  ||
            pass.indexOf(' ') !== -1 ||
            pass.length < 4  ||
            pass.length > 32  ||
            email.indexOf(' ') !== -1 ||
            foundEmail
        ) {
            alert('Неправильная форма регистрации!!!');
        } else{
            addDoc(collection("userAuthDate"), {
                name: name,
                password: pass,
                email: email,
                isAdmin: false,
                id: 2
            });
        }
    };
    console.log('hello');
    return (
        <div className='registration'>
            <div className="regForm">
                <div className="text">
                    <h1 className='creat'>Create Account</h1>
                    <div className='sing'>Already have an account? <Link to={'/login'} className='a' >Sign in</Link></div>
                </div>
                <form className='form' onSubmit={sub}>
                    <input type="text" placeholder='Username(min-4)' className='date' value={name} onChange={nameSub} />
                    <input type="password" placeholder='Password(min-8)' className= 'date' value={pass} onChange={passSub} />
                    <input type="email" placeholder='Email' className='date' value={email} onChange={emailSub} />
                    <button type='submit' className='btn' > Sign in <div className='arr'> <img src="https://www.freeiconspng.com/uploads/white-arrow-icon-5.png" className='arrow' /> </div> </button>
                </form>
            </div>
        </div>
    );
};

export default SignIn;