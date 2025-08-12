import React from 'react';
import { AccountSettings } from '../../components/accountSettings';
import { useAccountSettingsScreen } from './useAccountSettingsScreen';
import { AccountSettingsScreenProps } from './types';

export const AccountSettingsScreen: React.FC<AccountSettingsScreenProps> = () => {
  useAccountSettingsScreen();
  return (
    <div>
      <h1>Account Settings</h1>
      <AccountSettings />
    </div>
  );
};
