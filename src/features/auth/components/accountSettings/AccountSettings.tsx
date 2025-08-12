import React from 'react';
import { useAccountSettings } from './useAccountSettings';
import { AccountSettingsProps } from './types';

export const AccountSettings: React.FC<AccountSettingsProps> = () => {
  const { user, handleLogout } = useAccountSettings();
  if (!user) return null;
  return (
    <div>
      <p>Logged in as {user.name}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};
