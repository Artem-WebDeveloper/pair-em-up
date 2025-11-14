import {
  STATE,
  COLS,
  MAX_GRID_ROWS,
  GOAL_SCORE,
  saveState,
} from '../config.js';

import renderGameEndScreen from '../view/renderGameEndScreen.js';

export function checkGameStatus() {
  if (STATE.gameStatus !== 'playing') return;

  if (STATE.score >= GOAL_SCORE) {
    STATE.gameStatus = 'won';
    saveState(STATE);
    queueMicrotask(() => renderGameEndScreen());

    return;
  }

  const noMoves = STATE.validMoves === 0;

  const noAssists =
    STATE.assistsLeft.addNumbers === 0 &&
    STATE.assistsLeft.shuffle === 0 &&
    STATE.assistsLeft.eraser === 0 &&
    STATE.assistsLeft.revert === 0;

  if (STATE.grid.length / COLS >= MAX_GRID_ROWS || (noAssists && noMoves)) {
    STATE.gameStatus = 'lost';
    saveState(STATE);

    queueMicrotask(() => renderGameEndScreen());

    return;
  }
}
