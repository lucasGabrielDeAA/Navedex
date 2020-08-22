import styled, {css} from 'styled-components/native';

import colors from '../../styles/colors';

export const StyledButton = styled.TouchableOpacity`
  align-items: center;
  background: ${(props) => (props.color ? props.color : colors.primary)};
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 5px 0;
  padding: 11px 0;

  ${(props) =>
    props.outline &&
    css`
      background: transparent;
    `}

  ${(props) =>
    props.disabled &&
    css`
      opacity: 0.6;
    `}
`;

export const Label = styled.Text`
  color: ${(props) => (props.labelColor ? props.labelColor : colors.white)};
  font-size: 17px;
  font-weight: bold;

  ${(props) =>
    props.outline &&
    css`
      color: ${colors.black};
    `}

  ${(props) =>
    props.disabled &&
    css`
      opacity: 0.6;
    `}
`;
