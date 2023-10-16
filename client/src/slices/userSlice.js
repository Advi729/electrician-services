import { createSlice } from "@reduxjs/toolkit";

// const user = JSON.parse(localStorage.getItem("user"));

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
        uploadProfilePhoto: (state, action) => {
            state.user.image = action.payload;
        },
        addAddressToSlice: (state, action) => {
            const address = action.payload;
            state.user.address.push(address);
        },
        addSelectedService: (state, action) => {
            state.user.selectedServices = action.payload;
        },
        removeSelectedService: (state, action) => {
            // state.user.selectedServices = state.user.selectedServices.filter(service => service !== action.payload);
            state.user.selectedServices = [];
        },
        addSelectedSlot: (state, action) => {
            const { selectedSlots, electricianId } = action.payload;
            state.user.selectedSlots = selectedSlots;
            state.user.electricianBooked = electricianId;
        },
        removeSelectedSlot: (state, action) => {
            // state.user.selectedSlots = state.user.selectedSlots.filter(slot => slot !== action.payload);
            state.user.selectedSlots = [];
            state.user.electricianBooked = null;
        },
    }
});

export const { 
    register, 
    login, 
    logout,
    uploadProfilePhoto, 
    addAddressToSlice,
    addSelectedService,
    removeSelectedService,
    addSelectedSlot,
    removeSelectedSlot, 
} = userSlice.actions;

export default userSlice.reducer;