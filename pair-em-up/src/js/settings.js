export const DEFAULT_SETTINGS = {
  bgMusic: false,
  pairMatching: true,
  invalidPair: true,
  cellSelection: true,
  volume: 0.5,
  darkTheme: true,
};

export const SETTINGS = structuredClone(DEFAULT_SETTINGS);

export function saveSettings(curSettings) {
  localStorage.setItem('settings', JSON.stringify(curSettings));
}
