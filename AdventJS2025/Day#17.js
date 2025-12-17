//Problema #17 El panel de luces navideñas
//Fácil

function hasFourLights(board) {
  const height = board.length
  const width = board[0].length

  const checkRows = () => {
    for (let y = 0; y < height; y++) {
      let count = 0
      let currentColor = null

      for (let x = 0; x < width; x++) {
        const cell = board[y][x]

        if (cell !== '.' && cell === currentColor) {
          count++
        } else if (cell !== '.') {
          currentColor = cell
          count = 1
        } else {
          currentColor = null
          count = 0
        }

        if (count >= 4) return true
      }
    }
    return false
  }

  const checkCols = () => {
    for (let x = 0; x < width; x++) {
      let count = 0
      let currentColor = null

      for (let y = 0; y < height; y++) {
        const cell = board[y][x]

        if (cell !== '.' && cell === currentColor) {
          count++
        } else if (cell !== '.') {
          currentColor = cell
          count = 1
        } else {
          currentColor = null
          count = 0
        }

        if (count >= 4) return true
      }
    }
    return false
  }

  return checkRows() || checkCols()
}

hasFourLights([
  ['.', '.', '.', '.', '.'],
  ['R', 'R', 'R', 'R', '.'],
  ['G', 'G', '.', '.', '.']
])
// true
