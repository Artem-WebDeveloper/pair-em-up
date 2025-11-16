import ui from './UI.js';
import renderGameScreen from './renderGameScreen.js';
import { STATE, deleteSavedGame } from '../config.js';
import { stopTimer } from '../game/timer.js';
import {
  handlerResetCurGame,
  handlerSettingsOpen,
  handlerResultsOpen,
} from '../game/logic.js';
import buttonShowRes from './buttonShowRes.js';
import buttonShowSettings from './buttonShowSettings.js';

export default function () {
  stopTimer();

  if (STATE.gameStatus !== 'playing') {
    handlerResetCurGame();
    deleteSavedGame();
  }

  const container = document.querySelector('.container');
  const startEl = ui.createEl('div', 'start');
  const modes = ui.createEl('ul', 'start__modes');
  const bottom = ui.createEl('div', 'start__bottom');
  const modeClassic = createModeCard(
    '🎯 Classic Mode',
    'A balanced mode with a clear and predictable layout. Perfect for players who like a steady challenge and strategic planning.',
    'classic'
  );
  const modeRandom = createModeCard(
    '🎲 Random Mode',
    'Numbers appear in a shuffled, unpredictable order. Adds excitement and surprise to every game — keeps you thinking on your feet.',
    'random'
  );
  const modeChaotic = createModeCard(
    '🔥 Chaotic Mode',
    'Completely random numbers fill the grid with no restrictions. Fast-paced and intense — only the sharpest strategies will succeed.',
    'chaotic'
  );
  const copyright = createAuthor();
  const startTitle = ui.createEl('h1', 'title', 'Pair Em Up');

  modes.append(modeRandom, modeClassic, modeChaotic);

  const btnResults = buttonShowRes();
  const btnSettings = buttonShowSettings();

  btnSettings.addEventListener('click', handlerSettingsOpen);
  btnResults.addEventListener('click', handlerResultsOpen);

  bottom.append(btnResults, copyright, btnSettings);
  startEl.append(startTitle, modes, bottom);

  ui.clearContainer(container);
  container.append(startEl);
}

function createAuthor() {
  const link = ui.createEl('a', 'author-link');
  link.href = 'https://github.com/Artem-WebDeveloper';
  link.target = '_blank';
  const img = ui.createEl('img', 'author-link__icon');
  img.src = './assets/gh-icon.svg';
  const p = ui.createEl('p', null, 'Artem WebDev');

  link.append(img, p);

  return link;
}
function createModeCard(title, text, mode = null) {
  const btnText = STATE.mode === mode ? 'Continue' : 'New Game';
  const btnClass =
    STATE.mode === mode ? 'start__btn start__btn--active' : 'start__btn';

  const modeCard = ui.createEl('li', 'start__mode-card');
  const modeTitle = ui.createEl('h2', 'start__mode-title', title);
  const modeDescrip = ui.createEl('p', 'start__mode-description', text);
  const modeBtn = ui.createEl('button', btnClass, btnText);

  modeBtn.addEventListener('click', () => renderGameScreen(mode));

  modeCard.append(modeTitle, modeDescrip, modeBtn);

  return modeCard;
}
