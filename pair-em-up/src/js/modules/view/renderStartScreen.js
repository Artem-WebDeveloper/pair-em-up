import ui from './UI.js';
import renderGameScreen from './renderGameScreen.js';
import { STATE, saveState } from '../config.js';

export default function () {
  const container = document.querySelector('.container');
  const startEl = ui.createEl('div', 'start');
  const modes = ui.createEl('ul', 'start__modes');
  const modeClassic = createModeCard(
    '🎯 Classic Mode',
    'A balanced mode with a clear and predictable layout. Perfect for players who like a steady challenge and strategic planning',
    'classic'
  );
  const modeRandom = createModeCard(
    '🎲 Random Mode',
    'Numbers appear in a shuffled, unpredictable order. Adds excitement and surprise to every game — keeps you thinking on your feet.',
    'random'
  );
  const modeСhaotic = createModeCard(
    '🔥 Chaotic Mode',
    'Completely random numbers fill the grid with no restrictions. Fast-paced and intense — only the sharpest strategies will succeed.',
    'chaotic'
  );
  const copyright = createCopyright();
  const startTitle = ui.createEl('h1', 'title', 'Pair Em Up');

  modes.append(modeRandom, modeClassic, modeСhaotic);

  startEl.append(startTitle, modes, copyright);

  ui.clearContainer(container);
  container.append(startEl);
}

function createCopyright() {
  const el = ui.createEl('div', 'copyright');
  const link = ui.createEl('a', 'copyright__link');
  const img = ui.createEl('img', 'copyright__img');
  const p = ui.createEl('p', 'copyright__author', 'Artem WebDev');

  link.append(img, p);
  el.append(link);

  return el;
}
function createModeCard(title, text, mode = null) {
  const btnText = STATE.mode === mode ? 'Continue' : 'Start Game';

  const modeCard = ui.createEl('li', 'start__mode-card');
  const modeTitle = ui.createEl('h2', 'start__mode-title', title);
  const modeDescrip = ui.createEl('p', 'start__mode-description', text);
  const modeBtn = ui.createEl('button', 'btn', btnText);

  modeBtn.addEventListener('click', () => renderGameScreen(mode));

  modeCard.append(modeTitle, modeDescrip, modeBtn);

  return modeCard;
}
