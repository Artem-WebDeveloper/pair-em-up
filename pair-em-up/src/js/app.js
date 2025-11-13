import renderPage from './view/renderPage.js';
import { STATE, DEFAULT_STATE, saveState } from './config.js';

export default function app() {
  initState();
  renderPage();
}

function initState() {
  const savedState = localStorage.getItem('gameState');
  if (savedState) {
    const parsed = JSON.parse(savedState);
    Object.assign(STATE, structuredClone(parsed));
  } else {
    Object.assign(STATE, structuredClone(DEFAULT_STATE));
    saveState(STATE);
  }
}
