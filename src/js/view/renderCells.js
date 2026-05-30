import ui from './UI.js';

export default function (arr, parent) {
  const fragment = document.createDocumentFragment();
  arr.forEach((num, i) => {
    const cell = ui.createEl(
      'span',
      num ? 'game__cell' : 'game__cell game__cell--empty',
      num || ''
    );
    cell.dataset.index = i;
    fragment.append(cell);
  });
  parent.append(fragment);
}
