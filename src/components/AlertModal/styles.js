import styled from 'styled-components/native';

import Icon from 'react-native-vector-icons/AntDesign';

import colors from '../../styles/colors';

export const Container = styled.View`
  align-items: center;
  flex: 1;
  justify-content: center;
`;

export const Content = styled.View``;

export const Header = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

export const Title = styled.Text`
  color: ${colors.primary};
  font-size: 22px;
  font-weight: 600;
  line-height: 32px;
`;

export const CloseButton = styled.TouchableOpacity``;

export const CloseIcon = styled(Icon).attrs(() => ({
  color: colors.primary,
  name: 'close',
  size: 30,
}))``;

export const Label = styled.Text`
  color: ${colors.primary};
  font-size: 16px;
  line-height: 24px;
  flex-wrap: wrap;
  margin: 16px 0;
  width: 100%;
`;

export const Footer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;
