import { loadTheme, setupThemeToggle } from './theme.js';
import { initConnectionStatus } from './connection.js';

loadTheme();
setupThemeToggle(document.getElementById('themeToggle'));
initConnectionStatus(document.getElementById('connectionStatus'));

const versionEl = document.getElementById('version');
versionEl.textContent = `v${window.appInfo?.version || '1.0.0'}`;

const stores = [
  { id: 'main', name: 'Main Street Branch' },
  { id: 'uptown', name: 'Uptown Branch' }
];

const list = document.getElementById('storeList');
stores.forEach((s) => {
  const btn = document.createElement('button');
  btn.className = 'w-full rounded-lg bg-neutral-800 px-4 py-6 text-lg font-semibold text-neutral-100 hover:bg-neutral-700';
  btn.textContent = s.name;
  btn.addEventListener('click', () => {
    localStorage.setItem('activeStore', s.id);
    document.body.classList.add('opacity-0');
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 300);
  });
  list.appendChild(btn);
});
