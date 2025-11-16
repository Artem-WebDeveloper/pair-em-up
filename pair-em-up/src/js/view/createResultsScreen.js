import ui from './UI.js';
import { getGameHistory } from '../config.js';
import { formatTimer } from '../game/timer.js';

export default function () {
  const history = getGameHistory();
  const isNotGames = history.length === 0;

  const elem = ui.createEl('div', 'results');
  const title = ui.createEl('h2', 'results__title', '📜 Best Results');
  const tableHeader = tableHead();
  elem.append(title, tableHeader);
  history.forEach(record => elem.append(renderEntry(record)));

  const elemEmpty = ui.createEl('div', 'results results--empty');
  const titleEmpty = ui.createEl('h2', 'results__title', 'No games played yet');
  const emptyMessage = ui.createEl(
    'p',
    null,
    'Finish your first game to see results!'
  );

  elemEmpty.append(titleEmpty, emptyMessage);

  return isNotGames ? elemEmpty : elem;
}

function tableHead() {
  const tableHeader = ui.createEl('div', 'results__row results__row--header');
  const mode = ui.createEl('span', null, 'Mode');
  const score = ui.createEl('span', null, 'Score');
  const time = ui.createEl('span', null, 'Time');
  const moves = ui.createEl('span', null, 'Moves');
  const result = ui.createEl('span', null, 'Result');
  const date = ui.createEl('span', null, 'Date');

  tableHeader.append(mode, score, time, moves, result, date);
  return tableHeader;
}

function renderEntry(record) {
  const { mode, score, result, time, movesCount, date } = record;
  const modeFormatted = `"${mode[0].toUpperCase()}${mode.slice(1)}"`;
  const tableRow = ui.createEl('div', 'results__row');
  const modeEl = ui.createEl('span', null, modeFormatted);
  const scoreEl = ui.createEl('span', null, score);
  const timeEl = ui.createEl('span', null, formatTimer(time));
  const movesEl = ui.createEl('span', null, movesCount);
  const resultEl = ui.createEl(
    'span',
    null,
    result === 'won' ? '⭐ Won' : '💔 Lost'
  );
  const dateEl = ui.createEl('span', null, date);

  tableRow.append(modeEl, scoreEl, timeEl, movesEl, resultEl, dateEl);
  return tableRow;
}
