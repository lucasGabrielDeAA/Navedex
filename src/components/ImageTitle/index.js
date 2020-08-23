import React from 'react';

import NavedexLogo from '../../assets/images/Logo.png';

import {Container, Logo} from './styles';

export default function ImageTitle() {
  return (
    <Container>
      <Logo source={NavedexLogo} />
    </Container>
  );
}
