import styled from 'styled-components/native';

import MaterialIcon from 'react-native-vector-icons/Ionicons';
import colors from '../../styles/colors';

export const Button = styled.TouchableOpacity`
  align-items: center;
  flex: 1;
  justify-content: center;
  padding: 0 16px;
  width: 100%;
`;

export const BackIcon = styled(MaterialIcon).attrs(() => ({
  color: colors.primary,
  name: 'chevron-back',
  size: 30,
}))``;
