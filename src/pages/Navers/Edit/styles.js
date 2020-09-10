import styled from 'styled-components/native';

import Icon from 'react-native-vector-icons/AntDesign';

import colors from '~/styles/colors';
import Button from '~/components/Button';

export const Container = styled.SafeAreaView`
  align-items: center;
  background: ${colors.white};
  flex: 1;
`;

export const Title = styled.Text`
  color: ${colors.primary};
  font-family: 'montserrat'
  font-size: 22px;
  font-weight: 600;
  line-height: 32px;
  margin-top: 36px;
`;

export const Content = styled.View`
  padding: 16px 22px 40px;
`;

export const StyledButton = styled(Button)`
  width: 100%;
`;

export const ModalContainer = styled.View`
  align-items: center;
  flex: 1;
  justify-content: center;
`;

export const ModalHeader = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

export const ModalTitle = styled.Text`
  color: ${colors.primary};
  font-family: 'montserrat'
  font-size: 22px;
  font-weight: 600;
  line-height: 32px;
`;

export const ModalCloseButton = styled.TouchableOpacity``;

export const ModalCloseIcon = styled(Icon).attrs(() => ({
  color: colors.primary,
  name: 'close',
  size: 30,
}))``;

export const ModalLabel = styled.Text`
  color: ${colors.primary};
  font-family: 'montserrat'
  font-size: 16px;
  line-height: 24px;
  flex-wrap: wrap;
  margin: 16px 0;
  width: 100%;
`;

export const ModalFooter = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;
