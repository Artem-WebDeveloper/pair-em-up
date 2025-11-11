import ui from './UI.js';
import { STATE, saveState } from '../config.js';

// arr должен быть в зависимости от режима разный
const arr = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 1, 1, 2, 1, 3, 1, 4, 1, 5, 1, 6, 1, 7, 1, 8, 1,
  9,
];

export default function (mode) {
  STATE.mode = mode;
  STATE.selected.length = 0;
  if (STATE.grid.length === 0) STATE.grid.push(...arr);

  saveState(STATE);
  console.log(STATE);
  const container = document.querySelector('.container');
  ui.clearContainer(container);

  STATE.mode = mode;

  container.append(createGameScreen(mode));
}

function createGameScreen(mode) {
  const modesTitle = {
    classic: 'Classic Mode',
    random: 'Random Mode',
    chaotic: 'Chaotic Mode',
  };

  const gameScreen = ui.createEl('div', 'game');

  const gameField = ui.createEl('div', 'game__field');
  const gameGrid = ui.createEl('div', 'game__grid');
  const titleMode = ui.createEl('h3', 'game__title-mode', modesTitle[mode]);

  gameField.append(titleMode, gameGrid);

  gameScreen.append(gameField);

  renderCells(STATE.grid, gameGrid);

  gameGrid.addEventListener('click', e => handleCellClick(e, gameGrid));

  return gameScreen;
}

function handleCellClick(e, container) {
  const selected = STATE.selected;
  const click = e.target;

  if (!click.closest('.game__cell')) return;

  if (selected.length < 2) {
    selected.push(click);
    click.classList.toggle('game__cell--selected');
  }

  if (selected.length === 2) {
    document
      .querySelectorAll('.game__cell')
      .forEach(el => el.classList.remove('game__cell--selected'));
    console.log(checkPair(selected));

    if (checkPair(selected)) {
      const indices = selected.map(el => +el.dataset.index);
      STATE.grid.forEach((_, i, arr) => {
        if (indices.includes(i)) arr[i] = null;
      });

      console.log(STATE.grid);

      saveState(STATE);
      ui.clearContainer(container);
      renderCells(STATE.grid, container);
    }

    selected.length = 0;
  }
}

function checkPair(pair) {
  const [firstEl, secEl] = pair;
  const firstNum = firstEl.textContent;
  const secNum = secEl.textContent;
  const firstIndex = firstEl.dataset.index;
  const secIndex = secEl.dataset.index;

  return (
    +firstIndex !== +secIndex &&
    (Number(firstNum) + Number(secNum) === 10 ||
      Number(firstNum) === Number(secNum))
  );
}

//! TO DO FRAGMENT для производительности!
function renderCells(arr, parent) {
  arr.forEach((num, i) => {
    const cell = ui.createEl(
      'span',
      num ? 'game__cell' : 'game__cell game__cell--empty',
      num || ''
    );
    cell.dataset.index = i;
    parent.append(cell);
  });
}

//
//
//
//
//
//
//! INTERFACE TODO

function createGameInterface() {
  const gameInterface = ui.createEl('div', 'game__interface');
  const info = ui.createEl('div', 'game__info');
  const controls = ui.createEl('div', 'game__controls');
  const hints = ui.createEl('div', 'game__hints');
}

// Информация о выборе режима : информация о текущем режиме (Классический, Случайный, Хаотический)
// Игровая сетка : начальная ячейковая сетка, на которой отображаются числа и с которыми можно взаимодействовать. Сетка состоит из 9 столбцов. Количество строк определяется количеством чисел в сетке. Одно число занимает ровно одну ячейку.
// Отображение счета : отображает текущий счет и целевой счет (100 очков); обновляется сразу после каждого успешного совпадения пар.
// Таймер : отображение времени выполнения в формате MM:SS, запускается автоматически при загрузке игры.
// Кнопки управления :
// Кнопка сброса : перезапускает текущую игру в том же режиме с новыми числами.
// Кнопка «Сохранить игру» : сохраняет текущее состояние игры (сетку, счет, таймер, режим, историю отмен, использование вспомогательных инструментов).
// Кнопка «Продолжить игру» : загружает ранее сохраненное состояние игры (доступно только при наличии сохраненной игры).
// Вспомогательные кнопки : пять стратегических инструментов (Подсказки, Возврат, Добавление чисел, Перемешивание, Ластик) со счетчиками использования
// Кнопка «Настройки» : быстрый доступ к настройкам игры во время игры.
