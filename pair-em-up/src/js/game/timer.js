import { STATE, saveState } from '../config.js';

let timerInterval = null;

export function startTimer() {
  if (timerInterval) return;

  STATE.startTime = Date.now();
  saveState(STATE);
  timerInterval = setInterval(() => {
    updateTimerDisplay();
  }, 1000);
}

export function stopTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }

  if (STATE.startTime) {
    const elapsedNow = Date.now() - STATE.startTime;
    STATE.elapsedBefore += Math.floor(elapsedNow / 1000);
    STATE.startTime = null;

    saveState(STATE);
  }
}

export function getElapsedSeconds() {
  if (!STATE.startTime) return STATE.elapsedBefore;
  const elapsed = Date.now() - STATE.startTime;
  return Math.floor(elapsed / 1000) + STATE.elapsedBefore;
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
