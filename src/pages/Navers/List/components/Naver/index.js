import React from 'react';

import {useNavigation} from '@react-navigation/native';

import {
  Container,
  DetailButton,
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
      <DetailButton
        onPress={() => navigation.push('NaversDetail', {id: data.id})}>
        <ProfileImage source={{uri: data.url}} />

        <Title>{data.name}</Title>
        <Description>{data.job_role}</Description>
      </DetailButton>

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
