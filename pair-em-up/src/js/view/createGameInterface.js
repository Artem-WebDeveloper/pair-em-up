import { STATE, GOAL_SCORE, saveState } from '../config.js';
import ui from './UI.js';
import {
  handlerResetCurGame,
  handlerAddNumbers,
  handlerShuffle,
  handleEraser,
  updateValidMoves,
} from '../game/logic.js';
import { getElapsedSeconds, formatTimer } from '../game/timer.js';

export default function () {
  const gameInterface = ui.createEl('div', 'game__interface');

  const infoEl = createGameInfo(STATE.score, GOAL_SCORE);
  const assistsEl = createAssists(STATE);
  const controlsEl = createControls();

  gameInterface.append(infoEl, assistsEl, controlsEl);
  return gameInterface;
}

function createGameInfo(score = 0, targetScore = 100) {
  const info = ui.createEl('div', 'game__info');

  const scoreEl = ui.createEl('div', 'game__score');
  const curScore = ui.createEl('span', 'game__score--cur', score);
  const goalScore = ui.createEl('span', 'game__score--goal', targetScore);
  scoreEl.append(curScore, '/', goalScore);

  const elapsed = getElapsedSeconds();
  const formattedTime = formatTimer(elapsed);
  const timer = ui.createEl('div', 'game__timer', formattedTime);

  info.append(scoreEl, timer);
  return info;
}

function createAssists(state = {}) {
  updateValidMoves();
  const { assistsLeft = {} } = state;
  const {
    validMoves,
    revert = 1,
    addNumbers = 10,
    shuffle = 5,
    eraser = 5,
  } = assistsLeft;

  const assistsEl = ui.createEl('div', 'game__assists-container');
  const assistsTitle = ui.createEl('h3', 'game__interface-title', 'Assists');
  const assistsBtnsContainer = ui.createEl('div', 'game__assists');

  console.log('validMoves', validMoves);

  const validMovesEl = ui.createEl(
    'span',
    'game__hint',
    `Valid moves ${validMoves > 5 ? '5+' : validMoves}`,
    null,
    'valid-moves-item'
  );
  const btnRevert = ui.createEl(
    'button',
    'game__btn',
    `Revert`,
    null,
    'revert-btn'
  );
  btnRevert.disabled = revert === 0;
  const btnAddNumbers = ui.createEl(
    'button',
    'game__btn',
    `Add Numbers ${addNumbers}`,
    null,
    'add-numbers-btn'
  );
  btnAddNumbers.disabled = addNumbers === 0;
  const btnShuffle = ui.createEl(
    'button',
    'game__btn',
    `Shuffle ${shuffle}`,
    null,
    'shuffle-btn'
  );
  btnShuffle.disabled = shuffle === 0;

  const btnEraser = ui.createEl(
    'button',
    'game__btn',
    `Eraser ${eraser}`,
    null,
    'eraser-btn'
  );
  btnEraser.disabled = true;

  btnAddNumbers.addEventListener('click', () => handlerAddNumbers(STATE.mode));
  btnShuffle.addEventListener('click', handlerShuffle);
  btnEraser.addEventListener('click', () => handleEraser(STATE.selected[0]));

  assistsBtnsContainer.append(
    validMovesEl,
    btnRevert,
    btnAddNumbers,
    btnShuffle,
    btnEraser
  );
  assistsEl.append(assistsTitle, assistsBtnsContainer);

  return assistsEl;
}

function createControls() {
  const controls = ui.createEl('div', 'game__controls');
  const controlsTitle = ui.createEl('h3', 'game__interface-title', 'Contols');
  const controlsBtnsContainer = ui.createEl('div', 'game__controls-btns');

  const btnReset = ui.createEl(
    'button',
    'game__btn',
    'Reset',
    null,
    'reset-btn'
  );
  const btnSave = ui.createEl('button', 'game__btn', 'Save', null, 'save-btn');
  const btnContinue = ui.createEl(
    'button',
    'game__btn',
    'Continue',
    null,
    'continue-btn'
  );
  const btnSettings = ui.createEl(
    'button',
    'game__btn',
    'Settings',
    null,
    'settings-btn'
  );

  btnReset.addEventListener('click', () => handlerResetCurGame(STATE.mode));

  controlsBtnsContainer.append(btnReset, btnSave, btnContinue, btnSettings);
  controls.append(controlsTitle, controlsBtnsContainer);
  return controls;
}

export function updateValidMovesDisplay(validMoves) {
  const validEl = document.getElementById('valid-moves-item');
  if (!validEl) return;
  validEl.textContent = `Valid moves ${validMoves > 5 ? '5+' : validMoves}`;
}
