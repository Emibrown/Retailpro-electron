import { useAuthProvider } from '../authProvider';

export const useLoginButton = () => {
  const { login } = useAuthProvider();
  const handleLogin = () => login({ username: 'demo', password: 'password' });
  return { handleLogin };
};
