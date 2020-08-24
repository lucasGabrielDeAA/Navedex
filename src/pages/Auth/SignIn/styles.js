import styled from 'styled-components/native';

import colors from '../../../styles/colors';
import Button from '../../../components/Button';

export const Container = styled.SafeAreaView`
  background: ${colors.white};
  flex: 1;
  justify-content: center;
`;

export const Content = styled.View`
  align-items: center;
  padding: 16px 22px 40px;
`;

export const Logo = styled.Image`
  height: 40px;
  margin-bottom: 56px;
  width: 156px;
`;

export const InputGroup = styled.View`
  margin: 24px 0 0;
`;

export const StyledButton = styled(Button)`
  width: 100%;
`;
