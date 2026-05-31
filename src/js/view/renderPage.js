import ui from './UI.js';
import renderStartScreen from './renderStartScreen.js';
import createSettingsScreen from './createSettingsScreen.js';
import popup from './Popup.js';

import settings from './createSettingsScreen.js';
export default function () {
  const bg = ui.createEl('div', 'bg-layer');
  const bgGrid = ui.createEl('div', 'bg-grid');
  bg.append(bgGrid);

  const popupRoot = ui.createEl('div');
  popupRoot.id = 'popup-root';
  popup.mount(popupRoot);

  const container = ui.createEl('div', 'container');

  document.body.append(bg);
  document.body.append(container);
  document.body.append(popupRoot);

  renderStartScreen();
}
