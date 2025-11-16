import ui from './UI.js';
import {
  STATE,
  getModeGrid,
  saveState,
  resetState,
  deleteSavedGame,
} from '../config.js';
import { handleCellClick } from '../game/logic.js';
import createGameInterface from './createGameInterface.js';
import renderCells from './renderCells.js';
import { startTimer, stopTimer } from '../game/timer.js';

export default function (mode) {
  if (STATE.mode && STATE.mode !== mode) {
    deleteSavedGame();
    resetState();
  }

  STATE.mode = mode;
  STATE.selected.length = 0;

  if (STATE.grid.length === 0) STATE.grid.push(...getModeGrid(mode));

  saveState(STATE);

  const container = document.querySelector('.container');
  ui.clearContainer(container);

  STATE.mode = mode;

  container.append(createGameScreen(mode));
  stopTimer();
  startTimer();
}

function createGameScreen(mode) {
  const modesTitle = {
    classic: 'Classic Mode',
    random: 'Random Mode',
    chaotic: 'Chaotic Mode',
  };

  const gameScreen = ui.createEl('div', 'game');

  const gameField = ui.createEl('div', 'game__field');
  const gameInterface = createGameInterface();
  const gameGrid = ui.createEl('div', 'game__grid');
  const titleMode = ui.createEl('h3', 'game__title-mode', modesTitle[mode]);

  gameField.append(titleMode, gameGrid);

  gameScreen.append(gameField, gameInterface);

  renderCells(STATE.grid, gameGrid);

  gameGrid.addEventListener('click', e => handleCellClick(e, gameGrid));

  return gameScreen;
}
