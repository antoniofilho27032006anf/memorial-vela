const candle = document.querySelector('.candle');
const flame = document.querySelector('.flame');
const light = document.querySelector('.light');
const smoke = document.querySelectorAll('.smoke');

const btnLight = document.querySelector('.primary');
const btnOff = document.querySelector('.secondary');
const statusTitle = document.getElementById('statusTitle');
const statusText = document.getElementById('statusText');

const sound = document.getElementById('bg-sound');

let isLit = false;

function updateStatus() {
  if (!statusTitle || !statusText) return;

  statusTitle.textContent = isLit ? 'A vela está acesa' : 'A vela está apagada';
  statusText.textContent = '';
}

function lightCandle() {
  if (isLit) return;

  isLit = true;
  candle?.classList.add('lit');
  light?.classList.add('active');
  flame && (flame.style.opacity = '1');
  smoke.forEach((s) => s.classList.remove('active'));

  localStorage.setItem('light', 'on');
  updateStatus();
}

function extinguishCandle() {
  if (!isLit) return;

  isLit = false;
  candle?.classList.remove('lit');
  light?.classList.remove('active');
  flame && (flame.style.opacity = '0.16');

  smoke.forEach((s, i) => {
    setTimeout(() => s.classList.add('active'), i * 180);
  });

  localStorage.setItem('light', 'off');
  updateStatus();
}

function toggleCandle() {
  if (isLit) {
    extinguishCandle();
  } else {
    lightCandle();
  }
}

btnLight?.addEventListener('click', lightCandle);
btnOff?.addEventListener('click', extinguishCandle);
candle?.addEventListener('click', toggleCandle);
candle?.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    toggleCandle();
  }
});

const startTime = Date.now();

function updateTimer() {
  const now = Date.now();
  const diff = now - startTime;

  const seconds = Math.floor(diff / 1000) % 60;
  const minutes = Math.floor(diff / 1000 / 60) % 60;
  const hours = Math.floor(diff / 1000 / 60 / 60);

  const timerEl = document.querySelector('.timer strong');

  if (timerEl) {
    timerEl.textContent =
      `${String(hours).padStart(2, '0')}:` +
      `${String(minutes).padStart(2, '0')}:` +
      `${String(seconds).padStart(2, '0')}`;
  }
}

setInterval(updateTimer, 1000);

window.addEventListener('load', () => {
  setTimeout(() => {
    document.querySelector('.memorial')?.classList.add('show');
  }, 500);

  const savedLight = localStorage.getItem('light');
  if (savedLight === 'on') {
    lightCandle();
  }

  updateStatus();
});

document.addEventListener('click', () => {
  if (sound) {
    sound.volume = 0.3;
    sound.play().catch(() => {});
  }
}, { once: true });

document.addEventListener('keydown', (e) => {
  if (e.key === 'd') {
    document.body.classList.toggle('dark-mode');
  }
});