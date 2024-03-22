import React, { useMemo, useEffect, useState } from 'react';
import "./Form.css";
import { getDoc, doc, collection, onSnapshot, query, QuerySnapshot, updateDoc} from 'firebase/firestore';
import { db } from '../../firebase'
import { useNavigate } from 'react-router';

const Form = React.memo(async (e) => {
  const enterAdmin = async (e) => {
    e.preventDefault();
    const querySnapshot = await getDoc(query(collection(db, "userAuthDate", "wVX0MrJKP8eaazeczRIm")));
    const adminUser = [];
    querySnapshot.forEach((doc) => {
      adminUser.push(doc.data());
    });

  }

  const adminLogin = async () => {
    doc(db, "userAuthDate", "wVX0MrJKP8eaazeczRIm")
    await getDoc(doc(db, "userAuthDate", "wVX0MrJKP8eaazeczRIm"), {
    })
  }

  return (
    <div className='adminlogin'>
        <form className='form' onSubmit>
          <input type="email" placeholder='Email' className='date' value onChange/>
          <input type="password" placeholder='Password' className='date' value onChange/>
          <button type='submit' className='btn'>Login <div className='arr'> <img src="https://www.freeiconspng.com/uploads/white-arrow-icon-5.png" className='arrow' /> </div> </button>
        </form>
    </div>
  )
})

export default Form