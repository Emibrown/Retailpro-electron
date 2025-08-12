import { User } from './authTypes';

export function isLoggedIn(user: User | null): boolean {
  return user !== null;
}
