import React from 'react';

import {AuthProvider} from './useAuth';

export default function AppProvider({children}) {
  return <AuthProvider>{children}</AuthProvider>;
}
