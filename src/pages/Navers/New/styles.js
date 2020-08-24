import styled from 'styled-components/native';

import colors from '../../../styles/colors';

export const Container = styled.SafeAreaView`
  align-items: center;
  background: ${colors.white};
  flex: 1;
`;

export const Title = styled.Text`
  color: ${colors.primary};
  font-size: 22px;
  font-weight: 600;
  line-height: 32px;
  margin-top: 36px;
`;

export const Content = styled.View`
  padding: 16px 22px 40px;
`;
