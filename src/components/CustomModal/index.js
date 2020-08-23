import react from 'react';

import {Modal} from 'react-native';

export default function CustomModal({children, ...rest}) {
  return <Modal {...rest}>{children}</Modal>;
}
