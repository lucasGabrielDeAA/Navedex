import React from 'react';
import {useNavigation, DrawerActions} from '@react-navigation/native';

import {Button} from './styles';

export default function DrawerButton() {
  const navigation = useNavigation();

  return (
    <Button onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())} />
  );
}
