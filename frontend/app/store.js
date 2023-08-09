import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {persistStore, persistReducer, REGISTER} from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

import authReducer from "./services/auth/authSlice";
import registerReducer from "./services/auth/registerSlice";
import advertReducer from "./services/advert/advertSlice";
import advertCreationReducer from "./services/advert/advertCreationSlice";
import settingsReducer from "./services/settings/settingsSlice";
import authForgotPasswordReducer from "./services/auth/authForgotPasswordSlice";
import authActivationReducer from "./services/auth/authActivationSlice";
import authResetPasswordReducer from "./services/auth/authResetPasswordSlice";
import advertISBNReducer from "./services/advert/advertISBNSlice";
import advertSearchReducer from "./services/advert/advertSearchSlice";
import advertMyReducer from "./services/advert/advertMySlice";
// import thunk from 'redux-thunk'

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["settings", "auth"],
};

const rootReducer = combineReducers({
  auth: authReducer,
  authForgotPassword: authForgotPasswordReducer,
  authActivation: authActivationReducer,
  authResetPassword: authResetPasswordReducer,
  register: registerReducer,
  advert: advertReducer,
  advertCreation: advertCreationReducer,
  advertISBN: advertISBNReducer,
  settings: settingsReducer,
  advertSearch: advertSearchReducer,
  advertMy: advertMyReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
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
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoreActions: [REGISTER],
    },
  }),
  devTools: process.env.NODE_ENV !== "production",
});
export const persistor = persistStore(store);
