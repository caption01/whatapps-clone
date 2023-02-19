import 'react-native-gesture-handler';

import { useState, useEffect, useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { Provider } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import AppNavigator from './navigation/AppNavigator';
import { store } from './store/store';

SplashScreen.preventAutoHideAsync();
// AsyncStorage.clear();

const prepare = async () => {
  await Font.loadAsync({
    black: require('./assets/fonts/Roboto-Black.ttf'),
    blackItalic: require('./assets/fonts/Roboto-BlackItalic.ttf'),
    bold: require('./assets/fonts/Roboto-Bold.ttf'),
    boldItalic: require('./assets/fonts/Roboto-BoldItalic.ttf'),
    italic: require('./assets/fonts/Roboto-Italic.ttf'),
    light: require('./assets/fonts/Roboto-Light.ttf'),
    lightItalic: require('./assets/fonts/Roboto-LightItalic.ttf'),
    medium: require('./assets/fonts/Roboto-Medium.ttf'),
    mediumItalic: require('./assets/fonts/Roboto-MediumItalic.ttf'),
    regular: require('./assets/fonts/Roboto-Regular.ttf'),
    thin: require('./assets/fonts/Roboto-Thin.ttf'),
    thinItalic: require('./assets/fonts/Roboto-ThinItalic.ttf'),
  });
};

const App = () => {
  const [appIsLoaded, setAppIsLoaded] = useState(false);

  useEffect(() => {
    try {
      prepare();
    } catch (error) {
      console.log.error();
    } finally {
      setAppIsLoaded(true);
    }
  }, []);

  const onLayout = useCallback(async () => {
    if (appIsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [appIsLoaded]);

  if (!appIsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <SafeAreaProvider style={styles.container} onLayout={onLayout}>
        <AppNavigator />
      </SafeAreaProvider>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default App;
