export const shuffleArray = function (arr) {
  const array = [...arr];
  for (let i = array.length - 1; i > 0; i--) {
    let randomInd = Math.floor(Math.random() * (i + 1));
    [array[i], array[randomInd]] = [array[randomInd], array[i]];
  }
  return array;
};

export function getChaoticGrid(lengthGrid = 27) {
  return Array.from({ length: lengthGrid }, () => getRandomInt(1, 9));
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
