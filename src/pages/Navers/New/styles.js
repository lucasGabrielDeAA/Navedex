import styled from 'styled-components/native';

import colors from '../../../styles/colors';

export const Container = styled.SafeAreaView`
  background: ${colors.white};
  flex: 1;
  justify-content: center;
`;

export const Header = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 16px;
`;

export const Title = styled.Text`
  color: ${colors.primary};
  font-size: 22px;
  line-height: 32px;
`;

export const Logo = styled.Image`
  height: 40px;
  margin-bottom: 56px;
  width: 156px;
`;

export const InputGroup = styled.View`
  margin: 24px 0 0;
`;
