//Problema 20 El almacén vertical
//Fácil

function dropGifts(warehouse, drops) {
  for (const cols of drops) {
    for (let rows = warehouse.length - 1;  rows >= 0; rows--){
      if (warehouse[rows][cols] === ".") { 
        warehouse[rows][cols] = "#"
        break
      }
    }
  }

  return warehouse
}

dropGifts(
  [
    ['.', '.', '.'],
    ['.', '#', '.'],
    ['#', '#', '.']
  ],
  [0]
)