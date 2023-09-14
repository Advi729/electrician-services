import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from "../slices/userSlice";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from "redux-persist";
import thunk from "@reduxjs/toolkit";
import electricianSlice from "../slices/electricianSlice";
import adminSlice from "../slices/adminSlice";

const persistConfig = {
    key: 'root',
    storage,
}

const rootReducer = combineReducers({ 
    user: userSlice,
    electrician: electricianSlice,
    admin: adminSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
});

export default store;
export const persistor = persistStore(store);