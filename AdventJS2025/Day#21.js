//Problema #21 El robot de la limpieza
//Medio

function clearGifts(warehouse, drops) {
  const rowsCount = warehouse.length
  const colsCount = warehouse[0].length

  const newRow = () => new Array(colsCount).fill('.')

  for (const col of drops) {
    let placedRow = -1

    for (let row = rowsCount - 1; row >= 0; row--) {
      if (warehouse[row][col] === '.') {
        warehouse[row][col] = '#'
        placedRow = row
        break
      }
    }

    if (placedRow === -1) continue

    if (warehouse[placedRow].every(cell => cell === '#')) {
      warehouse.splice(placedRow, 1)
      warehouse.unshift(newRow())
    }
  }

  return warehouse
}

clearGifts(
  [
    ['.', '.', '#'],
    ['#', '.', '#'],
    ['#', '.', '#']
  ],
  [0, 1, 2]
)