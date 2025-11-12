import { STATE, GOAL_SCORE } from '../config.js';
import ui from './UI.js';

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

  const timer = ui.createEl('div', 'game__timer', '00:00');

  info.append(scoreEl, timer);
  return info;
}

function createAssists(state = {}) {
  const { assistsLeft = {} } = state;
  const {
    hints = 6,
    revert = 1,
    addNumbers = 10,
    shuffle = 5,
    eraser = 5,
  } = assistsLeft;

  const assistsEl = ui.createEl('div', 'game__assists-container');
  const assistsTitle = ui.createEl('h3', 'game__interface-title', 'Assists');
  const assistsBtnsContainer = ui.createEl('div', 'game__assists');

  const validMoves = ui.createEl(
    'span',
    'game__hint',
    `Valid moves ${hints > 5 ? '5+' : hints}`,
    ''
  );
  const btnRevert = ui.createEl('button', 'game__btn', `Revert`, 'eraser-btn');
  btnRevert.disabled = revert === 0;
  const btnAddNumbers = ui.createEl(
    'button',
    'game__btn',
    `Add Numbers ${addNumbers}`,
    'eraser-btn'
  );
  const btnShuffle = ui.createEl(
    'button',
    'game__btn',
    `Shuffle ${shuffle}`,
    'shuffle-btn'
  );

  const btnEraser = ui.createEl(
    'button',
    'game__btn',
    `Eraser ${eraser}`,
    'eraser-btn'
  );

  assistsBtnsContainer.append(
    validMoves,
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
  const controlsBtnsContainer = ui.createEl('div', 'game__contols-btns');

  const btnReset = ui.createEl('button', 'game__btn', 'Reset', 'reset-btn');
  const btnSave = ui.createEl('button', 'game__btn', 'Save', 'save-btn');
  const btnContinue = ui.createEl(
    'button',
    'game__btn',
    'Continue',
    'continue-btn'
  );
  const btnSettings = ui.createEl(
    'button',
    'game__btn',
    'Settings',
    'settings-btn'
  );
  controlsBtnsContainer.append(btnReset, btnSave, btnContinue, btnSettings);
  controls.append(controlsTitle, controlsBtnsContainer);
  return controls;
}
