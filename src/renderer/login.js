import { loadTheme, setupThemeToggle } from './theme.js';
import { initConnectionStatus } from './connection.js';

loadTheme();
setupThemeToggle(document.getElementById('themeToggle'));
initConnectionStatus(document.getElementById('connectionStatus'));

const versionEl = document.getElementById('version');
versionEl.textContent = `v${window.appInfo?.version || '1.0.0'}`;

const offlineBtn = document.getElementById('offlineBtn');
const registered = localStorage.getItem('deviceRegistered') === 'true';
offlineBtn.disabled = !registered;

offlineBtn.addEventListener('click', () => {
  document.body.classList.add('opacity-0');
  setTimeout(() => {
    window.location.href = 'index.html';
  }, 300);
});

const form = document.getElementById('loginForm');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  localStorage.setItem('deviceRegistered', 'true');
  document.body.classList.add('opacity-0');
  setTimeout(() => {
    window.location.href = 'account.html';
  }, 300);
});

const togglePassword = document.getElementById('togglePassword');
const passwordInput = document.getElementById('password');
togglePassword.addEventListener('click', () => {
  const isHidden = passwordInput.type === 'password';
  passwordInput.type = isHidden ? 'text' : 'password';
  togglePassword.textContent = isHidden ? 'Hide' : 'Show';
});
