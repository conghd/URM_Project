import 'react-native-gesture-handler';
import { useEffect, useState } from "react";
import { store } from './app/store';
import ScreenManager from './ScreenManager';
import { Provider } from 'react-redux';

const App = () => {

  useEffect(() => {
    //getUserToken();
    //dispatch(load);
  }, []);

  return (
    <Provider store={store}>
      <ScreenManager />
    </Provider>
  );
}
export default App;