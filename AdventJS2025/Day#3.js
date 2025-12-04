//Problema #3 Ayuda al becario
//Fácil

function drawGift(size, symbol) {
  if (size < 2) return ""
  let gift = ""
  
  for(let n = size; n > 0; n--) {
    for(let i = size; i > 0; i--) {
      if(n===1 || n===size) {
         gift += symbol     
      } else if(i===1 || i===size) {
        gift += symbol
      } else {
        gift += " "
      }
    }
    if(n>1){
      gift += `\n`
    }
  }
  
  return gift
}

const g1 = drawGift(4, '*')
console.log(g1)