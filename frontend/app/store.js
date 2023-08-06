import { combineReducers, configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

import authReducer from './services/auth/authSlice';
import registerReducer from './services/auth/registerSlice';
import advertReducer from './services/advert/advertSlice';
import advertCreationReducer from './services/advert/advertCreationSlice'
import settingsReducer from './services/settings/settingsSlice'
import authForgotPasswordReducer from './services/auth/authForgotPasswordSlice'
import authActivationReducer from './services/auth/authActivationSlice'
import authResetPasswordReducer from "./services/auth/authResetPasswordSlice";
import thunk from 'redux-thunk'

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['settings']
}

const rootReducer = combineReducers({
    auth: authReducer,
    authForgotPassword: authForgotPasswordReducer,
    authActivation: authActivationReducer,
    authResetPassword: authResetPasswordReducer,
    register: registerReducer,
    advert: advertReducer,
    advertCreation: advertCreationReducer,
    settings: settingsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer)
/*
export const store = configureStore({
    reducer: {
        auth: authReducer,
        register: registerReducer,
        advert: advertReducer,
        advertCreation: advertCreationReducer,
    },
});
*/
export const store = configureStore({
    reducer:persistedReducer, 
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoreActions: [REGISTER],
        },
    }),
    devTools: process.env.NODE_ENV !== 'production',
})
export const persistor = persistStore(store)