import ui from './UI.js';

export default function createBtnSettings() {
  const button = ui.createEl(
    'button',
    'game__btn',
    'Settings',
    null,
    'settings-btn'
  );
  return button;
}
