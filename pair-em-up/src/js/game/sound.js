import { SETTINGS } from '../settings.js';

const sounds = {
  pairMatch: new Audio('./assets/sounds/success.mp3'),
  pairInvalid: new Audio('./assets/sounds/invalid.mp3'),
  cellClick: new Audio('./assets/sounds/select.mp3'),
};

export function playSound(nameSound) {
  if (nameSound === 'pairMatch' && !SETTINGS.pairMatching) return;
  if (nameSound === 'pairInvalid' && !SETTINGS.invalidPair) return;
  if (nameSound === 'cellClick' && !SETTINGS.cellSelection) return;

  if (sounds[nameSound]) {
    sounds[nameSound].currentTime = 0;
    sounds[nameSound].play();
  }
}

const bgMusic = new Audio('./assets/sounds/bg-music.mp3');
bgMusic.loop = true;

export function updateVolume(volume) {
  Object.values(sounds).forEach(sound => {
    sound.volume = volume;
  });

  bgMusic.volume = volume * 0.5;
}

updateVolume(SETTINGS.volume);

export function toggleBgMusic() {
  SETTINGS.bgMusic ? bgMusic.play() : bgMusic.pause();
}
