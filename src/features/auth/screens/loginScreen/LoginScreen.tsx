import React from 'react';
import { LoginButton } from '../../components/loginButton';
import { useLoginScreen } from './useLoginScreen';
import { LoginScreenProps } from './types';

export const LoginScreen: React.FC<LoginScreenProps> = () => {
  useLoginScreen();
  return (
    <div>
      <h1>Login</h1>
      <LoginButton label="Login" />
    </div>
  );
};
