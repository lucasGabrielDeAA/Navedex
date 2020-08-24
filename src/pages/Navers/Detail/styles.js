import styled, {css} from 'styled-components/native';

import Icon from 'react-native-vector-icons/Foundation';
import AntIcon from 'react-native-vector-icons/AntDesign';

import colors from '../../../styles/colors';
import Button from '../../../components/Button';

export const Container = styled.SafeAreaView`
  background: ${colors.white};
  flex: 1;
  justify-content: center;
`;

export const ProfileImage = styled.Image`
  height: 300px;
  width: 100%;
`;

export const Content = styled.ScrollView`
  display: flex;
  flex-direction: column;
  padding: 16px 8px;
`;

export const TextGroup = styled.View`
  margin-top: 24px;
`;

export const Label = styled.Text`
  color: ${colors.primary};
  font-size: 16px;
  line-height: 24px;

  ${(props) =>
    props.bold &&
    css`
      font-weight: 600;
    `}

  ${(props) =>
    props.large &&
    css`
      font-size: 22px;
      line-height: 32px;
    `}
`;

export const Actions = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 32px;
  width: 100%;
`;

export const StyledButton = styled(Button)`
  width: 45%;
`;

export const RemoveIcon = styled(Icon).attrs(() => ({
  color: colors.primary,
  name: 'trash',
  size: 30,
}))`
  margin-right: 13px;
`;

export const EditIcon = styled(Icon).attrs(() => ({
  color: colors.white,
  name: 'pencil',
  size: 30,
}))`
  margin-right: 13px;
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
  font-size: 22px;
  font-weight: 600;
  line-height: 32px;
`;

export const ModalCloseButton = styled.TouchableOpacity``;

export const ModalCloseIcon = styled(AntIcon).attrs(() => ({
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
