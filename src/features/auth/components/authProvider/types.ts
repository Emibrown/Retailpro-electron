import { ReactNode } from 'react';
import { Credentials, User } from '../../../../services/auth';

export interface AuthProviderProps {
  children: ReactNode;
}

export interface AuthContextValue {
  user: User | null;
  login: (credentials: Credentials) => Promise<void>;
  logout: () => void;
}
