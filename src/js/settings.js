export const DEFAULT_SETTINGS = {
  bgMusic: false,
  pairMatching: true,
  invalidPair: true,
  cellSelection: true,
  assist: false,
  volume: 0.5,
  darkTheme: true,
};

export const SETTINGS = structuredClone(DEFAULT_SETTINGS);

export function saveSettings(curSettings) {
  localStorage.setItem('settings', JSON.stringify(curSettings));
}

export function toggleDarkTheme() {
  SETTINGS.darkTheme
    ? document.body.classList.remove('light-mode')
    : document.body.classList.add('light-mode');
}
