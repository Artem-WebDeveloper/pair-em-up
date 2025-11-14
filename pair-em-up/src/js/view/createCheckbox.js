import ui from './UI.js';

function createCheckbox(id) {
  const label = ui.createEl('label', 'switcher');
  const switcher = ui.createEl('input', 'switcher__input');
  switcher.type = 'checkbox';
  switcher.id = id;

  const span = ui.createEl('span', 'switcher__checkbox');

  label.append(switcher, span);
  return label;
}

export default createCheckbox;
