import React, { useState, useEffect } from 'react'
import { collection, query, addDoc, onSnapshot} from "firebase/firestore";
import './App.css'
import { db } from '../../../firebase';

const Registration = () => {

    const [name, setName] = useState('')
    const [pass, setPass] = useState('')
    const [email, setEmail] = useState('')

    const nameSub = (e) => {
        setName(e.target.value)
    }
    const passSub = (e) => {
        setPass(e.target.value)
    }
    const emailSub = (e) => {
        setEmail(e.target.value)
    }


    const sub = async (e) => {
        e.preventDefault();

//Осталось только сравнить email который написал пользователь со всеми email которые есть в firebase, я постараюсь это сделать до понидельника

        onSnapshot(query(collection(db, "userAuthDate")), (querySnapshot) => {
            const userAuthDate = [];
            querySnapshot.forEach((doc) => {
                userAuthDate.push(doc.data());
            });

            
            console.log(userAuthDate);


        });


//Осталось только сравнить email который написал пользователь со всеми email которые есть в firebase, я постараюсь это сделать до понидельника


        if (name.indexOf(' ') !== -1 || name.length < 4 || pass.indexOf(' ') !== -1 || pass.length < 4 || email.indexOf(' ') !== -1) {
            alert('Date is not full');
        } else {

            async function foo() {
                await addDoc(collection(db, "userAuthDate"), {
                    name: name,
                    password: pass,
                    email: email,
                    isAdmin: false,
                    id: 2
                })
            }
            foo()



        }
    }

//Осталось только сравнить email который написал пользователь со всеми email которые есть в firebase, я постараюсь это сделать до понидельника


    return (
        <div className='registration'>
            <div className="regForm">
                <div className="text">
                    <h2 className='creat'>Create Account</h2>
                    <div className='sing'>Already have an account? <a className='a'>Sing in</a></div>
                </div>
                <form className='form' onSubmit={sub}>
                    <input type="text" placeholder='Username(min-4)' className='date' value={name} onChange={nameSub} />
                    <input type="text" placeholder='Password(min-8)' className='date' value={pass} onChange={passSub} />
                    <input type="text" placeholder='Email' className='date' value={email} onChange={emailSub} />
                    {/* rename input with input e and input p*/}
                    <button type='Submit' className='btn'>Sing up <div className='arr'> <img src="https://www.freeiconspng.com/uploads/white-arrow-icon-5.png" className='arrow' /> </div> </button>
                </form>
            </div>
        </div>
    )
}

export default Registration