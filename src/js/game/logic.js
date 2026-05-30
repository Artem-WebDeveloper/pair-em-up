import {
  STATE,
  saveState,
  resetState,
  saveGame,
  loadGame,
  DOUBLE_5_SCORE,
  SUM_10_SCORE,
  IDENT_PAIR_SCORE,
} from '../config.js';
import { getChaoticGrid, shuffleArray } from '../helpers.js';
import ui from '../view/UI.js';
import renderGameScreen from '../view/renderGameScreen.js';
import createSettingsScreen from '../view/createSettingsScreen.js';
import createResultsScreen from '../view/createResultsScreen.js';
import {
  updateValidMovesDisplay,
  updateScoreDisplay,
  updateVisibleRevertBtn,
} from '../view/createGameInterface.js';
import renderCells from '../view/renderCells.js';
import popup from '../view/Popup.js';
import { checkGameStatus } from './gameStatus.js';
import { playSound } from './sound.js';

export function handleCellClick(e, container) {
  const selected = STATE.selected;
  const click = e.target;
  const eraserBtn = document.getElementById('eraser-btn');

  if (!click.closest('.game__cell')) return;

  if (selected.length < 2) {
    selected.push(click);

    click.classList.toggle('game__cell--selected');

    playSound('cellClick');
  }

  if (selected.length === 1 && STATE.assistsLeft.eraser !== 0)
    eraserBtn.disabled = false;
  else eraserBtn.disabled = true;

  if (selected.length === 2) {
    document
      .querySelectorAll('.game__cell')
      .forEach(el => el.classList.remove('game__cell--selected'));

    if (checkPair(selected)) {
      playSound('pairMatch');
      updateHistory();

      STATE.movesCount++;

      const indices = selected.map(el => +el.dataset.index);
      STATE.grid.forEach((_, i, arr) => {
        if (indices.includes(i)) arr[i] = null;
      });

      STATE.score += getPairScore(selected);
      STATE.assistsLeft.revert = 1;
      updateVisibleRevertBtn(STATE);

      updateScoreDisplay(STATE.score);
      updateValidMoves();
      updateValidMovesDisplay(STATE.validMoves);
      checkGameStatus();
      saveState(STATE);
      selected.forEach(cell => cell.classList.add('game__cell--success'));

      setTimeout(() => {
        ui.clearContainer(container);
        renderCells(STATE.grid, container);
      }, 700);
    } else {
      playSound('pairInvalid');
      const copySelected = [...selected];
      copySelected.forEach(cell => cell.classList.add('game__cell--error'));
      setTimeout(() => {
        copySelected.forEach(cell =>
          cell.classList.remove('game__cell--error')
        );
      }, 400);
    }

    selected.length = 0;
  }
}

function checkPair(pair) {
  const [firstEl, secEl] = pair;
  const firstNum = firstEl.textContent;
  const secNum = secEl.textContent;
  const firstIndex = firstEl.dataset.index;
  const secIndex = secEl.dataset.index;

  const isEmptyValid =
    checkIsEmptyCells(firstIndex, secIndex, STATE.grid) ||
    checkIsEmptyColumns(firstIndex, secIndex, STATE.grid);

  return (
    isEmptyValid &&
    +firstIndex !== +secIndex &&
    (Number(firstNum) + Number(secNum) === 10 ||
      Number(firstNum) === Number(secNum))
  );
}

function getPairScore(pair) {
  const [a, b] = pair.map(el => +el.textContent);

  const rules = new Map([
    [() => a === 5 && b === 5, DOUBLE_5_SCORE],
    [() => a === b, IDENT_PAIR_SCORE],
    [() => a + b === 10, SUM_10_SCORE],
  ]);
  for (const [check, score] of rules) {
    if (check()) return score;
  }
  return 0;
}

function checkIsEmptyCells(firstIndex, secIndex, grid) {
  const lbound = Math.min(firstIndex, secIndex);
  const ubound = Math.max(firstIndex, secIndex);

  const between = grid.slice(lbound + 1, ubound);

  return between.every(el => el === null);
}

function checkIsEmptyColumns(firstIndex, secIndex, grid) {
  if (firstIndex % 9 !== secIndex % 9) return false;

  const step = 9;
  const start = Math.min(firstIndex, secIndex) + step;
  const end = Math.max(firstIndex, secIndex);

  for (let i = start; i < end; i += step) {
    if (grid[i] !== null) return false;
  }
  return true;
}

function countValidMoves(grid) {
  let count = 0;
  for (let i = 0; i < grid.length; i++) {
    if (grid[i] === null) continue;

    for (let j = i + 1; j < grid.length; j++) {
      if (grid[j] === null) continue;

      const isValid = grid[i] === grid[j] || grid[i] + grid[j] === 10;
      const emptyValid =
        checkIsEmptyCells(i, j, grid) || checkIsEmptyColumns(i, j, grid);

      if (isValid && emptyValid) count++;
    }
  }
  return count;
}

export function updateValidMoves() {
  STATE.validMoves = countValidMoves(STATE.grid);
}

function updateHistory() {
  STATE.history = JSON.parse(
    JSON.stringify({
      grid: STATE.grid,
      score: STATE.score,
      validMoves: STATE.validMoves,
      elapsedBefore: STATE.elapsedBefore,
      assistsLeft: STATE.assistsLeft,
      gameStatus: STATE.gameStatus,
      mode: STATE.mode,
      startTime: STATE.startTime,
    })
  );
}

// *ASSISTS*
export function handlerAddNumbers(mode) {
  if (STATE.assistsLeft.addNumbers > 0) {
    updateHistory();

    STATE.assistsLeft.addNumbers--;

    const addNumbers = STATE['grid'].filter(num => num !== null);
    const modes = {
      classic: addNumbers,
      random: shuffleArray(addNumbers),
      chaotic: getChaoticGrid(addNumbers.length),
    };

    STATE.grid.push(...modes[mode]);

    STATE.assistsLeft.revert = 1;
    saveState(STATE);
    playSound('assist');
    renderGameScreen(mode);
  }
}

export function handlerShuffle() {
  if (STATE.assistsLeft.shuffle <= 0) return;

  updateHistory();

  STATE.assistsLeft.shuffle--;

  const newGrid = shuffleArray(STATE.grid);
  STATE.grid.length = 0;
  STATE.grid.push(...newGrid);

  STATE.assistsLeft.revert = 1;
  saveState(STATE);
  playSound('assist');
  renderGameScreen(STATE.mode);
}

export function handleEraser(elem) {
  if (!elem || STATE.assistsLeft.eraser <= 0) return;

  updateHistory();
  STATE.assistsLeft.eraser--;

  const index = +elem.dataset.index;
  STATE.grid[index] = null;

  STATE.assistsLeft.revert = 1;
  saveState(STATE);
  playSound('assist');
  renderGameScreen(STATE.mode);
}

export function handleRevert() {
  const { revert } = STATE.assistsLeft;

  if (STATE.history === null || revert <= 0) return;

  STATE.grid = STATE.history.grid;
  STATE.score = STATE.history.score;
  STATE.validMoves = STATE.history.validMoves;
  STATE.assistsLeft = STATE.history.assistsLeft;
  STATE.gameStatus = STATE.history.gameStatus;

  STATE.assistsLeft.revert = 0;
  STATE.history = null;

  saveState(STATE);
  playSound('assist');
  renderGameScreen(STATE.mode);
}

// *CONTROLS*
export function handlerResetCurGame(mode) {
  resetState();
  mode ? renderGameScreen(mode) : renderGameScreen('startscreen');
}

export function handlerSaveGame() {
  saveGame();
  renderGameScreen(STATE.mode);
  showNotification('💾 Game is Saved');
}

export function handlerContinueGame() {
  if (!loadGame()) return;

  renderGameScreen(STATE.mode);
  showNotification('▶️ Game is Loaded');
}

// *GENERAL HANDLERS*
export function handlerSettingsOpen() {
  const settings = createSettingsScreen();
  popup.open(settings);
}

export function handlerResultsOpen() {
  const results = createResultsScreen();
  popup.open(results);
}

function showNotification(message) {
  if (document.querySelector('.notification')) return;

  const notification = document.createElement('div');
  notification.className = `notification`;
  notification.textContent = message;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.classList.add('notification--show');
  }, 10);

  setTimeout(() => {
    notification.classList.remove('notification--show');

    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 2000);
}
