import renderPage from './view/renderPage.js';
import { STATE } from './config.js';

export default function app() {
  const savedState = localStorage.getItem('gameState');
  if (savedState) {
    const parsed = JSON.parse(savedState);
    Object.assign(STATE, parsed);
  }

  renderPage();
}
