import React, {createContext, useState, useContext, useCallback} from 'react';

import AsyncStorage from '@react-native-community/async-storage';

import api from '../services/api';

const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const signIn = useCallback(async (data) => {
    console.tron.log(data);
    // const response = await api.post('users/signup', data);
    const loggedUser = {id: Math.random(), email: data.email};
    setUser(loggedUser);
    // Here goes the login flux
    // After login
    const token = 'abc123gsldfkhgbsldkf';
    await AsyncStorage.setItem('@Navedex:token', token);
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }, []);

  const signOut = useCallback(async () => {
    await AsyncStorage.clear();
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        loading,
        signed: !!user?.id,
        user,
        signIn,
        signOut,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}
