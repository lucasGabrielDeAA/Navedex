import styled from 'styled-components/native';

import colors from '../../../styles/colors';

import Icon from 'react-native-vector-icons/AntDesign';

export const Container = styled.SafeAreaView`
  background: ${colors.white};
  flex: 1;
  justify-content: center;
`;

export const Header = styled.View`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 36px 16px 0 16px;
`;

export const Title = styled.Text`
  color: ${colors.primary};
  font-size: 22px;
  font-weight: 600;
  line-height: 32px;
`;

export const NaversList = styled.FlatList.attrs(() => ({
  contentContainerStyle: {
    alignItems: 'center',
  },
}))``;

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
