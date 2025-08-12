import React from 'react';
import { createRoot } from 'react-dom/client';
import { AuthProvider } from '../features/auth';
import { LoginScreen } from '../features/auth/screens/loginScreen';

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(
    <AuthProvider>
      <LoginScreen />
    </AuthProvider>
  );
}
