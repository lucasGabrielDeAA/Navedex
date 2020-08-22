import React from 'react';
import {ActivityIndicator} from 'react-native';

import colors from '../../styles/colors';

import {Container} from './styles';

export default function LoadingScreen() {
  return (
    <Container>
      <ActivityIndicator size="large" color={colors.primary} />
    </Container>
  );
}
