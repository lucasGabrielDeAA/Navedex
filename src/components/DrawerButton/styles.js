import styled from 'styled-components/native';

import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import colors from '../../styles/colors';

export const Button = styled.TouchableOpacity`
  margin: 0 16px;
`;

export const DrawerIcon = styled(MaterialIcon).attrs(() => ({
  color: colors.primary,
  name: 'menu',
  size: 30,
}))``;
