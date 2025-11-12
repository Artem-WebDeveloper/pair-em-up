import ui from './UI.js';
import renderStartScreen from './renderStartScreen.js';

export default function () {
  const bg = ui.createEl('div', 'bg-layer');
  const bgGrid = ui.createEl('div', 'bg-grid');
  bg.append(bgGrid);

  const container = ui.createEl('div', 'container');

  document.body.append(bg);
  document.body.append(container);

  renderStartScreen();
}
