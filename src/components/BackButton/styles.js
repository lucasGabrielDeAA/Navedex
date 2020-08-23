import styled from 'styled-components/native';

import MaterialIcon from 'react-native-vector-icons/Ionicons';
import colors from '../../styles/colors';

export const Button = styled.TouchableOpacity`
  margin-left: 16px;
`;

export const BackIcon = styled(MaterialIcon).attrs(() => ({
  color: colors.primary,
  name: 'chevron-back',
  size: 30,
}))``;
