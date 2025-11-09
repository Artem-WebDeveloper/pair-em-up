import ui from './UI.js';
import { STATE } from '../config.js';

export default function (mode) {
  STATE.mode = mode;
  const container = document.querySelector('.container');
  ui.clearContainer(container);

  STATE.mode = mode;
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
}

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
