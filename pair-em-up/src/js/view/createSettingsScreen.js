import ui from './UI.js';
import createCheckbox from './createCheckbox.js';

export default function () {
  const elem = ui.createEl('div', 'settings');
  const audio = ui.createEl('div', 'settings__section');
  const audioTitle = ui.createEl('h2', 'settings__title', 'Audio');

  const pairMatching = settingEl(
    'Successful pair matching',
    'sound-pair-matching'
  );
  const bgMusic = settingEl('Background music', 'bg-music');
  const pairInvalid = settingEl('Invalid pair attempts', 'sound-invalid-pair');

  // Cell selection/deselection
  const cellSelection = settingEl(
    'Cell selection/deselection',
    'sound-cell-selection'
  );
  audio.append(audioTitle, bgMusic, pairMatching, pairInvalid, cellSelection);

  const visual = ui.createEl('div', 'settings__section');
  const visualTitle = ui.createEl('h2', 'settings__title', 'Visual');

  const theme = settingEl('Dark theme', 'app-theme');

  visual.append(visualTitle, theme);

  elem.append(audio, visual);
  return elem;
}

function settingEl(text, idCheck) {
  const elem = ui.createEl('div', 'settings__setting');
  const name = ui.createEl('p', null, text);
  const checkbox = createCheckbox(idCheck);

  elem.append(name, checkbox);
  return elem;
}
