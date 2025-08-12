const THEME_KEY = 'retailpro_theme';

function applyTheme(theme) {
  document.body.classList.toggle('light', theme === 'light');
  const icon = document.getElementById('themeIcon');
  if (icon) icon.textContent = theme === 'light' ? '🌞' : '🌙';
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch (err) {
    console.error('Failed to save theme', err);
  }
}

function loadTheme() {
  let theme = 'dark';
  try {
    theme = localStorage.getItem(THEME_KEY) || 'dark';
  } catch (err) {
    console.error('Failed to load theme', err);
  }
  applyTheme(theme);
}

window.applyTheme = applyTheme;
window.loadTheme = loadTheme;
