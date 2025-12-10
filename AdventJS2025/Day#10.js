//Problema #10 Profundidad de la magia navideña
//Fácil

function maxDepth(s) {
  let current = 0
  let max = 0
  
  for(const bracket of s) {
    if(bracket === "["){
      current++
      if(current > max) max = current
    } else if (bracket === "]") {
      if (current === 0) return -1
      current--
    }
  }
  
  return current === 0 ? max : -1
}