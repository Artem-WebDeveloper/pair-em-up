import { STATE, saveState } from '../config.js';
import ui from '../view/UI.js';
import renderCells from '../view/renderCells.js';

export function handleCellClick(e, container) {
  const selected = STATE.selected;
  const click = e.target;

  if (!click.closest('.game__cell')) return;

  if (selected.length < 2) {
    selected.push(click);
    click.classList.toggle('game__cell--selected');
  }

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
