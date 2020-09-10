import styled, { css } from 'styled-components/native';

import {StyleSheet} from 'react-native';
import colors from '~/styles/colors';

export const Container = styled.View`
  flex-direction: column;
  margin-bottom: 5px;
  height: ${(props) => (props.multiline ? '250px' : '100px')};
  width: 100%;
`;

export const Label = styled.Text`
  font-family: 'montserrat'
  font-size: 14px;
  font-weight: 600;
  line-height: 18px;
  margin-bottom: 5px;
`;

export const CustomInput = styled.TextInput.attrs(() => ({
  placeholderTextColor: colors.darkGray,
}))`
  background: ${colors.white};
  border-width: 1px;
  font-family: 'montserrat'
  font-size: 16px;
  padding: 10px;

  ${(props) =>
    props.multiline &&
    css`
      height: 200px;
      text-align-vertical: top;
    `}

  ${(props) =>
    props.error &&
    css`
      border-color: ${colors.danger};
      border-width: ${StyleSheet.hairlineWidth}px;
    `}
`;

export const Error = styled.Text`
  color: ${colors.danger};
  font-family: 'montserrat'
  font-size: 14px;
  font-weight: 600;
  margin: 5px 2px 0;
`;
