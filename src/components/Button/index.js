import React from 'react';

import {StyledButton, Label} from './styles';

export default function Button({
  color,
  disabled,
  icon = null,
  label,
  labelColor,
  outline,
  ...rest
}) {
  return (
    <StyledButton
      background={color}
      color={color}
      disabled={disabled}
      outline={outline}
      {...rest}>
      <>
        {icon}

        <Label outline={outline} labelColor={labelColor}>
          {label}
        </Label>
      </>
    </StyledButton>
  );
}
