import { createAsyncThunk } from "@reduxjs/toolkit";

export const SignUpuser = createAsyncThunk("signupuser", async (body) => {
    const res = await fetch("https://promanage-khqe.onrender.com/api/user/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    })
    return await res.json()

})
export const SignInuser = createAsyncThunk("signinuser", async (body) => {
    const res = await fetch("https://promanage-khqe.onrender.com/api/user/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    })
    return await res.json()

})