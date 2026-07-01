document.addEventListener('DOMContentLoaded', () => {
  const candle = document.querySelector('.candle');

  if (candle) {
    candle.setAttribute('data-state', 'ready');
    candle.setAttribute('aria-label', 'Acender ou apagar a vela');
    candle.addEventListener('click', () => {
      candle.dispatchEvent(new CustomEvent('candle:toggle', { bubbles: true }));
    });
  }
});
