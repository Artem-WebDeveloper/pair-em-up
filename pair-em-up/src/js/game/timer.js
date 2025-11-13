import { STATE } from '../config.js';

let timerInterval = null;

export function startTimer() {
  stopTimer();

  timerInterval = setInterval(() => {
    updateTimerDisplay();
  }, 1000);
}

export function stopTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
}

export function getElapsedSeconds() {
  if (!STATE.startTime) return 0;

  const elapsed = Date.now() - STATE.startTime;
  return Math.floor(elapsed / 1000);
}

export function formatTimer(secs) {
  const minutes = Math.floor(secs / 60)
    .toString()
    .padStart(2, '0');

  const seconds = (secs % 60).toString().padStart(2, '0');

  return `${minutes}:${seconds}`;
}

function updateTimerDisplay() {
  const timerEl = document.querySelector('.game__timer');
  if (!timerEl) return;

  const elapsed = getElapsedSeconds();
  timerEl.textContent = formatTimer(elapsed);
}
