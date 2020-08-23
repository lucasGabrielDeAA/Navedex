import styled from 'styled-components/native';

import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';

import colors from '../../styles/colors';

export const Container = styled.View`
  flex: 1;
`;

export const Content = styled.View`
  align-items: center;
  display: flex;
  justify-content: center;
  height: 100%;
  width: 100%;
`;

export const Menu = styled(DrawerContentScrollView)``;

export const Option = styled(DrawerItem)`
  align-items: center;
  display: flex;
  justify-content: center;
`;

export const OptionLabel = styled.Text`
  color: ${colors.primary};
  font-size: 22px;
  font-weight: 600;
  line-height: 32px;
`;
