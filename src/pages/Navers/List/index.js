import React, { useCallback, useState, useLayoutEffect, useEffect } from 'react';

import { View, ActivityIndicator } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import api from '~/services/api';

import AlertModal from '~/components/AlertModal';
import Button from '~/components/Button';
import DrawerButton from '~/components/DrawerButton';
import ImageTitle from '~/components/ImageTitle';

import {
  Container,
  Content,
  Header,
  Title,
  NaversList,
  StyledButton,
} from './styles';

import Naver from './components/Naver';

export default function List() {
  const navigation = useNavigation();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [alertModal, setAlertModal] = useState(false);
  const [idSelected, setIdSelected] = useState(null);
  const [displayErrorModal, setDisplayErrorModal] = useState(false);
  const [error, setError] = useState("");

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const navers = await api.get('/navers');

      setData(navers.data);
      setLoading(false);
    } catch (err) {
      setError("Erro ao buscar Naver!");
      setDisplayErrorModal(true);
    }
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
    } catch (err) {
      setError("Erro ao deletar Naver!");
      setDisplayErrorModal(true);
    }
  }, [idSelected, data]);

  useEffect(() => {
    loadData();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <DrawerButton />,
      headerTitle: () => <ImageTitle />,
      headerRight: () => <View />,
    });
  }, [navigation]);

  return (
    <Container>
      <Content refr showsVerticalScrollIndicator={false}>
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

        <AlertModal
          visible={modalVisible}
          title="Excluir naver"
          label="Tem certeza que deseja excluir este naver?"
          handleClose={() => setModalVisible(false)}>
          <>
            <StyledButton
              outline
              label="Cancelar"
              onPress={() => handleCancelRemove()}
            />
            <StyledButton label="Excluir" onPress={() => handleDeleteNaver()} />
          </>
        </AlertModal>

        <AlertModal
          visible={alertModal}
          title="Naver excluído"
          label="Naver excluído com sucesso!"
          handleClose={() => setAlertModal(false)}
        />

        <AlertModal
          visible={displayErrorModal}
          title="Erro"
          label={error}
          handleClose={() => handleCloseErrorModal()}
        />
      </Content>
    </Container>
  );
}
