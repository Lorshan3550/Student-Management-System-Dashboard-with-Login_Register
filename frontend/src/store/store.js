import { configureStore } from "@reduxjs/toolkit"
import userReducer from "../pages/userSlice"


export const store = configureStore({
    reducer : {
        users : userReducer
    }
})