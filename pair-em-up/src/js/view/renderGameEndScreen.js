import { STATE, GOAL_SCORE, deleteSavedGame } from '../config.js';
import ui from './UI.js';
import { getElapsedSeconds, formatTimer } from '../game/timer.js';
import { handlerResetCurGame, handlerResultsOpen } from '../game/logic.js';
import renderStartScreen from './renderStartScreen.js';
import buttonResults from './buttonShowRes.js';

export default function () {
  const container = document.querySelector('.container');
  ui.clearContainer(container);

  const endScreen = createGameEndScreen(STATE);
  container.append(endScreen);
}

function createGameEndScreen(state) {
  const endScreen = ui.createEl('div', 'end-screen');
  const title = ui.createEl(
    'h2',
    'end-screen__title',
    `${state.gameStatus === 'won' ? 'Congratulations!🏆' : 'Game over!😭'}`
  );

  const text = ui.createEl(
    'p',
    'end-screen__text',
    `${
      state.gameStatus === 'won'
        ? 'You’ve mastered this challenge!'
        : 'Every defeat is experience — try again!'
    }`
  );

  const score = ui.createEl(
    'p',
    'end-screen__text',
    `Total Score: ${state.score} / ${GOAL_SCORE}`
  );

  const elapsed = getElapsedSeconds();
  const formattedTime = formatTimer(elapsed);
  const time = ui.createEl('p', 'end-screen__text', `Time: ${formattedTime}`);

  const btnsContainer = ui.createEl('div', 'end-screen__btns');

  const btnRestart = ui.createEl('button', 'game__btn', `Restart`);
  const btnStartScreen = ui.createEl('button', 'game__btn', `Main Screen`);
  const btnShowRes = buttonResults();

  btnRestart.addEventListener('click', () => {
    deleteSavedGame();
    handlerResetCurGame(state.mode);
  });

  btnStartScreen.addEventListener('click', () => {
    deleteSavedGame();
    handlerResetCurGame();
    renderStartScreen();
  });
  btnShowRes.addEventListener('click', handlerResultsOpen);

  btnsContainer.append(btnStartScreen, btnRestart, btnShowRes);
  endScreen.append(title, text, score, time, btnsContainer);
  return endScreen;
}
