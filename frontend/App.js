import React, {useEffect, useState} from "react";
import "react-native-gesture-handler";
import {persistor, store} from "./app/store";
import ScreenManager from "./app/screens/ScreenManager";
import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
import SplashScreen from "./app/screens/auth/SplashScreen";
import {ActionSheetProvider} from "@expo/react-native-action-sheet";

const App = () => {
  useEffect(() => {
    console.log("App::useEffect()");
    // getUserToken();
    // dispatch(load);
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={<SplashScreen />} persistor={persistor}>
        <ActionSheetProvider>
          <ScreenManager />
        </ActionSheetProvider>
      </PersistGate>
    </Provider>
  );
};
export default App;
