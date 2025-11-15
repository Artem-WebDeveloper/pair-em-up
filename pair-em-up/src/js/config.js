import { shuffleArray, getChaoticGrid } from './helpers.js';
// import { stopTimer, startTimer } from './game/timer.js';

export const DEFAULT_STATE = {
  mode: 'startscreen',
  score: 0,
  grid: [],
  selected: [],
  startTime: null,
  elapsedBefore: 0,
  gameStatus: 'playing',
  validMoves: 0,
  assistsLeft: {
    revert: 0,
    addNumbers: 10,
    shuffle: 5,
    eraser: 5,
  },
  history: null,
};

export const STATE = structuredClone(DEFAULT_STATE);

const DEFAULT_GRID = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 1, 1, 2, 1, 3, 1, 4, 1, 5, 1, 6, 1, 7, 1, 8, 1,
  9,
];

export const COLS = 9;
export const MAX_GRID_ROWS = 50;
export const GOAL_SCORE = 3;
export const DOUBLE_5_SCORE = 3;
export const SUM_10_SCORE = 2;
export const IDENT_PAIR_SCORE = 1;

export function getModeGrid(mode) {
  switch (mode) {
    case 'classic':
      return [...DEFAULT_GRID];
    case 'random':
      return shuffleArray([...DEFAULT_GRID]);
    case 'chaotic':
      return getChaoticGrid();
    default:
      return [...DEFAULT_GRID];
  }
}

export function saveState(curState) {
  localStorage.setItem('gameState', JSON.stringify(curState));
}

export function resetState() {
  const savedMode = STATE.mode;
  Object.assign(STATE, structuredClone(DEFAULT_STATE));
  STATE.mode = savedMode;
}

export function saveGame() {
  const stateToSave = JSON.parse(
    JSON.stringify({
      mode: STATE.mode,
      score: STATE.score,
      grid: STATE.grid,
      startTime: STATE.startTime,
      elapsedBefore: STATE.elapsedBefore,
      gameStatus: STATE.gameStatus,
      validMoves: STATE.validMoves,
      assistsLeft: STATE.assistsLeft,
      history: STATE.history,
    })
  );
  localStorage.setItem('savedGame', JSON.stringify(stateToSave));
}
export function loadGame() {
  const savedGame = localStorage.getItem('savedGame');
  if (!savedGame) return false;
  const parsed = JSON.parse(savedGame);
  STATE.mode = parsed.mode;
  STATE.score = parsed.score;
  STATE.grid = parsed.grid;
  STATE.startTime = parsed.startTime;
  STATE.elapsedBefore = parsed.elapsedBefore;
  STATE.gameStatus = parsed.gameStatus;
  STATE.validMoves = parsed.validMoves;
  STATE.assistsLeft = parsed.assistsLeft;
  STATE.history = parsed.history;
  STATE.selected = [];
  saveState(STATE);
  return true;
}

export function deleteSavedGame() {
  localStorage.removeItem('savedGame');
}

// grid: [],
//   score: 0,
//   timer: 0,
//   mode: 'classic',
//   undoHistory: [],
//   assistUses: {
//     hints: 0,
//     revert: 0,
//     addNumbers: 0,
//     shuffle: 0,
//     eraser: 0,
