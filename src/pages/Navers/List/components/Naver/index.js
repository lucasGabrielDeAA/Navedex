import React from 'react';

import {useNavigation} from '@react-navigation/native';

import {
  Container,
  ProfileImage,
  Title,
  Description,
  Actions,
  RemoveButton,
  RemoveIcon,
  EditButton,
  EditIcon,
} from './styles';

export default function Naver({data, handleOpenModal}) {
  const navigation = useNavigation();

  return (
    <Container>
      <ProfileImage source={{uri: data.url}} />

      <Title>{data.name}</Title>
      <Description>{data.job_role}</Description>

      <Actions>
        <RemoveButton onPress={() => handleOpenModal(data.id)}>
          <RemoveIcon />
        </RemoveButton>

        <EditButton
          onPress={() => navigation.push('NaversEdit', {id: data.id})}>
          <EditIcon />
        </EditButton>
      </Actions>
    </Container>
  );
}
