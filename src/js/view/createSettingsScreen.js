import ui from './UI.js';
import createCheckbox from './createCheckbox.js';
import { SETTINGS, saveSettings } from '../settings.js';
import { updateVolume } from '../game/sound.js';

export default function () {
  const elem = ui.createEl('div', 'settings');
  const audio = ui.createEl('div', 'settings__section');
  const audioTitle = ui.createEl('h2', 'settings__title', 'Audio');

  const pairMatching = settingEl(
    'Successful pair matching',
    'sound-pair-matching'
  );
  const bgMusic = settingEl('Background music', 'bg-music');
  const assist = settingEl('Assist Sounds', 'sound-assists');
  const pairInvalid = settingEl('Invalid pair attempts', 'sound-invalid-pair');

  const cellSelection = settingEl(
    'Cell selection/deselection',
    'sound-cell-selection'
  );

  const volume = createVolumeControl();
  audio.append(
    audioTitle,
    bgMusic,
    pairMatching,
    pairInvalid,
    assist,
    cellSelection,
    volume
  );

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

function createVolumeControl() {
  const wrapper = ui.createEl('div', 'settings__setting settings__volume');
  const label = ui.createEl('p', null, 'Volume');

  const rangeInput = ui.createEl('input', 'volume-slider');
  rangeInput.type = 'range';
  rangeInput.min = '0';
  rangeInput.max = '100';
  rangeInput.value = SETTINGS.volume * 100;

  rangeInput.addEventListener('input', e => {
    const volume = e.target.value / 100;

    SETTINGS.volume = volume;
    saveSettings(SETTINGS);
    updateVolume(volume);
  });

  wrapper.append(label, rangeInput);

  return wrapper;
}
