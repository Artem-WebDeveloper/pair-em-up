import {
  STATE,
  saveState,
  resetState,
  DOUBLE_5_SCORE,
  SUM_10_SCORE,
  IDENT_PAIR_SCORE,
} from '../config.js';
import { getChaoticGrid, shuffleArray } from '../helpers.js';
import ui from '../view/UI.js';
import renderGameScreen from '../view/renderGameScreen.js';
import {
  updateValidMovesDisplay,
  updateScoreDisplay,
} from '../view/createGameInterface.js';
import renderCells from '../view/renderCells.js';

export function handleCellClick(e, container) {
  const selected = STATE.selected;
  const click = e.target;
  const eraserBtn = document.getElementById('eraser-btn');

  if (!click.closest('.game__cell')) return;

  if (selected.length < 2) {
    selected.push(click);
    console.log(STATE);
    click.classList.toggle('game__cell--selected');
  }

  if (selected.length === 1 && STATE.assistsLeft.eraser !== 0)
    eraserBtn.disabled = false;
  else eraserBtn.disabled = true;

  if (selected.length === 2) {
    document
      .querySelectorAll('.game__cell')
      .forEach(el => el.classList.remove('game__cell--selected'));
    console.log(checkPair(selected));

    if (checkPair(selected)) {
      const indices = selected.map(el => +el.dataset.index);
      STATE.grid.forEach((_, i, arr) => {
        if (indices.includes(i)) arr[i] = null;
      });

      STATE.score += getPairScore(selected);

      updateScoreDisplay(STATE.score);
      updateValidMoves();
      updateValidMovesDisplay(STATE.assistsLeft.validMoves);
      saveState(STATE);
      selected.forEach(cell => cell.classList.add('game__cell--success'));

      setTimeout(() => {
        ui.clearContainer(container);
        renderCells(STATE.grid, container);
      }, 700);
    } else {
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
  STATE.assistsLeft.validMoves = countValidMoves(STATE.grid);
}

// *ASSISTS*
export function handlerAddNumbers(mode) {
  if (STATE.grid.length / 9 >= 50) {
    alert('YOU LOSE!');
    return;
  }
  if (STATE.assistsLeft.addNumbers > 0) {
    STATE.assistsLeft.addNumbers--;

    const addNumbers = STATE['grid'].filter(num => num !== null);
    const modes = {
      classic: addNumbers,
      random: shuffleArray(addNumbers),
      chaotic: getChaoticGrid(addNumbers.length),
    };

    STATE.grid.push(...modes[mode]);
    saveState(STATE);
    renderGameScreen(mode);
  }
}

export function handlerShuffle() {
  if (STATE.assistsLeft.shuffle <= 0) return;
  STATE.assistsLeft.shuffle--;

  const newGrid = shuffleArray(STATE.grid);
  STATE.grid.length = 0;
  STATE.grid.push(...newGrid);
  saveState(STATE);
  renderGameScreen(STATE.mode);
}

export function handleEraser(elem) {
  if (!elem || STATE.assistsLeft.eraser <= 0) return;
  STATE.assistsLeft.eraser--;

  const index = +elem.dataset.index;
  STATE.grid[index] = null;
  saveState(STATE);
  renderGameScreen(STATE.mode);
}

// *CONTROLS*
export function handlerResetCurGame(mode) {
  resetState();
  mode ? renderGameScreen(mode) : renderGameScreen('startscreen');
}
