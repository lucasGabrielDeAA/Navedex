import React from 'react';

import {Modal, StyleSheet} from 'react-native';

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

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    alignItems: 'center',
    padding: 21,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: 328,
  },
});

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
      <Container style={styles.modalContainer}>
        <Content style={styles.modalView}>
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
