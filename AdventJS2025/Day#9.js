//Problema #9 El reno robot aspirador
//Dificil


//PRIMERA VERSIÓN
function moveReno(board, moves) {
  let botState = "fail"
  const boardGrid = board.trim().split("")
  const instructions = moves.split("")
  let initialPosition
  let x = 1
  let y = 1 
  
  const floorObjects = {
    "#": "crash",
    "*": "success"
  }
  
  const movesDictionary = {
    "L": () => x--,
    "R": () => x++,
    "U": () => y--,
    "D": () => y++
  }
  
  const reduceBoard = boardGrid.reduce((obj, square, index) => {
    const key = `${x},${y}`
    if(!obj[key] && !square.includes("\n")) obj[key] = {x, y, square}
    x++
    if(square.includes("@")) {
      initialPosition = {x: obj[key].x,  y: obj[key].y}
    }
    if(square.includes("\n")) { 
      y++ 
      x = 1
    }
    return obj
  }, {})
  
  x = initialPosition.x
  y = initialPosition.y
  
  instructions.forEach(move =>  {
    if(Object.keys(movesDictionary).includes(move)){
      movesDictionary[move]()
      if(!reduceBoard[`${x},${y}`]) { 
        return botState = botState === "fail" ? "crash" : botState
      }
      if(Object.keys(floorObjects).includes(reduceBoard[`${x},${y}`].square)){
        botState = floorObjects[reduceBoard[`${x},${y}`].square]
      }
    }
  })

  return botState;
}

//SEGUNDA VERSIÓN
function moveReno(board, moves) {
  const boardGrid = board.trim().split("\n").map(obj => obj.split(""))
  // console.log(boardGrid)
  const height = boardGrid.length
  const width = boardGrid[0].length
  
  let y = boardGrid.findIndex(reno => reno.includes("@"))
  let x = boardGrid[y].findIndex(reno => reno.includes("@"))

  const floorObjects = {
    "#": "crash",
    "*": "success"
  }
  
  const movesDictionary = {
    "L":  [-1,0],
    "R":  [1,0],
    "U":  [0,-1],
    "D":  [0,1],
  }
  
  for(const move of moves) {
    const moveReno = movesDictionary[move]
    if(!moveReno) continue
    
    x += moveReno[0]
    y += moveReno[1]
    
    const state = (x < 0 || y < 0 || x >= width || y >= height)
        ? "crash"
        : floorObjects[boardGrid[y][x]];
    
    if (state) return state;
  }

  return "fail";
}