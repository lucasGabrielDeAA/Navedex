import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import SignIn from '~/pages/Auth/SignIn';
import NaversEdit from '~/pages/Navers/Edit';
import NaversDetail from '~/pages/Navers/Detail';
import NaversList from '~/pages/Navers/List';
import NaversNew from '~/pages/Navers/New';

import {useAuth} from '~/hooks/useAuth';
import LoadingScreen from '~/components/LoadingScreen';
import DrawerContent from '~/components/DrawerContent';

const Stack = createStackNavigator();

const Drawer = createDrawerNavigator();

function NaverStack({navigation}) {
  return (
    <Stack.Navigator initialRouteName="NaversList">
      <Stack.Screen
        name="NaversList"
        component={NaversList}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="NaversNew"
        component={NaversNew}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="NaversEdit"
        component={NaversEdit}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="NaversDetail"
        component={NaversDetail}
        options={{headerShown: true}}
      />
    </Stack.Navigator>
  );
}

// Drawer's screens
function DrawerScreens() {
  return (
    <Drawer.Navigator
      drawerPosition="left"
      drawerContent={() => <DrawerContent />}>
      <Drawer.Screen name="NaversList" component={NaverStack} />
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
              headerTitle: null,
              headerTransparent: true,
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
