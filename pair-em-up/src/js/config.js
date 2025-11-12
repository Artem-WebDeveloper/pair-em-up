import { shuffleArray, getChaoticGrid } from './helpers.js';

export const STATE = {
  mode: 'startscreen',
  score: 0,
  grid: [],
  selected: [],
  assistsLeft: {
    hints: 6,
    revert: 1,
    addNumbers: 10,
    shuffle: 5,
    eraser: 5,
  },
};

const DEFAULT_GRID = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 1, 1, 2, 1, 3, 1, 4, 1, 5, 1, 6, 1, 7, 1, 8, 1,
  9,
];

export let initialState = { ...STATE };
export const GOAL_SCORE = 100;

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
  Object.assign(STATE, initialState);
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
