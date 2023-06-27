import { configureStore } from "@reduxjs/toolkit";
import authReducer from './services/auth/authSlice';
import registerReducer from './services/auth/registerSlice';
import advertReducer from './services/advert/advertSlice';
import advertCreationReducer from './services/advert/advertCreationSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        register: registerReducer,
        advert: advertReducer,
        advertCreation: advertCreationReducer,
    },
});