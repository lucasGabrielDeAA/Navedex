import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

import SignIn from './pages/Auth/SignIn';
import NaversList from './pages/Navers/List';

import {useAuth} from './hooks/useAuth';
import DrawerButton from './components/DrawerButton';
import ImageTitle from './components/ImageTitle';
import LoadingScreen from './components/LoadingScreen';
import DrawerContent from './components/DrawerContent';

const Stack = createStackNavigator();

const Drawer = createDrawerNavigator();

// Drawer's screens
function DrawerScreens() {
  return (
    <Drawer.Navigator
      drawerPosition="left"
      drawerContent={() => <DrawerContent />}>
      <Drawer.Screen name="NaversList" component={NaversList} />
    </Drawer.Navigator>
  );
}

// Authenticated's routes and non-authenticated's routes
export default function Routes() {
  const {signed, loading} = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    signed !== null && (
      <Stack.Navigator>
        {signed ? (
          <Stack.Screen
            name="Home"
            component={DrawerScreens}
            options={{
              headerLeft: () => <DrawerButton />,
              headerTitle: <ImageTitle />,
            }}
          />
        ) : (
          <Stack.Screen
            name="SignIn"
            component={SignIn}
            options={{
              headerTitle: null,
              headerTransparent: true,
            }}
          />
        )}
      </Stack.Navigator>
    )
  );
}
