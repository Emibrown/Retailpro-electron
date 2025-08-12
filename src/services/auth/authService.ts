import { Credentials, User } from './authTypes';

export async function login(credentials: Credentials): Promise<User> {
  // placeholder authentication logic
  return { id: '1', name: credentials.username };
}

export async function logout(): Promise<void> {
  return;
}
