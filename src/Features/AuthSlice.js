import { createSlice } from '@reduxjs/toolkit';
import { json } from 'react-router-dom';
import { SignInuser, SignUpuser } from '../Utils/ApiCalls';
import { updateUserProfile ,fetchUserProfile} from './thunk';

const AuthSlice = createSlice({
    name: 'auth',
    initialState: {
        user: {
            msg: "",
            user: "",
            error: "",
            token: "",
            loading: false,
        }
    },
    reducers: {
        addtokens: (state, action) => {
            state.user.token = localStorage.getItem("token");
        },
        adduser: (state, action) => {
            state.user.user = localStorage.getItem("token");
        },
        logout: (state, action) => {
            state.user.token = null;
            localStorage.clear();
        }
    },
    extraReducers: (builder) => {
        // ****************************** login method ****************************
        builder
            .addCase(SignInuser.pending, (state, action) => {
                state.user.loading = true;
            })
            .addCase(SignInuser.fulfilled, (state, { payload: { msg, error, token, user } }) => {
                state.user.loading = false;

                if (error) {
                    state.user.error = error;
                } else {
                    state.user.msg = msg;
                    state.user.user = user;
                    state.user.token = token;
                    localStorage.setItem("msg", msg);
                    localStorage.setItem("user", JSON.stringify(user));
                    localStorage.setItem("token", token);
                }
            })
            .addCase(SignInuser.rejected, (state, action) => {
                state.user.loading = false;
            })
            // ****************************** signup method ****************************
            .addCase(SignUpuser.pending, (state, action) => {
                state.user.loading = true;
            })
            .addCase(SignUpuser.fulfilled, (state, { payload: { msg, error } }) => {
                state.user.loading = false;
                if (error) {
                    state.user.error = error;
                } else {
                    state.user.msg = msg;
                }
            })
            .addCase(SignUpuser.rejected, (state, action) => {
                state.user.loading = false;
            }) 
             .addCase(updateUserProfile.pending, (state, action) => {
                state.status = 'loading';
              })
              .addCase(updateUserProfile.fulfilled, (state, { payload }) => {
                state.status = 'succeeded';
                state.user = payload.user;
                state.error = null;
              })
              .addCase(updateUserProfile.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || action.error.message;
              }).addCase(fetchUserProfile.pending, (state, action) => {
                state.status = 'loading';
              })
              .addCase(fetchUserProfile.fulfilled, (state, { payload }) => {
                state.status = 'succeeded';
                state.user = payload;
                console.log(payload);
                state.error = null;
              })
              .addCase(fetchUserProfile.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || action.error.message;
              });
    }
});

export const { addtokens, adduser, logout } = AuthSlice.actions;

export default AuthSlice.reducer;
