import React from 'react';
import { useAuthProvider, LoginScreen, AccountSettingsScreen } from '../features/auth';

export const App: React.FC = () => {
  const { user } = useAuthProvider();
  return user ? <AccountSettingsScreen /> : <LoginScreen />;
};
