//Problema #11 Regalos sin vigilancia
//Fácil

function findUnsafeGifts(warehouse) {
  let unsafeCount = 0;
  const rows = warehouse.length;
  if (rows === 0) return 0;
  const cols = warehouse[0].length;

  const isCamera = (r, c) =>
    r >= 0 && r < rows && c >= 0 && c < cols && warehouse[r][c] === '#';

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (warehouse[r][c] !== '*') continue; 

      const top = isCamera(r - 1, c);
      const bottom = isCamera(r + 1, c);
      const left = isCamera(r, c - 1);
      const right = isCamera(r, c + 1);

      if (!top && !bottom && !left && !right) {
        unsafeCount++;
      }
    }
  }

  return unsafeCount;
}