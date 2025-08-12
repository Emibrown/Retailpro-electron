import React, { createContext, useState } from 'react';
import { login, logout, Credentials, User } from '../../../../services/auth';
import { AuthProviderProps, AuthContextValue } from './types';

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = async (credentials: Credentials) => {
    const authenticated = await login(credentials);
    setUser(authenticated);
  };

  const handleLogout = () => {
    setUser(null);
    logout();
  };

  return (
    <AuthContext.Provider value={{ user, login: handleLogin, logout: handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};
