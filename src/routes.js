import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

import SignIn from './pages/Auth/SignIn';

import {useAuth} from './hooks/useAuth';
import DrawerButton from './components/DrawerButton';
import LoadingScreen from './components/LoadingScreen';

const Stack = createStackNavigator();

const Drawer = createDrawerNavigator();

// Drawer's screens
function DrawerScreens() {
  return (
    <Drawer.Navigator drawerPosition="right">
      <Drawer.Screen name="Feed" component={SignIn} />
      <Drawer.Screen name="Home" component={SignIn} />
    </Drawer.Navigator>
  );
}

// Authenticated's routes and non-authenticated's routes
export default function Routes() {
  const {signed, loading} = useAuth();

  // if (loading) {
  //   return <LoadingScreen />;
  // }

  return (
    signed !== null && (
      <Stack.Navigator>
        {signed ? (
          <Stack.Screen
            name="Home"
            component={DrawerScreens}
            options={{
              headerRight: () => <DrawerButton />,
              headerTitle: null,
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
