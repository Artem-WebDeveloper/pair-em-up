import ui from './UI.js';
import {
  STATE,
  getModeGrid,
  saveState,
  resetState,
  deleteSavedGame,
} from '../config.js';
import { handleCellClick } from '../game/logic.js';
import createGameInterface from './createGameInterface.js';
import renderCells from './renderCells.js';
import { startTimer, stopTimer } from '../game/timer.js';

export default function (mode) {
  if (STATE.mode && STATE.mode !== mode) {
    deleteSavedGame();
    resetState();
  }

  STATE.mode = mode;
  STATE.selected.length = 0;

  if (STATE.grid.length === 0) STATE.grid.push(...getModeGrid(mode));
  console.log('state:', STATE);
  saveState(STATE);

  const container = document.querySelector('.container');
  ui.clearContainer(container);

  STATE.mode = mode;

  container.append(createGameScreen(mode));
  stopTimer();
  startTimer();
}

function createGameScreen(mode) {
  const modesTitle = {
    classic: 'Classic Mode',
    random: 'Random Mode',
    chaotic: 'Chaotic Mode',
  };

  const gameScreen = ui.createEl('div', 'game');

  const gameField = ui.createEl('div', 'game__field');
  const gameInterface = createGameInterface();
  const gameGrid = ui.createEl('div', 'game__grid');
  const titleMode = ui.createEl('h3', 'game__title-mode', modesTitle[mode]);

  gameField.append(titleMode, gameGrid);

  gameScreen.append(gameField, gameInterface);

  renderCells(STATE.grid, gameGrid);

  gameGrid.addEventListener('click', e => handleCellClick(e, gameGrid));

  return gameScreen;
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
