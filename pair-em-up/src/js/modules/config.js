export const STATE = {
  mode: 'gamescreen',
  grid: [],
  selected: [],
};

let initialState = { ...STATE };

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

export function saveState(curState) {
  localStorage.setItem('gameState', JSON.stringify(curState));
}
