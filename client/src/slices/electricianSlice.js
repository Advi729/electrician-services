import { createSlice } from "@reduxjs/toolkit";

const electrician = JSON.parse(localStorage.getItem("electrician"));

// const initialState = electrician
//   ? { isLoggedIn: true, electrician }
//   : { isLoggedIn: false, electrician: null };


const initialState = { isLoggedIn: false, electrician: null };

const electricianSlice = createSlice({
    name: 'electrician',
    initialState,
    reducers: {
        register: (state, action) => {
            state.isLoggedIn = false;
        },
        login: (state, action) => {
            state.isLoggedIn = true;
            console.log('inside userslice: ', action.payload);
            state.electrician = action.payload;
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.electrician = null;
        },
        uploadProfileImage: (state, action) => {
            state.electrician.image = action.payload;
        }
    }
});

export const { register, login, logout, uploadProfileImage } = electricianSlice.actions;
export default electricianSlice.reducer;