import React, {
  createContext,
  useState,
  useContext,
  useCallback,
  useEffect,
} from 'react';

import AsyncStorage from '@react-native-community/async-storage';

import api from '../services/api';

const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const signIn = useCallback(async (data) => {
    console.log(data);
    const {
      data: {email, id, token},
    } = await api.post('users/login', data);
    const loggedUSer = {email, id};

    setUser(loggedUSer);

    await AsyncStorage.setItem('@Navedex:token', token);
    await AsyncStorage.setItem('@Navedex:user', JSON.stringify(loggedUSer));
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }, []);

  const signOut = useCallback(async () => {
    await AsyncStorage.clear();
    setUser(null);
  }, []);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const loggedUser = await AsyncStorage.getItem('@Navedex:user');
      const token = await AsyncStorage.getItem('@Navedex:token');

      api.defaults.headers.Authorization = `Bearer ${token}`;

      setUser(loggedUser !== null ? JSON.parse(loggedUser) : null);
      setLoading(false);
    } catch (error) {}
  }, []);

  useEffect(() => {
    loadData();
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
