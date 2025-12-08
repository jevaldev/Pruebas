//Problema #7 Montando el árbol
//Fácil

function drawTree(height, ornament, frequency) {
  let counter = 1
  let tree = ""
  
  for (let n = 1; n<=height; n++) {
    const charactersPerRow = 2 * n - 1
    const blankSpaces = height - n
    let rows = " ".repeat(blankSpaces)
    
    for (let i = 0; i < charactersPerRow; i++){
      rows += counter % frequency === 0 ? ornament : "*"
      counter++
    }
    
    tree += rows + '\n' 
  }
  
  tree += " ".repeat(height - 1) + "#"
  return tree
}