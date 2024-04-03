import { configureStore } from "@reduxjs/toolkit";
import authAdmin from "./auth/authAdmin";

export const store = configureStore({
    reducer: {
        authAdmin,
        auth: authSlice,
    },
})