import { STATE } from '../config.js';

export function checkGameStatus() {
  if (STATE.gameStatus !== 'playing') return;

  if (STATE.score >= 100) {
    STATE.gameStatus = 'won';
    saveState(STATE);
    // renderGameScreen('win');
    alert('U Won!');
    return;
  }

  const noAssists =
    STATE.assistsLeft.validMoves === 0 &&
    STATE.assistsLeft.addNumbers === 0 &&
    STATE.assistsLeft.shuffle === 0 &&
    STATE.assistsLeft.eraser === 0;

  if (STATE.grid.length / 9 >= 50 || noAssists) {
    STATE.gameStatus = 'lost';
    saveState(STATE);
    renderGameScreen('lose');
    // renderGameScreen('lose');
    alert('U LOST!');
    return;
  }
}
