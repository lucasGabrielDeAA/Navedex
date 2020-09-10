import React from 'react';

import { Modal } from 'react-native';

import {
  Container,
  Content,
  Header,
  Title,
  CloseButton,
  CloseIcon,
  Label,
  Footer,
} from './styles';

export default function AlertModal({
  visible,
  handleClose,
  title,
  label,
  children,
  ...rest
}) {
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={() => {}}>
      <Container>
        <Content>
          <Header>
            <Title>{title}</Title>

            <CloseButton onPress={() => handleClose()}>
              <CloseIcon />
            </CloseButton>
          </Header>

          <Label>{label}</Label>

          <Footer>{children}</Footer>
        </Content>
      </Container>
    </Modal>
  );
}
