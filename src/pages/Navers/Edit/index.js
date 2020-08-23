import React, {useRef, useCallback, useState, useLayoutEffect} from 'react';

import {useNavigation} from '@react-navigation/native';

import BackButton from '../../../components/BackButton';
import Button from '../../../components/Button';
import ImageTitle from '../../../components/ImageTitle';

import {Container, Header, Title} from './styles';

export default function Edit() {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <BackButton callback={() => navigation.goBack()} />,
      headerTitle: <ImageTitle />,
    });
  }, [navigation]);

  return (
    <Container>
      <Header>
        <Title>Edit</Title>

        <Button
          label="Adicionar naver"
          onPress={() => navigation.navigate('NaversNew')}
        />
      </Header>
    </Container>
  );
}
