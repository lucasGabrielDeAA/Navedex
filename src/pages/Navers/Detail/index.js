import React, { useCallback, useState, useLayoutEffect, useEffect } from 'react';

import { ActivityIndicator, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import api from '~/services/api';

import moment from '~/config/Moment';

import AlertModal from '~/components/AlertModal';
import BackButton from '~/components/BackButton';
import ImageTitle from '~/components/ImageTitle';

import {
  Container,
  ProfileImage,
  Content,
  TextGroup,
  Label,
  Actions,
  StyledButton,
  RemoveIcon,
  EditIcon,
} from './styles';

export default function Edit({
  route: {
    params: {id},
  },
}) {
  const navigation = useNavigation();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [alertModal, setAlertModal] = useState(false);

  const loadData = useCallback(async (id) => {
    try {
      setLoading(true);
      const naver = await api.get(`/navers/${id}`);

      setData(naver.data);
      setLoading(false);
    } catch (err) {}
  }, []);

  const handleDeleteNaver = useCallback(async () => {
    try {
      await api.delete(`/navers/${id}`);
      await setModalVisible(false);
      await setAlertModal(true);
    } catch (err) {}
  }, []);

  const handleCloseAlertModal = useCallback(() => {
    setAlertModal(false);
    navigation.push('NaversList');
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <BackButton callback={() => navigation.pop()} />,
      headerTitle: () => <ImageTitle />,
      headerRight: () => <View />,
    });
  }, [navigation]);

  useEffect(() => {
    loadData(id);
  }, [id]);

  return (
    <Container>
      {loading ? (
        <ActivityIndicator size="large" color="#000" />
      ) : (
        <>
          <ProfileImage source={{uri: data?.url || ''}} />

          <Content showsVerticalScrollIndicator={false}>
            <TextGroup>
              <Label large bold>
                {data?.name || ''}
              </Label>
              <Label>{data?.job_role || ''}</Label>
            </TextGroup>

            <TextGroup>
              <Label bold>Idade</Label>
              <Label>
                {`${moment().diff(data?.birthdate, 'years')} anos` || ''}
              </Label>
            </TextGroup>

            <TextGroup>
              <Label bold>Tempo de empresa</Label>
              <Label>
                {`${moment().diff(data?.admission_date, 'years')} anos` || ''}
              </Label>
            </TextGroup>

            <TextGroup>
              <Label bold>Projetos que participou</Label>
              <Label>{data?.project || ''}</Label>
            </TextGroup>

            <Actions>
              <StyledButton
                outline
                label="Excluir"
                icon={<RemoveIcon />}
                onPress={() => setModalVisible(true)}
              />

              <StyledButton
                label="Editar"
                icon={<EditIcon />}
                onPress={() => navigation.push('NaversEdit', {id: data.id})}
              />
            </Actions>
          </Content>
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
            onPress={() => setModalVisible(false)}
          />
          <StyledButton label="Excluir" onPress={() => handleDeleteNaver()} />
        </>
      </AlertModal>

      <AlertModal
        visible={alertModal}
        title="Naver excluído"
        label="Naver excluído com sucesso!"
        handleClose={() => handleCloseAlertModal()}
      />
    </Container>
  );
}
