export const THEME_KEY = 'retailpro_theme';

export function applyTheme(theme) {
  document.body.classList.toggle('light', theme === 'light');
  const icon = document.getElementById('themeIcon');
  if (icon) icon.textContent = theme === 'light' ? '🌞' : '🌙';
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {
    /* ignore */
  }
}

export function loadTheme() {
  let theme = 'dark';
  try {
    theme = localStorage.getItem(THEME_KEY) || 'dark';
  } catch {
    /* ignore */
  }
  applyTheme(theme);
}

export function setupThemeToggle(button) {
  if (!button) return;
  button.addEventListener('click', () => {
    const isLight = document.body.classList.contains('light');
    applyTheme(isLight ? 'dark' : 'light');
  });
}
