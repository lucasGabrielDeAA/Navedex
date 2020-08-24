import styled from 'styled-components/native';

import colors from '../../../styles/colors';

import Button from '../../../components/Button';

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
    flex: 1,
    marginTop: 28,
  },
}))``;

export const StyledButton = styled(Button)`
  width: 45%;
`;
