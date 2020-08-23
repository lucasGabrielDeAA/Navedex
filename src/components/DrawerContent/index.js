import React from 'react';
import {useNavigation} from '@react-navigation/native';

import {useAuth} from '../../hooks/useAuth';

import {Container, Content, Menu, Option, OptionLabel} from './styles';

export default function DrawerContent() {
  const navigation = useNavigation();
  const {signOut} = useAuth();

  return (
    <Container>
      <Content>
        <Menu>
          <Option
            label={() => <OptionLabel>Navers</OptionLabel>}
            onPress={() => {
              navigation.navigate('NaversList');
            }}
          />

          <Option
            label={() => <OptionLabel>Sair</OptionLabel>}
            onPress={() => {
              signOut();
            }}
          />
        </Menu>
      </Content>
    </Container>
  );
}
