import styled from 'styled-components/native';

import Icon from 'react-native-vector-icons/AntDesign';

import colors from '../../../styles/colors';
import Button from '../../../components/Button';

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

export const StyledButton = styled(Button)`
  width: 100%;
`;

export const Content = styled.View`
  padding: 16px 22px 40px;
`;
