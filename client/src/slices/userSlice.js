import { createSlice } from "@reduxjs/toolkit";

const user = JSON.parse(localStorage.getItem("user"));

// const initialState = user
//   ? { isLoggedIn: true, user }
//   : { isLoggedIn: false, user: null };


const initialState = { isLoggedIn: false, user: null };

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        register: (state, action) => {
            state.isLoggedIn = false;
        },
        login: (state, action) => {
            state.isLoggedIn = true;
            console.log('inside userslice: ', action.payload);
            state.user = action.payload;
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.user = null;
        },
        uploadProfileImage: (state, action) => {
            state.user.image = action.payload;
        }
    }
});

export const { register, login, logout, uploadProfileImage } = userSlice.actions;
export default userSlice.reducer;