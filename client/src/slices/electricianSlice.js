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
            state.electrician = action.payload;
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.electrician = null;
        },
        subscribe: (state, action) => {
            const { serviceId } = action.payload; 
            if (!state.electrician.subscribedServices.includes(serviceId)) {
                state.electrician.subscribedServices.push(serviceId);
            }
        },
        unsubscribe: (state, action) => {
            const { serviceId } = action.payload; 
            const index = state.electrician.subscribedServices.indexOf(serviceId);
            if (index !== -1) {
                state.electrician.subscribedServices.splice(index, 1);
            }
        },
        uploadProfilePhoto: (state, action) => {
            state.electrician.image = action.payload;
        },
        uploadCertificate: (state, action) => {
            state.electrician.certificate = action.payload;
        },
    }
});

export const { 
    register, 
    login, 
    logout, 
    uploadProfilePhoto, 
    subscribe, 
    unsubscribe, 
    uploadCertificate,
} = electricianSlice.actions;

export default electricianSlice.reducer;