import styled from 'styled-components/native';

import colors from '~/styles/colors';

import Icon from 'react-native-vector-icons/Foundation';

export const Container = styled.View`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  margin: 8px 24px;
  width: 158px;
`;

export const DetailButton = styled.TouchableOpacity`
  width: 100%;
`;

export const ProfileImage = styled.Image`
  height: 158px;
`;

export const Title = styled.Text`
  color: ${colors.primary};
  font-family: 'montserrat'
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  margin: 4px 0;
`;

export const Description = styled.Text`
  color: ${colors.primary};
  font-family: 'montserrat'
  font-size: 14px;
  line-height: 20px;
  margin: 4px 0;
`;

export const Actions = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;

export const RemoveButton = styled.TouchableOpacity`
  align-items: center;
  display: flex;
  justify-content: center;
`;

export const RemoveIcon = styled(Icon).attrs(() => ({
  color: colors.primary,
  name: 'trash',
  size: 30,
}))``;

export const EditButton = styled.TouchableOpacity`
  align-items: center;
  display: flex;
  justify-content: center;
  margin-left: 24px;
`;

export const EditIcon = styled(Icon).attrs(() => ({
  color: colors.primary,
  name: 'pencil',
  size: 30,
}))``;
