import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: '',
    pass: '',
    email: '',
    emailExists: false,
    registrationSuccess: false,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setName: (state, action) => {
            state.name = action.payload
        },
        setPass: (state, action) => {
            state.pass = action.payload
        },
        setEmail: (state, action) => {
            state.email = action.payload
        },
        setEmailExists: (state, action) => {
            state.emailExists = action.payload
        },
        setRegistrationSuccess: (state, action) => {
            state.registrationSuccess = action.payload
        },
    } 
})


export const { setName, setPass, setEmail, setEmailExists, setRegistrationSuccess } = authSlice.actions

export default authSlice.reducer