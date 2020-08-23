import React, {useRef, useCallback, useState, useLayoutEffect} from 'react';

import {useNavigation} from '@react-navigation/native';

import Button from '../../../components/Button';
import DrawerButton from '../../../components/DrawerButton';

import {Container, Header, Title} from './styles';
import ImageTitle from '../../../components/ImageTitle';

export default function SignIn() {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <DrawerButton />,
      headerTitle: <ImageTitle />,
    });
  }, [navigation]);

  return (
    <Container>
      <Header>
        <Title>Navers</Title>

        <Button
          label="Adicionar naver"
          onPress={() => navigation.navigate('NaversNew')}
        />
      </Header>
    </Container>
  );
}
