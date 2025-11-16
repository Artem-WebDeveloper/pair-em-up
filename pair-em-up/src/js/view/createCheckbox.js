import { SETTINGS, saveSettings, toggleDarkTheme } from '../settings.js';
import ui from './UI.js';
import { toggleBgMusic } from '../game/sound.js';

function createCheckbox(id) {
  const SETTINGS_MAP = {
    'bg-music': 'bgMusic',
    'sound-pair-matching': 'pairMatching',
    'sound-invalid-pair': 'invalidPair',
    'sound-cell-selection': 'cellSelection',
    'sound-assists': 'assist',
    'app-theme': 'darkTheme',
  };

  const label = ui.createEl('label', 'switcher');
  const switcher = ui.createEl('input', 'switcher__input');
  switcher.type = 'checkbox';
  switcher.id = id;

  const span = ui.createEl('span', 'switcher__checkbox');

  const settingKey = SETTINGS_MAP[id];

  if (settingKey) {
    switcher.checked = SETTINGS[settingKey];
  }

  switcher.addEventListener('change', e => {
    if (settingKey) {
      SETTINGS[settingKey] = e.target.checked;
      saveSettings(SETTINGS);
    }

    if (settingKey === 'bgMusic') {
      toggleBgMusic();
    }

    if (settingKey === 'darkTheme') {
      toggleDarkTheme();
    }
  });

  label.append(switcher, span);
  return label;
}

export default createCheckbox;
