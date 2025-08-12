document.addEventListener('DOMContentLoaded', () => {
  loadTheme();

  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isLight = document.body.classList.contains('light');
      applyTheme(isLight ? 'dark' : 'light');
    });
  }

  const password = document.getElementById('password');
  const togglePassword = document.getElementById('togglePassword');
  togglePassword.addEventListener('click', () => {
    const isHidden = password.type === 'password';
    password.type = isHidden ? 'text' : 'password';
    togglePassword.textContent = isHidden ? 'Hide' : 'Show';
  });

  const signInBtn = document.getElementById('signInBtn');
  const loginContainer = document.getElementById('loginContainer');
  const accountContainer = document.getElementById('accountContainer');
  signInBtn.addEventListener('click', () => {
    loginContainer.classList.add('opacity-0');
    setTimeout(() => {
      loginContainer.classList.add('hidden');
      accountContainer.classList.remove('hidden');
      setTimeout(() => accountContainer.classList.remove('opacity-0'), 50);
    }, 300);
  });

  const offlineBtn = document.getElementById('offlineBtn');
  const deviceRegistered = false; // Replace with real check
  if (deviceRegistered) offlineBtn.disabled = false;

  function updateStatus() {
    const online = navigator.onLine;
    const dot = document.getElementById('statusDot');
    const text = document.getElementById('statusText');
    dot.classList.toggle('bg-green-500', online);
    dot.classList.toggle('bg-red-500', !online);
    text.textContent = online ? 'Online' : 'Offline';
  }

  window.addEventListener('online', updateStatus);
  window.addEventListener('offline', updateStatus);
  updateStatus();
});
