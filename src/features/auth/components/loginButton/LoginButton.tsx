import React from 'react';
import { useLoginButton } from './useLoginButton';
import { LoginButtonProps } from './types';

export const LoginButton: React.FC<LoginButtonProps> = ({ label }) => {
  const { handleLogin } = useLoginButton();
  return <button onClick={handleLogin}>{label}</button>;
};
