import React from 'react';
import 'react-native-gesture-handler';
import {StatusBar} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import AppProvider from './hooks';

import Routes from './routes';

import './config/ReactotronConfig';

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <AppProvider>
          <StatusBar barStyle="light-content" />

          <Routes />
        </AppProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
