import React from 'react';
import AppContainer from './src/navigations'
import SplashScreen from 'react-native-splash-screen';

const App = () => {
  React.useEffect(() => {
    SplashScreen.hide();
  }, []);
  
  return (
    <AppContainer />    
  );
}

export default App;