document.addEventListener('DOMContentLoaded', () => {
  const candle = document.querySelector('.candle');

  if (candle) {
    candle.setAttribute('data-state', 'ready');
  }
});
