export function initConnectionStatus(container) {
  if (!container) return;
  const dot = container.querySelector('.status-dot');
  const text = container.querySelector('.status-text');

  function update() {
    const online = navigator.onLine;
    if (dot) {
      dot.classList.toggle('bg-green-500', online);
      dot.classList.toggle('bg-red-500', !online);
    }
    if (text) text.textContent = online ? 'Online' : 'Offline';
  }

  window.addEventListener('online', update);
  window.addEventListener('offline', update);
  update();
}
