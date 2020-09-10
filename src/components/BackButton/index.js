import React from 'react';

import { Button, BackIcon } from './styles';

export default function BackButton({callback}) {
  return (
    <Button onPress={callback}>
      <BackIcon />
    </Button>
  );
}
