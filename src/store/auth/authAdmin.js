import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    pass: '',
    email: '',
    emailExists: false,
    passExists: false,
    statusExists: false
}

export const AuthAdmin = createSlice({
    name: 'AuthAdmin',
    initialState,
    reducers: {
        setPass: (state, action) => {
            state.pass = action.payload
        },
        setEmail: (state, action) => {
            state.email = action.payload
        },
        setEmailExists: (state, action) => {
            state.emailExists = action.payload
        },
        setPassExists: (state, action) => {
            state.passExists = action.payload
        }
    } 
})



export const { setPass, setEmail, setEmailExists, setPassExists} = AuthAdmin.actions

export default AuthAdmin.reducer