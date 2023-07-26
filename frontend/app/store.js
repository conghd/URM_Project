import { combineReducers, configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

import authReducer from './services/auth/authSlice';
import registerReducer from './services/auth/registerSlice';
import advertReducer from './services/advert/advertSlice';
import advertCreationReducer from './services/advert/advertCreationSlice'

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['auth']
}

const rootReducer = combineReducers({
    auth: authReducer,
    register: registerReducer,
    advert: advertReducer,
    advertCreation: advertCreationReducer,
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
    })
})
export const persistor = persistStore(store)