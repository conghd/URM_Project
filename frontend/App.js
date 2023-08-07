import 'react-native-gesture-handler';
import { useEffect, useState } from "react";
import {persistor, store } from './app/store';
import ScreenManager from './app/screens/ScreenManager';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import SplashScreen from './app/screens/auth/SplashScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const App = () => {

  useEffect(() => {
    console.log("App::useEffect()");
    //getUserToken();
    //dispatch(load);
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={<SplashScreen />} persistor={persistor}>
        { /* <SafeAreaProvider> */ }
          <ScreenManager />
        { /* </SafeAreaProvider> */ }
      </PersistGate>
    </Provider>
  );
}
export default App;