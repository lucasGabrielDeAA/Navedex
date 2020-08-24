import React, {useCallback, useState, useLayoutEffect, useEffect} from 'react';

import {Modal, View, StyleSheet} from 'react-native';

import {useNavigation} from '@react-navigation/native';

import api from '../../../services/api';

import Button from '../../../components/Button';
import DrawerButton from '../../../components/DrawerButton';
import ImageTitle from '../../../components/ImageTitle';

import {
  Container,
  Header,
  Title,
  NaversList,
  ModalContainer,
  ModalHeader,
  ModalTitle,
  ModalCloseButton,
  ModalCloseIcon,
  ModalLabel,
  ModalFooter,
  StyledButton,
} from './styles';

import Naver from './components/Naver';
import {ActivityIndicator} from 'react-native';

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

export default function SignIn() {
  const navigation = useNavigation();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [alertModal, setAlertModal] = useState(false);
  const [idSelected, setIdSelected] = useState(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <DrawerButton />,
      headerTitle: <ImageTitle />,
    });
  }, [navigation]);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const navers = await api.get('/navers');

      setData(navers.data);
      setLoading(false);
    } catch (err) {}
  }, []);

  const handleOpenModal = useCallback((id) => {
    setIdSelected(id);
    setModalVisible(true);
  }, []);

  const handleCancelRemove = useCallback(() => {
    setIdSelected(null);
    setModalVisible(false);
  }, []);

  const handleDeleteNaver = useCallback(async () => {
    try {
      if (idSelected !== null) {
        await api.delete(`/navers/${idSelected}`);
        await setModalVisible(false);
        await setAlertModal(true);
        setData(data.filter((naver) => naver.id !== idSelected));
      }
    } catch (err) {}
  }, [idSelected, data]);

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Container>
      {loading ? (
        <ActivityIndicator size="large" color="#000" />
      ) : (
        <>
          <Header>
            <Title>Navers</Title>

            <Button
              label="Adicionar naver"
              onPress={() => navigation.push('NaversNew')}
            />
          </Header>

          <NaversList
            showsVerticalScrollIndicator={false}
            data={data}
            numColumns={2}
            keyExtractor={(item, index) => item.id}
            renderItem={({item}) => (
              <Naver
                data={item}
                handleOpenModal={(id) => handleOpenModal(id)}
              />
            )}
          />
        </>
      )}

      <Modal
        transparent
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => {}}>
        <ModalContainer style={styles.modalContainer}>
          <View style={styles.modalView}>
            <ModalHeader>
              <ModalTitle>Excluir naver</ModalTitle>

              <ModalCloseButton onPress={() => setModalVisible(false)}>
                <ModalCloseIcon />
              </ModalCloseButton>
            </ModalHeader>

            <ModalLabel>Tem certeza que deseja excluir este naver?</ModalLabel>

            <ModalFooter>
              <StyledButton
                outline
                label="Cancelar"
                onPress={() => handleCancelRemove()}
              />
              <StyledButton
                label="Excluir"
                onPress={() => handleDeleteNaver()}
              />
            </ModalFooter>
          </View>
        </ModalContainer>
      </Modal>

      <Modal
        transparent
        visible={alertModal}
        animationType="fade"
        onRequestClose={() => {}}>
        <ModalContainer style={styles.modalContainer}>
          <View style={styles.modalView}>
            <ModalHeader>
              <ModalTitle>Naver excluído</ModalTitle>

              <ModalCloseButton onPress={() => setAlertModal(false)}>
                <ModalCloseIcon />
              </ModalCloseButton>
            </ModalHeader>

            <ModalLabel>Naver excluído com sucesso!</ModalLabel>
          </View>
        </ModalContainer>
      </Modal>
    </Container>
  );
}
