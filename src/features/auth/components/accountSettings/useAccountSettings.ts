import { useAuthProvider } from '../authProvider';

export const useAccountSettings = () => {
  const { user, logout } = useAuthProvider();
  const handleLogout = () => logout();
  return { user, handleLogout };
};
