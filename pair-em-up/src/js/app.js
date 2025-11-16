import renderPage from './view/renderPage.js';
import { STATE, DEFAULT_STATE, saveState } from './config.js';
import {
  SETTINGS,
  DEFAULT_SETTINGS,
  saveSettings,
  toggleDarkTheme,
} from './settings.js';

export default function app() {
  loadSettings();
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

function loadSettings() {
  const savedSettings = localStorage.getItem('settings');
  if (savedSettings) {
    const parsed = JSON.parse(savedSettings);
    Object.assign(SETTINGS, structuredClone(parsed));
  } else {
    Object.assign(SETTINGS, structuredClone(DEFAULT_SETTINGS));
    saveSettings(SETTINGS);
  }

  SETTINGS.bgMusic = false;
  toggleDarkTheme();
  saveSettings(SETTINGS);
}
