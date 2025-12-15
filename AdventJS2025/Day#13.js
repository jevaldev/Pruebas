//Problema #13 La cadena de montaje
//medio

function runFactory(factory) {
  const factoryGrid = factory.map(row => row.split(""))

  const movements = {
    ">": [1, 0],
    "<": [-1, 0],
    "^": [0, -1],
    "v": [0, 1]
  }

  let x = 0
  let y = 0

  const visited = new Set()

  while (true) {
    const key = `${x},${y}`

    if (visited.has(key)) {
      return "loop"
    }

    visited.add(key)

    const move = factoryGrid[y][x]

    if (!(move in movements)) {
      return "completed"
    }

    x += movements[move][0]
    y += movements[move][1]

    if (
      y < 0 ||
      y >= factoryGrid.length ||
      x < 0 ||
      x >= factoryGrid[0].length
    ) {
      return "broken"
    }
  }
}

runFactory([
  '>>.'
])