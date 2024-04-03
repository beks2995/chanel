import React from 'react';
import "./AdminLog.css";
import { collection, query, getDocs } from 'firebase/firestore';
import { db } from '../../firebase'
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux'
import { setPass, setEmail, setEmailExists, setPassExists } from '../../store/auth/authAdmin';

const AdminLog = () => {
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const pass = useSelector((s) => s.authAdmin.pass);
    const email = useSelector((s) => s.authAdmin.email);

    const passSub = (e) => {
        dispatch(setPass(e.target.value));
    };

    const emailSub = (e) => {
        dispatch(setEmail(e.target.value));
    };

    let submitHandler = async (e) => {

        e.preventDefault();


    const querySnapshot = await getDocs(query(collection(db, "userAuthDate")));
    const userAuthDate = [];
    querySnapshot.forEach((doc) => {
      userAuthDate.push(doc.data());
    });

    const foundEmail = userAuthDate.some((userData) => userData.email === email);
    const foundPass = userAuthDate.some((userData) => userData.password === pass);
    const foundAdmin = userAuthDate.some((userData) => userData.isAdmin === true);

    dispatch(setEmailExists(foundEmail));
    dispatch(setPassExists(foundPass));
    dispatch(setPassExists(foundAdmin));
    


    if (pass.indexOf(' ') !== -1 ) {
        alert('Неправильная форма пароля!')
    } else if (email.indexOf(' ') !== -1 ) {
        alert('Неправильная форма email!')
    } else if ( foundEmail && foundPass && foundAdmin ) {
        navigate('/adminPage')
    } else {
        alert('Неправильный логин или пароль либо вы не являетесь админом')
    }
}

    return (
        <div>
            <div className='adminlogin'>
                <form className='form' onSubmit={submitHandler}>
                    <input type="email" placeholder='Email' className='date' value={email} onChange={emailSub} />
                    <input type="password" placeholder='Password' className='date' value={pass} onChange={passSub} />
                    <button type='submit' className='btn'>Login  <div className='arr'> <img src="https://www.freeiconspng.com/uploads/white-arrow-icon-5.png" className='arrow' /> </div> </button>
                </form>
            </div>
        </div>
    )
}

export default AdminLog