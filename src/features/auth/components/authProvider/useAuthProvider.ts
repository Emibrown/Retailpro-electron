import { useContext } from 'react';
import { AuthContext } from './AuthProvider';
import { AuthContextValue } from './types';

export const useAuthProvider = (): AuthContextValue => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuthProvider must be used within AuthProvider');
  }
  return ctx;
};
